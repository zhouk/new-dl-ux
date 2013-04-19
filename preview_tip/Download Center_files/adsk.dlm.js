	var msiPath="http://efulfillment.autodesk.com/utilities/DLM/1/AutodeskDownloadManagerSetup.exe";
	var g_postedVersion = "1.0.117.0";
	var g_ADSKDLMVersion  = "";
	var g_bUserClosed  = false;
	var g_language  = "";
	var g_link  = "";
	var g_installol;
	var g_installopen = false;
	var olhelp;
	var resPath = "http://efulfillment.autodesk.com/utilities/DLM/1/images/"
	var g_fncbHelpme;
	
	var helpMeReturn = {   
		Cancel:0,
		ESD:1,
		DLM:2,
		WI:3		
	}
	
	function HelpMeDecide(locale,showWI,fnCallback)
	{
		showHelpMeDlg(locale,showWI);
		g_fncbHelpme = fnCallback;
	}
	
	function LaunchApp(locale,url)
	{
		g_bUserClosed = false;
		g_installopen = false;
		var newurl = "ADSK.DLM://autodesk.com/%5B"+url+"%5D";
		if(locale == null) locale = 'en-US';
		
		setLaunguage(locale);
		g_ADSKDLMVersion  = "";
		DownloadBtnClick(newurl);
	}
	function getADSKDLMVersion(data) {
	    g_ADSKDLMVersion  = data["AdDLMgr.exe"];
	}
	function detectADSKDLM() {
	    var ram_  = Math.random();
	     var url_  = "http://localhost:49009/api?function=getClientAttributes&r="  + ram_  + "&callback=getADSKDLMVersion";
	    var request  = $.ajax({
	        url : url_
	        , type : "GET"
	        , cache : false
	        , crossDomain : true
	        , dataType : "script"
	        , timeout : 500
	        , error : function(jqXHR, textStatus, errorThrown)  {
	            setTimeout(detectADSKDLM2, 1);
	        }
	        , success : function(data)  {
	            eval(data);
	        }
	    });
	}
	function detectADSKDLM2() {
	    var ram_2  = Math.random();
	     var url_2  = "http://localhost:39009/api?function=getClientAttributes&r="  + ram_2  + "&callback=getADSKDLMVersion";
	    var request  = $.ajax({
	        url : url_2
	        , type : "GET"
	        , cache : false
	        , crossDomain : true
	        , dataType : "script"
	        , timeout : 500
	        , error : function(jqXHR, textStatus, errorThrown)  {
	            g_ADSKDLMVersion  = "not installed";
	        }
	        , success : function(data)  {
	            eval(data);
	        }
	    });
	}

	function detectAll() {
	    detectADSKDLM();
	    setTimeout(showDetectResult, 2000);
	}
	
	function DownloadBtnClick(url) {
		g_link  = url;
		 detectAll();
	}
	function showDetectResult() {
	    if (g_bUserClosed) {
		return;
	    }
	    if (g_ADSKDLMVersion  == "not installed") {
		if(!g_installopen) showInstallDlg(g_language);
		    } else {
		    if(toUpdate()){
		    	if(!g_installopen) showUpgradeDlg(g_language);
		    }
		    else{
				$('body').append('<iframe id="launchIframe" style="display:none"/>');
				$('#launchIframe').attr('src', unescape(g_link));
				closeInstallDlg();
			}
		    }
    
	    if (g_installopen) 
	    {
		setTimeout(detectAll, 1000);
		return;
	    }
	}
	
	function showInstallDlg(lang) {
		//createInstallDlg();
	    g_installol  = $("#installdlg").overlay({api: true});
	    document.getElementById("dlgheader").innerHTML= ADSKDLMResourceStrings[lang]['installInstHeader'];
	    document.getElementById("dlgaddinfo").innerHTML= ADSKDLMResourceStrings[lang]['installAdditionalInfo'];
	    document.getElementById("dlgaddinfo").href= getHelpURL(lang,'dlm');
            document.getElementById("dlgaddinfo").target="_newtab";
    	
	    document.getElementById("dlgmessage").innerHTML= ADSKDLMResourceStrings[lang]['installInstMessage'];
	    document.getElementById("dlgstep1").innerHTML= ADSKDLMResourceStrings[lang]['installStep1'];
	    document.getElementById("dlgstep2").innerHTML= ADSKDLMResourceStrings[lang]['installStep2'];
	    document.getElementById("dlgstep3").innerHTML= ADSKDLMResourceStrings[lang]['installStep3'];
	    document.getElementById("dlgstep4").innerHTML= ADSKDLMResourceStrings[lang]['installStep4'];
	    var installString = ADSKDLMResourceStrings[lang]['installFooter'];
	    installString = installString.replace("http://www.autodesk.com/",msiPath);
	    document.getElementById("dlgfooter").innerHTML= installString +'<a href="'+msiPath+'"><img src="'+resPath+'blue_arrow.png" style="margin-left:4px;margin-top:2px;vertical-align:text-top;"></a>';
	    //document.getElementById("dlgfooter").innerHTML= ADSKDLMResourceStrings[lang]['installFooter']
	    g_installol.load();
	    g_installopen = true;
	    $('body').append('<iframe id="launchIframe" style="display:none"/>');
	    $('#launchIframe').attr('src', msiPath);
	    //window.location.href=msiPath;
	}
	
	function createInstallDlg() {
	var dlgDiv = 	'<div class="reset"><div id="installdlg" ><div>';
	dlgDiv +=	'<h1><a id="dlgheader" style="margin-left:10px;">Autodesk Download Manager</a><a onclick="userClose()" href="#"><img src="'+resPath+'close_14.png" style="float: right; margin:5px;" ></a></h1>';
	dlgDiv +=	'<h2><a id="dlgaddinfo" style="float: right;">Autodesk Download Manager</a><img src="'+resPath+'info_16.png" style="margin-right:5px; float: right;"></h2>';
	dlgDiv +=	'<h3><a id="dlgmessage" >When shown the "Save or Run File" dialog, choose "Run"</a><br></h3>';
	dlgDiv +=	'<h4><img src="'+resPath+'circle_1.png" style="float: left; margin-right:9px;"><a id="dlgstep1" >When shown the "Save or Run File" dialog, choose "Run"</a><br><img src="'+resPath+'step1_graphic.png" style="margin-top: 9px;text-align:center; margin-left:145px;"></h4>';
	dlgDiv +=	'<h4><img src="'+resPath+'circle_2.png" style="float: left; margin-right:9px;"><a id="dlgstep2" >Follow the steps in the setup wizard.</a><br><img src="'+resPath+'step2_graphic.png" style="margin-top: 9px;text-align:center; margin-left:145px;"></h4>';
	dlgDiv +=	'<h4 style="height: 86px;"><img src="'+resPath+'circle_3.png" style="float: left; margin-right:9px;"><a id="dlgstep3" >If you receive a browser warning, choose "Allow" (we also recommend turning off this warning for future downloads from Autodesk).</a><br><img src="'+resPath+'step3_graphic.png" style="margin-top: 9px;text-align:center; margin-left:130px;"></h4>';
	dlgDiv +=	'<h5><img src="'+resPath+'checkmark.png" style="float: left; margin-right:9px;"><a id="dlgstep4" >Autodesk Download Manager is now ready and will automatically begin delivering your selection.</a><br><img src="'+resPath+'DLM.png" style="margin-top: 9px;text-align:center; margin-left:70px;"></h5>';
	dlgDiv +=	'<h6 id="dlgfooter">footer</h6>';
	dlgDiv +=	'</div></div></div>';
	$('body').append(dlgDiv);
	}

	function closeInstallDlg() {
	    if(g_installopen)
	    {
	    	g_installol.close();
	    }
	    g_installopen = false;
	}

	
	function showUpgradeDlg(lang) {
		g_installol  = $("#installdlg").overlay({api: true});
	    document.getElementById("dlgheader").innerHTML= ADSKDLMResourceStrings[lang]['installUpgHeader'];
	    document.getElementById("dlgaddinfo").innerHTML= ADSKDLMResourceStrings[lang]['installAdditionalInfo'];
	    document.getElementById("dlgaddinfo").href= getHelpURL(lang,'dlm');
            document.getElementById("dlgaddinfo").target="_newtab";
	    document.getElementById("dlgmessage").innerHTML= ADSKDLMResourceStrings[lang]['installUpgmessage'];
	    document.getElementById("dlgstep1").innerHTML= ADSKDLMResourceStrings[lang]['installStep1'];
	    document.getElementById("dlgstep2").innerHTML= ADSKDLMResourceStrings[lang]['installStep2'];
	    document.getElementById("dlgstep3").innerHTML= ADSKDLMResourceStrings[lang]['installStep3'];
	    document.getElementById("dlgstep4").innerHTML= ADSKDLMResourceStrings[lang]['installStep4'];
	    var installString = ADSKDLMResourceStrings[lang]['installFooter'];
	    installString = installString.replace("http://www.autodesk.com/",msiPath);
	    document.getElementById("dlgfooter").innerHTML= installString +'<a href="'+msiPath+'"><img src="'+resPath+'blue_arrow.png" style="margin-left:4px;margin-top:2px;vertical-align:text-top;"></a>';
	    
	    g_installol.load();
	    g_installopen = true;
	    $('body').append('<iframe id="launchIframe" style="display:none"/>');
	    $('#launchIframe').attr('src', msiPath);
	    //window.location.href=msiPath;
	}

	function createUpgradeDlg() {
	var dlgDiv = 	'<div class="reset"><div id="upgradedlg" ><div>';
	dlgDiv +=	'<h1><a id="dlgheader" style="margin-left:10px;">Autodesk Download Manager</a><a onclick="userClose()" href="#"><img src="'+resPath+'close_14.png" style="float: right; margin:5px;" ></a></h1>';
	dlgDiv +=	'<h2><a id="dlgaddinfo" style="float: right;">Autodesk Download Manager</a><img src="'+resPath+'info_16.png" style="margin-right:5px; float: right;"></h2>';
	dlgDiv +=	'<h3><a id="dlgmessage" >When shown the "Save or Run File" dialog, choose "Run"</a><br></h3>';
	dlgDiv +=	'<h4><img src="'+resPath+'circle_1.png" style="float: left; margin-right:9px;"><a id="dlgstep1" >When shown the "Save or Run File" dialog, choose "Run"</a><br><img src="'+resPath+'step1_graphic.png" style="margin-top: 9px;text-align:center; margin-left:145px;"></h4>';
	dlgDiv +=	'<h4><img src="'+resPath+'circle_2.png" style="float: left; margin-right:9px;"><a id="dlgstep2" >Follow the steps in the setup wizard.</a><br><img src="'+resPath+'step2_graphic.png" style="margin-top: 9px;text-align:center; margin-left:145px;"></h4>';
	dlgDiv +=	'<h4 style="height: 86px;"><img src="'+resPath+'circle_3.png" style="float: left; margin-right:9px;"><a id="dlgstep3" >If you receive a browser warning, choose "Allow" (we also recommend turning off this warning for future downloads from Autodesk).</a><br><img src="'+resPath+'step3_graphic.png" style="margin-top: 9px;text-align:center; margin-left:130px;"></h4>';
	dlgDiv +=	'<h5><img src="'+resPath+'checkmark.png" style="float: left; margin-right:9px;"><a id="dlgstep4" >Autodesk Download Manager is now ready and will automatically begin delivering your selection.</a><br><img src="'+resPath+'DLM.png" style="margin-top: 9px;text-align:center; margin-left:70px;"></h5>';
	dlgDiv +=	'<h6><a id="dlgfooter">footer</a><a href='+msiPath+'><img src="'+resPath+'blue_arrow.png" style="margin-left:4px;margin-top:2px;vertical-align:text-top;" ></a></h6>';
	dlgDiv +=	'</div></div></div>';
	$('body').append(dlgDiv);
	
	}

	

	function parseVersionString (str)  {
	    if (typeof(str)  != 'string')  {
		return false;
	    }
	    var x  = str.split('.');
	    // parse from string or default to 0 if can't parse
	    var maj  = parseInt(x[0])  || 0;
	    var min  = parseInt(x[1])  || 0;
	    var bld  = parseInt(x[2])  || 0;
	    var pat  = parseInt(x[3])  || 0;
	    return  {
		major: maj
		, minor: min
		, build: bld
		, patch: pat
	    }
	}


	function toUpdate() {
	    var running_version  = parseVersionString(g_ADSKDLMVersion);
	    var posted_version  = parseVersionString(g_postedVersion);
	    if(running_version.major  < posted_version.major) {
		return true;
	    }
	    if(running_version.major  > posted_version.major) {
		return false;
	    }
	    if(running_version.minor  < posted_version.minor) {
		return true;
	    }
	    if(running_version.minor  > posted_version.minor) {
		return false;
	    }
	    if(running_version.build  < posted_version.build) {
		return true;
	    }
	    if(running_version.build  > posted_version.build) {
		return false;
	    }
	    if(running_version.patch  < posted_version.patch) {
		return true;
	    }
	    if(running_version.patch  > posted_version.patch) {
		return false;
	    }
	    return false;
	}

	function userClose(){
		g_bUserClosed = true;
		closeInstallDlg();
	}
	
	function getLaunguage() {
		if( navigator.userAgent.indexOf('MSIE') != -1 ) 
		{
		   	g_language = navigator.systemLanguage;
		}
		else
		{
			g_language = navigator.language;
		}
		alert (g_language);
	}
	function setLaunguage(lang) {
		g_language = lang;
	}
	$(document).ready(function() {
	try
	{
		createInstallDlg();
		createUpgradeDlg();
		var installtrigger= $("#installdlg").overlay({
			// custom top position
			top: 10,
			mask: {
				color: '#000',
				opacity: 0.5
			},
			// disable this for modal dialog-type of overlays
			closeOnClick: false,
			// we want to use the programming API
			api: true
		});
		var upgtrigger= $("#upgradedlg").overlay({
				// custom top position
				top: 10,
				mask: {
					color: '#000',
					opacity: 0.5
				},
				// disable this for modal dialog-type of overlays
				closeOnClick: false,
				// we want to use the programming API
				api: true
		});
		addHelpMeDialog();
		var helptrigger= $("#helptodecide").overlay({
			// custom top position
			top: 10,
			mask: {
				color: '#000',
				opacity: 0.5
			},
			// disable this for modal dialog-type of overlays
			closeOnClick: false,
			// we want to use the programming API
			api: true
		});

		
	}
	catch (err)
	{
	}

	

	
});



