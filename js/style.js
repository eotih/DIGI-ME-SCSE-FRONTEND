$(document).scroll(function(){
    var elem = document.getElementById("slogan");
    var x = elem.offsetTop -10;
    var y = $(this).scrollTop();
    if(y>x){
        $('nav').fadeIn();
    }else{
        $('nav').fadeOut();
    }
});