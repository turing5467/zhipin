export function randomNumber(n1, n2) {
    //randomNumber(5,10)
    //返回5-10的随机整数，包括5，10
    return Math.floor(Math.random() * (n2 - n1 + 1) + n1);
}

export function hasClass(ele, className) { 
    return ele.className.indexOf(className) !== -1
 }

export function addClass(ele, className) { 
    // let index = 
    className += ' '
    if(ele.length) {
        ele.forEach(e => {
            if(!hasClass(e,className)) {
                e.className += className
            }
        })
    }else {
        ele.className += ' '+className
    }
}

export function removeClass(ele, className) { 
    //如果ele是数组
    if(ele.length) {
        ele.forEach(e => {
            if(hasClass(e,className)){
                e.className = e.className.replace(className, '');
            }
        })
    }else {
        ele.className = ele.className.replace(className, '');
    }
}

export function toggleClass(ele, className) { 
    
    if(ele.length) {
        ele.forEach(e => {
            if(hasClass(e, className)) {
                removeClass(e,className)
            }else {
                addClass(e,className)
            }
        })
    }else {
        if(hasClass(ele, className)) {
            removeClass(ele,className)
        }else {
            addClass(ele,className)
        }
    }
 }

 export function getGapTime(start, end) {
    var startDate = new Date(start); //开始时间，当前时间
    var endDate = new Date(end); //结束时间，需传入时间参数
    var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return { d: d, h: h, m: m, s: s };
}