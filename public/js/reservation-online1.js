/**
 * Created by john on 2017/6/15.
 */
$(function() {
    /*tab栏样式*/
    $('#tab3').tab({defaultIndex: 0, activeClass: "tab-blue"});

    var url1 = "../../json/reservation-online.json";
    var url2 = "../../json/reservation-online1.json";
    var url3 = "../../json/reservation-online2.json";
    queryDN(url1);
    $("#queryOnline").click(function () {
        if ($("#queryOnlineNum").val() == "") {
            $.alert("请输入您要查询的DN号");
            return;
        }
        queryDN(url1);
    });

    $("#all").click(function () {
        queryDN(url1);
    });
    /*$("#push").click(function () {
        queryDN(url2);
    });
    $("#noPush").click(function () {
        queryDN(url3);
    });*/


    var params={
        page:1,
        pageSize:6
    }

    function queryDN(url) {
        $.ajax({
            type :"get",
            url:url,
            dataType:"json",
            data:params,
            beforeSend:function(){
                //发送之前，我往这个btn 按钮上面添加一个loading样式
                $(".btn").html("正在加载中");
                $(".btn").addClass("loading");

            },

            success:function(data){
                var ulObj = $("#onlineData");

                $(data.list).each(function(index,obj){
                    var html = $("<li class='clearfix'>" +
                        "<div class='info-l fl'>"+
                        "<p>DN号："+obj.DNnum+"</p>"+
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
                $(".btn").html("已加载完毕");
                $(".btn").removeClass("loading");


                //$.hideLoading();

            },error:function(){
                $.hideLoading();
                $.toast("数据加载失败", "cancel");
            }

        });

    };

    $(window).on("scroll",function(){

        //获取到top 距离顶部的高度
        var top=$(".appointment-info").offset().top;

        //获取到items 的高度.
        var itemHeight=$(".appointment-info").height();

        //获取到浏览器的高度
        var winheight=$(this).height();

        //获取滚动条距离滚动顶部的高度.
        var scrollTop=$(this).scrollTop();

        var height=top+itemHeight-winheight-scrollTop;

        if(height<200 && !$(".btn").hasClass("loading")){
            queryDN(url1);
        }
    });
});
/*$.ajax({
 type :"get",
 url:url,
 dataType:"json",
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

 });*/
