// Function to hide all media cards
function hideMediaCards() {
    const mediaCards = document.querySelectorAll('.media-card');
    mediaCards.forEach(card => {
        card.style.display = 'none';
    });
}

// Function to show media cards based on category
function showMediaCardsByCategory(category) {
    hideMediaCards();
    const mediaCardsToShow = document.querySelectorAll(`.media-card[data-category="${category}"]`);
    mediaCardsToShow.forEach(card => {
        card.style.display = 'block'; // Use 'flex' or 'grid' if those are your display styles
    });
}

// Event listeners for category buttons
document.querySelectorAll('.category-selector button').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        showMediaCardsByCategory(category);
    });
});

// Function to add a new backlog
function addBacklog(name) {
    const backlogContainer = document.querySelector('.backlog-status');
    const backlogDiv = document.createElement('div');
    backlogDiv.classList.add('backlog-list');
    backlogDiv.textContent = name;
    backlogContainer.appendChild(backlogDiv);
}

// Event listener for backlog form submission
document.querySelector('#create-backlog-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const backlogName = document.querySelector('#backlog-name').value.trim();
    if (backlogName) {
        addBacklog(backlogName);
        document.querySelector('#backlog-name').value = ''; // Clear the input after adding the backlog
    }
});

// Function to remove all selected states and then apply to the clicked tab
function selectTab(button) {
    categoryButtons.forEach(btn => btn.classList.remove('selected-tab'));
    button.classList.add('selected-tab');
}

// Function to show or hide media cards based on category
function toggleMediaCardsByCategory(category, isActive) {
    if (isActive) {
        const mediaCardsToShow = document.querySelectorAll(`.media-card[data-category="${category}"]`);
        mediaCardsToShow.forEach(card => {
            card.style.display = 'flex';
        });
    } else {
        // Show all media cards if the filter is deactivated
        const mediaCards = document.querySelectorAll('.media-card');
        mediaCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
}

// Event listeners for category buttons
const categoryButtons = document.querySelectorAll('.category-selector button');

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('selected-tab');
        // Remove the selected state from all tabs
        categoryButtons.forEach(btn => btn.classList.remove('selected-tab'));

        // If the clicked button was already active, show all media cards
        // Otherwise, apply the filter
        if (!isActive) {
            this.classList.add('selected-tab');
            const category = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            toggleMediaCardsByCategory(category, true);
        } else {
            // If no tab is selected, show all media cards
            toggleMediaCardsByCategory('', false);
        }
    });
});

// Function to update dropdown text
function updateDropdownText(text) {
    const dropbtnText = document.querySelector('.dropbtn');
    dropbtnText.firstChild.textContent = text + ' '; // Update text, the space is for separation from the icon
}

// Add event listeners to dropdown items
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        updateDropdownText(this.textContent);
        // Prevent default action of anchor tags
        event.preventDefault();
        // Toggle the dropdown content visibility
        document.querySelector('.dropdown-content').classList.toggle('show');
    });
});

// Toggle the dropdown content
document.querySelector('.dropbtn').addEventListener('click', function(event) {
    document.querySelector('.dropdown-content').classList.toggle('show');
    event.stopPropagation(); // Prevent the click from closing the dropdown immediately
});

// Close the dropdown if the user hovers outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn, .dropbtn *')) { // Ensure we don't close when clicking on any part of the button
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

//---------------------toggle Menu--------------

function toggleMenu() {
    var menuOptions = document.querySelector('.menu-options');
    menuOptions.style.display = (menuOptions.style.display === 'block') ? 'none' : 'block';
}