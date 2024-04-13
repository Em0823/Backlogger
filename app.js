require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();


app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));


//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.use('/', require('./server/routes/user'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})