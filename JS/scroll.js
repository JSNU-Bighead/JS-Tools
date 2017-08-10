var scrollFn_Y = function (selector,scrollTop,time){//滚动元素，滚动目标位置，滚动时长
    var element = documnet.querySelector(selector);
    //TODO 判断滚动方向
    var goingDown = false;
    var curScollTop = element.scrollTop;
    if(curScollTop == scrollTop) return;
    if(curScollTop < scrollTop) {
        goingDown = true;
    } else {
        goingDown = false;
    }
    //TODO 滚动步长
    var length = Math.abs(curScollTop - scrollTop);
    var step = Math.floor(length/time*10);
    
}
var runFn = function(element,direction,type,step,final){//滚动方向-false(上，左) ，scrollTop/scrollleft , 滚动目标位置
    setTimeout(function(direction,type,final){
        if(direction){//向下/向右
            element[type] += step;
            if((element[type] + step) < final){
                runFn(element,direction,type,step,final)
            } 
            if (element[type] < final && (element[type] + step) > final){
                var lastStep = final - element[type];
                runFn(element,direction,type,lastStep,final)
            } 
            if( element[type] >= final) {
                return;
            }
        } else {
            element[type] -= step;
        }
    },10)
}