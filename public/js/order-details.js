/**
 * Created by john on 2017/6/14.
 */
$(function(){

    orderQuery();
   $("#orderQuery").on('click',(function(){
       orderQuery();
   }));


    function orderQuery(orderNum){
        $.showLoading();
        $.ajax({
            type : "get",
            url : "../../json/order-details.json?time="+ new Date(),
            dataType : "text",
            data :{
                orderNum:orderNum
            },
            success : function(data){
                var objList = JSON.parse(data);
                var showData = $("#orderDetailsShow");
                showData.empty();
                $(objList.list).each(function(index,obj){
                    var html = $("<li>"+
                        "<h3>编号：<span>"+obj.number+"</span></h3>"+
                        "<div class='status1'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "<div class='status2'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "<div class='status3'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "<div class='status4'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "<div class='status5'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "<div class='status6'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "<div class='status7'><span ></span><i></i><img src='../../public/images/yes.png' class='hide'></div>"+
                        "</li>");
                        showData.append(html);

                        var status = obj.status;

                        for( var i=1; i<=status;i++){
                            html.find(".status"+i+" span").addClass("current-bgc");
                            html.find(".status"+i+" img").removeClass("hide");
                        }

                })
                $.hideLoading();

            },
            error : function(){
                $.hideLoading();
                $.toast("数据加载失败", "cancel");
            }

        })
    }



});