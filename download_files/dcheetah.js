//OVERLAY

function overlay_show(content, noclose){
	//get coordinates
	if (content == undefined) content = '';
	var overlay;
	var overlayBg = $('#overlay_bg');	
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	//add overlay background
	if ( $('#overlay').length > 0 && content == '') {
		overlay = $('#overlay').appendTo('body');
	} else if (content.toString().charAt(0) == '#'){
		overlay = $(content);
	} else { 
		overlay = $('<div />').html(content).attr('id','overlay').appendTo('body');
		if(noclose != true) {
			$(overlay).prepend("<a id='closeBtn'>CLOSE</a>");
			$('#overlay a#closeBtn').bind('click',overlay_hide);
		}
	}
	overlayBg = $('<div />').attr('id','overlay_bg').appendTo('body').css('height', $(document).height()).css('opacity', 0.66).fadeIn('fast');
	$(overlay).css({'left': winWidth/2 - $(overlay).width()/2,'top': winHeight/2 - $(overlay).height()/2}).attr('rel','overlay').appendTo('body');
	$(overlay).fadeIn('fast');
	$('.silverlight, #media object').css('visibility', 'hidden');  //hide anything with class silverlight, used to for layering purposes
}

function overlay_hide(noremove){
	var overlay = $("[rel='overlay']");
	var overlayBg = $('#overlay_bg');
  if (noremove == true){
    $(overlay).fadeOut('slow');
  } else {
    $(overlay).fadeOut('slow', function(){$(this).remove()});
  }
	$(overlayBg).fadeOut('slow', function(){$(this).remove()});
	$('.silverlight, #media object').css('visibility', 'visible');  //show anything with class silverlight, used to for layering purposes
  return false;
}

function initTabs(tablist){
	var currentTab;
	var currentContent;
	
	//HIDE CONTENT THAT RELATES TO TABS
	$(tablist).children('li').each(function(){
		$($(this).children('a').attr('href')).hide();
	});
	
	//GET OR MAKE CURRENT TAB
	if($(tablist).children('li.current').size() > 0){
		currentTab = $(tablist).children('li.current');
	} else {
		currentTab = $(tablist).children('li:eq(0)').addClass('current');
	}
	
	//DISPLAY RELEVANT CONTENT
	currentContent = $($(currentTab).children('a').attr('href')).show();
	
	//CLICK FUNCTIONALITY
	$(tablist).children('li').click(function(e){
		e.preventDefault();
		$(currentTab).removeClass('current');
		currentTab = $(this).addClass('current');
		$(currentContent).hide();
		currentContent = $($(this).children('a').attr('href')).show();
	});
}

//MAX LENGTH FUNCTION FOR TEXTAREA (USE ON KEYPRESS)
function imposeMaxLength(o, max){
	if(o.value.length >= max){
		o.value = o.value.substr(0,max);
	}
}

//SEARCH MEMEBER DISPLAY FUNCTIONS ADDED 7/8/09
function toggleQuicksearch (){
	//console.log('show quick search');
	$('#quicksearch').toggle();
	return false;
}

//EXISTING FUNCTIONS
function launchLookupEditor(keywords,script_location) {
	window.open(script_location+'?nd=lookupvalues&keywords='+keywords,'popup','width=550,height=700,scrollbars=1');			
}

function hideDHTML(element_id) {
	document.getElementById(element_id).style.display = 'none';
}

function showDHTML(element_id) {
	document.getElementById(element_id).style.display = '';
}

function toggleDHTML(element_id) {
	var element = document.getElementById(element_id);
	if (element.style.display == '') {
		element.style.display = 'none';
	} else {
		element.style.display = '';
	}
}

function objExists(el) {
  var obj = document.getElementById(el);
  if (obj == null) {
    return false;
  } else {
    return true;
  }
}

function toggleViewableByClass(theclass) {

	//Create an array
	var allPagetags = new Array();

	//Populate the array with all the page tags
	var allPagetags=document.getElementsByTagName("*");
	//Cycle through the tags using a for loop
		for (i=0; i<allPagetags.length; i++) {
		//Pick out the tags with our class name
			if (allPagetags[i].className==theclass) {
				//Manipulate this in whatever way you want
				element = allPagetags[i];
				if (element.style.display == '') {
					element.style.display = 'none';
				} else {
					element.style.display = '';
				}
			}
		}
}

