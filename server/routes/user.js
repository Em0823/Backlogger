const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const passport = require('passport');

const jwtSecret = process.env.JWT_SECRET;

// check login
const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            next();
        } catch(error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}

// GET / 
// User - Login Page
router.get('/signin', async (req, res) => {
    try {

        res.sendFile(path.join(__dirname, '../../public/signin.html'));
    } catch (error) {
        console.log(error);
    }
});

// POST / 
// User - Check Login
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userID: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/profile');

    } catch (error) {
        console.log(error);
    }
});

// POST / 
// User - Register
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, email, password: hashedPassword });
            res.status(201).json({ message: 'User Created', user});
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already exists.' });
            }
            res.status(500).json({ message: 'Internal Server Error' });
        }

    } catch (error) {
        console.log(error);
    }
});

// GET / 
// User - Profile
router.get('/profile', authMiddleware, async (req, res) => { 
    res.sendFile(path.join(__dirname, '../../public/profile.html'));
});

module.exports = router;
