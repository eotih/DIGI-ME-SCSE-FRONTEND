const WEB_API = "https://api.scse-vietnam.org/API/"

function addVolunteer(){
    var $data = {
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        DOB: $('#DOB').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Project: $('#Project').val(),
        Purpose: $('#Purpose').val()
    };
    fetch(WEB_API + "Management/RegisterVolunteer", {
        method: 'POST',
        body: JSON.stringify($data),
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