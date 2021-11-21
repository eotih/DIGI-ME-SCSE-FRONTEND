const WEB_API = "https://api.scse-vietnam.org/"
function uploadFileToAPI() {
    var formData = new FormData();
    const inputFile = document.querySelector('#file');
    const files = inputFile.files[0];
    formData.append('file', files);
    formData.append('OrganizationName', $('#OrganizationName').val());
    formData.append('ContactPerson', $('#ContactPerson').val());
    formData.append('OrganizationProgrames', $('#OrganizationProgrames').val());
    formData.append('Phone', $('#Phone').val());
    formData.append('Email', $('#Email').val());
    formData.append('Address', $('#Address').val());
    formData.append('Link', $('#Link').val());
    formData.append('Purpose', $('#Purpose').val());
    fetch(WEB_API + "Interface/UploadFileVipPro", {
        method: 'POST',
        body: formData,
    }).then(function (response) {
        alert("Gửi thông tin thành công")
        return response.json()
    }
    ).then(function (data) {
        console.log(data);
    }
    ).catch(function (error) {
        console.log(error);
    }
    );
}