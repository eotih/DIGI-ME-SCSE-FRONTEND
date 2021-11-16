const WEB_API = "http://localhost:59360/API/"

function RegisterPartner(){
    var $data = {
        ContactPerson: $('#ContactPerson').val(),
        OrganizationName: $('#OrganizationName').val(),
        OrganizationProgrames: $('#OrganizationProgrames').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Link: $('#Link').val(),
        Purpose: $('#Purpose').val(),
        LinkFile: $('#LinkFile').val()
    };
    fetch(WEB_API + "Interface/AddOrEditPartner", {
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
                alert('Đã Gửi Thông Tin!')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
function doupload() {
    let data = document.getElementById("file").files[0];
    let entry = document.getElementById("file").files[0];
    console.log('doupload',entry,data)
    fetch(WEB_API + "Interface/UploadFile", 
    {method:'Post',body:data});
    RegisterPartner();
}