//function handling addition of backlog list divs/links to list page

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('create-backlog-form');
  if (form) {
      form.addEventListener('submit', handleFormSubmission);
  }

  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'list.html' || currentPage === '') {
      loadBacklogs();
  } else if (currentPage === 'index.html' || currentPage === '') {
      loadLinkedBacklogs();
  }
});

function handleFormSubmission(event) {
  event.preventDefault();
  const backlogName = document.getElementById('backlog-name').value.trim();
  if (backlogName) {
      addBacklog(backlogName);
      document.getElementById('backlog-name').value = ''; // Clear input field
      alert('Backlog created successfully!');
  } else {
      alert('Please enter a name for the backlog.');
  }
}

function addBacklog(name) {
  let backlogs = JSON.parse(localStorage.getItem('backlogs')) || [];
  if (!backlogs.includes(name)) {
      backlogs.push(name);
      localStorage.setItem('backlogs', JSON.stringify(backlogs));
  }

  // Refresh the appropriate list based on the current page
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'list.html' || currentPage === '') {
      loadBacklogs(); // Immediate refresh for list.html
  } else if (currentPage === 'index.html' || currentPage === '') {
      loadLinkedBacklogs(); // Refresh the linked backlogs display for index.html
  }
}

function loadBacklogs() {
  const backlogs = JSON.parse(localStorage.getItem('backlogs')) || [];
  const backlogStatusDiv = document.querySelector('.backlog-status');

  // Clear only dynamically added backlogs before re-adding them
  document.querySelectorAll('div[data-backlog-name]').forEach(div => div.remove());

  backlogs.forEach(name => {
      if (!document.querySelector(`div[data-backlog-name="${name}"]`)) {
          const backlogDiv = document.createElement('div');
          backlogDiv.setAttribute('data-backlog-name', name); // Marking for differentiation
          backlogDiv.classList.add('backlog-list');
          backlogDiv.textContent = name;
          backlogStatusDiv.appendChild(backlogDiv);
      }
  });
}

function loadLinkedBacklogs() {
  const backlogs = JSON.parse(localStorage.getItem('backlogs')) || [];
  const backlogStatusDiv = document.querySelector('.backlog-status');

  // Clear only dynamically added backlogs before re-adding them
  document.querySelectorAll('a[data-dynamic-backlog]').forEach(link => link.remove());

  backlogs.forEach(name => {
      const link = document.createElement('a');
      link.setAttribute('data-dynamic-backlog', 'true'); // Marking for differentiation
      link.href = `list.html#${name.replace(/\s+/g, '-').toLowerCase()}`;
      const div = document.createElement('div');
      div.className = 'backlog-list';
      div.textContent = name;
      link.appendChild(div);
      backlogStatusDiv.appendChild(link);
  });
}


//Navbar Dropdown

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

//Menu Expand Toggle

document.addEventListener("DOMContentLoaded", function() {
  const menuExpandButton = document.querySelector('.menu-expand button');
  const menuOptions = document.querySelector('.menu-options');

  // Function to toggle the visibility of the menu
  function toggleMenu() {
    const isMenuVisible = window.getComputedStyle(menuOptions).display === 'block';
    menuOptions.style.display = isMenuVisible ? 'none' : 'block';
  }

  // Event listener for the menu button
  menuExpandButton.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleMenu();
  });

  // Hide the menu when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!menuOptions.contains(event.target) && event.target !== menuExpandButton) {
      menuOptions.style.display = 'none';
    }
  });
});

//Media Card Modal

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

//Testing Elements

document.getElementById('clearLocalStorage').addEventListener('click', function() {
  localStorage.clear(); // Clear all local storage data
  alert('All backlogs have been cleared.');

  // Optionally, refresh the page to reflect the changes or manually update the UI
  window.location.reload();
});