const loadBanner = async () => {
    const res = await fetch("https://api.scse-vietnam.org/API/Interface/ListBanner")
    const json = await res.json();
    const filterData = json.filter(v => v.Image)
    const data = filterData.slice(0,4).map(function(response){
        return `
        <div class="carousel-item">
                    <img class="d-block w-100" src="${response.Image}">
                </div>
        `;
    })
    const html = filterData.slice(4).map(function(response){
        return `
        <div class="carousel-item active">
                    <img class="d-block w-100" src="${response.Image}">
                </div>
        `;
    })
    const arr = await Promise.all([html,data])
    $('#dulieu').html(arr)
}
loadBanner()