var btntextdownload="Use Download Now";
var btntextinstall="Use Install Now";
var btntextbrowser="Use Browser Download";
var dlmlabels = [btntextbrowser,btntextdownload,btntextinstall];
var ADSKDLMHelpURL = {
	dlm:{
		'en-US': 'http://www.autodesk.com/dlm-help-enu',
		'zh-CN': 'http://www.autodesk.com/dlm-help-chs',
		'zh-TW': 'http://www.autodesk.com/dlm-help-cht',
		'cs-CZ': 'http://www.autodesk.com/dlm-help-csy',
		'de-DE': 'http://www.autodesk.com/dlm-help-deu',
		'es-ES': 'http://www.autodesk.com/dlm-help-esp',
		'fr-FR': 'http://www.autodesk.com/dlm-help-fra',
		'hu-HU': 'http://www.autodesk.com/dlm-help-hun',
		'it-IT': 'http://www.autodesk.com/dlm-help-ita',
		'ja-JP': 'http://www.autodesk.com/dlm-help-jpn',
		'ko-KR': 'http://www.autodesk.com/dlm-help-kor',
		'nl-NL': 'http://www.autodesk.com/dlm-help-enu',
		'pl-PL': 'http://www.autodesk.com/dlm-help-plk',
		'pt-BR': 'http://www.autodesk.com/dlm-help-ptb',
		'ru-RU': 'http://www.autodesk.com/dlm-help-rus',
		'sv-SE': 'http://www.autodesk.com/dlm-help-enu'	 
	},
	wi:{
		'en-US': 'http://www.autodesk.com/installnow-help-enu',
		'zh-CN': 'http://www.autodesk.com/installnow-help-chs',
		'zh-TW': 'http://www.autodesk.com/installnow-help-cht',
		'cs-CZ': 'http://www.autodesk.com/installnow-help-csy',
		'de-DE': 'http://www.autodesk.com/installnow-help-deu',
		'es-ES': 'http://www.autodesk.com/installnow-help-esp',
		'fr-FR': 'http://www.autodesk.com/installnow-help-fra',
		'hu-HU': 'http://www.autodesk.com/installnow-help-hun',
		'it-IT': 'http://www.autodesk.com/installnow-help-ita',
		'ja-JP': 'http://www.autodesk.com/installnow-help-jpn',
		'ko-KR': 'http://www.autodesk.com/installnow-help-kor',
		'nl-NL': 'http://www.autodesk.com/installnow-help-enu',
		'pl-PL': 'http://www.autodesk.com/installnow-help-plk',
		'pt-BR': 'http://www.autodesk.com/installnow-help-ptb',
		'ru-RU': 'http://www.autodesk.com/installnow-help-rus',
		'sv-SE': 'http://www.autodesk.com/installnow-help-enu'	 		
	}

}
	
		
var Carousel = function(options){
	this.SetOptions(options);
	this.lButton = this.options.lButton;
	this.rButton = this.options.rButton;
	this.oList = this.options.oList;
	this.showSum = this.options.showSum;
	this.selectedItem = 0;
	this.iList = $("#" + this.options.oList + " > li");
	this.iListSum = this.iList.length;
	this.iListWidth = 566;//this.iList.outerWidth(true);
	this.moveWidth = this.iListWidth * this.showSum;
	this.dividers = Math.ceil(this.iListSum/this.showSum);
	this.moveMaxOffset = (this.dividers - 1) * this.moveWidth;
	this.LeftScroll();
	this.RightScroll();
};
Carousel.prototype = {
	SetOptions: function(options){
		this.options = {
			lButton: "left_scroll",
			rButton: "right_scroll",
			oList: "slider_ul",
			showSum: 1
		};
	$.extend(this.options, options || {});
	},
	ReturnLeft: function(){
		return isNaN(parseInt($("#" + this.oList).css("left"))) ? -505 : parseInt($("#" + this.oList).css("left"));
	},
	LeftScroll: function(){
		if(this.dividers == 1) return;
		var _this = this, currentOffset;
		$("#" + this.lButton).click(function(){
			currentOffset = _this.ReturnLeft();
			if(currentOffset == -505){
				var lastItem = $("#" + _this.oList);
				var lastItemX = lastItem.css("left");
				for(var i = 1; i <= _this.showSum; i++){
					var preDeleteItem =  $(_this.iList[_this.iListSum - i]);
					preDeleteItem.clone().prependTo($("#" + _this.oList));
				}
				var t = parseInt(lastItemX)-_this.iListWidth;
				$("#" + _this.oList).css({ left:t+"px" });
				$("#" + _this.oList + ":not(:animated)").animate( { left: "+=" + _this.iListWidth }, { duration: "slow", complete: function(){
					preDeleteItem.remove();
					_this.iList = $("#" + _this.options.oList + " > li");
					_this.iListSum = _this.iList.length;
					_this.selectedItem = $(_this.iList[1]).attr("data-id");
					//var dlmlabels = [btntextdownload,btntextinstall,btntextbrowser];
					$("#decideBtn").attr("value",dlmlabels[_this.selectedItem]);
					$("#decideBtn").attr("title",dlmlabels[_this.selectedItem]);
					$("#decideBtn").attr("data-id",_this.selectedItem);

					} } );
			}
		});
	},

	RightScroll: function(){
		if(this.dividers == 1) return;
		var _this = this, currentOffset;
		$("#" + this.rButton).click(function(){
			currentOffset = _this.ReturnLeft();
			if(currentOffset == -505){
				for(var i = 0; i < _this.showSum; i++){
					var preDeleteItem =  $(_this.iList[0]);
						preDeleteItem.clone().appendTo($("#" + _this.oList));
				}
				var lastItem = $("#" + _this.oList);
				var lastItemX = lastItem.css("left");
				$("#" + _this.oList).css({ left: lastItemX });
				$("#" + _this.oList + ":not(:animated)").animate( { left: "-=" + _this.iListWidth }, { duration: "slow", complete: function(){
						preDeleteItem.remove();
						$("#" + _this.oList).css({ left: lastItemX });
						_this.iList = $("#" + _this.options.oList + " > li");
						_this.iListSum = _this.iList.length;
						_this.selectedItem = $(_this.iList[1]).attr("data-id");
						//var dlmlabels = [btntextdownload,btntextinstall,btntextbrowser];
						$("#decideBtn").attr("value",dlmlabels[_this.selectedItem]);
						$("#decideBtn").attr("title",dlmlabels[_this.selectedItem]);
						$("#decideBtn").attr("data-id",_this.selectedItem);
					} } );
			}
		});
	}
};


