/**
 * Created by john on 2017/5/30.
 */
window.onload = function(){
    new Swiper('.banner',{
        /*自动滚动*/
        autoplay:1000,
        /*循环滚动*/
        loop:true,
        /*配置点容器*/
        pagination:'.swiper-pagination',
        /*滑动之后继续滚动*/
        autoplayDisableOnInteraction:false
    });
}