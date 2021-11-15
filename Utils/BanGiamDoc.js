const WEB_API = "https://api.scse-vietnam.org/API/";

async function loadDataBGD(numb) {
    fetch(WEB_API + "Interface/ShowAllPortfolio")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const GiamDoc = response.filter(v => v.Position === "Giám Đốc")
            if (numb === 1) {
                executeDataInformationGiamDoc(GiamDoc)
            }
            else{
                executeDataInformationGiamDocEN(GiamDoc)
            }
            const Slave = response.filter(v => v.Position !== "Phó Giám Đốc" && v.Position !== "Giám Đốc")
                executeDataInformationMember(Slave)

            const PhoGiamDoc = response.filter(v => v.Position === "Phó Giám Đốc")
            if (numb === 1) {
                executeDataInformationPhoGiamDoc(PhoGiamDoc)
            }
            else
            {
                executeDataInformationPhoGiamDocEN(PhoGiamDoc)
            }
        })
}
function executeDataInformationGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        // Lấy hình ảnh đưa vào slide
        document.getElementById('picgd1').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('picgd2').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('picgd3').src = Hinhanh[2].ImagePortfolio;
        // Chỉnh sửa link của ban giám đôc chỉnh trực tiếp trong đây 
        return `
       
        <div class="text-lg-right text-center">
                    <div class="ml-5 mb-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">GIỚI THIỆU</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>${Position}</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:1rem;">${Details}</p>

                    </div>
                </div>
        `;
    })
    $('#tbody').html(html)
    $(".loader-wrapper").fadeOut("slow");
}
function executeDataInformationPhoGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        document.getElementById('pic01').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('pic02').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('pic03').src = Hinhanh[2].ImagePortfolio;
        return `
        <div class="text-lg-right text-center">
                    <div class="mr-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">GIỚI THIỆU</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>${Position}</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:1rem;"> ${Details}</p>
                    </div>
                    
                </div>
        `;
    })
    $('#pgd').html(html)
    $(".loader-wrapper").fadeOut("slow");
}

////Thông tin BGD english
function executeDataInformationGiamDocEN(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        // Lấy hình ảnh đưa vào slide
        document.getElementById('picgd1').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('picgd2').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('picgd3').src = Hinhanh[2].ImagePortfolio;
        // Chỉnh sửa link của ban giám đôc chỉnh trực tiếp trong đây 
        return `
       
        <div class="text-lg-right text-center">
                    <div class="ml-5 mb-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">INTRODUCTION</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>Director</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:1rem;">Ms. Huong has been involved in the Association for a long time, has 31 years of professional experience with a lot of experience in women's advocacy work, she herself used to run and manage 24 large and small projects in the community. Her advantage is her closeness and friendliness to the community, having skills in training everyone by participating, and having a lot of experience in gathering and building networks, especially volunteer networks. base member. As the direct manager of the Social Science Service Connection Center and once the director of the Marriage Counseling Center, especially marriage with foreign elements, as the Center's director, she has consulted Consulting and supporting over 2,000 cases of women wishing to marry foreigners, helping them gain knowledge and skills from which to think and consider more carefully when deciding to marry a foreigner, contributing to limiting The situation of being lured into human trafficking and helping PN have a beautiful life in foreign countries, she used to be a reporter for more than 300 classes on gender knowledge and the Law on Gender Equality, Domestic Violence, Human Trafficking, Human Trafficking. climate change and other areas related to women, children and families, knowledge of thrift credit, supporting women to start a business, increase family income, improve life. During her work, she has approached and supported more than 20,000 women in the community with knowledge, skills and activities to increase income, helping women improve their quality of life.</p>
                    </div>
                </div>
        `;
    })
    $('#tbody').html(html)
    $(".loader-wrapper").fadeOut("slow");
}
function executeDataInformationPhoGiamDocEN(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        document.getElementById('pic01').src = Hinhanh[0].ImagePortfolio;
        document.getElementById('pic02').src = Hinhanh[1].ImagePortfolio;
        document.getElementById('pic03').src = Hinhanh[2].ImagePortfolio;
        return `
        <div class="text-lg-right text-center">
                    <div class="mr-5">
                        <h6 class="font-weight-bold text-red-scse" style="font-size: 1.5rem;">INTRODUCTION</h6>
                        <h3 class="text-uppercase">${FullName}</h3>
                        <p>Deputy Director</p>
                        <p class="" style="text-align: justify; text-justify: inter-word; font-size:1rem;">Mr. Giang has more than 10 years of experience working with various governmental organizations in the areas of: community development, environment and climate change, small credit savings, HIV/AIDS program, care public health care, connecting science with the public, building coordination and connecting resources for psychosocial emergency assistance activities and social support services in the context of epidemics, In addition, he is a consultant, research and development program for training and practicing social work in the medical field. Including multidisciplinary team work, psychotherapy groups to promote the process of comprehensive recovery for patients. Specialized subjects he is teaching for several schools: case management in social work, hospital social work and skills for medical staff. He participated in teaching professional training courses for medical staff in a number of places such as Ninh Thuan, Ho Chi Minh City, and the southern provinces.</p>
                    </div>
                </div>
        `;
    })
    $('#pgd').html(html)
    $(".loader-wrapper").fadeOut("slow");
}

function executeDataInformationMember(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh } = response;
        return `
        <div class="item">
        <a href="../Biography/index.html?slug=${FullName}">
        <div class="col-lg-4">
            <div class="card mb-4 rounded-3 shadow-sm"
                style="background-color: #F6F6F6;border-radius: 1.875rem;width:320px;">
                <div class="py-3">
                    <img src="${Hinhanh[2].ImagePortfolio}"
                        style="width: 300px;height:300px;border-radius: 50%;margin-left:0.5rem;object-fit:cover">
                </div>
                <div class="card-body">
                <h4 style="color:black" class="card-title pricing-card-title font-weight-bold text-center">${FullName}</h4>
                <div class="py-2" style="background-color: #E5E5E5;">
                    <p class="text-blue-scse text-center mt-3">${Position}</p>
                </div>
                </div>
            </div>
        </div>
        </a>
    </div>
        `;
    })
    $('#members').html(html)
    var $owl = $('#members');
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
    $(".loader-wrapper").fadeOut("slow");
}
