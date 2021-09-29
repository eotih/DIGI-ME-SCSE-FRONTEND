$(document).scroll(function(){
    var y = $(this).scrollTop();
    if(y>'2rem'){
        $('nav').fadeIn();
    }else{
        $('nav').fadeOut();
    }
});