function getDownloadPane(locale)
{
	var htmlDownloadPane = '<div id="downloadnow">';
	htmlDownloadPane +=	'<h1><b id="downloadheader" style="float: left; color: #2A2A2A;font-weight: bold">Download Now</b><a id="downloadaddinfo" style="float: right; font-size: 12px;">Additional Information</a><a id="imgdownloadaddinfo"><img  src="'+resPath+'info_16.png" style="margin-right:5px; float: right;"></a></h1>';
	htmlDownloadPane +=	'<hr><h2><img src="'+resPath+'downloadnow.png" style="margin-right:5px; float: left;">';
	htmlDownloadPane +=	'<b id="downloadtitle1" style="color: #F78C34;line-height:16px;">Benefits</b><br>';
	htmlDownloadPane +=	'<a id="downloaddesc1" style="color: #2A2A2A;">Delivers a complete standalone installation package with up to 50% compression and automatic download resumption after connection interruptions.</a>';
	htmlDownloadPane +=	'<br><br><b id="downloadtitle2" style="color: #F78C34;line-height:16px;">What Happens</b><br>';
	htmlDownloadPane +=	'<a id="downloaddesc2" style="color: #2A2A2A;">A small download manager is first installed and enables an optimized download of the complete software installation package.  Once the installation package has downloaded you can begin the software installation on this or other computers without further connection to the internet.</a>';
	htmlDownloadPane +=	'<br><br><b id="downloadtitle3" style="color: #F78C34;line-height:16px;">Recommended for</b><br>';
	htmlDownloadPane +=	'<a id="downloaddesc3" style="color: #2A2A2A;">Best option for installing Autodesk products on a different computer, or at a different time.</a><br></h2></div>';
	return htmlDownloadPane;
}

