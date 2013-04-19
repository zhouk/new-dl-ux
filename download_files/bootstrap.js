            var WebFontConfig = {
                custom: { families: ['FrutigerNextW04-Regular', 'FrutigerNextW04-Medium', 'Frutiger Next W04 Light','FrutigerNextW04-Italic'],
                    urls:['http://static.autodesk.net/etc/designs/v021/autodesk/adsk-design/clientlibs/css/fonts.css']}
            };
            (function() {
                document.getElementsByTagName("html")[0].className += " wf-loading";
                var wf = document.createElement('script');
                wf.src = 'http://static.autodesk.net/etc/designs/v021/autodesk/adsk-design/clientlibs/js/webfont.js';
                wf.async = 'true';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
            })();
            
			var MTIProjectId='223a0199-ecdd-4384-bc4b-ffb73752f9d4';
			 (function() {
			        var mtiTracking = document.createElement('script');
			        mtiTracking.type='text/javascript';
			        mtiTracking.async='true';
			        mtiTracking.src=('https:'==document.location.protocol?'https:':'http:')+'//fast.fonts.com/t/trackingCode.js';
			        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild( mtiTracking );
			   })();

	/*
* 页面配置
*/
var pageConfig = {
    /* 资源文件路径 */
    pathResource: 'https://s3-us-west-1.amazonaws.com/new-dl-ux/',

    /* 目标容器 */
    container: '#download-ux'
};

/*
* 隐藏或清除页面无关的元素
*/
var clearContent = (function() {
    //$('#main').hide();
    $('#slideshow').hide();
    $('h2.page_name').hide();
    $('h1.title_bar').hide();
    return function() {
        $(pageConfig['container']).html('').show();
    };
});

/*
* document.ready
*/
if(window.location.hash != "#admin") {
	$(function() {
	    clearContent();
	    loadStyle();
	    renderPage();
	});
}
/* 渲染页面 */
var renderPage = function() {
    /*$.get(pageConfig['pathResource'] + 'data.json',{r:Math.random()}, function(rs) {
    }, 'text');*/
        if (window.template) {
            //var data = eval('(' + rs + ')');console.log(data)
            var render = template.compile(contentTemplate);
            var renderedContent = render({ json: configJson });
            $(pageConfig['container']).html(renderedContent);
            pageEvents();
        }
};

/* 加载css */
var loadStyle = function() {
    $('head').append('<link rel="stylesheet" href="' + pageConfig['pathResource'] + 'style-download.css" />');
};

/* 页面动作/事件 */
var pageEvents = function() {
    tabSwitch($('.rec_box .tabs li'), $('.rec_box .onepage'));

    calcBgPos();
    window.onresize = function() {
        calcBgPos();
    };
};

/* tab 切换 */
var tabSwitch = function(hot, container, on_class) {
    on_class = on_class || 'on';
    var _timeOut = -1;
    hot.hover(function() {
        var obj = $(this);
        _timeOut = setTimeout(function() {
            var i = obj.index();
            obj.parent().children().not(obj.addClass(on_class)).removeClass(on_class);
            container.not($(container.get(i)).show()).hide();
        }, 100);
    }, function() {
        _timeOut = clearTimeout(_timeOut);
    });
};

/* 计算并改变背景图的位置 */
var calcBgPos = function() {
    var w = $('body').width(),
        pos_x = (w - 960) / 2 + 960;
    $('#page').css({
        'background-position': pos_x + 'px 175px'
    });
};

/* 渲染页面 */
var tmplHTML = ' \
';


/*artTemplate - Template Engine*/
var template = function(d, f) { return template["object" === typeof f ? "render" : "compile"].apply(template, arguments) }; (function(d, f) { d.version = "1.0"; d.openTag = "<%"; d.closeTag = "%>"; d.parser = null; d.render = function(a, c) { var b; b = k[a]; void 0 === b && !q && ((b = document.getElementById(a)) && d.compile(a, b.value || b.innerHTML), b = k[a]); return void 0 === b ? h({ id: a, name: "Render Error", message: "Not Cache" }) : b(c) }; d.compile = function(a, c, b) { function l(b) { try { return f.call(n, b) } catch (e) { if (!r) return d.compile(a, c, !0)(b); e.id = a || c; e.name = "Render Error"; e.source = c; return h(e) } } var r = b; "string" !== typeof c && (r = c, c = a, a = null); try { var f = v(c, r) } catch (i) { return i.id = a || c, i.name = "Syntax Error", h(i) } l.toString = function() { return f.toString() }; a && (k[a] = l); return l }; d.helper = function(a, c) { if (void 0 === c) return n[a]; n[a] = c }; var k = {}, n = {}, o = "".trim, q = o && !f.document, v = function(a, c) { function b(a) { m += a.split(/\n/).length - 1; a = a.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n"); a = j[1] + "'" + a + "'" + j[2]; return a + "\n" } function l(a) { var b = m; i ? a = i(a) : c && (a = a.replace(/\n/g, function() { m++; return "$line=" + m + ";" })); 0 === a.indexOf("=") && (a = j[1] + (o ? "$getValue(" : "") + a.substring(1).replace(/[\s;]*$/, "") + (o ? ")" : "") + j[2]); c && (a = "$line=" + b + ";" + a); f(a); return a + "\n" } function f(a) { a = a.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, ""); p.call(a.split(/[^\$\w\d]+/), function(a) { if (/^(this|\$helpers)$/.test(a)) throw { message: 'Prohibit the use of the "' + a + '"' }; a && !t[a] && !/^\d/.test(a) && !h[a] && (s += a + "=" + ("include" === a ? q : n[a] ? "$helpers." + a : "$data." + a) + ",", h[a] = !0) }) } var k = d.closeTag, i = d.parser, g, e = "", m = 1, h = { $out: !0, $line: !0 }, s = "var $helpers=this," + (c ? "$line=0," : ""), j = o ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], q = "function(id,data){if(data===undefined){data=$data}return $helpers.$render(id,data)}"; p.call(a.split(d.openTag), function(a) { var a = a.split(k), c = a[0], d = a[1]; 1 === a.length ? e += b(c) : (e += l(c), d && (e += b(d))) }); g = e; c && (g = "try{" + g + "}catch(e){e.line=$line;throw e}"); g = s + j[0] + g + "return " + j[3]; try { return new Function("$data", g) } catch (u) { throw u.temp = "function anonymous($data) {" + g + "}", u; } }, h = function(a) { function c() { return c + "" } var b = "[template]:\n" + a.id + "\n\n[name]:\n" + a.name; a.message && (b += "\n\n[message]:\n" + a.message); a.line && (b += "\n\n[line]:\n" + a.line, b += "\n\n[source]:\n" + a.source.split(/\n/)[a.line - 1].replace(/^[\s\t]+/, "")); a.temp && (b += "\n\n[temp]:\n" + a.temp); f.console && console.error(b); c.toString = function() { return "{Template Error}" }; return c }, p = Array.prototype.forEach || function(a, c) { for (var b = this.length >>> 0, d = 0; d < b; d++) d in this && a.call(c, this[d], d, this) }, t = {}; p.call("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","), function(a) { t[a] = !0 }); d.helper("$forEach", p); d.helper("$render", d.render); d.helper("$getValue", function(a) { return void 0 === a ? "" : a }) })(template, this); if ("undefined" !== typeof module && module.exports) module.exports = template;