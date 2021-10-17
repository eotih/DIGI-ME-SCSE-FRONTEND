const WEB_API = "http://localhost:59360/API/"

function addContact(){
    var data = {
        FullName: $('#FullName').val(),
        Address: $('#Address').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Subtitle: $('#Subtitle').val(),
        Details: $('#Details').val(),
    };
    fetch(WEB_API + "Interface/AddOrEditContact", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}