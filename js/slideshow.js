var SlideShow = function(elem, speed)
{
    var slideshow = this;
    slideshow.currentLeft = 0;
    slideshow.speed = speed;    
    slideshow.element = elem;
    slideshow.slideWidth = slideshow.element.clientWidth;
    slideshow.slideHeight = slideshow.element.clientHeight;
    slideshow.leftBtn = slideshow.element.querySelector('.control-button.left');
    slideshow.rightBtn = slideshow.element.querySelector('.control-button.right');
    slideshow.stripElement = slideshow.element.querySelector(".strip");

    // go to the first slide 
    slideshow.goToStart = function()
    {
        slideshow.currentLeft = 0;
        slideshow.stripElement.style.left = slideshow.currentLeft+"px";
    }
  
    // go to the last slide 
    slideshow.goToEnd = function() 
    {
        slideshow.currentLeft = slideshow.maxLeftPos;
        slideshow.stripElement.style.left = slideshow.currentLeft+"px";
    }

    // go to the next slide
    slideshow.nextSlide = function() 
    {
        if (slideshow.currentLeft!=slideshow.maxLeftPos)
        {
            slideshow.currentLeft = slideshow.currentLeft - slideshow.widthOfMask;
            slideshow.stripElement.style.left = slideshow.currentLeft+"px";
        } else {
            slideshow.goToStart();
        } 
    }

    // go to the previous slide
    slideshow.previousSlide = function()
    {
        if (slideshow.currentLeft!=0)
        {
            slideshow.currentLeft = slideshow.currentLeft + slideshow.widthOfMask;
            slideshow.stripElement.style.left = slideshow.currentLeft+"px";
        } else {
            slideshow.goToEnd();
        } 
    }

    // stop going to other slides
    slideshow.stop = function()
    {
      clearInterval(slideshow.interval);
    }

    // when click left button slideshow goes to previous slide 
    slideshow.leftBtn.addEventListener("click", function() 
    {
      slideshow.previousSlide();
    });
     
    // when click right button slideshow goes to next slide
    slideshow.rightBtn.addEventListener("click", function() 
    {
      slideshow.nextSlide();
    });

    // when hover on slideshow stops
    slideshow.element.addEventListener("mouseover", function()
    {
      slideshow.stop();
    });
   
    // when hover out slideshow starts again 
    slideshow.element.addEventListener("mouseout", function()
    {
        slideshow.start();
        slideshow.nextSlide();
    });


    // start slidewhow
    slideshow.start = function()  
    {
        slideshow.interval = setInterval(function(){
            slideshow.nextSlide();
        }, slideshow.speed);
    }

    
    //  excute slideshow 
    slideshow.init = function()
    {
        slideshow.slides = slideshow.element.getElementsByClassName('slide');
        // number of slides
        slideshow.numberOfSlides = slideshow.slides.length;
        // width of slideshow mask
        slideshow.widthOfMask = slideshow.slideWidth;
        // how far slideshow move to left 
        slideshow.maxLeftPos = -1*((slideshow.numberOfSlides * slideshow.widthOfMask) - slideshow.widthOfMask);
        // width of entire slideshow 
        slideshow.stripElement.style.width = (slideshow.numberOfSlides * slideshow.widthOfMask) + "px";
        
        // width and height based on the number of slides 
        for (var i = 0; i < slideshow.numberOfSlides; ++i) {
          	slideshow.slides[i].style.width = slideshow.slideWidth + "px";
          	slideshow.slides[i].style.height = slideshow.slideHeight + "px";
        }

        slideshow.start(); // start slideshow
    }

    slideshow.init(); // excute slideshow
} 

var sliders = document.getElementsByClassName('slideshow');

for (var i=0; i < sliders.length; i++) {
  new SlideShow(sliders[i], 2000);
}