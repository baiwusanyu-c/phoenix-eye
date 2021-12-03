/**
 * 驗證碼生成方法
 */
!(function(window, document) {
    var size = 4;//设置验证码长度
    var canvas;
    function GVerify(options, txt, reacquire) { //创建一个图形验证码对象，接收options对象为参数
        this.options = { //默认options参数值
            id: "", //容器Id
            canvasId: "verifyCanvas", //canvas的ID
            width: "120", //默认canvas宽度
            height: "21", //默认canvas高度
            type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
        }
        if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
            for(var i in options) { //根据传入的参数，修改默认参数值
                this.options[i] = options[i];
            }
        }else{
            this.options.id = options;
        }
        if(!canvas){
            this._init(reacquire);
        }
        this.refresh(txt);
    }

    GVerify.prototype = {
        /**版本号**/
        version: '1.0.0',
        
        /**初始化方法**/
        _init: function(reacquire) {
            var con = document.getElementById(this.options.id);
            canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "120";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "21";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            /**点击事件**/
            canvas.onclick = function(){
                reacquire();
            }
        },
        
        /**生成验证码**/
        refresh: function(txt) {
            var con = document.getElementById(this.options.id);
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "120";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "21";

            let canvasDom = document.getElementById(this.options.canvasId);
            if(canvasDom.getContext) {
                var ctx = canvasDom.getContext('2d');
            }else{
                return;
            }
            
            ctx.textBaseline = "middle";

            ctx.fillStyle = '#ffffff';
            // ctx.fillStyle = randomColor(180, 240); //背景颜色
            ctx.fillRect(0, 0, this.options.width, this.options.height);
            for(var i = 0; i < size; i++) {
                var letter = txt.split('')[i];
                ctx.font = '30px SimHei'; //随机生成字体大小
                // ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                ctx.fillStyle = '#4F62A7'; //随机生成字体颜色
                // ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / (size + 2) * (i + 1);
                var y = this.options.height / 2;
                var deg = randomNum(-30, 30);
                /**设置旋转角度和坐标原点**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(letter, 0, 0);
                /**恢复旋转角度和坐标原点**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            // /**绘制干扰线**/
            // for(var i = 0; i < 4; i++) {
            //     ctx.strokeStyle = randomColor(40, 180);
            //     ctx.beginPath();
            //     ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
            //     ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
            //     ctx.stroke();
            // }
            // /**绘制干扰点**/
            // for(var i = 0; i < this.options.width/4; i++) {
            //     ctx.fillStyle = randomColor(0, 255);
            //     ctx.beginPath();
            //     ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
            //     ctx.fill();
            // }
        },
    }
    /**生成一个随机数**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    // function randomColor(min, max) {
    //     var r = randomNum(min, max);
    //     var g = randomNum(min, max);
    //     var b = randomNum(min, max);
    //     return "rgb(" + r + "," + g + "," + b + ")";
    // }
    window.GVerify = GVerify;
})(window, document);