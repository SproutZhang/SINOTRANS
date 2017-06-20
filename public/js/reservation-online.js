/**
 * Created by john on 2017/6/15.
 */
$(function() {
    /*tab栏样式*/
    $('#tab3').tab({defaultIndex: 0, activeClass: "tab-blue"});

    var url1 = '../../json/reservation-online.json';
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
    $("#push").click(function () {
        queryDN(url2);
    });
    $("#noPush").click(function () {
        queryDN(url3);
    });

    function queryDN(url) {

        //$.showLoading();
        var page = 0;
        // 每页展示10个
        var size = 10;
        $('.appointment-info').dropload({
            scrollArea: window,
            autoLoad: true,//自动加载
            domDown: {//上拉
                domClass: 'dropload-down',
                //domRefresh: '<div class="dropload-refresh f15 "><i class="icon icon-20"></i>上拉加载更多</div>',
                domLoad: '<div class="dropload-load f15"><span class="weui-loading"></span>正在加载中...</div>',
                domNoData: '<div class="dropload-noData">没有更多数据了</div>'
            },
            loadDownFn: function (me) {//加载更多
                page++;
                window.history.pushState(null, document.title, window.location.href);
                $.ajax({
                    type: 'GET',
                    url: url + '?page=' + page + '&size=' + size,
                    success: function (data) {
                        console.log(data);
                        var ulObj = $("#onlineData");
                        
                        var arrLen = data.list.length;
                        if(arrLen > 0){
                            $(data.list).each(function (index, obj) {
                                var html = $("<li class='clearfix'>" +
                                    "<div class='info-l fl'>" +
                                    "<p><strong>DN号：" + obj.DNnum + "</strong></p>" +
                                    "<p>集货交期：<span>" + obj.date + "</span></p>" +
                                    "<p>仓库：<span>" + obj.place + "</span></p>" +
                                    "</div>" +
                                    "<div class='info-r fl'>" +
                                    "<p>供应商：<span>" + obj.supplier + "</span></p>" +
                                    "<p>预约时段：<span>" + obj.time + "</span></p>" +
                                    "<p>状态：<span>" + obj.status + "</span></p>" +
                                    "</div>" +
                                    "</li>");
                                // 为了测试，延迟1秒加载
                                ulObj.append(html);


                            });
                            // 如果没有数据
                        }else{
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                        }

                        // 每次数据加载完，必须重置
                        me.resetload();
                        
                        
                    }, error: function () {
                        
                        $.toast("数据加载失败", "cancel");
                        me.resetload();
                    }
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


            }
        });
    }
});
