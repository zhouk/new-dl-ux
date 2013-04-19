/*
* 页面配置
*/
var pageConfig = {
    /* 资源文件路径 */
    pathResource: '',

    /* 目标容器 */
    container: '#download-ux'
};

/*
* 隐藏或清除页面无关的元素
*/
var clearContent = (function() {
    var con = $(pageConfig['container']).hide();
    $('#slideshow').hide();
    $('h2.page_name').hide();
    $('h1.title_bar').hide();
    return function() {
        con.html('').show();
    };
})();

/*
* document.ready
*/
$(function() {
    if (window.location.hash != "#admin") {
        clearContent();
        //loadStyle();
        renderPage();
    } else {
        $('#page_wrapper,#page').css({ 'background-image': 'none' });
    }
});

/* 渲染页面 */
var renderPage = function() {
    if (window.template) {

    	template.helper('$getProduct', function(id, productList){
    		for(i=0; i<productList.length; i++){
    			if(productList[i].id == id) {
    				return productList[i];
    			}
    		}
    	});
    	
        $(pageConfig['container']).html(template.render('contentTemplate', JSON));
        pageEvents();
    };
};


/* 页面动作/事件 */
var pageEvents = function() {

    playPageCont($('.rec_box .tabs li')[0]);

	/*$('.rec_box .tabs li').each(function(){
		if(!$(this).hasClass('on')) $(this).click(function(){ playPageCont(this.id) });
	});*/
	$('.rec_box .tabs li').click(function(){ if(!$(this).hasClass('on')) playPageCont(this.id) })
    
	$('.rec_box .related a').click(function(e){ e.preventDefault(); e.stopPropagation(); playPageCont(this.href.substring(this.href.indexOf('#')+1)); });
    
    calcBgPos();
    window.onresize = function() {
        calcBgPos();
    };
    
    if('onhashchange' in window){
        window.onhashchange=function(e){
            e.preventDefault();
        };
    }
};

/* 播放页面 */
var playPageCont = function(tabId) {
    
    var prevIndex = -1,
    	tabIndex = 0;
    	
    var tabs = $('.rec_box .tabs li'),
        heros = $('.rec_box .onepage'),
        pages = $('.groupbox')
        
    tabs.each(function(index){
    	if($(this).hasClass('on')) prevIndex = index;
    	if(this.id == tabId) tabIndex = index;
    })

	var	targetTab 	= tabs.eq(tabIndex),
    	targetHero 	= heros.eq(tabIndex),
    	targetPage	= pages.eq(tabIndex);

    targetTab.addClass('on');
    tabs.not(targetTab).removeClass('on');
	
    heros.not(targetHero).hide();
    targetHero.css(
    	{'margin-left': tabIndex > prevIndex ? 960 : -960}
    	).show().animate({'margin-left': 0}, {duration: 300, queue: true});


	
    pages.not(targetPage).hide();
    targetPage.css({
        'margin-left': tabIndex > prevIndex ? 960 : -960
    }).show().animate({'margin-left': 0}, {duration: 300, queue: true});
    	
    
    
    /*var target=$('#' + (tabIndex+1) + '-' + (conIndex+1));
    if(target.length){
        setTimeout(function() {
            //window.scroll(0, target.offset().top);
            $('html').animate({scrollTop:target.offset().top});
        }, 500);
    }*/
};

/* 计算并改变背景图的位置 */
var calcBgPos = function() {
    var w = $('body').width(),
        pos_x = (w - 960) / 2 + 960;
    $('#page').css({
        'background-position': pos_x + 'px 113px'
    });
};

