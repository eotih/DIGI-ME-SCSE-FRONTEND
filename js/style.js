//loader
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
  });

//2nd-navbar
document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
          document.getElementById('navbar_top').classList.add('fixed-top');
          document.getElementById('navbar_top').style.opacity=1;
          document.getElementById('navbar_top').style.top="0px";
        } else {
          document.getElementById('navbar_top').classList.remove('fixed-top');
           // remove padding top from body
          document.getElementById('navbar_top').style.opacity=0;  
          document.getElementById('navbar_top').style.top="-100px";
        } 
    });
  });
//getdatetime
window.addEventListener('load', getDateTime)
async function getDateTime() {
    var date = new Date();
    var current_day = date.getDay();
    var day_name = '';
    switch (current_day) {
        case 0:
            day_name = "CHỦ NHẬT";
            break;
        case 1:
            day_name = "THỨ HAI";
            break;
        case 2:
            day_name = "THỨ BA";
            break;
        case 3:
            day_name = "THỨ TƯ";
            break;
        case 4:
            day_name = "THỨ NĂM";
            break;
        case 5:
            day_name = "THỨ SÁU";
            break;
        case 6:
            day_name = "THỨ BẢY";
    }


    var myVar = setInterval(function () {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = day_name + ', ' + date + ' ' + time;
        document.getElementById("datetime").innerText = dateTime;
    }, 500);
}
//back to top
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $('#btn-back-to-top').fadeIn();
        } else {
            $('#btn-back-to-top').fadeOut();
        }
    });

    $('#btn-back-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});
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
  $(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop : true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
            0:{ items:1},
            600:{ items:2},
            1000:{ items:3},
        }
    });
  });