var cs = $('.industry-panel .industry-item');
var arr = [];
for(let i = 0; i< cs.length;i++) {
    var o = {};
    var c = cs.eq(i);
    o.label = c.find('.industry-category').text();
    o.list = [];
    var items = c.find('.industry-category-item span');
    for(let j = 0;j<items.length;j++) {
        let item = items.eq(j);
        o.list.push(item.text())
    }
    arr.push(o);
}
console.log(arr);
