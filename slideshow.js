//javascript file for slideshow
var slideIndex;
var intID;


function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    var captions = document.getElementsByClassName("caption");
    if (n > slides.length) {slideIndex = 1; }
    if (n < 1) {slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    for (i = 0; i < captions.length; i++) {
        captions[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    captions[slideIndex-1].style.display = "block"; 
}

function startSlides(n) {
    slideIndex = n;
    showSlides(slideIndex);
    //setTimeout(plusSlides(1)), 2000);
    intID=setTimeout(function(){startSlides(slideIndex+1);}, 7000);
    //plusSlides(1);
    
}

function plusSlides(n) {
    //showSlides(slideIndex += n);
    clearInterval(intID);
    startSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