function getInstallPane(locale)
{
	var htmlInstallPane = '<div id="installnow">';
	htmlInstallPane +=	'<h1><b id="installheader" style="float: left; color: #2A2A2A;">Install Now</b><a id="installaddinfo" style="float: right; font-size: 12px;">Additional Information</a><a id="imginstalladdinfo"><img  src="'+resPath+'info_16.png" style="margin-right:5px; float: right;"></a></h1>';
	htmlInstallPane +=	'<hr><h2><img src="'+resPath+'installnow.png" style="margin-right:5px; float: left;">';
	htmlInstallPane +=	'<b id="installtitle1" style="color: #F78C34;line-height:16px;">Benefits</b><br>';
	htmlInstallPane +=	'<a id="installdesc1" style="color: #2A2A2A;">Delivers a complete standalone installation package with up to 50% compression and automatic download resumption after connection interruptions.</a>';
	htmlInstallPane +=	'<br><br><b id="installtitle2" style="color: #F78C34;line-height:16px;">What Happens</b><br>';
	htmlInstallPane +=	'<a id="installdesc2" style="color: #2A2A2A;">A small download manager is first installed and enables an optimized download of the complete software installation package.  Once the installation package has downloaded you can begin the software installation on this or other computers without further connection to the internet.</a>';
	htmlInstallPane +=	'<br><br><b id="installtitle3" style="color: #F78C34;line-height:16px;">Recommended for</b><br>';
	htmlInstallPane +=	'<a id="installdesc3" style="color: #2A2A2A;">Best option for installing Autodesk products on a different computer, or at a different time.</a><br></h2></div>';
	return htmlInstallPane;
}

