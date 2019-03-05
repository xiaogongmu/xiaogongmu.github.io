(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
    var rains = [],
        canvas = document.getElementById("canvas_water"),
        ctx = canvas.getContext("2d"),
        clickCount = 0,
        rainCount = 28,        //水滴数量
        mX = -100,
        mY = -100,
        waterSize = 12;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


    function drop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < rainCount+clickCount; i++) {
            var rain = rains[i];
            if(rain.exist == 1){
                ctx.beginPath();
                ctx.moveTo(rain.x,rain.y);
                ctx.bezierCurveTo(rain.x-rain.size,rain.y+rain.size,rain.x+rain.size,rain.y+rain.size,rain.x,rain.y);
                ctx.fillStyle = rain.color;
                ctx.globalAlpha = rain.opacity;
                ctx.fill();
                rain.y += rain.speed;
                if(rain.y + rain.speed > rain.dy){
                    rain.exist = 0;
                }
            }


            if (rain.exist == 0) {
                var d = 1 * (rain.maxRadi - rain.radi) / rain.maxRadi;
                var r = d / 2;
                ctx.beginPath();
                ctx.moveTo(rain.x - rain.radi, rain.dy);
                ctx.bezierCurveTo(rain.x - rain.radi, rain.dy - rain.radi * 0.5, rain.x + rain.radi, rain.dy - rain.radi * 0.5, rain.x + rain.radi, rain.dy);
                ctx.strokeStyle = rain.color;
                ctx.globalAlpha = rain.opacity*(rain.maxRadi - rain.radi) / rain.maxRadi/2;
                ctx.lineWidth = d;

                var crg = ctx.createRadialGradient(rain.x, rain.dy, 0, rain.x, rain.dy - rain.radi * 0.5, rain.radi);
                crg.addColorStop(0, rain.aboveColor);
                crg.addColorStop(1, rain.color);
                ctx.strokeStyle = crg;

                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(rain.x - rain.radi, rain.dy);
                ctx.bezierCurveTo(rain.x - rain.radi, rain.dy + rain.radi * 0.5, rain.x + rain.radi, rain.dy + rain.radi * 0.5, rain.x + rain.radi, rain.dy);
                ctx.strokeStyle = rain.color;
                ctx.globalAlpha = rain.opacity*(rain.maxRadi - rain.radi) / rain.maxRadi/2;
                ctx.lineWidth = d;

                var crg = ctx.createRadialGradient(rain.x, rain.dy, 0, rain.x, rain.dy + rain.radi * 0.5, rain.radi);
                crg.addColorStop(0, rain.underColor);
                crg.addColorStop(1, rain.color);
                ctx.strokeStyle = crg;

                ctx.stroke();

                ctx.globalAlpha = rain.opacity;
                rain.radi += rain.speed * 0.28;
                if (rain.radi > rain.maxRadi) {
                    rain.exist = -1;
                }
            }

            if(rain.exist == -1){
                if(i<rainCount){
                reset(rain);
                }
            }
        }
        requestAnimationFrame(drop);
    }

    function reset(rain){
        rain.x =  Math.floor(Math.random() * canvas.width),
        rain.y = 0;
        rain.dy = Math.floor(Math.random() * canvas.height * 0.6 + canvas.height * 0.4),
        rain.speed = (Math.random() * 1) + 5 * rain.dy/canvas.height,
        rain.size = waterSize*(rain.dy-0.5*canvas.height)/(0.4*canvas.height),
        rain.opacity = (Math.random() * 0.2) + 0.4 * rain.dy/canvas.height;
        rain.maxRadi= 100*(rain.dy-0.3*canvas.height)/(0.4*canvas.height);
        rain.exist = 1;
        rain.radi = 0;
    }

    function resetClick(rain,x,y){
        rain.x =  x,
        rain.y = 0;
        rain.dy = y;
        if (rain.dy<0.4*canvas.height) {rain.dy=0.4*canvas.height}
        rain.speed = (Math.random() * 1) + 5 * rain.dy/canvas.height,
        rain.size = waterSize*(rain.dy-0.5*canvas.height)/(0.4*canvas.height),
        rain.opacity = (Math.random() * 0.2) + 0.4 * rain.dy/canvas.height;
        rain.maxRadi= 100*(rain.dy-0.3*canvas.height)/(0.4*canvas.height);
        rain.exist = 1;
        rain.radi = 0;
        rain.color = "#0F0";    //点击水滴的颜色
        rain.aboveColor =  "#0F0";
        rain.underColor = "#0F0"
    }

    function init() {
        for (var i = 0; i < 2*rainCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = - Math.floor(Math.random() * canvas.height),
                dy = Math.floor(Math.random()  * canvas.height * 0.6 + canvas.height * 0.4),  //落点屏幕0.4以下
                speed = (Math.random() * 1) + 5 * dy/canvas.height,                                                //下落速度 
                size = waterSize*(dy-0.5*canvas.height)/(0.4*canvas.height),
                opacity = (Math.random() * 0.2) + 0.4 * dy/canvas.height,                                          //透明度
                maxRadi= 100*(dy-0.3*canvas.height)/(0.4*canvas.height);
                rains.push({
                    x: x,
                    y: y,
                    dy: dy,
                    speed: speed,
                    size: size,
                    opacity: opacity,
                    exist: 1,           //是否在空中
                    radi: 0,         //水花半径
                    maxRadi: maxRadi,       //最大水花半径
                    color: "#64C8E9", //"RGB(100,200,233)" 自动掉落水滴颜色
                    aboveColor: "#96DEFF",        //"RGB(150,222,255)"
                    underColor: "#4D92E5"               //"RGB(77,146,229)"
                });
        }
        drop();
        console.log("滴答滴答 也许会让人感觉到烦躁吧。");
    }

    /**
    * 函数节流
    * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
    * @param delay  {number}    延迟时间，单位毫秒
    * @param action {function}  请求关联函数，实际应用需要调用的函数
    * @return {function}    返回客户调用函数
    */
    var throttle = function(delay, action){
      var last = 0 ;return function(){
        var curr = +new Date()
        if (curr - last > delay){
          action.apply(this, arguments)
          last = curr 
        }
      }
    }

    document.addEventListener("click",throttle(500, function(e){
        if(clickCount >=  rainCount){
            clickCount = 0;
        }
        var rain = rains[clickCount+rainCount];
        mX = e.clientX;
        mY = e.clientY;
        resetClick(rain,mX,mY);
        clickCount++;
    }) );
    window.addEventListener("resize", function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();

})();
