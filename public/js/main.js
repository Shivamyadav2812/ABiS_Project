(function ($) {
  'use strict';

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').css('top', '0px');
    } else {
      $('.sticky-top').css('top', '-100px');
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $('.dropdown');
  const $dropdownToggle = $('.dropdown-toggle');
  const $dropdownMenu = $('.dropdown-menu');
  const showClass = 'show';

  $(window).on('load resize', function () {
    if (this.matchMedia('(min-width: 992px)').matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr('aria-expanded', 'true');
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr('aria-expanded', 'false');
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off('mouseenter mouseleave');
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Header carousel
  $('.header-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Document ready function to ensure form elements are loaded
  $(document).ready(function () {
    // Add this code to handle active class for navbar links
    const navLinks = document.querySelectorAll('.nav-item');
    const currentUrl = window.location.pathname;

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === currentUrl) {
        link.classList.add('active'); // Add active class to current link
      } else {
        link.classList.remove('active'); // Remove active class from others
      }
    });

    // Search form functionality
    var $searchForm = $('#search-form');

    if ($searchForm.length) {
      $searchForm.on('submit', function (event) {
        event.preventDefault();

        var keyword = $('#job-title').val().trim().toLowerCase();
        var location = $('select option:selected').val().trim().toLowerCase();

        var matchFound = false;

        // Select both internship and job items
        $('.single-job-items').each(function () {
          var title = $(this).attr('data-title') || '';
          var jobLocation = $(this).attr('data-location') || '';

          title = title.toLowerCase();
          jobLocation = jobLocation.toLowerCase();

          var matchesKeyword = keyword === '' || title.includes(keyword);
          var matchesLocation =
            location === '' || jobLocation.includes(location);

          if (matchesKeyword && matchesLocation) {
            $(this).show();
            matchFound = true;
          } else {
            $(this).hide();
          }
        });

        // Show all items if no search criteria entered
        if (keyword === '' && location === '') {
          $('.single-job-items').show();
        }

        // Optional: Add a message if no results found
        if (!matchFound && (keyword !== '' || location !== '')) {
          alert('No jobs or internships match your search criteria.');
        }
      });
    }

    // Polaroid rotation
    $('.polaroid').each(function () {
      const randomRotation = Math.floor(Math.random() * (6 - -6 + 1) + -6);
      $(this).css('transform', `rotate(${randomRotation}deg)`);
    });
  });
})(jQuery);

var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}