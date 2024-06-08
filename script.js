document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    showSlides();
  
    function showSlides() {
      let slides = document.querySelectorAll(".slide");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
  
    document.querySelector(".prev").addEventListener("click", function() {
      slideIndex--;
      showSlides();
    });
  
    document.querySelector(".next").addEventListener("click", function() {
      slideIndex++;
      showSlides();
    });
  });
  