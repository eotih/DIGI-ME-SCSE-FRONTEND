const Url = "https://api.scse-vietnam.org/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)
async function loadData() {
    fetch(Url + "Interface/ListBanner")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
                document.getElementById('pic1').src = response[0].Image;
                document.getElementById('pic2').src = response[1].Image;
                document.getElementById('pic3').src = response[2].Image;
                document.getElementById('pic4').src = response[3].Image;
                document.getElementById('pic5').src = response[4].Image;
            // đây là hàm trả ra tbody
            $(".loader-wrapper").fadeOut("slow");
        })
        
} 