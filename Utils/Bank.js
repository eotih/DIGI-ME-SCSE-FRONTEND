
const loadImage = async () => {
    const res = await fetch("https://api.scse-vietnam.org/Interface/ShowAllBankInfo")
    const json = await res.json();
    const filterData = json.filter(v => v.ImageQR)

    const data = filterData.slice(0, filterData.length-1).map(function (response) {
        return `
            <div class="carousel-item">
                        <img class="d-block mx-auto"" style="width:100%;border-radius:20px" src="${response.ImageQR}">
                    </div>
            `;
    })
    const html = filterData.slice(filterData.length-1).map(function (response) {
        return `
            <div class="carousel-item active">
                        <img class="d-block mx-auto"" style="width:100%;border-radius:20px" src="${response.ImageQR}">
                    </div>
            `;
    })
    const arr = await Promise.all([html, data])
    $('#tImg').html(arr)
    $(".loader-wrapper").fadeOut("slow");
}
loadImage()