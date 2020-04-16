var o = {};
o.code = document.location.pathname.slice(12,-5)
o.status = $('.job-status').text();
o.name = $('.info-primary .name h1').text();
o.salary = $('.info-primary .name span').eq(0).text();
o.city = $('.info-primary p').contents()[0].textContent;
o.experience = $('.info-primary p').contents()[2].textContent;
o.eduBG = $('.info-primary p').contents()[4].textContent;
o.tags = Array.from($('.tag-container:eq(0)>.job-tags span'), e => $(e).text())
o.tag_more = Array.from($('.tag-container:eq(0) .tag-all span'), e => $(e).text())
var contact = {};
contact.figure = $('.detail-figure img').eq(0).attr('src')
contact.name = $('.detail-op .name').eq(0).text();
contact.post = $('.detail-op .gray').contents()[0].textContent.trim();
contact.status = $('.detail-op .gray').contents()[2].textContent.trim();
o.contact = contact;
o.desc = $('.job-sec .text').html()
o.companyCode = $('.company-info .look-all').eq(0).attr('href').slice(8,-5)
o.companyLink = $('.sider-company p').eq(4).text()
JSON.stringify(o)