var o = {};
o.code = window.location.pathname.slice(8,-5);
o.logo = $('.info-primary img').eq(0).attr('src');
o.name = $('.info-primary .info .name').eq(0).text();
o.finance = $('.info-primary p').contents()[0].textContent;
o.scale = $('.info-primary p').contents()[2].textContent;
o.industry = $('.info-primary p').contents()[4].textContent;
o.job_count = $('.company-stat span a b').text();
o.boss_count = $('.company-stat span>b').text();
o.hot_jobs = [];
var jobs = $('.company-hotjob ul li');
for(let i = 0;i<jobs.length;i++) {
    var oo ={};
    var job = jobs.eq(i);
    oo.name = job.find('.name b').text();
    oo.salary = job.find('.salary').text();
    oo.code = job.find('a').eq(0).attr('href').slice(12,-5);
    oo.info = job.find('.gray').text().split('·');
    o.hot_jobs.push(oo)
}
o.desc = $('.detail-content .text.fold-text').html();
o.business = {};
o.business.LAR = $('.business-detail li').eq(0).contents()[1].textContent;
o.business.registered_capital = $('.business-detail li').eq(1).contents()[1]?$('.business-detail li').eq(1).contents()[1].textContent:'';
o.business.regiater_date = $('.business-detail li').eq(2).contents()[1]?$('.business-detail li').eq(2).contents()[1].textContent:'';
o.business.type = $('.business-detail li').eq(3).contents()[1]?$('.business-detail li').eq(3).contents()[1].textContent: '';
o.business.status = $('.business-detail li').eq(4).contents()[1]?$('.business-detail li').eq(4).contents()[1].textContent:'';
o.business.address = $('.business-detail li').eq(5).contents()[1].textContent;
o.business.credit_code = $('.business-detail li').eq(6).contents()[1].textContent;
o.business.scope = $('.business-detail li').eq(7).contents()[1].textContent;
o.products = []
if($('.company-products').length>0) {
    let products = $('.company-products ul li')
    for(let i = 0;i<products.length;i++) {
        let oo = {}
        let product = products.eq(i)
    oo.img = product.find('.figure img').eq(0).attr('src');
    oo.name = product.find('.name a').contents()[0].textContent.trim();
    oo.desc = product.find('.name a').contents()[2].textContent.trim();
    oo.link = product.find('.gray').text();
    o.products.push(oo)
    }
    
}
o.managers = [];
o.envirenment = [];

var managers = $('.manager-inner li');
for(let i =0;i<managers.length;i++) {
    let oo = {};
    let manager = managers.eq(i)
    oo.pic = manager.find('.info-user img').eq(0).attr('src');
    oo.name = manager.find('.name').text();
    oo.job = manager.find('.job-title').text();
    oo.desc = manager.find('.text').html();
    o.managers.push(oo)
}

var envirenments = $('.slider-main ul li');
for(let i = 0;i<envirenments.length;i++) {
    let oo = {};
    o.envirenment.push(envirenments.eq(i).find('img').eq(0).attr('src'))
}

o.address = $('.location-address').eq(0).text();
o.addressImg = $('.map-container.js-open-detail img').eq(0).attr('src')
// console.log(o);
JSON.stringify(o)
