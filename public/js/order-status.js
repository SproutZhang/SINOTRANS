/**
 * Created by john on 2017/6/9.
 */
$(function(){

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
    var dataId = ["chart-container1","chart-container2","chart-container3"];
    var dataNum = [50,30,20];
    var dataCharts1 = circleCharts(dataId,dataNum);

    var dataId = ["chart-container4","chart-container5","chart-container6"];
    var dataNum = [60,80,10];
    var dataCharts2 = circleCharts(dataId,dataNum);


});