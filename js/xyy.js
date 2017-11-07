//this is my js for index.html classify.html compiaint.html about.html

//conf.. pjax
$(document).pjax('a[data-pjax]', '#wrapper', {
    maxCacheLength: 1000,
    cache: false,
    fragment: "#wrapper ",
    timeout: 8000
});

//user pjax conf.. NProgress
$(document).on('pjax:start', function() { NProgress.start(); });
$(document).on('pjax:end', function() { NProgress.done();
	 $(".fate").removeClass('out');
     if(this.URL.indexOf("clock.html")>-1){
     do_clock();
    }
 });

$(document).ready(function() {
    NProgress.start();
});
$(window).load(function() {
    NProgress.done();
  
});

//for start hidden to show
$(function() {
        setTimeout(function() {
            $(".fate").removeClass('out') }, 500);
});


//random picture for div
$(function(){
	var ar = new Array;
	$('img.activator').each(
		function(){

    	var n = Math.round(50*Math.random());
    	while (ar.indexOf(n)>-1) {
    		 n++;
    		 if (n>50) {
    		 	n=0;
    		 }
    	}
    	ar.push(n);
    	this.src="img/background/a"+n+".jpg ";
    })
});

//load live2d
sampleApp1();

// change scroll footer
window["onscroll"] = function() {
    var s = document.documentElement.scrollTop||document.body.scrollTop;
    var sall =s+document.documentElement.clientHeight;
    if (sall < document.documentElement.scrollHeight) {
        document.getElementById("footer-i").style.bottom = "-64px";
    } else {
        document.getElementById("footer-i").style.bottom = "0px";
    }
        document.body.style.transitio = "1s";
}




