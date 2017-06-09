/**
 * Created by john on 2017/6/9.
 */
$(function(){

    /*图表*/
    new RGraph.HBar({
        id: 'cvs',
        data: [50,80,60,40,30],
        options: {
            colors: ['#4db8db','#4db8ff','#4d94ff', '#658bd8','#5353b2'],
            //colors: ['#164366','#164366','#164366','#FDB515','#164366'],
            labels: ['status1','status2','status3','status4','status5'],
            labelsAbove: true,
            colorsSequential: true,//颜色区分
            vmargin: 40,//控制柱状体宽度
            hmargin: 25,
            labelsAboveDecimals: 1,
            noxaxis: true,
            gutterLeft: 55,//距左距离
            xlabels: true,
            textAccessible: true,
            labelsAbove:false  //后面数字不显示
        }
    }).on('draw', function (obj)  //柱条中显示数据
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

    



});