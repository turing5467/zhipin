var cpns = $('.company-list li');
var arr = [];
for(let i =0;i<cpns.length;i++) {
    var o = {};
    var cpn = cpns.eq(i)

    o.code = cpn.find('.company-info').eq(0).attr('href').slice(8,-5)
    o.logo = cpn.find('img').eq(0).attr('src')
    o.name = cpn.find('.conpany-text h4').text();
    o.finance = cpn.find('.conpany-text p').contents().length>2?cpn.find('.conpany-text p').contents()[0].textContent:'';
    o.industry = cpn.find('.conpany-text p').contents().length>2?cpn.find('.conpany-text p').contents()[2].textContent:cpn.find('.conpany-text p').contents()[0].textContent
    o.hot_job_code = cpn.find('.about-info') .eq(0).attr('href').slice(12,-5);
    o.hot_job_name = cpn.find('.about-info .h').text();
    o.hot_job_salary = cpn.find('.about-info p').contents()[2].textContent;


    arr.push(o);
}
JSON.stringify(arr)
