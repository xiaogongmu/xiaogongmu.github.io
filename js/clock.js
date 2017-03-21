// JavaScript Document
var widthT = 200;
var widthB = 100;
var c = document.getElementById("canv");
var ctx = c.getContext("2d")


function clearP(){
	ctx.clearRect(-0,-0,widthT+1,widthT+2);
	}

function paint(){
	
	
	
	ctx.beginPath();
	ctx.arc(widthB+1,widthB+1,widthB,0,Math.PI*2,true);
	ctx.strokeStyle="#000";
	ctx.clip();
	ctx.stroke();
	

	for(var i=1; i<=widthT+2;i+=10){
		ctx.beginPath();
		ctx.strokeStyle="RGB(244,244,244)"
		ctx.globalAlpha=0.2;
		ctx.moveTo(1,i);
		ctx.lineTo(widthT+1,i);
		ctx.stroke();
		ctx.moveTo(i,1);
		ctx.lineTo(i,widthT+1);
		ctx.stroke();
		ctx.globalAlpha=0.9;
		}
	
	
	
	ctx.beginPath();
	ctx.fillStyle="#000";
	ctx.arc(widthB+1,widthB+1,5,0,2*Math.PI,true);
	ctx.fill();
	
	
	ctx.beginPath();
	ctx.translate(widthB+1,widthB+1);
	ctx.strokeStyle="#000";
	ctx.lineWidth=3;
	
	for(var i=0;i<12;i++){
	ctx.rotate(Math.PI*30*i/180);
	ctx.moveTo(0,-widthB);
	ctx.lineTo(0,-90);
	ctx.stroke();
	ctx.rotate(-Math.PI*30*i/180);
	}
	
	ctx.strokeStyle="#000";
	ctx.lineWidth=1;
	
	for(var i=0;i<60;i++){
	ctx.rotate(Math.PI*6*i/180);
	ctx.moveTo(0,-widthB+1);
	ctx.lineTo(0,-widthB+5);
	ctx.stroke();
	ctx.rotate(-Math.PI*6*i/180);
	}

}


var hourT = function(number){
	ctx.beginPath();
	ctx.rotate(Math.PI*number*30/180);
	ctx.lineWidth=7;
	ctx.strokeStyle="#000"
	ctx.moveTo(0,-50);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.rotate(-Math.PI*number*30/180);
}


var minuteT = function(number){
	ctx.beginPath();
	ctx.rotate(Math.PI*number*6/180);
	ctx.lineWidth=5;
	ctx.strokeStyle="#000"
	ctx.moveTo(0,-65);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.rotate(-Math.PI*number*6/180);
}


var secondT = function(number){
	ctx.beginPath();
	ctx.rotate(Math.PI*number*6/180);
	ctx.lineWidth=3;
	x = ctx.strokeStyle="#F00"
	ctx.moveTo(0,-widthB+20);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.rotate(-Math.PI*number*6/180);


}

function move(){
	clearP();
	var myDate = new Date();
	var hours = myDate.getHours()      
	var minutes = myDate.getMinutes();     
	var secounds = myDate.getSeconds()
	var milliseconsd = myDate.getMilliseconds()
	var s = secounds+milliseconsd/1000;
	var m = minutes+s/60;
	var h = hours+m/60;
	paint();
	
	hourT(h);
	minuteT(m);
	secondT(s);

	
	ctx.translate(-widthB-1,-widthB-1);
	
	
	}
setInterval("move()",20);