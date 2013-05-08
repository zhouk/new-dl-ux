

var pageConfig = {
    /* 资源文件路径 */
    pathResource: '',

    /* 目标容器 */
    container: '#download-ux'
};

var clearContent = (function() {
    var con = $(pageConfig['container']).hide();
    $('#slideshow').hide();
    $('h2.page_name').hide();
    $('h1.title_bar').hide();
    return function() {
        con.html('').show();
    };
})();


$(document).ready(function() {
    if (window.location.hash != "#admin") {
        clearContent();
        loadStyle();
        renderPage();
    } else {
        $('#page_wrapper,#page').css({ 'background-image': 'none' });
    }
});

var loadStyle = function() {
	$('head').append('<link rel="stylesheet" href="http://static.autodesk.net/etc/designs/v021/autodesk/adsk-design/clientlibs/css/fonts.css">');
}

var renderPage = function() {
    if (window.template) {

    	template.helper('$getProduct', function(id, productList){
    		for(i=0; i<productList.length; i++){
    			if(productList[i].id == id) {
    				return productList[i];
    			}
    		}
    	});
    	
    	template.helper('$concatPath', function(nodes){
    		var path = nodes[0];
    		for(i=1; i<nodes.length; i++) {
    			path += '|' + nodes[i];
    		}
    		return path;
    	});
    	
        $(pageConfig['container']).html(template.render('contentTemplate', JSON));
        pageEvents();
    };
};

var pageEvents = function() {

    playPageCont($('.rec_box .tabs li')[5].id);

	/*$('.rec_box .tabs li').each(function(){
		if(!$(this).hasClass('on')) $(this).click(function(){ playPageCont(this.id) });
	});*/
	$('.rec_box .tabs li').click(function(){ if(!$(this).hasClass('on')) playPageCont(this.id) })
    
	$('.rec_box .related a').click(function(e){ e.preventDefault(); e.stopPropagation(); playPageCont(this.href.substring(this.href.indexOf('#')+1)); });
    
    calcBgPos();
    window.onresize = function() {
        calcBgPos();
    };
    
    enableSmoothScroll();
    util.tracking();
    /*
    if('onhashchange' in window){
        window.onhashchange=function(e){
            e.preventDefault();
            e.stopPropagation();
        };
    }*/
};

var enableSmoothScroll = function() {
	$('.product-badge, .product-dl-btn, .gotop').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$.smoothScroll({ scrollTarget: $(this).attr('href') });
	});
}

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

var calcBgPos = function() {
    var w = $('body').width(),
        pos_x = (w - 960) / 2 + 960;
    $('#page').css({
        'background-position': pos_x + 'px 113px'
    });
};

window.util = window.util || {};

util.tracking = function() {
	var e = util.tracking || {};

    e.linkClick = function (g, j, h) {
        var i = s_gi((adsk.a.getAccount) ? adsk.a.getAccount() : adsk.a.account);
        var status = typeof Oxygen == 'undefined' ? 'in' : 'out';
        i.eVar21 = adsk.s.trimToLength(255, adsk.s.getName() + " > " + status + " > " + g + " > " + j);
        i.prop21 = adsk.s.trimToLength(100, i.eVar21);
        i.linkTrackVars = "prop21,eVar21";
        if (h) {
            i.linkTrackVars += ",events";
            i.events = i.linkTrackEvents = h
        }
        i.usePlugins = false;
        i.tl(true, "o", i.prop21)
    };
    
    e.boot = function() {
    	$('.track').click(function(event){ e.linkClick($(this).attr('trackinggroup'), $(this).attr('trackingkey')); });
    };
    
    e.boot();
};

