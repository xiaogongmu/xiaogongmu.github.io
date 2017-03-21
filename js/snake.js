// JavaScript Document

var begin=0;
var max_x=9;
var max_y=9;
var x = [];
var y = [];
var last_x;
var last_y;
var count = 0;
var direction = 39;
var tt;
var keep = 1;
var speed = 500;
var stoping = 0;


var table = document.createElement("table");
var div = document.getElementById("no1");
div.appendChild(table);
var tbody = document.createElement("tbody");
table.appendChild(tbody);
for(var i=1;i<=9;i++){
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	for(var j=1;j<=9;j++){
		var td =document.createElement("td");
		tr.appendChild(td);
		var div1 = document.createElement("div");
		div1.className="b";
		div1.id=i+"-"+j;
		td.appendChild(div1);
		
		}	
}



document.getElementById("start")["onclick"]=function(){
		begining();
		}
	function begining(){
		if(begin==0){
		x[count] = parseInt(Math.random()*max_x+1);
		y[count] = parseInt(Math.random()*max_y+1);
	 	var n=x[count]+"-"+y[count];
		document.getElementById(n).className="black";
		document.getElementById(n).exist="1";
		begin=1;
		food();
		speed=document.getElementById("selectSpeed").value
		tt=setInterval(auto,speed);
		}
	
	document.getElementById("again")["onclick"]=function(){
		clearInterval(tt);
		begin=0;
		x = [];
		y = [];
		last_x;
		last_y;
		count = 0;
		direction = 39;
		keep = 1;
		stoping = 0;
		for(i=1;i<=max_x;i++){
			for(j=1;j<=max_y;j++){
				var n = i+"-"+j;
				document.getElementById(n).className="b";
				document.getElementById(n).exist="0";
				document.getElementById(n).food="0";
				}
			}
			begining();
		}
	
	document.getElementById("stop")["onclick"]=function(){
		clearInterval(tt);
		stoping = 1;
		}
		
	document.getElementById("continue")["onclick"]=function(){
		if(stoping==1&&keep==1){
			tt=setInterval(auto,speed);
			stoping=0;
			}
		
	}
		
	
	function food(){
	var food_x=parseInt(Math.random()*max_x+1);
	var food_y=parseInt(Math.random()*max_y+1);
	var food_n=food_x+"-"+food_y;
	while(1){
		if(document.getElementById(food_n).exist=="1"){
			for(var i=1;i<=max_x;i++){
				if(food_x==max_x){
					food_x=1;
					}else{
				food_x++;
					}
				for(var j=1;j<=max_y;j++){
					if(food_y==max_y){
						food_y=1;
						}else{
					food_y++;
						}
					food_n=food_x+"-"+food_y;
					if(document.getElementById(food_n).exist!="1"){
						document.getElementById(food_n).className="food";
						document.getElementById(food_n).food="1";
						return;
						}
					if(i==max_x&&j==max_y){
					alert("哪个傻逼这么无聊竟然通关了");
					clearInterval(tt);
					return;
					}
					}
				}
			}
			document.getElementById(food_n).className="food";
			document.getElementById(food_n).food="1";
			return;
		}
	}
	
	
	function eatFood(){
		var n_x = x[0];
		var n_y = y[0];
		var n = n_x+"-"+n_y;
		if(document.getElementById(n).food=="1"){
			x[x.length]=last_x;
			y[y.length]=last_y;
			var n1 = last_x+"-"+last_y;
			document.getElementById(n1).className="black";
			document.getElementById(n1).exist="1";
			document.getElementById(n).food="0";
			food();
			}
	}
	
	function eraseTail(){
		var n_x=x[x.length-1];
	    var n_y=y[y.length-1];
		var n=n_x+"-"+n_y;
		document.getElementById(n).className="b";
		document.getElementById(n).exist="0";
		last_x=n_x;
		last_y=n_y;
		}
	
	function follow(){
		for(i=x.length-1;i>0;i--){
			x[i]=x[i-1];
			y[i]=y[i-1];
			}
		}
	
	function autoMove(){
		var move=direction;
		if(move==37){
			if(y[0]==1){
				y[0]=max_y;
				}else{
				y[0]--;	
				}
		}
		if(move==38){
			if(x[0]==1){
				x[0]=max_x;
				}else{	
				x[0]--;
				}
		}
		if(move==39){
			if(y[0]==max_y){
				y[0]=1;
				}else{
				y[0]++;
				}
			}
		if(move==40){
			if(x[0]==max_x){
				x[0]=1;
				}else{
				x[0]++;
				}
			}
		var n2 = x[0]+"-"+y[0];
		if(document.getElementById(n2).exist=="1"){
			alert("失败");
			keep=1;
			clearInterval(tt);
			}
		document.getElementById(n2).className="black";
		document.getElementById(n2).exist="1";
	}
	
	document.body["onkeydown"]=function(event){
		event=event||window.event;
		var move = event.keyCode;
		if(move==37||move==38||move==39||move==40){
			if(move==direction||Math.abs(move-direction)==2){
				return;
			}
			direction=move;			
		}
	}
	
	function auto(){
		eraseTail();
		follow();
		autoMove();
		eatFood();
	}

}