// restrictChars will limit field input and (optionally) throw an error
// rc is expected to be a list of characters to restrict (eg. '@&%^$')
function restrictChars(elem, rc, silent) {
	el = document.getElementById(elem);
	var input = el.value;

	//only run if there is text AND there are characters that are restricted
	if (input.length >= 1) {
		var restricted_chars='';
		if (rc.length >= 1) {
			//loop through the restricted list and build a regular expression from it.  Note exceptions for "special" characters (if they exist)
			for (x=0; x<rc.length; x++) {
				var rc_char = rc.substr(x, 1);
        if (rc_char == '[' || rc_char == '^' || rc_char == '$' || rc_char == '.' || rc_char == '|' || rc_char == '?' 
						|| rc_char == '*' || rc_char == '+' || rc_char == '(' || rc_char == ')' || rc_char == '+') 
				{
					restricted_chars=restricted_chars+'\\'+rc_char+',';
				} else {
					restricted_chars=restricted_chars+rc_char+',';
				}
			}

			//drop the trailing comma and setup the actual regular expression
			restricted_chars = restricted_chars.substring(0, restricted_chars.length-1);
			var myregex = new RegExp(restricted_chars.replace(/,/g, "|"), ["g"]);

			//do the test and fail if appropriate.  Also replace the value with a sanitized version
			if (myregex.test(input)) {
				if (silent == null || silent == false) {
				alert('Restricted Characters Detected.  Please do not use the following characters: '+restricted_chars.replace(/\\/g, ""));
				}
				el.value = input.replace(myregex, "");
				return false;
			}
		}
	}
	return true;
}



var last_dhtml_href_reference = 0;
var last_dhtml_select_reference = 0;
var last_dhtml_value = '';

// this takes the id of the SELECT where it will be displayed (reference_select_id)
// the current HREF text that is being displayed (reference_href_id)
// the existing list (original list)
function show_dynamic_select(reference_select_id,reference_href_id,selected_value,original_list,sku,table,column,column_type,friendly_name) {
	if (reference_select_id == last_dhtml_select_reference) {
		return false;
	}
	
	// first we get the list we will be working with
	var original_select_id = document.getElementById(original_list);

	// next populate the destination list by copying it from the original
	var new_select_id = document.getElementById(reference_select_id);
	var new_href_id = document.getElementById(reference_href_id);

	new_select_id.innerHTML = original_select_id.innerHTML;

	new_select_id.onchange = function() {
		return saveXMLHttpSku($sku, 'jlla_placement_group_advisor', 'account_id', 'Number', 'Advisor Name');
	}

	//new_select_id.innerHTML = original_select_id.innerHTML;
	//for (var i = 0; i < original_select_id.length; i++) {
	//	new_select_id.options[i] = new Option(original_select_id.options[i].text, original_select_id.options[i].value);
	//}					
	//new_select_id.value = selected_value;

	// if we have one open already, let us close that one out
	if (last_dhtml_select_reference != 0) {
		var inuse_select_id = document.getElementById(last_dhtml_select_reference);
		var inuse_href_id = document.getElementById(last_dhtml_href_reference);
		inuse_href_id.innerHTML = inuse_href_id.options[inuse_href_id.selectedIndex].text;
		inuse_select_id.style.display = 'none';
		inuse_href_id.style.display = '';
	}
					
	// now expose the new one
	new_select_id.style.display = '';
	new_href_id.style.display = 'none';

	last_dhtml_href_reference = reference_href_id;
	last_dhtml_select_reference = reference_select_id;
	new_select_id.focus();
}

function getHashSetFromString(mystring) {
	var token = "";
	var myarray = new Array();
	for (i = 0; i < mystring.length; i++) {
		if (mystring.charAt(i) == ",") {
			myarray[token] = token;
			token = "";
		} else {
			token = token + mystring.charAt(i);
		}
	}
	myarray[token] = token;
	return myarray;
}

function storepage(pagelocation) {

	setCookie('pagelocation', pagelocation);

}

var fragment_quicklink_body = '';
var use_fragment_anchor_name = '';
var use_fragment_name = '';

