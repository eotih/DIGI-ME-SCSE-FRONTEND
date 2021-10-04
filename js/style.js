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