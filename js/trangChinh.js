(function($) {
    'use strict';
    $.fn.andSelf = function() {
      return this.addBack.apply(this, arguments);
    }
  
    if ($('.example-1').length) {
      $('.example-1').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 4500,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });
    }
  
    if ($('.full-width').length) {
      $('.full-width').owlCarousel({
        loop: true,
        margin: 10,
        items: 1,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5500,
        navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"]
      });
    }
  
    if ($('.loop').length) {
      $('.loop').owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 8500,
        responsive: {
          600: {
            items: 4
          }
        }
      });
    }
  
  })(jQuery);