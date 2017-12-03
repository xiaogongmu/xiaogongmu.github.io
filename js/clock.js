// JavaScript Document
var widthT = 200;
var widthB = 100;



function clearP() {
    ctx_clock.clearRect(-0, -0, widthT + 1, widthT + 2);
}

function paint() {



    ctx_clock.beginPath();
    ctx_clock.arc(widthB + 1, widthB + 1, widthB, 0, Math.PI * 2, true);
    ctx_clock.strokeStyle = "#000";
    ctx_clock.clip();
    ctx_clock.stroke();


    for (var i = 1; i <= widthT + 2; i += 10) {
        ctx_clock.beginPath();
        ctx_clock.strokeStyle = "RGB(244,244,244)"
        ctx_clock.globalAlpha = 0.2;
        ctx_clock.moveTo(1, i);
        ctx_clock.lineTo(widthT + 1, i);
        ctx_clock.stroke();
        ctx_clock.moveTo(i, 1);
        ctx_clock.lineTo(i, widthT + 1);
        ctx_clock.stroke();
        ctx_clock.globalAlpha = 0.9;
    }

    ctx_clock.beginPath();
    ctx_clock.fillStyle = "#000";
    ctx_clock.arc(widthB + 1, widthB + 1, 5, 0, 2 * Math.PI, true);
    ctx_clock.fill();

    ctx_clock.beginPath();
    ctx_clock.translate(widthB + 1, widthB + 1);
    ctx_clock.strokeStyle = "#000";
    ctx_clock.lineWidth = 3;
    for (var i = 0; i < 12; i++) {
        ctx_clock.rotate(Math.PI * 30 * i / 180);
        ctx_clock.moveTo(0, -widthB);
        ctx_clock.lineTo(0, -90);
        ctx_clock.stroke();
        ctx_clock.rotate(-Math.PI * 30 * i / 180);
    }
    ctx_clock.strokeStyle = "#000";
    ctx_clock.lineWidth = 1;
    for (var i = 0; i < 60; i++) {
        ctx_clock.rotate(Math.PI * 6 * i / 180);
        ctx_clock.moveTo(0, -widthB + 1);
        ctx_clock.lineTo(0, -widthB + 5);
        ctx_clock.stroke();
        ctx_clock.rotate(-Math.PI * 6 * i / 180);
    }

}


var hourT = function(number) {
    ctx_clock.beginPath();
    ctx_clock.rotate(Math.PI * number * 30 / 180);
    ctx_clock.lineWidth = 7;
    ctx_clock.strokeStyle = "#000"
    ctx_clock.moveTo(0, -50);
    ctx_clock.lineTo(0, 0);
    ctx_clock.stroke();
    ctx_clock.rotate(-Math.PI * number * 30 / 180);
}


var minuteT = function(number) {
    ctx_clock.beginPath();
    ctx_clock.rotate(Math.PI * number * 6 / 180);
    ctx_clock.lineWidth = 5;
    ctx_clock.strokeStyle = "#000"
    ctx_clock.moveTo(0, -65);
    ctx_clock.lineTo(0, 0);
    ctx_clock.stroke();
    ctx_clock.rotate(-Math.PI * number * 6 / 180);
}


var secondT = function(number) {
    ctx_clock.beginPath();
    ctx_clock.rotate(Math.PI * number * 6 / 180);
    ctx_clock.lineWidth = 3;
    x = ctx_clock.strokeStyle = "#F00"
    ctx_clock.moveTo(0, -widthB + 20);
    ctx_clock.lineTo(0, 0);
    ctx_clock.stroke();
    ctx_clock.rotate(-Math.PI * number * 6 / 180);


}

function move() {
    clearP();
    var myDate = new Date();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var secounds = myDate.getSeconds()
    var milliseconsd = myDate.getMilliseconds()
    var s = secounds + milliseconsd / 1000;
    var m = minutes + s / 60;
    var h = hours + m / 60;
    paint();
    hourT(h);
    minuteT(m);
    secondT(s);
    ctx_clock.translate(-widthB - 1, -widthB - 1);
}

var stringurl1 = 'url("/img/clockBackground/c';
var stringurl2 = '.jpg';
var clockBackgroundNo = Math.round(3*Math.random());
var maxClockBackgroundNo = 3;


var canvas_clock= document.getElementById("canv");
if(canvas_clock!=null){
canvas_clock.onclick=function(){
    clockBackgroundNo++;
    if(clockBackgroundNo>maxClockBackgroundNo){clockBackgroundNo = 0;}
    document.getElementById('canv').style.backgroundImage=stringurl1+clockBackgroundNo+stringurl2;
    }
}

var ctx_clock = null;
function do_clock(){
var c = document.getElementById("canv");

if (c!=null) {
ctx_clock= c.getContext("2d");
document.getElementById('canv').style.backgroundImage=stringurl1+clockBackgroundNo+stringurl2;
document.getElementById('canv').style.cursor = "pointer";
document.getElementById('canv').style.margin = "10px 36%";
setInterval("move()", 250);
}
    
}
do_clock();



