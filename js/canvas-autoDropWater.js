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
        rainCount = 25;         //水滴数量
//        mX = -100,
//        mY = -100;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


    function drop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < rainCount; i++) {
            var rain = rains[i];
            if(rain.exist == 1){
                ctx.beginPath();
                ctx.moveTo(rain.x,rain.y);
                ctx.bezierCurveTo(rain.x-20,rain.y+20,rain.x+20,rain.y+20,rain.x,rain.y);
                ctx.fillStyle = "RGB(100,200,233)";
                ctx.globalAlpha = rain.opacity;
                ctx.fill();
                rain.y += rain.speed;
                if(rain.y + rain.speed > rain.dy){
                    rain.exist = 0;
                }
            }


            if (rain.exist == 0) {
                var d = 5 * (rain.maxRadi - rain.radi) / rain.maxRadi;
                var r = d / 2;
                ctx.beginPath();
                ctx.moveTo(rain.x - rain.radi, rain.dy);
                ctx.bezierCurveTo(rain.x - rain.radi, rain.dy - rain.radi * 0.5, rain.x + rain.radi, rain.dy - rain.radi * 0.5, rain.x + rain.radi, rain.dy);
                ctx.strokeStyle = "RGB(100,200,233)";
                ctx.globalAlpha = rain.opacity*(rain.maxRadi - rain.radi) / rain.maxRadi/2;
                ctx.lineWidth = d;

                var crg = ctx.createRadialGradient(rain.x, rain.dy, 0, rain.x, rain.dy - rain.radi * 0.5, rain.radi);
                crg.addColorStop(0, "RGB(150,222,255)");
                crg.addColorStop(1, "RGB(100,200,233)");
                ctx.strokeStyle = crg;

                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(rain.x - rain.radi, rain.dy);
                ctx.bezierCurveTo(rain.x - rain.radi, rain.dy + rain.radi * 0.5, rain.x + rain.radi, rain.dy + rain.radi * 0.5, rain.x + rain.radi, rain.dy);
                ctx.strokeStyle = "RGB(100,200,233)";
                ctx.globalAlpha = rain.opacity*(rain.maxRadi - rain.radi) / rain.maxRadi/2;
                ctx.lineWidth = d;

                var crg = ctx.createRadialGradient(rain.x, rain.dy, 0, rain.x, rain.dy + rain.radi * 0.5, rain.radi);
                crg.addColorStop(0, "RGB(77,146,229)");
                crg.addColorStop(1, "RGB(100,200,233)");
                ctx.strokeStyle = crg;

                ctx.stroke();

                ctx.globalAlpha = rain.opacity;
                rain.radi += rain.speed * 0.5;
                if (rain.radi > rain.maxRadi) {
                    rain.exist = -1;
                }
            }

            if(rain.exist == -1){
                reset(rain);
            }
        }
        requestAnimationFrame(drop);
    }

    function reset(rain){
        rain.x =  Math.floor(Math.random() * canvas.width),
        rain.y = 0;
        rain.dy = Math.floor(Math.random() * canvas.height * 0.6 + canvas.height * 0.4),
        rain.speed = (Math.random() * 2) + 5 * rain.dy/canvas.height,
        rain.opacity = (Math.random() * 0.2) + 0.4 * rain.dy/canvas.height;
        rain.exist = 1;
        rain.radi = 0;
    }

    function init() {
        for (var i = 0; i < rainCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = - Math.floor(Math.random() * canvas.height),
                dy = Math.floor(Math.random()  * canvas.height * 0.6 + canvas.height * 0.4),  //落点屏幕0.4以下
                speed = (Math.random() * 2) + 5 * dy/canvas.height,                                                //下落速度 
                opacity = (Math.random() * 0.2) + 0.4 * dy/canvas.height;                                          //透明度

                rains.push({
                    x: x,
                    y: y,
                    dy: dy,
                    speed: speed,
                    opacity: opacity,
                    exist: 1,           //是否在空中
                    radi: 0,         //水花半径
                    maxRadi: 200       //最大水花半径
                });
        }
        drop();
        console.log("滴答滴答 也许会让人感觉到烦躁吧。");
    }

    // document.addEventListener("mousemove", function(e){
    //     mX = e.clientX,
    //     mY = e.clientY
    // });
    window.addEventListener("resize", function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();

})();

