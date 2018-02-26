//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 10;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 12;
// -----------------------------------------------------------------------------

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '';
  if (isIE && isWin && !isOpera)
  {
      str += '<object ';
    for (var i in objAttrs)
    {
      str += i + '="' + objAttrs[i] + '" ';
    }
    str += '>';
    for (var i in params)
    {
      str += '<param name="' + i + '" value="' + params[i] + '" /> ';
    }
    str += '</object>';
  }
  else
  {
    str += '<embed ';
    for (var i in embedAttrs)
    {
      str += i + '="' + embedAttrs[i] + '" ';
    }
    str += '> </embed>';
  }

  return str;
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  return AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblclick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function showplayer(divid, w, h, vars, swffile) {
   // try {
     //   var hasProductInstall = DetectFlashVer(6, 0, 65);
     //   var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
     //   if (hasProductInstall && hasRequestedVersion) {
            $(divid).innerHTML = AC_FL_RunContent(
			    'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
			    'width', w,
			    'height', h,
			    'src', swffile,
			    'flashvars', vars,
			    'quality', 'high',
			    'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			    'align', 'middle',
			    'play', 'true',
			    'loop', 'true',
			    'scale', 'showall',
			    'wmode', 'window',
			    'devicefont', 'false',
			    'id', divid + "_swf",
			    'bgcolor', '#ffffff',
			    'name', divid + "_swf",
			    'menu', 'true',
			    'allowFullScreen', 'true',
			    'allowScriptAccess', 'always',
			    'movie', swffile,
			    'salign', ''
			    );
       // }
      //  else {
//            var plugurl = "/activex/install_flash_player_ax.exe";
//            if (!isIE) {
//                plugurl = "/activex/install_flash_player_plugin.exe";
//            }
           // var noaxContent = "<div style='background-color:#F2F2F2;height:" + h + "px;width:" + w + "px;text-align:center;'><div><a href='" + plugurl + "' target='_blank'><img src='/images/axneed.png' style='cursor:pointer;margin-top:0px' href='http://www.baidu.com/'></img></a></div></div>";
           // $(divid).innerHTML = noaxContent;
     //   }

   // }
   // catch (e) {}
	}

	function showlinkvideo(divid,w,h,linkurl) {

	    $(divid).innerHTML = "<object width='" + w + "' height='" + h + "'><param name='movie' value='" + linkurl + "'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><param name='wmode' value='opaque'></param><embed src='" + linkurl + "' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque' width='420' height='363'></embed></object>";
	
	 }

//flash控制部分
//获取FLASH对象

function thisMovie(movieName)
{
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    }
    else {
        return document[movieName];
    }
}

//发送信息给FLASH
function broadcastEvent(_event,cname) {
    //alert(1111);
    //给Flash传值
    if (thisMovie(cname)) {
        thisMovie(cname).sendToFlash(_event);
    }
}



var __on_flash_wheel = function(e)
{
    e.preventDefault(); 
    e.stopPropagation();
}

function unenablePageScroll()
{
    if(window.addEventListener)
    {
        window.addEventListener('DOMMouseScroll', __on_flash_wheel, false);
    }
    else
    {
        window.onmousewheel = document.onmousewheel = function()
        {
            return false;
        };
    }
}

function enablePageScroll()
{
    //if(navigator.userAgent.indexOf('Firefox')>0)
    if(window.addEventListener)
    {
        window.removeEventListener('DOMMouseScroll', __on_flash_wheel, false);
    }
    else
    {
        window.onmousewheel = document.onmousewheel = null;
    }
}

function fix_flash() {
    // loop through every embed tag on the site
    var embeds = document.getElementsByTagName('embed');
    for (i = 0; i < embeds.length; i++) {
        embed = embeds[i];
        var new_embed;
        // everything but Firefox & Konqueror
        if (embed.outerHTML) {
            var html = embed.outerHTML;
            // replace an existing wmode parameter
            if (html.match(/wmode\s*=\s*('|")[a-zA-Z]+('|")/i))
                new_embed = html.replace(/wmode\s*=\s*('|")window('|")/i, "wmode='transparent'");
            // add a new wmode parameter
            else
                new_embed = html.replace(/<embed\s/i, "<embed wmode='transparent' ");
            // replace the old embed object with the fixed version
            embed.insertAdjacentHTML('beforeBegin', new_embed);
            embed.parentNode.removeChild(embed);
        } else {
            // cloneNode is buggy in some versions of Safari & Opera, but works fine in FF
            new_embed = embed.cloneNode(true);
            if (!new_embed.getAttribute('wmode') || new_embed.getAttribute('wmode').toLowerCase() == 'window')
                new_embed.setAttribute('wmode', 'transparent');
            embed.parentNode.replaceChild(new_embed, embed);
        }
    }
    // loop through every object tag on the site
    var objects = document.getElementsByTagName('object');
    for (i = 0; i < objects.length; i++) {
        object = objects[i];
        var new_object;
        // object is an IE specific tag so we can use outerHTML here
        if (object.outerHTML) {
            var html = object.outerHTML;
            // replace an existing wmode parameter
            if (html.match(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")[a-zA-Z]+('|")\s*\/?\>/i))
                new_object = html.replace(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")window('|")\s*\/?\>/i, "<param name='wmode' value='transparent' />");
            // add a new wmode parameter
            else
                new_object = html.replace(/<\/object\>/i, "<param name='wmode' value='transparent' />\n</object>");
            // loop through each of the param tags
            var children = object.childNodes;
            for (j = 0; j < children.length; j++) {
                if (children[j].getAttribute('name').match(/flashvars/i)) {
                    new_object = new_object.replace(/<param\s+name\s*=\s*('|")flashvars('|")\s+value\s*=\s*('|")[^'"]*('|")\s*\/?\>/i, "<param name='flashvars' value='" + children[j].getAttribute('value') + "' />");
                }
            }
            // replace the old embed object with the fixed versiony
            object.insertAdjacentHTML('beforeBegin', new_object);
            object.parentNode.removeChild(object);
        }
    }
}

function turnOff() {
    if ($("turn_div")) {
        $("turn_div").style.display = '';
    } else {
        var coverDiv = document.createElement('div');
        document.body.appendChild(coverDiv);
        coverDiv.id = 'turn_div';
        with (coverDiv.style) {
            position = 'absolute';
            background = '#000';
            left = '0px';
            top = '0px';
            var bodySize = getBodySize();
            width = bodySize[0] + 'px'
            height = bodySize[1] + 'px';
            zIndex = 3000;
            if (IsIE) {
                filter = "Alpha(Opacity=90)";
            } else {
                opacity = 0.9;
            }
        }

    }

}
function turnOn() {
    $("turn_div").style.display = 'none';
}
