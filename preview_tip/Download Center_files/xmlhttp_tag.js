// xmlhttp code
var xmlhttp_tag_submissions = 0;

function create_tag_xmlhttp() {

	var xmlhttp=false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	// JScript gives us Conditional compilation, we can cope with old IE versions.
	// and security blocked creation of the objects.
	 try {
	  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	 } catch (e) {
	  try {
	   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (E) {
	   xmlhttp = false;
	  }
	 }
	@end @*/
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	  xmlhttp = new XMLHttpRequest();
	}
	
	return xmlhttp;
}

/* save the tag */
function save_tag(el,reference_name,reference_id) {

	el.blur();
	el.parentNode.className = 'tagging';
	el.innerHTML = '';

	xmlhttp_tag_submissions++;
	var xmlhttp = create_tag_xmlhttp();
	 xmlhttp.open ('GET', '/?nd=xmlhttp_tag&reference_name='+reference_name+'&reference_id='+reference_id+'&rand1='+(xmlhttp_tag_submissions)+'&rand2=$'+Math.round(Math.random()*100000), true);
        // the new mp version ...
       // xmlhttp.open ('GET', '/mp?mp=xmltag&reference_name='+reference_name+'&reference_id='+reference_id+'&rand1='+(xmlhttp_tag_submissions)+'&rand2=$'+Math.round(Math.random()*100000), true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4) {	
			if (xmlhttp.status == 200) {
				set_results(el,xmlhttp.responseText);
			} else {
				alert ('Request failed');
			}
		}
	}
	xmlhttp.setRequestHeader("Content-type", "text/html");
	xmlhttp.send(null);
	
	return false;
}

function set_results(el,responseText) {
	var use_class = '';
	var use_value = '';
	var in_class = true;
	var mychar = '';

	for(var i=0;i<responseText.length;i++) {
		mychar = responseText.charAt(i);
		if (mychar == ';') {
			in_class = false;
		} else if (mychar == ' ') {
			// do nothing
		} else {
			if (in_class) {
				use_class += mychar;
			} else {
				use_value += mychar;
			}
		}
	}

	el.parentNode.className = use_class;
	if(use_class == 'tagged') {
		el.parentNode.title = 'Unlike this item';	
	} else {
		el.parentNode.title = 'Like this item';
	}
	if (use_value == 1) {
		el.innerHTML = use_value;
	} else {
		el.innerHTML = use_value;
	}
}
