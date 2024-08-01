
    // Get the current page URL
    var currentPageUrl = window.location.href;

    // Loop through each <a> tag in the navbar
    var navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(function(link) {
        // Check if the href attribute matches the current page URL
        if (link.href === currentPageUrl) {
            // Add a CSS class to highlight the current page link
            link.classList.add('current-page');
        }
    });