function addFragmentQuickLink(fragment_anchor_name, fragment_name, hide_quicklink_list) {
	if (hide_quicklink_list==true) {
	} else {
		fragment_quicklink_body += '<span class=systemsmallvalue><a href="#' + fragment_anchor_name + '" class="systemsmalllink"><img src="/editor/images/ad/square.gif" width="16" height="16" border="0">' + fragment_name + '</a></span><br>'; 
	}
}

function writeFragmentQuickLink(div_id) {
		document.getElementById(div_id).innerHTML = fragment_quicklink_body;
}

function addLoadEvent(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
	    window.onload = func;
	  } else {
	    window.onload = function() {
        oldonload();
		func();
	  }
	}
}

function restorepage(suffix, default_location) {

	var restore_location = getCookie('pagelocation');

	if ((!restore_location || restore_location == "0" || restore_location == "")) {
		if (!default_location) {
			restore_location = "/";
		} else {
			restore_location = default_location;
		}
	} else {
		restore_location = restore_location + suffix;
	}

	window.location = restore_location;
}



function hideTable(tableId){

 var table = document.getElementById(tableId);

 table.style.display = "none";

}



function showTable(tableId){

 var table = document.getElementById(tableId);

 table.style.display = "";

}





function setRadioGroupValue (group, selection) {

	for (i = 0; i < group.length; i++) {

		if (group[i].value == selection) {

			group[i].checked = true;

		} else {

			group[i].checked = false;

		}
	}

}

// this is a combined and the preferred approach
function getRadio(radiogroup) {
	var radio_value = getRadiogroupValue(radiogroup);
	if (radio_value == null) {
		radio_value = getRadioValue(radiogroup);
	}
	return radio_value;
}

// this version is another approach
function getRadioValue(radiogroup) {
  var useradio = document.getElementsByName(radiogroup.name);

  if (useradio.length == null && useradio.checked == true) {
    return(useradio.value);
  }

  for (i = 0; i < useradio.length; i++) {
    if (useradio[i].checked) {
      return useradio[i].value;
    }
  }
  return null;
}

function getRadiogroupValue(radiogroup) {

  if (radiogroup.length == null && radiogroup.checked == true) {
    return(radiogroup.value);
  }

  for (i = 0; i < radiogroup.length; i++) {
    if (radiogroup[i].checked) {
      return radiogroup[i].value;
    }
  }
  return null;
}

function setCheckbox (formname, checkboxname, textfieldname) {
	var textfieldvalue = document.forms[formname].elements[textfieldname].value;

	if (textfieldvalue == "") {
		document.forms[formname].elements[checkboxname].checked = false;
	} else {
		document.forms[formname].elements[checkboxname].checked = true;
	}
}



function setTextfield (formname, checkboxname, textfieldname) {

	if (document.forms[formname].elements[checkboxname].checked == true) {

		document.forms[formname].elements[textfieldname].focus();

	} else {

		document.forms[formname].elements[textfieldname].value = "";

	}

}



function setSelectValue(sel, val) {

    for (var i = 0; i < sel.options.length; i++) {

		if (sel.options[i].value == val) {

			sel.options[i].selected = true;

			return;

		};

    }

}

function setSelectValueByText(sel, val) {
    for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text == val) {
      sel.options[i].selected = true;
      return;
    };
    }
}


function uncheckall(form) {
	setformchecks(form,false);
}

function checkall(form) {
	setformchecks(form,true);
}

function setformchecks(myform,value) {
        var len = myform.elements.length;
		for (z = 0; z < len; z++) {
	        var myname  = myform.elements[z].name;
	        var myvalue = myform.elements[z].value;
			if (myname != myform.name) {
               if(myform.elements[z].type == "checkbox") {
			   	  myform.elements[z].checked = value;
		       }
		   }
		}
		return true;
}

function is_one_checked(myform) {
        var len = myform.elements.length;
		for (z = 0; z < len; z++) {
	        var myname  = myform.elements[z].name;
	        var myvalue = myform.elements[z].value;
			if (myname != myform.name) {
               if(myform.elements[z].type == "checkbox" && myform.elements[z].checked == true) {
			   	   return true;
		       }
		   }
		}
		return false;
}


function getSelectionText(sel) {

    return sel.options[sel.selectedIndex].text;

}



var selectedRow = null;