function getBrowserPane(locale)
{
	var htmlBrowserPane = '<div id="browserdownload">';
	htmlBrowserPane +=	'<h1><b id="browserheader" style="float: left; color: #2A2A2A;">Browser Download</b></h1>';
	htmlBrowserPane +=	'<hr><h2><img src="'+resPath+'browserdownload.png" style="margin-right:5px; float: left;">';
	htmlBrowserPane +=	'<b id="browsertitle1" style="color: #F78C34;line-height:16px;">Benefits</b><br>';
	htmlBrowserPane +=	'<a id="browserdesc1" style="color: #2A2A2A;">Delivers a complete standalone installation package with up to 50% compression and automatic download resumption after connection interruptions.</a>';
	htmlBrowserPane +=	'<br><br><b id="browsertitle2" style="color: #F78C34;line-height:16px;">What Happens</b><br>';
	htmlBrowserPane +=	'<a id="browserdesc2" style="color: #2A2A2A;">A small download manager is first installed and enables an optimized download of the complete software installation package.  Once the installation package has downloaded you can begin the software installation on this or other computers without further connection to the internet.</a>';
	htmlBrowserPane +=	'<br><br><b id="browsertitle3" style="color: #F78C34;line-height:16px;">Recommended for</b><br>';
	htmlBrowserPane +=	'<a id="browserdesc3" style="color: #2A2A2A;">Best option for installing Autodesk products on a different computer, or at a different time.</a><br></h2></div>';
	return htmlBrowserPane;
}

