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