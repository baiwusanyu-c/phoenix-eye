/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:18 
 * @Last Modified by: yinian430
 * @Last Modified time: 2020-07-09 17:15:02
 */
!(function(win, doc){
    function setFontSize() {
        // 获取window 宽度
        var winWidth;
        window.innerWidth != 0 ? winWidth = window.innerWidth : winWidth = screen.width;
        winWidth > 640 && (winWidth = 640);
        window.winWidth = winWidth;
        doc.documentElement.style.fontSize = (winWidth / 375) * 100 + 'px' ;
    }

    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

    var timer = null;
    //页面旋转或尺寸改变时重新初始化
    win.addEventListener(evt, function () {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 300);
    }, false);
    //每次载入时重新初始化
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    //初始化
    setFontSize();

}(window, document));
