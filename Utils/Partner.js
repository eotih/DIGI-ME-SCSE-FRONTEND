
// Do something
const loadPartner = async () => {
    const res = await fetch("https://api.scse-vietnam.org/API/Interface/ListPartner")
    const json = await res.json();
    const filterData = json.filter(v => v.Image)
    const data = filterData.map(function (response) {
        return `
              <div class="item">
                  <a href="${response.Link}"target="_blank">
                  <img src="${response.Image}" style="height: 350px;object-fit:contain"class="img-fluid" alt="...">
                  </a>
              </div>
      `;
    })
    $('#partner').html(data)
    var $owl = $('.owl-carousel');
    $owl.trigger('destroy.owl.carousel');
    $owl.find('.owl-stage-outer').children().unwrap();
    $owl.removeClass("owl-center owl-loaded owl-text-select-on");

    $owl.owlCarousel({
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
        }
    });

}
loadPartner();
