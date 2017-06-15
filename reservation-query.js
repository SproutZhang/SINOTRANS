/**
 * Created by john on 2017/5/30.
 */
 

//页面加载
$(document).ready(function(){
	var width=$(window).height();
	
	
	
	$.ajax({
	   url: "../../public/js/api/resquery.json?t="+new Date(),//json文件位置
	   type: "GET",//请求方式为get
	   dataType: "text", //返回数据格式为json
	   success: function(data) {//请求成功完成后要执行的方法 
		   var objList=JSON.parse(data);
           var showDataUl=$(".show-data ul");
		   showDataUl.empty();
		   $(objList.list).each(function(index,obj){
			   var canvasId="cvs"+index;
			   var times=obj.times;
			   var data=[];
				var labels=[];
			   $(times).each(function(i,o){
				   var timedata=[];
				   timedata.push(o.y);
				   timedata.push(o.d);
				   data.push(timedata);
				   labels.push(o.time);
			   });
			  
			 
			   var html=$("<li>"+
							"<h3>"+obj.date+"</h3>"+
							"<canvas id='"+canvasId+"' width=\"350\" height=\"180\">[No canvas support]</canvas>"+
						"</li>");
				  showDataUl.append(html);
				  if(width<=480){
					html.find("canvas").css({
						"width":width,
						"height":140
					});
				}else if(500<width && width<600){
					html.find("canvas").css({
						"width":width-250,
						"height":140
					});
				}else if(width>700){
					html.find("canvas").css({
						"width":width-350,
						"height":140
					});
				}
				draw(canvasId,data,labels);
				
		   });
	   }
	})


    var data=[900,600];
    var tote = data[0]+data[1];
    console.log(tote);
    //求每份占比
    var angle = data.map(function(item){
        var each = item/tote;
        return each;
    });
    console.log(angle);
    //获取颜色条的宽度
    var width = $(".colorbar").width();
    //设置给第一个内条宽度
    var sonWidth = width*angle[0];
    $(".colorbar-son-l").width(sonWidth+"px");

    //设置给第二个内条宽度
    var sonWidthT = width*angle[1];
    $(".colorbar-son-r").width(sonWidthT+"px");

    //设置数据显示
    $(".data-num").html(data[0]);
    $(".data-num1").html(data[1]);


   
});





function draw(canvasId,data,labels){
	 var hbar = new RGraph.HBar({
        id: canvasId,
        data: data,
        options: {
			grouping: 'stacked',
			gutterTop: 35,
            labels: labels,
            labelsAbove:false, //总量显示
            //vmargin: 15,  //柱条宽度
            shadow: false, //阴影
            keyColors: ['blue','#c00','#0c0'],

            keyTextSize: 16,
            colors: ['#f07927','#65b11d'],
            scaleZerostart: false,
            noxaxis: true,
            noyaxis: true,
            axisColor: '#999',
            textSize: 12,
            gutterTop: 5,
            gutterBottom: 5,
            gutterLeft: 100,
            xlabels: false,//x轴
            backgroundGrid:false
        }
    }).on('draw', function (obj)
    {
        for (var i=0; i<obj.coords.length; ++i) {
            obj.context.fillStyle = 'white';
            RGraph.Text2(obj.context, {
                font:'Verdana',
                'size':10,
                'x':obj.coords[i][0] + (obj.coords[i][2] / 2),
                'y':obj.coords[i][1] + (obj.coords[i][3] / 2),
                'text':obj.data_arr[i].toString(),
                'valign':'center',
                'halign':'center'
            });
        }
    }).grow();
	
}