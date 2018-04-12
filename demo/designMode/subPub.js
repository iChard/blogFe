
/**
 * 发布订阅模式
 */
var EventCenter = (function(){
    var events = {};
    /*
    {
      my_event: [{handler: function(data){xxx}}, {handler: function(data){yyy}}]
    }
    */
    // 绑定事件 添加回调
    function on(evt, handler){
        events[evt] = events[evt] || [];
        events[evt].push({
            handler:handler
        })
    }
    function fire(evt, arg){
        if(!events[evt]){
            return 
        }
        for(var i=0; i < events[evt].length; i++){
            events[evt][i].handler(arg);
        }
    }
    function off(evt){
        delete events[evt];
    }
    return {
        on:on,
        fire:fire,
        off:off
    }
}());

var number = 1;
EventCenter.on('click', function(data){
    console.log('click 事件' + data + number++ +'次');
});
EventCenter.off('click');   //  只绑定一次
EventCenter.on('click', function(data){
    console.log('click 事件' + data + number++ +'次');
});

EventCenter.fire('click', '绑定');
