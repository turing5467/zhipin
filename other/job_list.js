var list = $('.job-list>ul>li')
var arr = [];
for(let i =0;i<list.length;i++) {
    let o = {};
    let item = list.eq(i);

    o.jobCode = item.find('.primary-box').data('jid')
    o.jobName = item.find('.job-name').text();
    o.jobArea = item.find('.job-area').text();
    o.salary = item.find('.job-limit .red').text();
    
    o.experience = item.find('.job-limit p').contents()[0].textContent;
    o.eduBG = item.find('.job-limit p').contents()[2].textContent;
    o.contact = item.find('.info-publis h3').contents()[1].textContent
    o.contactPost = item.find('.info-publis h3').contents()[3].textContent
    o.contactCode = item.find('.btn-startchat').eq(0).attr('redirect-url').slice(18);

    o.jobTags = [];
    let tags = item.find('.tags .tag-item')
    for(let j=0;j<tags.length;j++) {
        o.jobTags.push(tags[j].innerHTML)
    }
    
    // o.jobTags = tags.map(ele => ele.innerHTML)

    o.companyCode = item.find('.company-text .name a').eq(0).attr('href').slice(8,-5);
    o.companyName = item.find('.company-text .name a').text();
    o.companyType = item.find('.company-text p').contents()[0].textContent
    o.companyFinance = item.find('.company-text p').contents()[2].textContent
    o.companyScale = item.find('.company-text p').contents()[4].textContent
    //
    o.companyLogo = item.find('.company-logo').attr('src');
    o.companyBenefit = item.find('.info-desc').text();

    arr.push(o);
}