    function initplayer() 
    {
        //document.write('<script language="javascript" src="ajax.aspx?action=get_player&' + getpara() + '"><\/script>');
        //chkding();

    }

    function savejb(i, fcode) {
        var Ajax = new oAjax("ajax.aspx?action=save_jb", show_return);
        var arrKey = new Array("c", "jbtype");
        var arrValue = new Array(fcode, i);
        Ajax.Post(arrKey, arrValue);
    }

    function saveding(t) {
        var Ajax = new oAjax("ajax.aspx?action=save_ding", show_return);
        var arrKey = new Array("c", "dingtype");
        var arrValue = new Array(fcode, t);
        Ajax.Post(arrKey, arrValue);
    }

    function chkding() {
        var dingstat = getCookie("ding" + fcode);
        //if (dingstat != "") {
            obaddjs("ajax.aspx?action=read_ding&c=" + fcode)
        //}
    }

    function savefav() {
        var Ajax = new oAjax("ajax.aspx?action=save_fav", show_return);
        var arrKey = new Array("c", "a");
        var arrValue = new Array(fcode, "a");
        Ajax.Post(arrKey, arrValue);
    }
    
    function chkfav() {
        obaddjs("ajax.aspx?action=read_fav&c=" + fcode)
    }

    function savesub(userid) {
        var Ajax = new oAjax("ajax.aspx?action=save_sub", show_return);
        var arrKey = new Array("userid", "a");
        var arrValue = new Array(userid, "savesub");
        Ajax.Post(arrKey, arrValue);
    }

    function showcmtcode(cid) {
        //判断是否显示验证码
        if (!$("cmtcode0")) {
            return true;
        }
        var OBASN = RndNum(9);
        var CodeUrl = "code.aspx" + "?s=" + OBASN;
        cmtcode = "验证码：<input type='text' id='tcode" + cid + "' size='5'>　<img src='" + CodeUrl + "' style='cursor:hand;border:1px solid #ccc;vertical-align:top;' onclick='this.src=\"" + CodeUrl + "&t=\"+ Math.random();' alt='如果看不清数字或字母?请点一下换一个!' title='如果看不清数字或字母?请点一下换一个!' /><input type='hidden' id='scode" + cid + "' value='" + OBASN + "' /> ";
        if (!$("tcode" + cid) && $("cmtcode" + cid)) {
            $("cmtcode" + cid).innerHTML = cmtcode;
        }
    }

    function addcmt() {
        var c_cmt = $("c_cmt").value;
        var c_fcode = fcode;
        var c_uid = fuid;
        //alert(fuid);
        var tcode = ""
        var scode = ""
        if ($("tcode0") && $("scode0")) {
            tcode = $("tcode0").value;
            scode = $("scode0").value;
        }
        var Ajax = new oAjax("ajax.aspx?action=save_cmt", show_return);
        var arrKey = new Array("c_fcode", "c_uid", "c_cmt", "tcode", "scode");
        var arrValue = new Array(c_fcode, c_uid, c_cmt, tcode, scode);
        Ajax.Post(arrKey, arrValue);
    }

    function addcmts() {
        var c_cmt = editor.text();
        var c_fcode = fcode;
        var c_uid = fuid;
        var filetype = $("filetype").value;
        var tcode = ""
        var scode = ""
        if ($("tcode0") && $("scode0")) {
            tcode = $("tcode0").value;
            scode = $("scode0").value;
        }
        var Ajax = new oAjax("ajax.aspx?action=save_cmt", show_return);
        var arrKey = new Array("c_fcode", "c_uid", "c_cmt", "tcode", "scode", "filetype");
        var arrValue = new Array(c_fcode, c_uid, c_cmt, tcode, scode, filetype);
        Ajax.Post(arrKey, arrValue);
    }

    function g_1(page) {
        var url = "ajax.aspx?action=show_cmt&c=" + fcode + "&rnd=" + RndNum(10);
        if (page != "") {
            url += "&listpager=" + page
        }
        obaddjs(url);
    }

    var lastrecmt = null
    function recmt(msgid) {
        if (lastrecmt && $("divrecmt")) {
            lastrecmt.removeChild($("divrecmt"));
        }
        $('msg' + msgid).innerHTML += "<div id='divrecmt'><div class='shows'><textarea cols='65' rows='5' id='c_cmt1' onfocus='showcmtcode(" + msgid + ");'></textarea></div>\
						 <div class='shows' id='cmtcode" + msgid + "'></div>\
						 <div class='shows'><input type='button' value=' 回复 ' onclick='saverecmt(" + msgid + ")'> <input type='button' value=' 取消 ' onclick='lastrecmt.removeChild($(\"divrecmt\"))'></div>\
						 </div>";
        lastrecmt = $('msg' + msgid)
    }

    function resetcmt() {
        $("c_cmt").value = "";
        if ($("cmtcode0")) {
            $("cmtcode0").innerHTML = "";
        }
        //showcmtcode(0);
    }

    function shortmess(t) {
        if ($("messmsg"+t).style.display == '') {
            $("messmsg" + t).style.display = "none";
        }
        else {
            $("messmsg" + t).style.display = "";
            if ($("read" + t).innerText == "0") {
                $("read" + t).innerHTML = "1";
                $("sm" + t).style["font-weight"] = "normal";
                obaddjs("ajax.aspx?action=save_mess&smid=" + t);
            }
        }
        
    }

    function saverecmt(msgid) {
        var c_recid = msgid;
        var c_cmt = $("c_cmt1").value;
        var c_fcode = fcode;
        //var c_uid = $("userid").value;
        var c_uid = fuid;
        var tcode = ""
        var scode = ""
        if ($("tcode" + msgid) && $("scode" + msgid)) {
            tcode = $("tcode" + msgid).value;
            scode = $("scode" + msgid).value;
        }
        var Ajax = new oAjax("ajax.aspx?action=save_cmt", show_return);
        var arrKey = new Array("c_fcode", "c_uid", "c_cmt", "c_recid", "tcode", "scode");
        var arrValue = new Array(c_fcode, c_uid, c_cmt, c_recid, tcode, scode);
        Ajax.Post(arrKey, arrValue);

    }

    var selectid = ""
    var runfirst = true;
    //设置选择的点节
    function setSelectedIndex(m, sn) {
        //var fc=$("fc_"+m).value;
        //alert(sn);
        try
        {
            if(onlyplayer==1)
            {
                return;
            }
        }
        catch(e)
        {}
        obaddjs("ajax.aspx?action=get_player&c=0|" + sn + "&rnd=" + RndNum(9))
        selectid = m
        var p_now = $("p_now").value;
        var p_count = $("p_count").value;
        var p_size = $("p_size").value;
        thispage = parseInt(m / p_size) + 1;
        var s = (p_now - 1) * p_size + m;
        changselect(s);
    }

    //传给播放器
    function selectp(m, f, d) {
        if ($("ashtml5video")) {
            obaddjs("ajax.aspx?action=get_player&c=" + f + "&rnd=" + RndNum(9));
        }
        else {
            var _event = { _op: "setVideoIndex", _value: d };
            broadcastEvent(_event, "ovideoplayerDiv_swf");
        }
    }

    var dsa = 0;
    function updateList(page, d) {
        var lid = $("lid").value;
        var sid = $("sid").value
        dsa = d;
        var url = "ajax.aspx?action=viewlist&t=cpage&selectid=" + d + "&lid=" + lid + "&sid=" + sid;
        if (page != "") {
            url += "&listpager=" + page;
        }
        var Ajax = new oAjax(url, show_returndata);
        var arrKey = new Array("m_id");
        var arrValue = new Array("mid");
        Ajax.Post(arrKey, arrValue);
    }

    function show_returndata(arrobj) {
        if (arrobj) {
            changselect(dsa);
            thisMovie("ovideoplayerDiv_swf").sendToFlash({ _op: "updateList", _value: dsa, data: arrobj[0] });
        }
    }

    function changselect(m) {
        var temp = getElementsByName_iefix("li", "pselected");
        for (i = 0; i < temp.length; i++) {
            temp[i].style.display = 'none';
        }
        var temp = getElementsByName_iefix("li", "pselect");
        for (i = 0; i < temp.length; i++) {
            temp[i].style.display = '';
        }
        if ($("of_" + m)) {
            $("of_" + m).style.display = "none";
        }
        if ($("on_" + m)) {
            $("on_" + m).style.display = "";
        }
    }

   

    //接收FLASH传来的信息
    function getDataFromFlash(obj) {
        switch (obj._type) {
            case "changeID":
                //alert("changeID"+obj._value);
                setSelectedIndex(obj._value, obj._sn);
                //alert(obj._sn);
                break;
            case "startPlay":
                //start_savetime();
                savetime();
                //alert("startPlay"+obj._sn);
                //alert("startPlay"+obj._value);			
                break;
            case "readMeta":
                //chkstop();
                //alert("readMeta"+obj._sn);
                //alert("readMeta"+obj._value);
                break;
            case "fullBuffer":
                
                //alert("fullBuffer"+obj._sn);
                //alert("fullBuffer"+obj._value);
                break;
            case "switchPlayerDiv":
                switchPlayerDiv(obj);
                break;
            case "writeEmbedCode":
                writeEmbedCode(obj);
                break;

            default: break;

        }
    }

    function chkautoplay() {
        var s = gets("s");
        if (s != "") {
            var _event = { _op: "play" };
            broadcastEvent(_event, "ovideoplayerDiv_swf");
        }
    }

    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }
    
    function showmyplay() {
        var saved = getCookie("as_myplay");
        saved = saved.split("|");
        var title="";
        var time = "";
        var thtml = "";
        for (var i = 0; i < saved.length; i++) {
            if (saved[i].trim() == "" || saved[i] == "undefined" ) {
                continue;
            }
            title = getCookie("as_myplay_title_" + saved[i]);
            time = getCookie("as_myplay_time_" + saved[i]);
            if (title== "undefined" || title.trim()== "")
            {
                continue;
            }
            var stime = SplitTime(time);

            thtml += "<li>";
            thtml += "<div class='v_title'><a href='play_" + saved[i] + ".html' target='_blank'>" + title + "</a><span class='num'></span></div>";
            thtml += "<div class='v_delete' handler='playtag' onclick=\"delmyplay('" + saved[i] + "')\"><span class='ico__close'></span></div>";
            thtml += "<div class='v_record'><span class='ico__info'></span>您上次看到: " + stime + " <a href='play_" + saved[i] + ".html?s=" + time + "' target='_blank'>继续观看</a></div>";
            thtml += "</li>";
        }
        //alert(thtml);
        if ($("index_cookielist")) {
            if (thtml == "") {
                $("index_cookielist").style.display = "none";
            }
            else {
                $("index_cookielist").style.display = "";                
            }
        }
        $("as_myplay").innerHTML = thtml;
    }
    function SplitTime(stime) 
		{
		    var HourTime;
            var MinuteTime;
            var ss = parseInt(stime);
            HourTime = (parseInt(ss / 3600)).toString() ;
            MinuteTime = (parseInt((ss % 3600) / 60)).toString();
            stime = (parseInt((ss % 3600) % 60)).toString();
			if(MinuteTime.length<2)
			{
				MinuteTime="0"+ MinuteTime;
			}
			if (stime.length<2){
				stime="0"+ stime;
			}
			if (HourTime=="0"){
				return MinuteTime   +":"+stime;
			}
			else
			{
				return HourTime+":"+ MinuteTime+":"+stime;
			}  
		}

    function delmyplay(t) {
        if (t == "all") {
            setCookie('as_myplay', "");
        }
        else {
            var saved = getCookie("as_myplay");
            setCookie('as_myplay', "");
            saved = saved.split("|");
            var tmps = "";
            for (var i = 0; i < saved.length; i++) {
                if (t != saved[i] && saved[i] != "undefined" && saved[i] != "") {
                    //alert(saved[i])
                    tmps = tmps + "|" + saved[i];
                }
            }
            setCookie('as_myplay', tmps);
        }
        showmyplay();
    }

    var saveplaytime;
    function savetime() {
        window.clearInterval(saveplaytime);
        try {
            //delmyplay(fcode);
            var saved = getCookie("as_myplay");
            var nows = thisMovie("ovideoplayerDiv_swf").sendToFlash({ _op: "getTime" });
            if (saved.indexOf(fcode) == -1) {
                setCookie('as_myplay', fcode + "|" + saved)
            }
            setCookie('as_myplay_title_' + fcode, $("ov_play_title").innerHTML)
            setCookie('as_myplay_time_' + fcode, nows)
        }
        catch (e) { }
        start_savetime();
    }



    function start_savetime() {
        saveplaytime = window.setInterval(savetime, 5000);
    }

    function switchPlayerDiv(obj) {
        var swfDiv = $("swfplayerDiv");
        var playerDiv = $("ovideoplayerDiv");
        if (swfDiv != null) {
            swfDiv.style.width=player_w+"px";
            swfDiv.style.height = player_h+"px";
            swfDiv.style.display = obj._value == "true" ? "block" : "none";
        }

        //发现使用visibility或display隐藏层后, 无法正确调用flash内部的方法
        //此处更改为使用height来隐藏主播放器
        if (playerDiv != null) {
            playerDiv.style.height = obj._value == "true" ? 0 : "100%";
            
        }
    }
    
    //填充嵌入外站播放器代码
    function writeEmbedCode(obj) {
        var swf = $("swfplayerDiv");
        if (swf != null)
            swf.innerHTML = obj._value;

    }
    //隐藏站外播放器
    function hideSWF() {
        switchPlayerDiv({ _value: "false" });
    }
    


    function g_2(page) {
        var lid = $("lid").value;
        var sid = $("sid").value
        var url = "ajax.aspx?action=show_albumlist&t=cpage&selectid=" + selectid + "&lid=" + lid + "&sid=" + sid
        //alert(url)
        if (page != "") {
            url += "&listpager=" + page
        }
        obaddjs(url);
    }

    function downflv(fcode) {
        var Ajax = new oAjax("ajax.aspx?action=show_downflv", show_return);
        var arrKey = new Array("c", "t");
        var arrValue = new Array(fcode, 1);
        Ajax.Post(arrKey, arrValue);
    }

    function paythis(t, fcode) {
        var Ajax = new oAjax("ajax.aspx?action=pay_video", show_return);
        var arrKey = new Array("c", "t");
        var arrValue = new Array(fcode, t);
        Ajax.Post(arrKey, arrValue);
    }

    function rload(fcode) {
        if ($('doc_view')) {
            window.location = 'view_'+fcode+".html?rnd="+Math.random();
        } else {
            window.location = 'play_' + fcode + ".html?rnd=" + Math.random();
            show_video();
            obaddjs("ajax.aspx?action=get_player&c=" + fcode + "&rnd=" + RndNum(9));
        }
    }
    function turnToWide() {
        thisMovie("ovideoplayerDiv_swf").width = 970;
        $("videoShow").style.width = 970 + 'px';
        $("ovideoplayerDiv").style.width = 970 + 'px';
        $("ovideoplayerDiv").style.height = 500 + 'px';
    }
    function turnToNormal() {
        thisMovie("ovideoplayerDiv_swf").width = 611;
        $("videoShow").style.width = 611 + 'px';
        $("ovideoplayerDiv").style.width = 611 + 'px';
        $("ovideoplayerDiv").style.height = 489 + 'px';
    }