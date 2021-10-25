
const loadPartner = async () => {
    const res = await fetch("https://api.scse-vietnam.org/API/Interface/ListPartner")
    const json = await res.json();
    const filterData = json.filter(v => v.Image)
    const data = filterData.map(function (response) {
        console.log(response)
        return `
            <div class="item">
                <img src="${response.Image}" class="d-block img-fluid" alt="...">
            </div>
    `;
    })
    $('#partner').html(data)
    

}
loadPartner();
