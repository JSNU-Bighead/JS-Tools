//日历面板生成方法
let curDate = new Date(),
    curYear = curDate.getFullYear(),
    year = curDate.getFullYear(),
    curMonth = curDate.getMonth(),
    month = curDate.getMonth();
//获取当月第一天
let getWeekNumFn = function(year,month){
    let date = new Date(year,month);
    return new Date(date.setDate(1));
};
//获取当月最后一天
let getLastDateFn = function(year,month){
    let date = new Date(year,month),
    currentMonth = date.getMonth(),
    nextMonth = ++currentMonth,
    nextMonthFirstDay = new Date(date.getFullYear(),nextMonth,1),
    oneDay = 1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
};
//当月日期
let curMonthFn = function () {
    let calendarDateList = [];
    let lastMonthLength = getWeekNumFn(year,month).getDay(),
        curMonthLength = getLastDateFn(year,month).getDate(),
        dateList = [];
    //本月的日期
    for (let i = 0; i < curMonthLength; i++){
        let curDay = new Date().getDate()-1;
        if(i == curDay && year == curYear && month == curMonth){
            dateList.push({
                isValid: true,
                isCurDay: true,
                date: i+1
            })
        } else {
            dateList.push({
                isValid: true,
                isCurDay: false,
                date: i+1
            })
        }
    };
    //前面插入上月的日期
    for(let i = 0; i < lastMonthLength; i++){
        let oneDay = 1000*60*60*24,
        date = new Date(getWeekNumFn(year,month).getTime() - (i+1)*oneDay).getDate();
        dateList.unshift({
            isValid: false,
            isCurDay: false,
            date: date
        })
    };
    //默认日历面板6行，共6*7个日期
    let nextMonthLength = 6*7 - dateList.length;
    //后面追加下个月的日期
    for(let i = 0; i < nextMonthLength; i++){
        dateList.push({
            isValid: false,
            isCurDay: false,
            date: i+1
        })
    };
    //数组分成每6个小数组，每个7个元素
    for(let i = 0,len = dateList.length; i < len; i += 7){
       calendarDateList.push(dateList.slice(i,i+7));
    }
    return calendarDateList;
};
//前一个月
let preMonthFn = function () {
    month--;
    if(month<1){//已经退到前一年
        month = 11;//月是从0-11
        year--;
    }
    return curMonthFn();
};
//后一个月
let nextMonthFn = function() {
    month++;
    if(month>11){//已经前进到一年
        month = 0;//月是从0-11
        year++;
    }
    return curMonthFn();
};

let calendar = {
    preMonthFn: preMonthFn,
    curMonthFn: curMonthFn,
    nextMonthFn: nextMonthFn
}

export default calendar;