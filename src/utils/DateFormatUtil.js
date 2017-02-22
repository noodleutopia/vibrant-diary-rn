export var dateTimeHelper = (function () {
  function init() {
    return {
      now: function () {
        return new Date();
      },
      format: function (date) {
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
      },
      xingqi: function (date) {
        let xingqi = '';
        switch(date.getDay()) {
          case 0:xingqi="星期日";break; 
          case 1:xingqi="星期一";break; 
          case 2:xingqi="星期二";break; 
          case 3:xingqi="星期三";break; 
          case 4:xingqi="星期四";break; 
          case 5:xingqi="星期五";break; 
          case 6:xingqi="星期六";break; 
          default:xingqi="系统错误！" 
        }
        return xingqi;
      }
    }
  }
  var instance = null;
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  }
})();
console.log(dateTimeHelper.getInstance().now())