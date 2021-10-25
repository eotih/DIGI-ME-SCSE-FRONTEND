window.addEventListener('load', loadData)
        async function loadData() {
            fetch(WEB_API + "Interface/ListPartner")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                        document.getElementById('pic01').src = response[0].Image;
                        document.getElementById('pic02').src = response[1].Image;
                        document.getElementById('pic03').src = response[2].Image;
                        document.getElementById('pic04').src = response[3].Image;
                        document.getElementById('pic05').src = response[3].Image;
                        document.getElementById('pic06').src = response[3].Image;
                    // đây là hàm trả ra tbody
                })
        }