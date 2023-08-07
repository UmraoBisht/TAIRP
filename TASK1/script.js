let typed = new Typed('#typed', {
  strings:['Umrao Bisht!'],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 1000,
  loop: true,
});

const menuIcon = document.getElementById('menu-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');
const navbar = document.getElementById('navbar');


function showMenu() {
  navbar.style.right="0rem";  
}

function hideMenu(){
navbar.style.right="-20rem"
}

window.onscroll=()=>{
navbar.style.right="-20rem";
}

ScrollReveal({
  reset:true,
  distance:"120px",
  duration:2000,
  delay:50
});

ScrollReveal().reveal('.home-content,.about-img',{origin:'left'});
ScrollReveal().reveal('.btn-box', {origin:'bottom'});
ScrollReveal().reveal('.heading', {origin:'top'} );
