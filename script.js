 const swiper = new Swiper('.swiper', {
    // Optional parameters
    speed: 1000 ,
    direction: 'horizontal',
   
  
    // slides per view
    slidesPerView: 3,
    spaceBetween: 10,

    // autoplay
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        },
    
    // breakpoints

    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 1,
          spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
          slidesPerView: 1,
          spaceBetween: 40
      },

      1200: {
          slidesPerView: 3,
          spaceBetween: 50
      },

    
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    autoplay: {
      delay: 2000,
    },

   loop: true,
  

  
    // And if we need scrollbar
    
  });

  
 function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }