/**
 * Created by john on 2017/6/9.
 */
$(function(){
    /*日期选择*/
    $("#dateStart").datetimePicker({title:"选择日期",m:1});
    $("#dateEnd").datetimePicker({title:"选择日期",m:1}); 
    $("#dateQuery").datetimePicker({title:"选择日期",m:1}); 
    $(".reservation-date").datetimePicker({title:"选择日期",m:1});
    $("#timeInterval").picker({title:"选择时间",
        cols: [
            {
                textAlign: 'center',
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })()

            },
            {
                textAlign: 'center',
                values:":"

            },
            {
                textAlign: 'center',
                values:  (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            },{
                textAlign: 'center',
                values:"-"
            },
            {
                textAlign: 'center',
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })()

            },
            {
                textAlign: 'center',
                values:":"

            },
            {
                textAlign: 'center',
                values:  (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]});
});