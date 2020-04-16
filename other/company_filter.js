var rows = $('.filter-row');
var arr = [];
for(let i = 0;i<rows.length;i++){
    var o = {}
    var row = rows.eq(i);

    o.title = row.find('.title').text();
    o.options = [];
    let contents = row.find('.content a');
    for(let j =0;j<contents.length;j++) {
        o.options.push(contents.eq(j).text())
    }

    arr.push(o);
}
JSON.stringify(arr)