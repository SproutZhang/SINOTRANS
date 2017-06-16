/**
 * Created by john on 2017/6/15.
 */
$(function(){

    queryDN();
    $("#queryOnline").click(function(){
        queryDN();
    });

    function queryDN(num){
        $.showLoading();
        $.ajax({
            type :"post",
            url:"../../json/reservation-online.json",
            dataType:"json",
            data: {
                num:num
            },
            success:function(data){
                var ulObj = $("#onlineData");
                ulObj.empty();
                $(data.list).each(function(index,obj){
                    var html = $("<li>" +
                        "<div class='info-l fl'>"+
                        "<p><strong>DN号："+obj.DNnum+"</strong></p>"+
                        "<p>集货交期：<span>"+obj.date+"</span></p>"+
                        "<p>仓库：<span>"+obj.place+"</span></p>"+
                        "</div>"+
                        "<div class='info-r fl'>"+
                        "<p>供应商：<span>"+obj.supplier+"</span></p>"+
                        "<p>预约时段：<span>"+obj.time+"</span></p>"+
                        "<p>状态：<span>"+obj.status+"</span></p>"+
                        "</div>" +
                        "</li>");

                    ulObj.append(html);
                });

                $.hideLoading();

            },error:function(){
                $.hideLoading();
                $.toast("数据加载失败", "cancel");
            }

        });


    }
});