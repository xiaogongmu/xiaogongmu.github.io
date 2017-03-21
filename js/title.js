// JavaScript Document
var title = document.title
document.body["onblur"]=function(){
	document.title="哼！被抛弃了";
}
document.body["onfocus"]=function(){
	document.title=title;
}