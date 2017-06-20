/**
 * Created by john on 2017/6/19.
 */
$(function(){
    getData();

    function getData(){
        var wrhouse;
        $.ajax({
            type:'get',
            url:'../../json/reservation-new.json',
            dataType:'json',
            success:function(data){

                //起运港
                $(data).each(function (index,obj) {
                    //console.log(obj.start);
                    //console.log(obj.wrhouse);
                    var html = $("<li>"+obj.start+"</li>");
                    $('#searchHouse1').append(html);
                    selectPlace(1,".portOfLoading");
                    //console.log(html);
                });
                //仓库
                $("#searchHouse1 li").click(function(){
                    var val = $(this).html();
                    $("#searchHouse2").empty();
                    $(data).each(function(i,o){

                        if(o.start == val){
                            wrhouse = o.wrhouse;
                            $(wrhouse).each(function(index,obj){
                                var html1 = $("<li>"+obj.houseName+"</li>")
                                $("#searchHouse2").append(html1);
                                selectPlace(2,".zwyWarehouse");
                            });


                            //时间
                            $("#searchHouse2 li").click(function(){
                                var houseName = $(this).html();
                                $("#searchHouse3").empty();
                                $("#searchHouse4").empty();
                                $("#searchHouse5").empty();
                                $("#searchHouse6").empty();
                                $(wrhouse).each(function(index,obj){
                                    if(obj.houseName == houseName){
                                        $(obj.times).each(function(i,o){
                                            var htmlmeet = $("<li>"+o.meetingDate+"</li>");
                                            var htmlfinish = $("<li>"+o.finishDate+"</li>");
                                            var htmlresv = $("<li>"+o.resvDate+"</li>");
                                            var htmltime = $("<li>"+o.resvTime+"</li>");

                                            $("#searchHouse3").append(htmlmeet);
                                            $("#searchHouse4").append(htmlfinish);
                                            $("#searchHouse5").append(htmlresv);
                                            $("#searchHouse6").append(htmltime);
                                            selectPlace(3,".date1");
                                            selectPlace(4,".date2");
                                            selectPlace(5,".date3");
                                            selectPlace(6,".date4");
                                        });
                                    }


                                });
                            })
                        }
                    });
                });
                
            }
        });
    };


    function selectPlace(i,show){
        $("#menu_"+i+" "+"li").click(function(){
            var thisData = $(this).html();
            $(show).html(thisData);
            $(this).parent().parent().css('display','none');
            $("#cell_"+i).removeClass("icon-35");
            $("#cell_"+i).addClass("icon-74 ");
        });
    }








});