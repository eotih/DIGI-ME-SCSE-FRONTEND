$(document).scroll(function(){
    var y = $(this).scrollTop();
    if(y>170){
        $('nav').fadeIn();
    }else{
        $('nav').fadeOut();
    }
});