function addHelpMeDialog()
{
	var htmlHelpMe = '<div class="reset"><div id="helptodecide"></div></div>';
	$('body').append(htmlHelpMe);
	createHelpMeDialog('en-US',true);
}

function createHelpMeDialog(locale,showWI)
{
	
	var htmlHelpMe = '<h4><a id="helpdecideheader" style="margin-left:10px; color: #2A2A2A;">Help me decide a download type</a><img src="'+resPath+'close_14.png" style="float: right; margin:5px; cursor:pointer;" onclick="closeHelpMeDlg(0)"></h4>';
    	htmlHelpMe += '<div id="slider_container"><div id="slider_inner"><ul id="slider_ul">';
	
	if(showWI)
	{
		htmlHelpMe += '<li data-id="0">'+getBrowserPane(locale) + '</li>';
		htmlHelpMe += '<li data-id="1">'+getDownloadPane(locale) + '</li>';
		htmlHelpMe += '<li data-id="2">'+getInstallPane(locale) + '</li>';
	}
	else
	{	
		htmlHelpMe += '<li data-id="0">'+getBrowserPane(locale) + '</li>';
		htmlHelpMe += '<li data-id="1">'+getDownloadPane(locale) + '</li>';
		htmlHelpMe += '<li data-id="0">'+getBrowserPane(locale) + '</li>';
		htmlHelpMe += '<li data-id="1">'+getDownloadPane(locale) + '</li>';
	}
	
	htmlHelpMe += '</ul></div>';
	htmlHelpMe += '<div id="left_scroll"></div><div id="right_scroll"></div><div id="slider_bottom_btn"><ul id="slider_btn">';
	
	if(showWI)
	{
		htmlHelpMe += '<li data-id="0"></li><li data-id="1"></li><li data-id="2"></li>';
		dlmlabels = [btntextbrowser,btntextdownload,btntextinstall];
	}
	else
	{
		htmlHelpMe += '<li data-id="0"></li><li data-id="1"></li><li data-id="2"></li><li data-id="3"></li>';
		dlmlabels = [btntextbrowser,btntextdownload,btntextbrowser,btntextdownload];
	}
	
	
        htmlHelpMe += '</ul></div></div><div>';
        htmlHelpMe += '<input type="button" id="decideBtn" class="dlm-ui-button default close" data-id="1" style="background-color:#E2E2E2;float:right;margin-top:30px;margin-right:20px;height:24px;width:200px;" value="Use Download Now" title="Use Download Now" onclick="decidedBtn(event)" />';
	htmlHelpMe += '</div>';
	document.getElementById("helptodecide").innerHTML = htmlHelpMe;
}