function selectRow(row, selectedClass, unselectedClass) {

	if (selectedClass == null) {

		selectedClass = "selectedRow";

	}

	if (unselectedClass == null) {

		unselectedClass = "unselectedRow";

	}

	if (selectedRow != null) {

		selectedRow.className = unselectedClass;

	}

	row.className = selectedClass;

	selectedRow = row;

}



function getSelectedRow() {

	return selectedRow;

}



function BGNew(obj, new_style, message) {

	obj.className = new_style;

	window.status = message;

}



function openWindow (url, parameters) {

	var pop1=window.open(url,'pop_1',parameters);

	pop1.focus();

}


	<!-- Begin
	function move(fbox, tbox, all) {
		// Parts of this came from Phil Webb (phil@philwebb.com)
		var arrFbox = new Array();
		var arrTbox = new Array();
		var arrLookup = new Array();
		var i;
		for (i = 0; i < tbox.options.length; i++) {
			arrLookup[tbox.options[i].text] = tbox.options[i].value;
			arrTbox[i] = tbox.options[i].text;
		}
		var fLength = 0;
		var tLength = arrTbox.length;
		for (i = 0; i < fbox.options.length; i++) {
			arrLookup[fbox.options[i].text] = fbox.options[i].value;
			if ((fbox.options[i].selected || all) && fbox.options[i].value != "") {
				arrTbox[tLength] = fbox.options[i].text;
				tLength++;
			} else {
				arrFbox[fLength] = fbox.options[i].text;
				fLength++;
			}
		}
		// arrFbox.sort();
		// arrTbox.sort();
		fbox.length = 0;
		tbox.length = 0;
		var c;
		for (c = 0; c < arrFbox.length; c++) {
			var no = new Option();
			no.value = arrLookup[arrFbox[c]];
			no.text = arrFbox[c];
			fbox[c] = no;
		}
		for (c = 0; c < arrTbox.length; c++) {
			var no = new Option();
			no.value = arrLookup[arrTbox[c]];
			no.text = arrTbox[c];
			tbox[c] = no;
		}
	}
	
	function additem(item,box) {
		var len = box.options.length;
		box.options[len] = new Option(item.value,item.value,false,false);
		item.value='';
	}
	
	function moveup(box) {
		var i;
		var tmp;
		for (i = 0; i < box.options.length; i++) {
			if (box.options[i].selected && i > 0) {
				tmp = box.options[i-1].text;
				box.options[i-1].value = box.options[i-1].text = box.options[i].text;
				box.options[i].value = box.options[i].text = tmp;
				box.options[i-1].selected = true;
				box.options[i].selected = false;
			}
		}
	}
	
	function movedown(box) {
		var i;
		var tmp;
		var done = false;
		for (i = 0; !done && i < box.options.length; i++) {
			if (box.options[i].selected && (i < (box.options.length+1))) {
				tmp = box.options[i+1].text;
				box.options[i+1].value = box.options[i+1].text = box.options[i].text;
				box.options[i].value = box.options[i].text = tmp;
				box.options[i+1].selected = true;
				box.options[i].selected = false;
				done = true;
			}
		}
	}

	function listToString(box,separator) {
		var i;
		var s = '';
		for (i = 0; i < box.options.length; i++) {
			if (i == 0) {
				s = box.options[i].value;
			} else {
				s = s + separator + box.options[i].value;
			}
		}

		return s;
	}


function _replaceString (replaceString, findString, replaceWithString) {
	var location = replaceString.indexOf (findString);
	while (location != -1) {
		replaceString = replaceString.substring (0, location) + replaceWithString + _replaceString (replaceString.substring(location+findString.length), findString, replaceWithString);
		location = replaceString.indexOf (findString);
	}
	return replaceString;
}

  function clearFields(field_ids) {
	var myid = '';
	for (i = 0; i < field_ids.length; i++) {
		if (field_ids.charAt(i) == ',') {
			document.getElementById(myid).value = '';
			myid = '';
		} else {
			myid = myid + field_ids.charAt(i);
		}
	}
	document.getElementById(myid).value = '';
  }

  function clearForm(clean_form_id) {
	  var myform = document.getElementById(clean_form_id);
      var len = myform.elements.length;   
      for (z = 0; z < len; z++) {
        if(myform.elements[z].type == "text" || myform.elements[z].type == "textarea" || myform.elements[z].type == "select-one") {
            myform.elements[z].value = '';
        }
    }		
  }
	//  End -->

