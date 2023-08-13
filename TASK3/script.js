// let slideIndex = 1;

// const plusSlide = (n) => {
//   showSlide(slideIndex += n);
// }

// const currentSlide = (n) => {
//   showSlide(slideIndex = n);
// }

// const showSlide = (slideIndex) => {
//   const slides = document.getElementsByClassName('slide');
//   const dots = document.getElementsByClassName('dot');

//   if (slideIndex > slides.length) {
//     console.log(slideIndex, "before");
//     slideIndex = 1
//     console.log(slideIndex, "After");

//   }
//   if (slideIndex < 1) {
//     slideIndex = slides.length
//     console.log(slideIndex, "less than 1");
//   }

//   let index = 0;
//   for (index = 0; index < slides.length; index++) {
//     slides[index].style.display = 'none';
//   }

//   for (index = 0; index < dots.length; index++) {
//     dots[index].classList.remove('active');
//   }
//   slides[slideIndex - 1].style.display = 'block';
//   dots[slideIndex - 1].classList.add('active');
// }
// showSlide(slideIndex);



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
