 var sAgent=navigator.userAgent.toLowerCase();
var IsIE=sAgent.indexOf("msie")!=-1;
function $(_sId){return document.getElementById(_sId)}

function read_radio(rname){
	var temp=document.getElementsByName(rname);
	for (i=0;i<temp.length;i++){
    if(temp[i].checked){
      return temp[i].value;
      }
 	}
}
function read_checkbox(rname){
	var str=''  
	var temp=document.getElementsByName(rname);
	for (i=0;i<temp.length;i++){
    if(temp[i].checked){
      if (str==''){str=temp[i].value}else{str=str+','+temp[i].value}
      }
 	}
	return str;
}
function set_radio(rname,val) {
    var temp = document.getElementsByName(rname);
    for (i = 0; i < temp.length; i++) {
        if (temp[i].value==val) {
            temp[i].checked = "checked";
            break;
        }
    }
}
var numCheck = function(str){
	var strFormat = "0123456789,";
    for(var i=0;i<str.length;i++)
    {
        if(strFormat.indexOf(str.substr(i ,1)) == -1)
        {
            return false;
        }
    }
    return true;
}


function copyclip(meintext,msg)
{
 if (msg==""){msg="复制成功！"}
 if (window.clipboardData){
 if (window.clipboardData.setData("Text", meintext)){
		alert(msg);
		return true;
   }
   else {
		alert('复制地址失败\n');
		return false;
	}
  }else if (window.netscape) {
   try{
	netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
   } catch (e) {
	  alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
	  return false;
   }

   var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				 .createInstance(Components.interfaces.nsIClipboard);
   if (!clip) return false;


   var trans = Components.classes['@mozilla.org/widget/transferable;1']
				  .createInstance(Components.interfaces.nsITransferable);
   if (!trans) return false;

   trans.addDataFlavor('text/unicode');

   var str = new Object();
   var len = new Object();

   var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);

   var copytext=meintext;

   str.data=copytext;

   trans.setTransferData("text/unicode",str,copytext.length*2);

   var clipid=Components.interfaces.nsIClipboard;

   if (!clip) return false;

   clip.setData(trans,null,clipid.kGlobalClipboard);

   }
   alert(msg);
   return true;
}



function openScript(url, width, height){
	if (IsIE){
		//showModalDialog;
		//showModelessDialog
		var Win = showModalDialog(url,"openScript",'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;dialogLeft:300px;dialogTop:100px;center:yes;help:yes;resizable:no;status:yes;scroll:yes') 
	}
	else {
		var Win = window.open(url,"openScript",'width=' + width + ',height=' + height + ',top=100,left=300,toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no,status=yes' );
		Win.focus();
	}
	return;
}

function chkdiv(divid){
	var chkid=document.getElementById(divid);
	if(chkid != null){return true; }
	else {return false; }
}

function getpara(){
	var str,parastr
	str = window.location.search;
	parastr = str.substring(1);
	return parastr;
}

function geta(){
	var s=''; 
	var url=window.location.search; 
	if(url.indexOf("?")!=-1) 
	{ 
	    var str = url.substr(1) 
	    strs = str.split("&"); 
	    for(i=0;i<strs.length;i++) 
	    { 
	    if([strs[i].split("=")[0]]=='s') s=unescape(strs[i].split("=")[1]); 
	    } 
	    return s;
	}
	else {
	    return "";
	}
}

function gets(key) {
    var s = '';
    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        strs = str.split("&");
        for (i = 0; i < strs.length; i++) {
            if ([strs[i].split("=")[0]] == key)
                s = DecodeURI(strs[i].split("=")[1], false);
        }
        return s;
    }
    else {
        return "";
    }
}


