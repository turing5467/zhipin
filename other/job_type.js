//左
var left = $('.position-category-wrap li')
var arr = [];
for(let i = 1;i<left.length;i++) {
    arr.push(left.eq(i).text())
}

//右
var right = $('.position-list-wrap span')
arr = []
for (let i = 0; i < right.length; i++) {
    arr.push(right.eq(i).text()) 
}