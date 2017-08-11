var scrollFn_Y = function (selector,scrollTop,time){//滚动元素，滚动目标位置，滚动时长
    var element = document.querySelector(selector);
    //判断滚动方向
    var goingDown = false;
    var curScollTop = element.scrollTop;
    if(curScollTop == scrollTop) return;
    if(curScollTop < scrollTop) {
        goingDown = true;
    } else {
        goingDown = false;
    }
    //步长
    var length = Math.abs(curScollTop - scrollTop);
    var step = Math.floor(length/time*10) || 1;//最小1
    step = step > length ? length : step;//最大总长度
    runFn(element,goingDown,'scrollTop',step,scrollTop)
}
var scrollFn_X = function (selector,scrollLeft,time){//滚动元素，滚动目标位置，滚动时长
    var element = document.querySelector(selector);
    //判断滚动方向
    var goingDown = false;
    var curScollLeft = element.scrollLeft;
    if(curScollLeft == scrollLeft) return;
    if(curScollLeft < scrollLeft) {
        goingRight = true;
    } else {
        goingRight = false;
    }
    //步长
    var length = Math.abs(curScollLeft - scrollLeft);
    var step = Math.floor(length/time*10) || 1;//最小1
    step = step > length ? length : step;//最大总长度
    runFn(element,goingRight,'scrollLeft',step,scrollLeft)
}
var runFn = function(element,direction,type,step,final){//滚动元素，滚动方向-false(上，左) ，scrollTop/scrollleft , 滚动目标位置
    if(direction){//向下/向右
        element[type] += step;
        if((element[type] + step) < final){
            setTimeout(function(){
                runFn(element,direction,type,step,final)
            },10)
        } 
        if (element[type] < final && (element[type] + step) > final){
            setTimeout(function(){
                var lastStep = final - element[type];
                runFn(element,direction,type,lastStep,final)
            },10)
        } 
        if(element[type] >= final) {
            return;
        }
    } else {
        element[type] -= step;
        if((element[type] - step) > final){
            setTimeout(function(){
                runFn(element,direction,type,step,final)
            },10)
        } 
        if (element[type] > final && (element[type] - step) < final){
            setTimeout(function(){
                var lastStep = element[type] - final;
                runFn(element,direction,type,lastStep,final)
            },10)
        } 
        if(element[type] <= final) {
            return;
        }
    }
}
window.scrollFn_Y = scrollFn_Y;
window.scrollFn_X = scrollFn_X;