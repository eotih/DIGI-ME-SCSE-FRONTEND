const WEB_API = "https://api.scse-vietnam.org/";

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
            else {
                executeDataInformationGiamDocEN(GiamDoc)
            }
            const Slave = response.filter(v => v.Position !== "Phó Giám Đốc" && v.Position !== "Giám Đốc")
            executeDataInformationMember(Slave)

            const PhoGiamDoc = response.filter(v => v.Position === "Phó Giám Đốc")
            if (numb === 1) {
                executeDataInformationPhoGiamDoc(PhoGiamDoc)
            }
            else {
                executeDataInformationPhoGiamDocEN(PhoGiamDoc)
            }
        })
}
function executeDataInformationGiamDoc(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh, Image1, Image2, Image3 } = response;
        // Lấy hình ảnh đưa vào slide
        document.getElementById('picgd1').src = Image1;
        document.getElementById('picgd2').src = Image2;
        document.getElementById('picgd3').src = Image3;
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
        console.log(response)
        const { Details, FullName, Position, Image1, Image2, Image3 } = response;
        document.getElementById('pic01').src = Image1;
        document.getElementById('pic02').src = Image2;
        document.getElementById('pic03').src = Image3;
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
        const { Details, FullName, Position, Image1, Image2, Image3 } = response;
        // Lấy hình ảnh đưa vào slide
        document.getElementById('picgd1').src = Image1
        document.getElementById('picgd2').src = Image2;
        document.getElementById('picgd3').src = Image3;
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
        const { Details, FullName, Position, Image1, Image2, Image3 } = response;
        document.getElementById('pic01').src = Image1;
        document.getElementById('pic02').src = Image2;
        document.getElementById('pic03').src = Image3;
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
const Volunteers = [
    {
        id: 1,
        name: 'Nguyễn Thị Việt Anh',
        team: 'Team Branding',
        image: 'https://f40-zpg.zdn.vn/6114280782338152239/c49d4aed539e9bc0c28f.jpg'
    },
    {
        id: 2,
        name: 'Nguyễn My Uyên Phương',
        team: 'Team Branding',
        image: 'https://f36-zpg.zdn.vn/3993298337383799840/5d15ad88befb76a52fea.jpg'
    },
    {
        id: 3,
        name: 'Nguyễn Tấn Đạt',
        team: 'Team Branding',
        image: 'https://f41-zpg.zdn.vn/1315755625838798095/49a243865df595abcce4.jpg'
    },
    {
        id: 4,
        name: 'Mai Trịnh Phương Anh',
        team: 'Team Branding',
        image: 'https://f38-zpg.zdn.vn/2081012970956196884/5a6c6c93b1e079be20f1.jpg'
    },
    {
        id: 5,
        name: 'Đào Quốc Bảo',
        team: 'Team Website',
        image: 'https://media.discordapp.net/attachments/866169329987878932/903528129258217513/image1-removebg-preview_1.png'
    },
    {
        id: 6,
        name: 'Trần Thanh Tú',
        team: 'Team Website',
        image: 'https://media.discordapp.net/attachments/866169329987878932/903527941013639179/image0-removebg-preview_4.png'
    },
    {
        id: 7,
        name: 'Lê Trọng Hiếu',
        team: 'Team Website',
        image: 'https://drive.google.com/uc?export=view&id=18pSp_6Fh83ZkS868KZloH6vHjHsWmoFe'
    },
    {
        id: 8,
        name: 'Nguyễn Tân Mỹ',
        team: 'Team Website',
        image: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/96241891_2687675991477300_589109310731059200_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=CsF24aa7u4EAX_WfSYd&_nc_ht=scontent.fsgn5-5.fna&oh=ea0712fb3a227463d44a5e050ca9a2b6&oe=61A0955E'
    },
    {
        id: 9,
        name: 'Nguyễn Duy Thành',
        team: 'Team Website',
        image: 'https://cdn.discordapp.com/attachments/853145810846089227/910421834678284348/z2886921354563_2bc90f68d4d660e848dd47c76cefc1f7.jpg'
    },
]
const getThongTin = () => {
    const html = Volunteers.map(volunteer => {
        return `
        <div class="item">
                    <div class="col-lg-4">
                        <div class="card mb-4 rounded-3 shadow-sm"
                            style="background-color: #F6F6F6;border-radius: 1.875rem;width:320px;">
                            <div class="pt-3">
                                <img src="${volunteer.image}"
                                    style="width: 300px;height:400px;border-radius: 1.875rem;margin-left:0.5rem;object-fit:cover;">
                            </div>
                            <div class="card-body">
                            <h5 style="color:black" class="card-title pricing-card-title font-weight-bold text-center">${volunteer.name}</h5>
                            <div class="py-2" >
                                <p class="text-blue-scse text-center mt-3">Thực tập sinh</p>
                            </div>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
        `
    }).join('')
    $('#volunteers').html(html)
}
getThongTin()
function executeDataInformationMember(input) {
    const html = input.map(function (response) {
        const { Details, FullName, Position, Hinhanh, Image1 } = response;
        return `
        <div class="item">
        <a href="../Biography/index.html?slug=${FullName}">
        <div class="col-lg-4">
            <div class="card mb-4 rounded-3 shadow-sm"
                style="background-color: #F6F6F6;border-radius: 1.875rem;width:320px;">
                <div class="py-3">
                    <img src="${Image1}"
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
