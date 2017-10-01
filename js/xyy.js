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
 });

$(document).ready(function() {
    NProgress.start();
});
$(window).load(function() {
    NProgress.done();
  
});

$(function() {
        setTimeout(function() {
            $(".fate").removeClass('out') }, 500)
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