function dialog(appurl) {
    appurl = "";
    var width = 320;
    var height = 180;
    var src = "";
    var path = appurl + "images/dialog/";
    var ShadowWidth = 5;
    var sFunc = '<input id="dialogOk" type="button" style="font-size:12px;width:70px;height:26px;line-height:20px;" value=" 确认 " onclick="new dialog(\'' + appurl + '\').reset(1);" /> <input id="dialogCancel" type="button" style="font-size:12px;width:70px;height:26px;line-height:20px;" value=" 取消 " onclick="new dialog(\'' + appurl + '\').reset(0);" />';
    var sClose = '<span id="dialogBoxClose" onclick="new dialog(\'' + appurl + '\').reset(0);" style="color: #666666; cursor:pointer;font-size:16px;">×</span>';
    var sBody = '\
		<table id="dialogBodyBox" border="0" align="center" cellpadding="0" cellspacing="0" width="100%" height="100%" >\
			<tr height="10"><td colspan="4" align="center"></td></tr>\
			<tr>\
				<td width="10"></td>\
				<td align="center" valign="middle" id="ob_boxface"><img id="dialogBoxFace" valign="absmiddle" /></td>\
				<td id="dialogMsg" valign="middle" style="font-size:12px;color:#000;"></td>\
				<td width="10"></td>\
			</tr>\
			<tr height="10"><td colspan="4" align="center"></td></tr>\
			<tr><td id="dialogFunc" colspan="4" align="center">' + sFunc + '</td></tr>\
			<tr height="10"><td colspan="4" align="center"></td></tr>\
		</table>\
	';
    var sBox = '\
		<table id="dialogBox" width="' + width + '" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #b5b7bf;display: none; z-index: 1000; ">\
			<tr height="30" bgcolor="#eceff3" >\
				<td>\
					<table onselectstart="return false;" style="-moz-user-select:none;" width="100%" border="0" cellpadding="0" cellspacing="0">\
						<tr>\
							<td width="12" ></td>\
							<td id="dialogBoxTitle" onmousedown="new dialog().moveStart(event, \'dialogBox\')" style="color:#666666;cursor:move;font-size:12px;font-weight:bold;">提示信息</td>\
							<td id="dialogClose" width="27" align="right" valign="middle" >\
								' + sClose + '\
							</td>\
							<td width="12"></td>\
						</tr>\
					</table>\
				</td>\
			</tr>\
			<tr id="dialogHeight" height="' + height + '">\
				<td id="dialogBody" style="background:#fff;color:#000;">' + sBody + '</td>\
			</tr>\
		</table>\
		<div id="dialogBoxShadow"></div>\
		<iframe id="dialogBoxDivShim" scrolling="no" frameborder="0" style="position: absolute; top: 0px; left: 0px; display: none; ">\
	';
    this.show = function () { $('dialogBodyBox') ? function () { } : this.init(); this.middle('dialogBox'); this.shadow(); }
    this.reset = function (_int) {
        if (_int == 1 && $('dialogBoxTitle').innerHTML != "提示信息") {
            return;
        }
        $('dialogBox').style.display = 'none';
        $('dialogBoxShadow').style.display = "none";
        $('dialogBoxDivShim').style.display = "none";
        $('dialogBody').innerHTML = sBody;
        $("cover_div").style.display = 'none';
        $("cover_div_frame").style.display = 'none';

    }
    this.html = function (_sHtml) { $("dialogBody").innerHTML = _sHtml; this.show(); }
    this.init = function () {
        popCoverDiv();
        $('dialogCase') ? $('dialogCase').parentNode.removeChild($('dialogCase')) : function () { };
        var oDiv = document.createElement('span');
        oDiv.id = "dialogCase";
        oDiv.innerHTML = sBox;
        document.body.appendChild(oDiv);

    }
    this.button = function (_sId, _sFuc) {
        if ($(_sId)) {
            $(_sId).style.display = '';
            if ($(_sId).addEventListener) {
                if ($(_sId).act) { $(_sId).removeEventListener('click', function () { eval($(_sId).act) }, false); }
                $(_sId).act = _sFuc;
                $(_sId).addEventListener('click', function () { eval(_sFuc) }, false);
            } else {
                if ($(_sId).act) { $(_sId).detachEvent('onclick', function () { eval($(_sId).act) }); }
                $(_sId).act = _sFuc;
                $(_sId).attachEvent('onclick', function () { eval(_sFuc) });
            }
        }
    }
    this.shadow = function () {

        var oShadow = $('dialogBoxShadow');
        var oDialog = $('dialogBox');
        var IfrRef = $('dialogBoxDivShim');
        oShadow.style.position = "absolute";
        oShadow.style.background = "#000";
        oShadow.style.display = "block";
        if (IsIE) {
            oShadow.style.filter = "Alpha(Opacity=10)";
        } else {
            oShadow.style.opacity = "0.1";
        }
        oShadow.style.top = oDialog.offsetTop + ShadowWidth + "px";
        oShadow.style.left = oDialog.offsetLeft + ShadowWidth + "px";
        oShadow.style.width = oDialog.offsetWidth + "px";
        oShadow.style.height = oDialog.offsetHeight + "px";
        oShadow.style.zIndex = oDialog.style.zIndex - 1;


        IfrRef.style.background = "#000";
        IfrRef.style.opacity = "0.1";
        IfrRef.style.filter = "alpha(opacity=10)";
        IfrRef.style.top = oDialog.offsetTop + ShadowWidth + "px";
        IfrRef.style.left = oDialog.offsetLeft + ShadowWidth + "px";
        IfrRef.style.width = oDialog.offsetWidth + "px";
        IfrRef.style.height = oDialog.offsetHeight + "px";
        IfrRef.style.zIndex = oDialog.style.zIndex - 2;
        IfrRef.style.display = "block";
    }
    this.open = function (_sUrl, _sMode) {

        this.show();
        if (!_sMode || _sMode == "no" || _sMode == "yes") {
            $("dialogBody").innerHTML = "<iframe id='dialogFrame' width='100%' height='100%' frameborder='0' scrolling='" + _sMode + "'></iframe>";
            $("dialogFrame").src = _sUrl;
        }
    }
    this.event = function (_sMsg, _sOk, _sCancel, _sClose) {
        $('dialogFunc').innerHTML = sFunc;
        $('dialogClose').innerHTML = sClose;
        $('dialogBodyBox') == null ? $('dialogBody').innerHTML = sBody : function () { };
        $('dialogMsg') ? $('dialogMsg').innerHTML = _sMsg : function () { };
        this.show();
        _sOk ? this.button('dialogOk', _sOk) | $('dialogOk').focus() : $('dialogOk').style.display = 'none';
        _sCancel ? this.button('dialogCancel', _sCancel) : $('dialogCancel').style.display = 'none';
        _sClose ? this.button('dialogBoxClose', _sClose) : function () { };
    }
    this.set = function (_oAttr, _sVal) {
        var oShadow = $('dialogBoxShadow');
        var oDialog = $('dialogBox');
        var oHeight = $('dialogHeight');

        if (_sVal != '') {
            switch (_oAttr) {
                case 'title':
                    $('dialogBoxTitle').innerHTML = _sVal;
                    if (_sVal == '删除设置') {
                        $("ob_boxface").innerHTML = "";
                    }
                    //title = _sVal;
                    break;
                case 'width':
                    oDialog.style.width = _sVal + "px";
                    width = _sVal;
                    break;
                case 'height':
                    oHeight.style.height = _sVal + "px";
                    height = _sVal;
                    break;
                case 'src':
                    if (parseInt(_sVal) >= 0) {
                        $('dialogBoxFace') ? $('dialogBoxFace').src = path + _sVal + '.png' : function () { };
                    } else {
                        $('dialogBoxFace') ? $('dialogBoxFace').src = _sVal : function () { };
                    }
                    src = _sVal;
                    break;
                case "html":
                    $("ob_boxface").innerHTML = "";
                    $("dialogMsg").innerHTML = _sVal;
                    break;
                case "nobtn":
                    $("dialogFunc").style.display = "none";
                    break;
            }
        }
        this.middle('dialogBox');
        oShadow.style.top = oDialog.offsetTop + ShadowWidth + "px";
        oShadow.style.left = oDialog.offsetLeft + ShadowWidth + "px";
        oShadow.style.width = oDialog.offsetWidth + "px";
        oShadow.style.height = oDialog.offsetHeight + "px";
    }
    this.moveStart = function (event, _sId) {
        var oObj = $(_sId);
        oObj.onmousemove = mousemove;
        oObj.onmouseup = mouseup;
        oObj.setCapture ? oObj.setCapture() : function () { };
        oEvent = window.event ? window.event : event;
        var dragData = { x: oEvent.clientX, y: oEvent.clientY };
        var backData = { x: parseInt(oObj.style.top), y: parseInt(oObj.style.left) };
        function mousemove() {
            var oEvent = window.event ? window.event : event;
            var iLeft = oEvent.clientX - dragData["x"] + parseInt(oObj.style.left);
            var iTop = oEvent.clientY - dragData["y"] + parseInt(oObj.style.top);
            oObj.style.left = iLeft + "px";
            oObj.style.top = iTop + "px";
            $('dialogBoxShadow').style.left = iLeft + ShadowWidth + "px";
            $('dialogBoxShadow').style.top = iTop + ShadowWidth + "px";

            $('dialogBoxDivShim').style.left = iLeft + "px";
            $('dialogBoxDivShim').style.top = iTop + "px";

            dragData = { x: oEvent.clientX, y: oEvent.clientY };


        }
        function mouseup() {
            var oEvent = window.event ? window.event : event;
            oObj.onmousemove = null;
            oObj.onmouseup = null;
            if (oEvent.clientX < 1 || oEvent.clientY < 1 || oEvent.clientX > document.body.clientWidth || oEvent.clientY > document.body.clientHeight) {
                oObj.style.left = backData.y + "px";
                oObj.style.top = backData.x + "px";
                $('dialogBoxShadow').style.left = backData.y + ShadowWidth + "px";
                $('dialogBoxShadow').style.top = backData.x + ShadowWidth + "px";

                $('dialogBoxDivShim').style.left = backData.y + "px";
                $('dialogBoxDivShim').style.top = backData.x + "px";
            }
            oObj.releaseCapture ? oObj.releaseCapture() : function () { };
        }
    }
    this.middle = function (_sId) {
        var theWidth;
        var theHeight;
        if (document.documentElement && document.documentElement.clientWidth) {
            theWidth = document.documentElement.clientWidth + document.documentElement.scrollLeft * 2; ;
            theHeight = document.documentElement.clientHeight + document.documentElement.scrollTop * 2; ;
        } else if (document.body) {
            theWidth = document.body.clientWidth;
            theHeight = document.body.clientHeight;
        } else if (window.innerWidth) {
            theWidth = window.innerWidth;
            theHeight = window.innerHeight;
        }
        document.getElementById(_sId).style.display = '';
        document.getElementById(_sId).style.position = "absolute";
        document.getElementById(_sId).style.left = (theWidth / 2) - (document.getElementById(_sId).offsetWidth / 2) + "px";
        if (document.all || document.getElementById("user_page_top")) {
            document.getElementById(_sId).style.top = (theHeight / 2 + document.body.scrollTop) - (document.getElementById(_sId).offsetHeight / 2) - 120 + "px";
        } else {
            var sClientHeight = parent ? parent.document.body.clientHeight : document.body.clientHeight;
            var sScrollTop = parent ? parent.document.body.scrollTop : document.body.scrollTop;
            var sTop = -80 + (sClientHeight / 2 + sScrollTop) - (document.getElementById(_sId).offsetHeight / 2);
            document.getElementById(_sId).style.top = (theHeight / 2 + document.body.scrollTop) - (document.getElementById(_sId).offsetHeight / 2) - 120 + "px";
        }
    }

}