function showHelpMeDlg(lang,showWI) {
	createHelpMeDialog(lang,showWI);
 	olhelp  = $("#helptodecide").overlay({api: true });
 	btntextbrowser= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadActionBtn'];
 	btntextdownload= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowActionBtn'];
 	btntextinstall= ADSKDLMResourceStrings[lang]['helpDecideInstallNowActionBtn'];
	document.getElementById("downloadheader").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowHeader'];
	document.getElementById("downloadaddinfo").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowAdditionalInfo'];
	document.getElementById("downloadtitle1").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowTitle1'];
	document.getElementById("downloaddesc1").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowDesc1'];
	document.getElementById("downloadtitle2").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowTitle2'];
	document.getElementById("downloaddesc2").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowDesc2'];
	document.getElementById("downloadtitle3").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowTitle3'];
	document.getElementById("downloaddesc3").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowDesc3'];
    	document.getElementById("imgdownloadaddinfo").href= getHelpURL(lang,'dlm');
    	document.getElementById("imgdownloadaddinfo").target="_newtab";
    	document.getElementById("downloadaddinfo").href= getHelpURL(lang,'dlm');
    	document.getElementById("downloadaddinfo").target="_newtab";
    	dlmlabels = [btntextbrowser,btntextdownload,btntextbrowser,btntextdownload];
    	
	if(showWI)
	{
		document.getElementById("installheader").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowHeader'];
		document.getElementById("installaddinfo").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowAdditionalInfo'];
		document.getElementById("installtitle1").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowTitle1'];
		document.getElementById("installdesc1").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowDesc1'];
		document.getElementById("installtitle2").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowTitle2'];
		document.getElementById("installdesc2").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowDesc2'];
		document.getElementById("installtitle3").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowTitle3'];
		document.getElementById("installdesc3").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideInstallNowDesc3'];
		document.getElementById("installaddinfo").href= getHelpURL(lang,'wi');
		document.getElementById("installaddinfo").target="_newtab";
		document.getElementById("imginstalladdinfo").href= getHelpURL(lang,'wi');
		document.getElementById("imginstalladdinfo").target="_newtab";
		dlmlabels = [btntextbrowser,btntextdownload,btntextinstall];
	}
    
    	document.getElementById("browserheader").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadHeader'];
    	document.getElementById("browsertitle1").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadTitle1'];
    	document.getElementById("browserdesc1").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadDesc1'];
    	document.getElementById("browsertitle2").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadTitle2'];
    	document.getElementById("browserdesc2").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadDesc2'];
    	document.getElementById("browsertitle3").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadTitle3'];
	document.getElementById("browserdesc3").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideBrowserDownloadDesc3'];
    
	document.getElementById("helpdecideheader").innerHTML= ADSKDLMResourceStrings[lang]['helpDecideHeader'];
	document.getElementById("decideBtn").value= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowActionBtn'];
	document.getElementById("decideBtn").title= ADSKDLMResourceStrings[lang]['helpDecideDownloadNowActionBtn'];
	var helpCarousel = new Carousel();
	olhelp.load();   
}

function decidedBtn(e){
	var dataid = $(e.srcElement).attr("data-id");
	closeHelpMeDlg(parseInt(dataid)+1);
}

function closeHelpMeDlg(choice){
	$("#helptodecide").hide();
	olhelp.close();
	g_fncbHelpme(choice);
}
	
function getHelpURL(locale,module)
{
	var url = ADSKDLMHelpURL[module][locale];
	// put a check for undefined
	return url;
}