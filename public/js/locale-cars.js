/**
 * Created by john on 2017/6/16.
 */
$(function(){

    /*清空*/
    $("#clearALL").on("click",function(){
       $("#inputQuery").val('');
        $("#firstHouse").attr('selected','selected');
    });
    
    

    var aObj = $("#searchHouse").find("a");
    aObj.each(function(){
        $(this).on('click',function(){
            $("#menu_1").hide();
            $("#cell_1").addClass("icon-74");
            $("#replaceInfo").html("当前查看：");
            $("#selectInfo").html($(this).html()).show();

        });

    });

    $("#queryOrder").click(function(){
        var val =$("#inputQuery").val();
        var sle = $("#selectInfo").html();
        if(val == "" && sle== ""){
            $.alert("请输入或选择查询条件");
            return;
        }else{
            queryCars();
        }


    });

    function queryCars(){
        $.showLoading();
        $.ajax({
            type : "get",
            url : "../../json/locale-cars.json?t="+new Date(),
            dataType : "json",
            success : function(data){
                $(data.list).each(function(index,obj){
                    $("#queryResults").empty();
                    var html = $("<div class='query-results'>"+
                        "<h3>查询结果</h3>"+
                        "<ul>"+
                        "<li>预约时段：<span>"+obj.time+"</span></li>"+
                        "<li>实际到达：<span>"+obj.arrive+"</span></li>"+
                        "<li>到达状态：<span class='order-s'>"+obj.status+"</span></li>"+
                        "</ul>"+
                        "</div>"+
                        "<div class='carlist-num'>"+
                        "<img src='../../public/images/house.png'>"+
                        "<p>当前排队数量： <strong>"+obj.num+"</strong>辆车</p>"+
                        "</div>");


                    $("#queryResults").append(html);

                });
                $.hideLoading();

                if($(".order-s").html() == "准时"){
                    $(".order-s").css("background","green");

                }else if($(".order-s").html() == "延误"){

                    $(".order-s").css("background","#d9534f");
                }

            },
            error:function(){
                $.hideLoading();
                $.toast("数据加载失败", "cancel");
            }

        });

    }

});