function oAjax( url ,callback)
{
    try{
        this.HttpRequest = null;
        this.Debug  = false;
        this.Url = url;
        this.ContentType = "text/xml";
        this.HttpRequest = this.createXMLHttpRequest();

        if ( this.HttpRequest == null )
        {
            this._debug("XMLHttpRequest create failure!");
            return;
        }

        var xhReq = this.HttpRequest;
        xhReq.onreadystatechange = function (){
            oAjax._OnReadyStateChange( xhReq,callback );
        }

    } catch(e){
       this._debug( "unknow err: " + e.message );
    }
}

/*
 * Get URL resource
 */
oAjax.prototype.Get = function() {

    this.SetContentType( "text/html" );
    this._get();
}

/*
 * Post data to the server
 */
oAjax.prototype.Post = function( arrKey, arrValue ) {
    var data = '';
	var i;
    this.SetContentType( "application/x-www-form-urlencoded" );
    for( i = 0; i < arrKey.length; i ++)
    {
        data += "&" + escape(arrKey[i]) + "=" + escape(arrValue[i]);
		//data += "&" + arrKey[i] + "=" + arrValue[i];
    }
	//document.write(data);
    data = data.replace(/^&/g, "");
    this._post(data);
}

/*
 * Initialization for oAjax class
 */
