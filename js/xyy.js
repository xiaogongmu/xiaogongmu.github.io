//this is my is for index.html classify.html compiaint.html about.html
$(document).pjax('a[data-pjax]', '#wrapper', {
    maxCacheLength: 1000,
    cache: false,
    fragment: "#wrapper ",
    timeout: 8000
});


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

$(function() {
        setTimeout(function() {
            $(".fate").removeClass('out') }, 500);

});



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


sampleApp1();

    window["onscroll"] = function() {
        var s = document.documentElement.scrollTop||document.body.scrollTop;
        var sall =s+document.documentElement.clientHeight;
        console.log(sall+ ""+document.documentElement.scrollHeight )
        if (sall < document.documentElement.scrollHeight) {
            document.getElementById("footer-i").style.bottom = "-64px";
            
        } else {
            document.getElementById("footer-i").style.bottom = "0px";
            
        }
            document.body.style.transitio = "1s";

    }




