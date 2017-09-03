// JavaScript Document

var window_width = $(window).width();
var window_height = $(window).height();



var draw_cir = Array();
var mouse_x = Array();
var mouse_y = Array();
var mouse_radius = Array();
var mouse_i = 0;
var drop_water = Array();
var drop_water_exist = Array();
$('body').append('<canvas id="canv_b" ></canvas>');
x_b = $('#canv_b');
x_b.attr('width', window_width);
x_b.attr('height', window_height);
x_b.addClass('background_color_b');

for (var i = 0; i < 1000; i++) {
    mouse_radius[i] = 0;
    drop_water[i] = 0;
}




$(window).resize(function() {
    window_width = $(this).width();
    window_height = $(this).height();
    x_b.attr('width', window_width);
    x_b.attr('height', window_height);
    x_b.addClass('background_color_b');
});


var ctx_b = document.getElementById("canv_b").getContext("2d")



$('body').mousedown(function(event) {
    if (mouse_i > 999) {
        mouse_i = 0;
    }
    mouse_x[mouse_i] = event.clientX;
    mouse_y[mouse_i] = event.clientY;
    draw_cir[mouse_i] = false;
    drop_water_exist[mouse_i] = true;
    mouse_i++;
});

function draw_cir_i() {
    ctx_b.clearRect(0, 0, window_width, window_height);
    for (var i = 0; i < 1000; i++) {
        if (drop_water_exist[i]) {
            ctx_b.beginPath();
            ctx_b.moveTo(mouse_x[i], drop_water[i]);
            ctx_b.bezierCurveTo(mouse_x[i] - 20, drop_water[i] + 20, mouse_x[i] + 20, drop_water[i] + 20, mouse_x[i], drop_water[i]);
            ctx_b.fillStyle = "RGB(100,200,233)";
            ctx_b.fill();
            drop_water[i] += 9;
            if (drop_water[i] + 20 > mouse_y[i]) {
                draw_cir[i] = true;
                drop_water_exist[i] = false;
                drop_water[i] = 0;
            }
        }
        if (draw_cir[i]) {
            ctx_b.beginPath();
            var d = 5 * (200 - mouse_radius[i]) / 200;
            var r = d / 2;
            ctx_b.beginPath();
            ctx_b.moveTo(mouse_x[i] - mouse_radius[i], mouse_y[i]);
            ctx_b.bezierCurveTo(mouse_x[i] - mouse_radius[i], mouse_y[i] - mouse_radius[i] * 0.5, mouse_x[i] + mouse_radius[i], mouse_y[i] - mouse_radius[i] * 0.5, mouse_x[i] + mouse_radius[i], mouse_y[i]);
            ctx_b.strokeStyle = "RGB(100,200,233)";
            ctx_b.globalAlpha = (200 - mouse_radius[i]) / 400;
            ctx_b.lineWidth = d;

            var crg = ctx_b.createRadialGradient(mouse_x[i], mouse_y[i], 0, mouse_x[i], mouse_y[i] - mouse_radius[i] * 0.5, mouse_radius[i]);
            crg.addColorStop(0, "RGB(150,222,255)");
            crg.addColorStop(1, "RGB(100,200,233)");
            ctx_b.strokeStyle = crg;

            ctx_b.stroke();

            ctx_b.beginPath();
            ctx_b.moveTo(mouse_x[i] - mouse_radius[i], mouse_y[i]);
            ctx_b.bezierCurveTo(mouse_x[i] - mouse_radius[i], mouse_y[i] + mouse_radius[i] * 0.5, mouse_x[i] + mouse_radius[i], mouse_y[i] + mouse_radius[i] * 0.5, mouse_x[i] + mouse_radius[i], mouse_y[i]);
            ctx_b.strokeStyle = "RGB(100,200,233)";
            ctx_b.globalAlpha = (200 - mouse_radius[i]) / 400;
            ctx_b.lineWidth = d;

            var crg = ctx_b.createRadialGradient(mouse_x[i], mouse_y[i], 0, mouse_x[i], mouse_y[i] + mouse_radius[i] * 0.5, mouse_radius[i]);
            crg.addColorStop(0, "RGB(77,146,229)");
            crg.addColorStop(1, "RGB(100,200,233)");
            ctx_b.strokeStyle = crg;

            ctx_b.stroke();

            ctx_b.globalAlpha = 0.7;
            mouse_radius[i]++;
            if (mouse_radius[i] > 200) {
                draw_cir[i] = false;
                mouse_radius[i] = 0;
            }
        }

    }
}

function proceed() {
    draw_cir_i();
}
setInterval("proceed()", 10);