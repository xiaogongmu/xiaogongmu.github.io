// JavaScript Document

var window_width=$(window).width();
var window_height=$(window).height();

var number = 100;
var gravitational = 10000000;
var distance_r2 = 5000;
var distance_r = Math.sqrt(distance_r2);

var mouse_gravitational = 100;
var mouse_x;
var mouse_y;
var down = 1;
var string_color = "RGBA(0,0,222,0.1)";


var arry = new Array();
var x_place = new Array();
var y_place = new Array();
var x_speed = new Array();
var y_speed = new Array();

$('body').append('<canvas id="canv" ></canvas>');
x=$('#canv');
x.attr('width',window_width);
x.attr('height',window_height);
x.addClass('background_color_b');



$('body').mousemove(function(event){
		mouse_x = event.clientX;
		mouse_y = event.clientY;
		x_place[number] = mouse_x;
		y_place[number] = mouse_y;
	});
	
$('body').mousedown(function(event){
		if(down!=1){
			down=1;
			}else{
			down=0;	
			}
		});




$(window).resize(function(){
 window_width = $(this).width();
 window_height = $(this).height();
 x.attr('width',window_width);
 x.attr('height',window_height);
 x.addClass('background_color_b');
});

var ctx1 = $("#canv")[0].getContext("2d");
var ctx = document.getElementById("canv").getContext("2d")



function generate(){
	for(var i=0;i<number;i++){
	random_place(i);
	random_speed(i);
	ctx.beginPath();
	ctx.fillStyle="RGBA(0,0,222,0.1)";
	ctx.arc(x_place[i],y_place[i],10,0,Math.PI*2,true);
	ctx.fill();
	}
	
}



function random_place(i){
	x_place[i] = (Math.random()*window_width);
	y_place[i] = (Math.random()*window_height);
	}

function random_speed(i){
	x_speed[i] = (Math.random()*2-1);
	y_speed[i] = (Math.random()*2-1);
	}






function movement(){
	for(var i=0;i<number;i++){
	if(x_place[i]<2||x_place[i]>window_width-2){
	x_speed[i]=-x_speed[i]	
	}
	if(y_place[i]<2||y_place[i]>window_height-2){
	y_speed[i]=-y_speed[i]	
	}
	
	
	x_place[i]+=x_speed[i];
	y_place[i]+=y_speed[i];
	}
}
function draw(){
	ctx.clearRect(0,0,window_width,window_height);
	for(var i=0;i<=number;i++){
	ctx.beginPath();
	ctx.fillStyle="#00F";
	ctx.arc(x_place[i],y_place[i],0.7,0,Math.PI*2,true);
	ctx.fill();
	
	var x = x_place[i]-mouse_x;
	var y = y_place[i]-mouse_y;
	var distance = x*x+y*y;
	if(distance>(distance_r2-300)&&distance<(distance_r2+300)){
		
			x = x_place[i]+x_speed[i]-mouse_x;
			y = y_place[i]+y_speed[i]-mouse_y;
			distance = x*x+y*y;
			if(distance>(distance_r2+300)){
				x_speed[i]=-0.5*x_speed[i];
				y_speed[i]=-0.5*y_speed[i];
				
			}
		}
	
	
	for(var j=i+1;j<=number;j++){
			x = x_place[i]-x_place[j];
			y = y_place[i]-y_place[j];
			distance = x*x+y*y;
			if(distance<distance_r2){
				
				x_b = x>0 ? 1 : -1 ;
				y_b = y>0 ? 1 : -1 ;
					x_speed[i]-=down*x_b*Math.pow(x-distance_r, 2)/gravitational;
					x_speed[j]+=down*x_b*Math.pow(x-distance_r, 2)/gravitational;
					y_speed[i]-=down*y_b*Math.pow(y-distance_r, 2)/gravitational;
					y_speed[j]+=down*y_b*Math.pow(y-distance_r, 2)/gravitational;
				
				ctx.beginPath();
				ctx.moveTo(x_place[i],y_place[i]);
				ctx.lineTo(x_place[j],y_place[j]);
				ctx.strokeStyle="RGBA(0,0,222,0.7)";
				ctx.lineWidth=-0.7/distance_r2*distance+0.7;
				ctx.stroke();
				ctx.lineWidth=1;
				}
			}
			
			
			
			
			
		}
		ctx.beginPath();
		var grd = ctx.createRadialGradient(x_place[number],y_place[number],0,x_place[number],y_place[number],distance_r);
		grd.addColorStop(0,"RGBA(0,0,222,0.0)");
		grd.addColorStop(1,string_color);

		ctx.fillStyle=grd;
		ctx.arc(x_place[number],y_place[number],distance_r,0,2*Math.PI,true);
		ctx.fill()
	}
	

	


generate();

function proceed(){
	movement();
	draw();
	}
	
setInterval("proceed()",20);
