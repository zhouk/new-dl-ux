$().ready(function(){
	$('.google form input[type=text]').focus(function(){
			$(this).css("background", "none"); 
		});
	$('.google form input[type=text]').blur(function(){
			if($(this).val() == '') $(this).attr("style", ""); 
		});

	$('input[type=checkbox]').addClass('checkbox');
 });

function popWin (url){
        newwindow=window.open(url,'name','height=600,width=800,left=18,top=18,resizable=yes');
        if (window.focus) {newwindow.focus()}
}

function sharePopup (){
$('.share_btn').click(function(){
                $('#share_block').remove();
                var URL = this.rel;
                var title = this.title;
                var source = this.rev;
                var summary = this.shape;
                //create popup
                $('body').append("<div id='share_block'>Share via:<a href='?nd=adsk_share_email&url="+encodeURIComponent(URL)+"&title="+title+"&source="+source+"&summary="+summary+"' class='email'>Email</a><a  href='http://www.facebook.com/share.php?u="+encodeURIComponent(URL)+"' class='facebook pop'>Facebook</a><a  href='http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(URL)+"&title="+title+"&summary="+summary+"&source="+source+"' class='linkedin pop'>Linked In</a><a href='http://twitter.com/home?status=Reading:"+title+" @ "+ encodeURIComponent(URL) +"' class='twitter pop'>Twitter</a><a href='http://www.myspace.com/Modules/PostTo/Pages/?t="+title+"&c="+summary+"&u="+encodeURIComponent(URL)+"' class='myspace pop'>MySpace</a><button class='close_share'>&nbsp;</button></div>");

                //make links open in popup
                $('#share_block a.pop').click(function(atag){
                        atag.preventDefault();
                        popWin($(this).attr('href'));
                });

                //position popup
                var offset = $(this).offset();
                $("#share_block").css("top",(offset.top-30) + "px").css("left",(offset.left + $(this).width())+18 + "px").fadeIn("fast");
                //close button
                $('#share_block .close_share').click(function(){
                        $(this).parent().fadeOut('fast', function(){$(this).remove()});
                        return false;
                });
        return false;
        });

}
function sharePopupNew (){
$('.share_btn').click(function(){
                $('#share_block').remove();
                var summary = this.title;
                //create popup
                $('body').append("<div id='share_block'></div>");
				$('#share_block').html($('#' + summary).html());

                //make links open in popup
                $('#share_block a.pop').click(function(atag){
                        atag.preventDefault();
                        popWin($(this).attr('href'));
                });

                //position popup
                var offset = $(this).offset();
                $("#share_block").css("top",(offset.top-30) + "px").css("left",(offset.left + $(this).width())+18 + "px").fadeIn("fast");
                //close button
                $('#share_block .close_share').click(function(){
                        $(this).parent().fadeOut('fast', function(){$(this).remove()});
                        return false;
                });
        return false;
        });

}

function accordionStandard(){
	$('.panel_title').click(function(){
		var containerItem = $(this).closest('li');
		if($(containerItem).hasClass('open')){
			$(this).next('.panel').slideUp(200).closest('li').removeClass('open');
		} else {
			$(this).next('.panel').slideDown(200).closest('li').addClass('open');
		}
	});	
}

