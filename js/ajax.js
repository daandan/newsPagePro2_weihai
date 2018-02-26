if (document.getElementById('sys_login')) {
    document.getElementById('sys_login').innerHTML = "<form action=\"\" method=\"post\" name=\"UserLogin\" onsubmit=\"chk_login();return false\"><ul class=\'beforeLogin\'><input name=\"UserName\" type=\"text\" id=\"UserName\" value=\"用户名\" onfocus=\"if (value == \'用户名\') {value =\'\'};\" onblur=\"if (value == \'\') {value =\'用户名\'};\" /><input name=\"s_Password\" type=\"text\" id=\"s_Password\" value=\"密码\" onfocus=\"if (value == \'密码\') {this.style.display=\'none\';$(\'Password\').style.display=\'\';$(\'Password\').focus();};\"  /><input name=\"Password\" type=\"password\" id=\'Password\' style=\'display:none\' onblur=\"if (value == \'\') {$(\'s_Password\').style.display=\'\';this.style.display=\'none\'};\" /><input type=\'submit\' value=\'登录\' id=\"button\" /><span class=\"remspan\"><input type=\"checkbox\" name=\"CookieDate\" id=\"CookieDate\" value=\"365\" class=\"remberinput\" />记住我</span></ul><div class=\'title\'><a href=\'reg.html\'>注册用户</a>&nbsp;|&nbsp;<a href=\'lostpass.html\'>忘记密码?</a></div></form>";
}
if (document.getElementById('sys_topmenu')) {
    document.getElementById('sys_topmenu').innerHTML = "<a href=\'login.html\'>登录</a>　<a href=\'reg.html\'>注册</a>　<a href=\'playlisttmp.html\'>点播单(<span id=\'ov_tmplist\'></span>)</a>";
}

function chk_login() {
    var ap = new apost();
    ap.add('UserName');
    ap.add('Password');
    ap.add('CookieDate');
    ap.add('fromurl');
    ap.send('ajax.aspx?action=chk_login', '');
}