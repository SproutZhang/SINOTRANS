/**
 * Created by john on 2017/5/30.
 */
//页面加载
$(function(){
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


    var hbar = new RGraph.HBar({
        id: 'cvs1',
        data: [[300,300], [150,450],[150,450],[100,200]],
        options: {
            grouping: 'stacked',
            hmargin: 25,
            //labels: ['8:00-11:00','12:00-15:00','15:00-17:00','18:00-21:00'],
            labelsAbove:false, //总量显示
            //labelsAbovedecimals: 2,
            vmargin: 33,  //柱条宽度
            shadow: false, //阴影
            // key: ['Monday','Tuesday','Wednesday'],  title
            keyPosition: 'gutter',
            keyPositionGutterBoxed: true,
            //keyColors: ['#7CB5EC','#434348','#90ED7D'],
            keyColors: ['blue','#c00','#0c0'],

            keyTextSize: 16,
            colors: ['#f07927','#65b11d'],
            //渐变 colors: ['Gradient(#4572A7:#66f)','Gradient(#AA4643:white)','Gradient(#89A54E:white)'],
            scaleZerostart: true,
            noxaxis: true,
            noyaxis: true,
            axisColor: '#999',
            textSize: 20,
            gutterTop: 5,
            gutterBottom: 5,
            gutterLeft: 100,
            gutterRight: 0,
            textAccessible: false,
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

    var hbar = new RGraph.HBar({
        id: 'cvs2',
        data: [[300,300], [150,450],[150,450],[100,200]],
        options: {
            grouping: 'stacked',
            hmargin: 25,
            //labels: ['8:00-11:00','12:00-15:00','15:00-17:00','18:00-21:00'],
            labelsAbove:false, //总量显示
            //labelsAbovedecimals: 2,
            vmargin: 33,  //柱条宽度
            shadow: false, //阴影
            // key: ['Monday','Tuesday','Wednesday'],  title
            keyPosition: 'gutter',
            keyPositionGutterBoxed: true,
            //keyColors: ['#7CB5EC','#434348','#90ED7D'],
            keyColors: ['blue','#c00','#0c0'],

            keyTextSize: 16,
            colors: ['#f07927','#65b11d'],
            //渐变 colors: ['Gradient(#4572A7:#66f)','Gradient(#AA4643:white)','Gradient(#89A54E:white)'],
            scaleZerostart: true,
            noxaxis: true,
            noyaxis: true,
            axisColor: '#999',
            textSize: 20,
            gutterTop: 5,
            gutterBottom: 5,
            gutterLeft: 100,
            gutterRight: 0,
            textAccessible: false,
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
    



})