/* Smooth Scroll */
(function($){var version='1.4.10',defaults={exclude:[],excludeWithin:[],offset:0,direction:'top',scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:'swing',speed:400,autoCoefficent:2},getScrollable=function(opts){var scrollable=[],scrolled=false,dir=opts.dir&&opts.dir=='left'?'scrollLeft':'scrollTop';this.each(function(){if(this==document||this==window){return}var el=$(this);if(el[dir]()>0){scrollable.push(this)}else{el[dir](1);scrolled=el[dir]()>0;if(scrolled){scrollable.push(this)}el[dir](0)}});if(!scrollable.length){this.each(function(index){if(this.nodeName==='BODY'){scrollable=[this]}})}if(opts.el==='first'&&scrollable.length>1){scrollable=[scrollable[0]]}return scrollable},isTouch='ontouchend'in document;$.fn.extend({scrollable:function(dir){var scrl=getScrollable.call(this,{dir:dir});return this.pushStack(scrl)},firstScrollable:function(dir){var scrl=getScrollable.call(this,{el:'first',dir:dir});return this.pushStack(scrl)},smoothScroll:function(options){options=options||{};var opts=$.extend({},$.fn.smoothScroll.defaults,options),locationPath=$.smoothScroll.filterPath(location.pathname);this.unbind('click.smoothscroll').bind('click.smoothscroll',function(event){var link=this,$link=$(this),exclude=opts.exclude,excludeWithin=opts.excludeWithin,elCounter=0,ewlCounter=0,include=true,clickOpts={},hostMatch=((location.hostname===link.hostname)||!link.hostname),pathMatch=opts.scrollTarget||($.smoothScroll.filterPath(link.pathname)||locationPath)===locationPath,thisHash=escapeSelector(link.hash);if(!opts.scrollTarget&&(!hostMatch||!pathMatch||!thisHash)){include=false}else{while(include&&elCounter<exclude.length){if($link.is(escapeSelector(exclude[elCounter++]))){include=false}}while(include&&ewlCounter<excludeWithin.length){if($link.closest(excludeWithin[ewlCounter++]).length){include=false}}}if(include){event.preventDefault();$.extend(clickOpts,opts,{scrollTarget:opts.scrollTarget||thisHash,link:link});$.smoothScroll(clickOpts)}});return this}});$.smoothScroll=function(options,px){var opts,$scroller,scrollTargetOffset,speed,scrollerOffset=0,offPos='offset',scrollDir='scrollTop',aniProps={},aniOpts={},scrollprops=[];if(typeof options==='number'){opts=$.fn.smoothScroll.defaults;scrollTargetOffset=options}else{opts=$.extend({},$.fn.smoothScroll.defaults,options||{});if(opts.scrollElement){offPos='position';if(opts.scrollElement.css('position')=='static'){opts.scrollElement.css('position','relative')}}}opts=$.extend({link:null},opts);scrollDir=opts.direction=='left'?'scrollLeft':scrollDir;if(opts.scrollElement){$scroller=opts.scrollElement;scrollerOffset=$scroller[scrollDir]()}else{$scroller=$('html, body').firstScrollable()}opts.beforeScroll.call($scroller,opts);scrollTargetOffset=(typeof options==='number')?options:px||($(opts.scrollTarget)[offPos]()&&$(opts.scrollTarget)[offPos]()[opts.direction])||0;aniProps[scrollDir]=scrollTargetOffset+scrollerOffset+opts.offset;speed=opts.speed;if(speed==='auto'){speed=aniProps[scrollDir]||$scroller.scrollTop();speed=speed/opts.autoCoefficent}aniOpts={duration:speed,easing:opts.easing,complete:function(){opts.afterScroll.call(opts.link,opts)}};if(opts.step){aniOpts.step=opts.step}if($scroller.length){$scroller.stop().animate(aniProps,aniOpts)}else{opts.afterScroll.call(opts.link,opts)}};$.smoothScroll.version=version;$.smoothScroll.filterPath=function(string){return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'')};$.fn.smoothScroll.defaults=defaults;function escapeSelector(str){return str.replace(/(:|\.)/g,'\\$1')}})(jQuery);