//******************************************************************

// (function() {
//     var flakes = [],
//         canvas = document.getElementById("Snow"), //画布ID，与上一步创建的画布对应
//         ctx = canvas.getContext("2d"),
//         flakeCount = 200,  //雪花数量，数值越大雪花数量越多
//         mX = -100,
//         mY = -100;

    
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     function snow() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         for (var i = 0; i < flakeCount; i++) {
//             var flake = flakes[i],
//                 x = mX,
//                 y = mY,
//                 minDist = 150,  //雪花距离鼠标指针的最小值，小于这个距离的雪花将受到鼠标的排斥
//                 x2 = flake.x,
//                 y2 = flake.y;

//             var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
//                 dx = x2 - x,
//                 dy = y2 - y;

//             if (dist < minDist) {
//                 var force = minDist / (dist * dist),
//                     xcomp = (x - x2) / dist,
//                     ycomp = (y - y2) / dist,
//                     deltaV = force / 2;

//                 flake.velX -= deltaV * xcomp;
//                 flake.velY -= deltaV * ycomp;

//             } else {
//                 flake.velX *= .98;
//                 if (flake.velY <= flake.speed) {
//                     flake.velY = flake.speed
//                 }
//                 flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
//             }

//             ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";  //雪花颜色
//             flake.y += flake.velY;
//             flake.x += flake.velX;

//             if (flake.y >= canvas.height || flake.y <= 0) {
//                 reset(flake);
//             }

//             if (flake.x >= canvas.width || flake.x <= 0) {
//                 reset(flake);
//             }

//             ctx.beginPath();
//             ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
//             ctx.fill();
//         }
//         requestAnimationFrame(snow);
//     };

//     function reset(flake) {
//         flake.x = Math.floor(Math.random() * canvas.width);
//         flake.y = 0;
//         flake.size = (Math.random() * 3) + 2;  //加号后面的值，雪花大小，为基准值，数值越大雪花越大
//         flake.speed = (Math.random() * 1) + 0.5;  //加号后面的值，雪花速度，为基准值，数值越大雪花速度越快
//         flake.velY = flake.speed;
//         flake.velX = 0;
//         flake.opacity = (Math.random() * 0.5) + 0.3;  //加号后面的值，为基准值，范围0~1
//     }

//     function init() {
//         for (var i = 0; i < flakeCount; i++) {
//             var x = Math.floor(Math.random() * canvas.width),
//                 y = Math.floor(Math.random() * canvas.height),
//                 size = (Math.random() * 3) + 2,  //加号后面的值，雪花大小，为基准值，数值越大雪花越大
//                 speed = (Math.random() * 1) + 0.5,  //加号后面的值，雪花速度，为基准值，数值越大雪花速度越快
//                 opacity = (Math.random() * 0.5) + 0.3;  //加号后面的值，为基准值，范围0~1

//             flakes.push({
//                 speed: speed,
//                 velY: speed,
//                 velX: 0,
//                 x: x,
//                 y: y,
//                 size: size,
//                 stepSize: (Math.random()) / 30 * 1,  //乘号后面的值，雪花横移幅度，为基准值，数值越大雪花横移幅度越大，0为竖直下落
//                 step: 0,
//                 angle: 180,
//                 opacity: opacity
//             });
//         }

//         snow();
//     };

//     document.addEventListener("mousemove", function(e) {
//         mX = e.clientX,
//         mY = e.clientY
//     });
//     window.addEventListener("resize", function() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });
//     init();
// })();