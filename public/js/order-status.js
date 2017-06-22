/**
 * Created by john on 2017/6/9.
 */
$(function(){

    /*清空*/
    $("#clearDate").on("click",function(){
        $(".date-seleted").val('');
    });

    
	queryOrderStatus();
    /*查询*/
    $(document).on("click", "#showLoading", function() {
    	queryOrderStatus();
    });

    
    function queryOrderStatus(){
    	var start = $("#dateStart").val();
        var end = $("#dateEnd").val();
        var sta_date = new Date(start);
        var end_date = new Date(end);
        var num = (end_date-sta_date)/(1000*3600*24); //天数
        var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）

         if(start == ''){
            $.alert("请选择起始日期");
        }else if(end == ''){
            $.alert("请选择终止日期");
        }
        if( days<0){
            $.alert("请选择正确的日期");
            return;
        }else if(days>90){
            $.confirm("您确定查询大于三个月的订单吗?", "确认选择?", function() {
            	queryOrderStatusAjax(start,end);
            }, function() {
                //取消操作
            });
        }else{
        	queryOrderStatusAjax(start,end);
        }
    }
    
    
    function queryOrderStatusAjax(startDate,endDate){
    	$.showLoading();
        $.ajax({
            type: 'get',
            url: '../../json/orderStatusList.json?time='+ new Date(),
            data:{
            	startDate:startDate,
            	endDate:endDate
            },
            dataType: 'json',
            success: function(data){
            	if(data.code==0){
            		 var objList = data.data;
                     var orderListInfo = $("#orderListInfo");
                     orderListInfo.empty();
                     $(objList).each(function(index,obj){
                         var index1 = 3*index+1;
                         var index2 = 3*index+2;
                         var index3 = 3*index+3;
                         var chartContainerId1 = "chart-container" + index1;
                         var chartContainerId2 = "chart-container" + index2;
                         var chartContainerId3 = "chart-container" + index3;
                         var percent1 =0.0;
                         var percent2 =0.0;
                         var percent3 =0.0;

                         if( obj.total >0){
                             percent1 = Number(parseFloat(obj.high/obj.total*100)).toFixed(1);
                             percent2 = Number(parseFloat(obj.middle/obj.total*100)).toFixed(1);
                             percent3 = Number(parseFloat(obj.low/obj.total*100)).toFixed(1);
                         }

                         var html = $("<li>"+
                             "<div class='order-title'>"+
                             "<h3>"+obj.status+"</h3>"+
                             "<p>"+obj.dec+"："+ "<span class='all-show-data'>"+obj.total+"</span>"+ obj.unit +"</p>"+
                             "</div>"+
                             "<div class='order-info'>"+
                             "<div class='meters'>"+
                             "<div id ="+chartContainerId1+" class='chart-container1'>"+
                             "<div id ="+chartContainerId2+" class='chart-container2'>"+
                             "<div id ="+chartContainerId3+" class='chart-container3'></div>"+
                             "</div>"+
                             "</div>"+
                             "</div>"+
                             "<div class='order-info-r'>"+
                             "<ul>"+
                             "<li>紧急 <div></div><i>"+percent1+"%"+"</i>，<span>"+obj.high+"</span>"+obj.unit+"</li>"+
                             "<li>正常 <div></div><i>"+percent2+"%"+"</i>，<span>"+obj.middle+"</span>"+obj.unit+"</li>"+
                             "<li>预期 <div></div><i>"+percent3+"%"+"</i>，<span>"+obj.low+"</span>"+obj.unit+"</li>"+
                             "</ul>"+
                             "</div>"+
                             "</div>"+
                             "</li>");
                         orderListInfo.append(html);

                         var dataId = [chartContainerId1,chartContainerId2,chartContainerId3];
                         var dataNum = [parseFloat(percent3),parseFloat(percent2),parseFloat(percent1)];
                         var dataCharts1 = circleCharts(dataId,dataNum);

                     });
            		
            	}else{
            		 $.toast("数据加载失败", "cancel");
            	}
               
            	 $.hideLoading();
            },
            error:function(){
            	$.hideLoading();
                $.toast("数据加载失败", "cancel");
            }
        });
    }
    /*图表渲染*/

    function circleCharts(dataId,dataNum){
        pie1 = new RGraph.SVG.Pie({
            id: dataId[0],
            data: [dataNum[0],100-dataNum[0]],
            options: {
                colors: ['#00b150', '#a5a5a5']
            }
        }).draw().exec(function (obj)
        {
            RGraph.SVG.create({
                svg: obj.svg,
                type: 'circle',
                parent: obj.svg.all,
                attr: {
                    cx: obj.centerx,
                    cy: obj.centery,
                    r: obj.radius - 10,  //圆环的宽
                    fill: '#fff'  //底色
                }
            });
        });

        new RGraph.SVG.Pie({
            id: dataId[1],
            data: [dataNum[1],100-dataNum[1]],
            options: {
                colors: ['#ffc100', '#a5a5a5']
            }
        }).draw().exec(function (obj)
        {
            RGraph.SVG.create({
                svg: obj.svg,
                type: 'circle',
                parent: obj.svg.all,
                attr: {
                    cx: obj.centerx,
                    cy: obj.centery,
                    r: obj.radius - 10,
                    fill: '#fff'
                }
            });
        });


        new RGraph.SVG.Pie({
            id: dataId[2],
            data: [dataNum[2],100-dataNum[2]],
            options: {
                colors: ['#ff0000', '#a5a5a5']
            }
        }).draw().exec(function (obj)
        {
            RGraph.SVG.create({
                svg: obj.svg,
                type: 'circle',
                parent: obj.svg.all,
                attr: {
                    cx: obj.centerx,
                    cy: obj.centery,
                    r: obj.radius - 10,
                    fill: '#fff'
                }
            });
        });
    }

});