oAjax.prototype.Init = function() {
    // initialization
}

/*
 * Change URL for Request
 */
oAjax.prototype.SetUrl = function( url ) {
    this.Url = url;
}

/*
 * Set content type for HTTP header before sending Request
 */
oAjax.prototype.SetContentType = function( type ) {
    this.ContentType = type;
}

oAjax.prototype.createXMLHttpRequest = function() {

    try { return new ActiveXObject("Msxml2.XMLHTTP");    } catch(e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
    try { return new XMLHttpRequest();                   } catch(e) {}
    return null;
}

/*
 * Debug information for testing
 */
oAjax.prototype._debug = function(message) {

    if ( this.Debug )
    {
        alert(message);
    }
}

/*
 * Process message and data from server
 */
oAjax._OnReadyStateChange = function( xreq, callback ){

    if ( xreq == null )
    {
        return;    }
    
    /*Status is completed, then process result */
    if ( xreq.readyState == 4)
    {
        // OK        
        if ( xreq.status == 200 )
        {
//			alert(xreq.responseText);
          	callback (this.ArrayValue(xreq.responseXML) );                     
        }else{
//			alert('服务器端错误！');
		document.write (xreq.responseText);
		}
    } else {
        // Others
    }
}

oAjax.prototype._SendRequest = function(HttpMethod, data){

    this._debug( 'Send Request ' + HttpMethod + data );
    
    if ( this.HttpRequest != null )
    {
        this.HttpRequest.open(HttpMethod, this.Url, true);

        if ( this.ContentType != null )
        {
            //  <FORM> MIME type: application/x-www-form-urlencoded
            this.HttpRequest.setRequestHeader("Content-Type", this.ContentType);
        }
        this.HttpRequest.send(data);
        return true;
    }
    return false;
}

/* Send GET Request to server */
oAjax.prototype._get = function () {

    this._debug( 'GET' );
    return this._SendRequest("GET", null);
}

/* Send POST Request and data to server */
oAjax.prototype._post = function (data) {

    this._debug( 'POST' );
    return this._SendRequest("POST", data);
}

oAjax.ArrayValue = function ( xmlobj ) {
    var array = new Array();
    var i = 0;
    var response = xmlobj.getElementsByTagName('Response')[0];
	var element = response.firstChild;
	array[i] = element.firstChild.nodeValue;
	while ( element = element.nextSibling )
	{
		i ++;
		array[i] = element.firstChild.nodeValue;
		}
	return array;
}

var EncodeURI = function(unzipStr, isCusEncode) {
    if (isCusEncode) {
        var zipArray = new Array();
        var zipstr = "";
        var lens = new Array();
        for (var i = 0; i < unzipStr.length; i++) {
            var ac = unzipStr.charCodeAt(i);
            zipstr += ac;
            lens = lens.concat(ac.toString().length);
        }
        zipArray = zipArray.concat(zipstr);
        zipArray = zipArray.concat(lens.join("O"));
        return zipArray.join("N");
    } else {
        //return encodeURI(unzipStr);
        var zipstr = "";
        var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
        var tt = "";

        for (var i = 0; i < unzipStr.length; i++) {
            var chr = unzipStr.charAt(i);
            var c = StringToAscii(chr);
            tt += chr + ":" + c + "n";
            if (parseInt("0x" + c) > 0x7f) {
                zipstr += encodeURI(unzipStr.substr(i, 1));
            } else {
                if (chr == " ")
                    zipstr += "+";
                else if (strSpecial.indexOf(chr) != -1)
                    zipstr += "%" + c.toString(16);
                else
                    zipstr += chr;
            }
        }
        return zipstr;
    }
}

var DecodeURI = function(zipStr, isCusEncode) {
    if (isCusEncode) {
        var zipArray = zipStr.split("N");
        var zipSrcStr = zipArray[0];
        var zipLens;
        if (zipArray[1]) {
            zipLens = zipArray[1].split("O");
        } else {
            zipLens.length = 0;
        }

        var uzipStr = "";

        for (var j = 0; j < zipLens.length; j++) {
            var charLen = parseInt(zipLens[j]);
            uzipStr += String.fromCharCode(zipSrcStr.substr(0, charLen));
            zipSrcStr = zipSrcStr.slice(charLen, zipSrcStr.length);
        }
        return uzipStr;
    } else {
        //return decodeURI(zipStr);
        var uzipStr = "";

        for (var i = 0; i < zipStr.length; i++) {
            var chr = zipStr.charAt(i);
            if (chr == "+") {
                uzipStr += " ";
            } else if (chr == "%") {
                var asc = zipStr.substring(i + 1, i + 3);
                if (parseInt("0x" + asc) > 0x7f) {
                    uzipStr += decodeURI("%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString()); ;
                    i += 8;
                } else {
                    uzipStr += AsciiToString(parseInt("0x" + asc));
                    i += 2;
                }
            } else {
                uzipStr += chr;
            }
        }
        return uzipStr;
    }
}

var StringToAscii = function(str) {
    return str.charCodeAt(0).toString(16);
}

var AsciiToString = function(asccode) {
    return String.fromCharCode(asccode);
}


function addjs(url){
	var oHead = document.getElementsByTagName('HEAD').item(0); 
    var oScript= document.createElement("script"); 
    oScript.type = "text/javascript"; 
    oScript.src=url;
	oScript.charset="GB2312";
    oHead.appendChild(oScript); 
	
}

//通用回调函数
function show_return(arrobj){
	if (arrobj){
	    if (arrobj[1]=="-1"){
	        eval(arrobj[2]);
	        return;
	    }
	    //fix_flash();
		var oDialog = new dialog("");
		oDialog.init();
		oDialog.set('src',arrobj[1]);
		oDialog.event(arrobj[0],'');
		oDialog.button('dialogOk',arrobj[2]);
    }
}

function goto(url){
	if(url!="")	{
		window.location=url;	
	}else{
		history.back();	
	}
	return true;
}

function setCookie(cookieName, cookieValue, expires, path, domain, secure) {
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

function getCookie(cookieName) {
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
}

function getElementsByName_iefix(tag, name) {  
	var arr="";
      var elem = document.getElementsByTagName(tag);
      var arr = new Array();
      for(var i = 0,iarr = 0; i < elem.length; i++) {
           att = elem[i].getAttribute("name");
           if(att == name) {
                arr[iarr] = elem[i];
                iarr++;
           }
      }
      return arr;
}

function RndNum(n)
{
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

function apost(){
    var arrKey=new Array();
    var arrValue=new Array();
    var i=0;
    this.add=function(sid){
        arrKey[i]=sid;
        if($(sid)){
            if($(sid).type=='checkbox'){
                arrValue[i]=read_checkbox(sid);
                //alert(arrValue[i]);
            }else if($(sid).type=='radio'){
                arrValue[i]=read_radio(sid);
            }else{
                //arrValue[i] =URLencode($(sid).value);
		 arrValue[i] =$(sid).value;
            }
        }
        else
            arrValue[i]=""; 
        i++;
            
    }
    
    this.send=function(url,cfun){
        if (cfun==""){
            cfun=show_return;
        }
        var Ajax = new oAjax(url,cfun);
	    Ajax.Post(arrKey,arrValue);
	}
}

function obaddjs(url) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = url;
    oScript.charset = "utf8";
    oHead.appendChild(oScript);

}

    
function getBodySize(){
    var bodySize = [];
    with(document.documentElement) {
         bodySize[0] = (scrollWidth>clientWidth)?scrollWidth:clientWidth;
         bodySize[1] = (scrollHeight>clientHeight)?scrollHeight:clientHeight;
    }
       return bodySize;
}


function popCoverDiv() {
    if ($("cover_div")) {
        $("cover_div").style.display = '';
        $("cover_div_frame").style.display = '';
    } else {
        try {
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                fix_flash();
            }
        }
        catch (e) { };
        var coverDiv = document.createElement('div');
        document.body.appendChild(coverDiv);
        coverDiv.id = 'cover_div';

        with (coverDiv.style) {
            position = 'absolute';
            background = '#999999';
            left = '0px';
            top = '0px';
            var bodySize = getBodySize();
            width = bodySize[0] + 'px'
            height = bodySize[1] + 'px';
            zIndex = 98;
            if (IsIE) {
                filter = "Alpha(Opacity=60)";
            } else {
                opacity = 0.6;
            }
        }
        var coverDiv = document.createElement('iframe');
        document.body.appendChild(coverDiv);
        coverDiv.id = 'cover_div_frame';
        with (coverDiv.style) {
            position = 'absolute';
            background = '#999999';
            left = '0px';
            top = '0px';
            var bodySize = getBodySize();
            width = bodySize[0] + 'px'
            height = bodySize[1] + 'px';
            zIndex = 97;
            if (IsIE) {
                filter = "Alpha(Opacity=0)";
            } else {
                opacity = 0;
            }
        }
    }
}

function URLencode(sStr) 
{
    return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}

function showdiv(divid) {
    if ($(divid).style.display == "none") {
        $(divid).style.display = "block";
    } else {
        $(divid).style.display = "none";
    }
}


function initimg() {
    var img = getElementsByName_iefix("img", "preimg")
    var tmplist = getCookie("ov_tmplist");
    var fcode = '';
    for (var i = 0; i < img.length; i++) {
        if (img[i].parentNode.tagName == "A") {
            fcode = img[i].parentNode.href;
            if (fcode.indexOf("play_") != -1) {
                fcode = fcode.split('play_')[1].split('.html')[0];
                showbtn(fcode, img[i], tmplist)
            }

        }
    }
    if ($("ov_tmplist")) {
        var tmps = tmplist.split("|");
        var m = 0;
        for (var i = 0; i < tmps.length; i++) {
            if (tmps[i] != "") {
                m = m + 1
            }
        }
        $("ov_tmplist").innerHTML = m;
    }
}

function showbtn(fcode, imgobj, tmplist) {
    var atype, atitle;
    if (tmplist.indexOf(fcode) != -1) {
        atype = 'del';
        atitle = "从点播单移除"
    } else {
        atype = 'add';
        atitle = "添加到点播单"
    }
    imgobj.parentNode.innerHTML += "<div class='addbtn_div' title='" + atitle + "'><img src='images/" + atype + "0.gif' class='addbtn_img' onMouseOver='this.src=\"images/" + atype + "1.gif\"' onMouseOut='this.src=\"images/" + atype + "0.gif\"' onclick='tplaylist(\"" + atype + "\",\"" + fcode + "\");return false;'></div>";
    imgobj = null;
}

function tplaylist(type, fcode) {
    var saved = getCookie("ov_tmplist")
    var tmps = "";
    if (type == 'add') {
        setCookie('ov_tmplist', saved + "|" + fcode)
        initimg();
        var ms = "成功添加到点播单！";
    } else {
        setCookie('ov_tmplist', "");
        saved = saved.split("|");
        for (var i = 0; i < saved.length; i++) {
            if (fcode != saved[i] && saved[i] != "undefined" && saved[i] != "") {
                tmps = tmps + "|" + saved[i];
            }
        }
        setCookie('ov_tmplist', tmps);
        initimg();
        var ms = "已经从点播单移除！";
    }
}

function getcodeimg() {
    if ($("ov_codeimg")) {
        $("ov_codeimg").src = $("ov_codeimg").src + "?" + Math.random();
    }
}

if (IsIE) {
    window.attachEvent("onload", initimg);
} else {
	window.addEventListener("load",initimg,true);
}

function downfile(furl) {
    var elemIF = document.createElement("iframe");
    elemIF.src = furl;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
} 