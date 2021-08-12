// G Analytics
function GAnalytics(){
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-W9TP9BL82P');
}
// Mobile Menu
function HamburgerMenu() {
  document.getElementById("mobile-menu").style.display = "block";
  document.querySelector("footer").style = "display:none";
  document.querySelector("main").style = "display:none";
}
function CloseHamburgerMenu() {
  document.getElementById("mobile-menu").style.display = "none";
  document.querySelector("main").style = "display:block";
  document.querySelector("footer").style = "display:block";
}

// Form Submission
function Success() {
  document.getElementById("contact-form").style.display = "none";
  document.getElementById("success-msg").style.display = "block";
}

// About Us
function openModal() {
  document.getElementById("imgModal").style.display = "block";
  // document.querySelector("footer").style = "display:none";
  // Get the modal
  var modal = document.getElementById("imgModal");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      // document.querySelector("footer").style = "display:block";
    }
  };
}

function closeModal() {
  document.getElementById("imgModal").style.display = "none";
  // document.querySelector("footer").style = "display:block";
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("imgSlides");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  // Set the caption text
  captionText.innerHTML = slides[slideIndex - 1].querySelector("img").alt;
}

// Services Modals
// Timber
var timberSlideIndex = 1;

function openTimberModal() {
  document.getElementById("TimberModal").style.display = "block";
  // Get the modal
  var modal = document.getElementById("TimberModal");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function plusTimberSlides(n) {
  showTimberSlides((timberSlideIndex += n));
}

function currentTimberSlide(n) {
  showTimberSlides((timberSlideIndex = n));
}

function showTimberSlides(n) {
  var i;
  var slides = document.getElementsByClassName("timberSlides");
  if (n > slides.length) {
    timberSlideIndex = 1;
  }
  if (n < 1) {
    timberSlideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[timberSlideIndex - 1].style.display = "block";
}
// Special
var specialSlideIndex = 1;

function openSpecialModal() {
  document.getElementById("SpecialModal").style.display = "block";
  // Get the modal
  var modal = document.getElementById("SpecialModal");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function plusSpecialSlides(n) {
  showSpecialSlides((specialSlideIndex += n));
}

function currentSpecialSlide(n) {
  showSpecialSlides((specialSlideIndex = n));
}

function showSpecialSlides(n) {
  var i;
  var slides = document.getElementsByClassName("specialSlides");
  if (n > slides.length) {
    specialSlideIndex = 1;
  }
  if (n < 1) {
    specialSlideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[specialSlideIndex - 1].style.display = "block";
}
// Aluminium
var alSlideIndex = 1;

function openAlModal() {
  document.getElementById("AlModal").style.display = "block";
  // Get the modal
  var modal = document.getElementById("AlModal");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function plusAlSlides(n) {
  showAlSlides((alSlideIndex += n));
}

function currentAlSlide(n) {
  showAlSlides((alSlideIndex = n));
}

function showAlSlides(n) {
  var i;
  var slides = document.getElementsByClassName("AlSlides");
  if (n > slides.length) {
    alSlideIndex = 1;
  }
  if (n < 1) {
    alSlideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[alSlideIndex - 1].style.display = "block";
}

// Close All Modals
function closeModal() {
  document.getElementById("TimberModal").style.display = "none";
  document.getElementById("SpecialModal").style.display = "none";
  document.getElementById("AlModal").style.display = "none";
}
