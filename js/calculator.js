// JavaScript Document
var count=0;
	var fuhao=1;
	var number1;
	var length;
	
function chick(numb){
  var input1;
  input1=document.getElementById("result1").value;
  var out = input1+numb;
  document.getElementById("result1").value=out;
  fuhao=0;
}



	

function chickjia(){
	if(fuhao==0){
	  var input1;
	  input1=document.getElementById("result1").value;
	  var out = input1+jia.value;
	  document.getElementById("result1").value=out;
	  count=0;
	  number1=input1;
	  length=number1.length;
	  fuhao=1;
  }
}

function chickjian(){
	if(fuhao==0){
	  var input1;
	  input1=document.getElementById("result1").value;
	  var out = input1+jian.value;
	  document.getElementById("result1").value=out;
	  count=0;
	  number1=input1;
	  length=number1.length;
	  fuhao=1;
  }
}

function chickcheng(){
	if(fuhao==0){
	  var input1;
	  input1=document.getElementById("result1").value;
	  var out = input1+cheng.value;
	  document.getElementById("result1").value=out;
	  count=0;
	  number1=input1;
	  length=number1.length;
	  fuhao=1;
  }
}

function chickchu(){
	if(fuhao==0){
	  var input1;
	  input1=document.getElementById("result1").value;
	  var out = input1+chu.value;
	  document.getElementById("result1").value=out;
	  count=0;
	  number1=input1;
	  length=number1.length;
	  fuhao=1;
  }
}







function chickdian(){
  var input1;
	if(count<1){
  input1=document.getElementById("result1").value;
  var out = input1+dian.value;
  document.getElementById("result1").value=out;
  count=count+1;
	}
}

function clean(){
	document.getElementById("result1").value=null;
	document.getElementById("result2").value=null;
	count=0;
	fuhao=1;
}

function delet(){

var re;
	re=document.getElementById("result1").value;
	var deletestr = re.charAt(re.length-1);
	if(deletestr=="."){
		count=0;
	}
	if(deletestr=="+"||deletestr=="-"||deletestr=="*"||deletestr=="/"){
		fuhao=0;
			re = document.getElementById("result1").value;
		}
	re=re.substr(0,re.length-1);
	document.getElementById("result1").value=re;

}

function calculate(){
	var result = document.getElementById("result1").value;
var arr = new Array();
var end;
var sum = 0;
var m = 0;

for(i=0,j=0;i<=result.length;i++){
  if(result.charAt(i)=="+"){
    arr[m]=result.substr(j,i-j);
    j=i+1;
    m++;
    arr[m]=result.charAt(i);
    m++;
    end=result.substring(j);
  }
  if(result.charAt(i)=="-"){
    arr[m]=result.substr(j,i-j);
    j=i+1;
    m++;
    arr[m]=result.charAt(i);
    m++;
    end=result.substring(j);
  }
  if(result.charAt(i)=="*"){
    arr[m]=result.substr(j,i-j);
    j=i+1;
    m++;
    arr[m]=result.charAt(i);
    m++;
    end=result.substring(j);
  }
  if(result.charAt(i)=="/"){
    arr[m]=result.substr(j,i-j);
    j=i+1;
    m++;
    arr[m]=result.charAt(i);
    m++;
    end=result.substring(j);
  }
}





arr[m]=end;

sum = fun(arr,1,m)



document.getElementById("result2").value=sum;
	}
	
	
function fun(arr,ii,m){


  
  if(arr[ii]=="+"){
    return parseFloat(arr[ii-1])+fun(arr,ii+2,m)
  }
  if(arr[ii]=="-"){
    return parseFloat(arr[ii-1])-fun(arr,ii+2,m)
  }
  if(arr[ii]=="*"){
    return parseFloat(arr[ii-1])*fun(arr,ii+2,m)
  }
  if(arr[ii]=="/"){
    return parseFloat(arr[ii-1])/fun(arr,ii+2,m)
  }

  return parseFloat(arr[ii-1]);

}
