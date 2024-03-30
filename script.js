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

//---------------------backlog list filter by--------------

document.addEventListener("DOMContentLoaded", function() {
    const filterIcons = document.querySelectorAll('.nav-links i');
    let activeFilter = null; // Keep track of the active filter

    filterIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        
        // Check if the clicked icon is already active
        if (activeFilter === type) {
          // If yes, show all cards and clear the active filter
          showAllMediaCards();
          activeFilter = null; // Reset active filter
        } else {
          // Otherwise, apply the filter
          filterList(type);
          activeFilter = type; // Update active filter to current type
        }
      });
    });

    function filterList(type) {
      const allCards = document.querySelectorAll('.media-card');
      allCards.forEach(card => {
        card.style.display = 'none'; // Hide all cards first
      });
      const filteredCards = document.querySelectorAll(`.media-card[data-type="${type}"]`);
      filteredCards.forEach(card => {
        card.style.display = 'block'; // Show cards with the selected data-type
      });
    }

    function showAllMediaCards() {
      const allCards = document.querySelectorAll('.media-card');
      allCards.forEach(card => {
        card.style.display = 'block'; // Show all cards
      });
    }
});


  //*-----------Menu expand toggle-------------

  document.addEventListener("DOMContentLoaded", function() {
    const menuExpandButton = document.querySelector('.menu-expand button');
    const menuOptions = document.querySelector('.menu-options');
  
    // This function toggles the display of the menu
    // It's triggered when the menu button is clicked
    function toggleMenu() {
      const isMenuVisible = menuOptions.style.display === 'block';
      menuOptions.style.display = isMenuVisible ? 'none' : 'block';
    }
  
    // Attach the click event listener to the menu button
    menuExpandButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click event from propagating to the document
      toggleMenu();
    });
  
    // Hide the menu when clicking outside of the menu
    document.addEventListener('click', function(event) {
      if (!menuOptions.contains(event.target) && event.target !== menuExpandButton) {
        menuOptions.style.display = 'none';
      }
    });
  
    // Hide menu options when the mouse leaves the menu area
    // We listen for the mouseleave event on the menuOptions element itself
    menuOptions.addEventListener('mouseleave', function() {
      menuOptions.style.display = 'none';
    });
  });


  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btns = document.querySelectorAll('.media-card');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the media card, open the modal 
btns.forEach(function(btn){
    btn.onclick = function() {
        modal.style.display = "block";
        // Fill modal with content based on the clicked card
        // e.g., modal.querySelector('.modal-content p').textContent = this.querySelector('.media-title').textContent;
    }
})

var modalImage = document.getElementById("modalImage");
var modalTitle = document.getElementById("modalTitle");
var modalDetails = document.getElementById("modalDetails");

// Function to fill the modal with content from the clicked card
function fillModal(card) {
    // Assuming the structure of your media card, adjust the selectors as needed
    var image = card.querySelector('img').src;
    var title = card.querySelector('.media-title').textContent;
    var details = card.querySelector('.media-details').textContent;
    
    // Set the content in the modal
    modalImage.src = image;
    modalTitle.textContent = title;
    modalDetails.textContent = details;
}

// Attach a click event listener to each card
btns.forEach(function(btn){
    btn.onclick = function() {
        fillModal(this);
        modal.style.display = "block";
    }
})

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}