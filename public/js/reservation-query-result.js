/**
 * Created by john on 2017/6/19.
 */
$(function(){

    queryResult();


    function queryResult(){
        $.showLoading();
        //添加列表的li个数
        var liNum;
        $.ajax({
            type:'get',
            url:'../../json/reservation-query-result.json',
            dataType:'json',
            success:function(data){
                var showBox = $("#showBox");
                showBox.empty();
                $(data.list).each(function(index,obj){
                    var html = $("<li>"+
                        "<div class='info-l fl'>"+
                        "<p class='VOBnum'><strong>VOB号："+obj.VOBnum+"</strong></p>"+
                        "<p>物料号：<span>"+obj.goodsNum+"</span></p>"+
                        "<p>箱数：<span>"+obj.boxNum+"</span></p>"+
                        "</div>"+
                        "<div class='info-c fl'>"+
                        "<p>PO号：<span>"+obj.POnum+"</span></p>"+
                        "<p>件数：<span>"+obj.number+"</span></p>"+
                        "</div>"+
                        "<div class='info-r fr'>"+
                        "<span class='minus'>-</span>"+
                        "<span class='puls'>+</span>"+
                        "</div>"+
                        "</li>");

                    showBox.append(html);
                    $.hideLoading();
                });

                /*列表减去*/
                function listMinus(){
                    $(".list-minus").click(function(){
                        $(this).parent().remove();
                        liNum = $("#selectedShow li").length;
                        $(".J-shoping-num").html(liNum);

                        var listVal = $(this).parent().find("strong").html();
                        var vals = $(".VOBnum strong");
                        $(vals).each(function(i,o){
                            var invals = $(o).html();
                            if(listVal == invals){
                                $(o).parent().parent().parent().find(".minus").hide();
                                $(o).parent().parent().parent().find(".puls").css("background","#74baf3").bind("click",function(){
                                    $(this).css("background","#ccc").unbind();
                                    $(this).parent().find(".minus").show();
                                    var sinfo = $(this).parent().parent().find(".VOBnum").html();
                                    $("#selectedShow").append("<li>"+sinfo+"<span class='list-minus'>-</span></li>");
                                    liNum = $("#selectedShow li").length;
                                    $(".J-shoping-num").html(liNum);
                                    listMinus();
                                });
                            }
                        });
                    })
                }

                $(".minus").hide();
                /*添加*/
                $(".puls").click(function(){
                    $(this).css("background","#ccc").unbind();
                    $(this).parent().find(".minus").show();
                    var sinfo = $(this).parent().parent().find(".VOBnum").html();
                    $("#selectedShow").append("<li>"+sinfo+"<span class='list-minus'>-</span></li>");
                    liNum = $("#selectedShow li").length;
                    $(".J-shoping-num").html(liNum);
                    /*列表减去*/
                    listMinus();


                });
                /*减去*/
                $(".minus").click(function(){
                    $(this).hide();
                    //当前的VOB号
                    var strong = $(this).parent().parent().find(".VOBnum strong").html();
                    var val = $("#selectedShow li strong");
                    $(val).each(function(i,obj){
                        var inval = $(this).html();
                        if(inval == strong){
                            $(obj).parent().remove();
                        }
                        liNum = $("#selectedShow li").length;
                        $(".J-shoping-num").html(liNum);
                    });

                    //还原+样式和点击事件
                    $(this).parent().find(".puls").css("background","#74baf3").bind("click",function(){
                        $(this).css("background","#ccc").unbind();
                        $(this).parent().find(".minus").show();
                        var sinfo = $(this).parent().parent().find(".VOBnum").html();
                        $("#selectedShow").append("<li>"+sinfo+"<span class='list-minus'>-</span></li>");
                        liNum = $("#selectedShow li").length;
                        $(".J-shoping-num").html(liNum);
                        listMinus();


                    });

                });
                /*清空*/
                $("#clearAll").click(function(){
                    $("#selectedShow").empty();
                    liNum = $("#selectedShow li").length;
                    $(".J-shoping-num").html(liNum);
                    $(".minus").hide();
                    $(".puls").css("background","#74baf3").bind("click",function(){
                        $(this).css("background","#ccc").unbind();
                        $(this).parent().find(".minus").show();
                        var sinfo = $(this).parent().parent().find(".VOBnum").html();
                        $("#selectedShow").append("<li>"+sinfo+"<span class='list-minus'>-</span></li>");
                        liNum = $("#selectedShow li").length;
                        $(".J-shoping-num").html(liNum);
                        /*列表减去*/
                        listMinus();
                    });
                    $(".selected-list").hide();

                });


                /*动画*/
                $(".selected-list").hide();
                $("#watch").click(function(){
                    if($(".J-shoping-num").html()==0){
                        $(".selected-list").hide();
                    }else{
                        $(".selected-list").toggle();
                    }
                });

                /*提交*/
                $("#submit").click(function(){
                    if($(".J-shoping-num").html()==0){
                        $.alert("请选择预约单号");
                    }else{
                        $.alert("提交成功");
                        location.href='../personal-center/my-reservation.html';
                    }
                });

            },error: function(){
                $.hideLoading();
                $.toast("数据加载失败", "cancel");
            }
        });



    }


});