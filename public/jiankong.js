/* eslint-disable */
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//2016-11-18 使用DTClientOcx控件，封装js方法
//
//2016-11-18 Creat by yanj
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
var isInit = false;
var isRegist = false;
var isVideo = false;
var isRefresh = false;
window.ixuGlobal = {
  txtVersion: '',           // 版本号
  ip: '0.0.0.0',            // 本地ip
  playport: '5070',         // 本地端口
  host: '121.28.160.12',    // 服务器ip
  port: '55555',            // 服务器端口
  othersidenum: '',         // 被叫对方账号
  loginuser: '2001',        // 登录用户 调度用户
  pwd: '123456',            // 登录密码
  callid: '',               // 呼叫标识
  addcid: '',
  serverport: {
    //'myocxName' : port
  }
}

window.ocxDom = {
  //'myocxName' : {
    // ocxId: '',
    // accid: '',
    // serverport : port,

  // }
}
//动态创建ocx控件
var ocxId = 1;
  
function CreateOcx(calledId, userName) {
  console.log(calledId)
  var div = document.createElement("div");
  div.id = 'ocxDiv' + ocxId;
  div.className = 'bb';
  div.innerHTML +=
    "<object id='myOcx" + ocxId + "' width='320' height='240' codebase='./DTAxVideoControl.ocx#version=1,0,0,1'" +
    "classid='clsid:1AEF5D45-E61F-44DF-B862-8F005038D4F8'></object>" +
    "<div class=\"call-name\">" + userName + "</div>" +
    "<p class =\"control-btns\">" +
    "<button class=\"el-button el-button--info\" name=\"btnSipPhoneVideoBug\" onclick=\"VideoBug(\'myOcx" + ocxId + "\', \'" + calledId +
    "\')\">开始监控</button>" +
    "</p>";
    // "<button class=\"el-button el-button--danger\" onclick=\"Dispose(" + ocxId + ",\'" + calledId + "\')\">挂断</button>" +
  document.getElementById('divOcxContainer').appendChild(div);

  window.ocxDom['myOcx' + ocxId] = {
    'ocxId': ocxId,
    'calledId': calledId
  }
  ocxId++;
}
window.onbeforeunload = function () {    
    if (isInit) {
        if (isRegist)
          document.myOcx.UnRegist();
        //alert("自动注销Ocx控件通知");
        document.myOcx.Dispose();   
    }
}

function onload() {
    // ixuGlobal.txtVersion = document.myOcx.ME_GetOcxVersion();
    // 获取本机ip
    console.log('获取本地ip')
    GetLocalIP();
    // 初始化
    console.log('初始化')
    Init()
    $('myOcx').style.display = "none";
    // // 登录调度用户
    // setTimeout(window.Regist, 500);
}

function Init() {
    var ip = ixuGlobal.ip;
    var port = ixuGlobal.playport;
    var type = 1;
    var logLevel = 5;
    
    isInit = document.myOcx.InitWithType(ip, port, type, logLevel);
    if (isInit) {        
        rem("初始化成功");
    }
}
function Bind() {
    var leftphone = $("leftphone").value;
    var rightphone = $("rightphone").value;
    document.myOcx.BindPhoneHandle(leftphone, rightphone);
}
function Dispose(accid, calledId) {
  console.log('挂断', accid, calledId)
    if(accid) {
      window.showCreateBtn(calledId);
      // document['myOcx' + accid].Dispose();
      $('divOcxContainer').removeChild($('ocxDiv' + accid));
      console.log('挂断防范','myOcx' + accid, ixuGlobal.serverport['myOcx' + accid])
      // window['myOcx' + accid].ME_StopReceiveVideo(ixuGlobal.serverport['myOcx' + accid])
    }
}
function Regist() {
    var hostinfo = window.ixuGlobal.host;
    var hostport = window.ixuGlobal.port;
    var username = window.ixuGlobal.loginuser;
    var key = window.ixuGlobal.pwd;
	
    isRegist = document.myOcx.ME_Regist(hostinfo, hostport, 10001, username, key, false, false, 60);
    if (isRegist) {
        rem("登录成功 操作成功");
    }
    return isRegist;
}
function SendMsg() {
    var receiver = ixuGlobal.othersidenum;
    var contentinfo = $("contenttext").value;
     document.myOcx.SendMsg(receiver,contentinfo);
}
function SendGroupMsg() {
    var receiver = ixuGlobal.othersidenum;
    var contentinfo = $("contenttext").value;
    document.myOcx.ME_SendGroupMsg(receiver, contentinfo);
}
function GetHistoryVideo() {
    var number = $("videonum").value;
    var starttime = $("starttime").value;
    var endtime = $("endtime").value;
    document.myOcx.ME_GetHistoryVideo(number, starttime, endtime);
}
function PlayHistoryMove() {
    var addcid = ixuGlobal.addcid;
    var number = $("videonum").value;
    var videoplaytime = $("videoplaytime").value;
    document.myOcx.ME_HistoryVideo_Play(addcid, number, videoplaytime);
}
function PlayHistoryPause() {
    var addcid = ixuGlobal.addcid;
    var number = $("videonum").value;
    document.myOcx.ME_HistoryVideo_Pause(addcid, number);
}
function PlayHistoryPlay() {
    var addcid = ixuGlobal.addcid;
    var number = $("videonum").value;
    document.myOcx.ME_HistoryVideo_Play(addcid, number, 0);
}
function StartMoveY() {
    var cameranum = $("cameranum").value;
    var camerastep = $("camerastep").value;
    var cameratimeout = $("cameratimeout").value;
    document.myOcx.ME_PTZMoveY(cameranum, camerastep, true, cameratimeout);
}
function StopMoveY() {
    var cameranum = $("cameranum").value;
    var camerastep = $("camerastep").value;
    var cameratimeout = $("cameratimeout").value;
    document.myOcx.ME_PTZMoveY(cameranum, camerastep, false, cameratimeout);
}
function StartMoveX() {
    var cameranum = $("cameranum").value;
    var camerastep = $("camerastep").value;
    var cameratimeout = $("cameratimeout").value;
    document.myOcx.ME_PTZMoveX(cameranum, camerastep, true, cameratimeout);
}
function SendDtmf() {
    var callid = ixuGlobal.callid;
    var txtdtmf = $("txtdtmf").value;
    document.myOcx.ME_SendDtmf(callid, txtdtmf);
}
function PlayAudio() {
    var filepath= $("filepath").value;

     document.myOcx.PlayAudio(filepath);
}
function StopPlayAudio() {

     document.myOcx.StopPlayAudio();
}
function UnRegist(ocxName) {
    if (isRegist)
      document.myOcx.UnRegist();
}
function AudioCall() {
    var called = ixuGlobal.othersidenum;
    document.myOcx.MakeCall(called, false);
}
function VideoCall() {
    var called = ixuGlobal.othersidenum;
    //document.myOcx.MakeCallLocalMode(called,5060, true);
    document.myOcx.SipPhoneVideoBug(called, true, true,  "");
}
//add 
var DynamicOcxId = -1;
function VideoCallMultiple(obj) {
	if(obj.id=='btnVideoCall1')
	{		
		var called = $("othersidenum1").value;
		document.myOcx.MakeCall(called, true);
	}
	else if(obj.id=='btnVideoCall2')
	{
		var called = $("othersidenum2").value;
		document.myOcx2.MakeCall(called, true);
	}
	else if(obj.id=='btnVideoCall3')
	{
		var called = $("othersidenum3").value;
		document.myOcx3.MakeCall(called, true);		
	}
	else if(obj.id=='btnVideoCall4')
	{
		var called = $("othersidenum4").value;
		document.myOcx4.MakeCall(called, true);
	}
	else if(obj.id=='btnVideoCallDynamic')
	{
		var called = ixuGlobal.othersidenum;
		if(DynamicOcxId==-1)
		{
			DynamicOcxId = ocxId;
			DynamicOcxId--;
		}
		var ocxDynamic=document.getElementById("myOcx"+DynamicOcxId);
		ocxDynamic.MakeCall(called,true);
		DynamicOcxId--;		
	}
}
function AnswerCall() {
    var callid = ixuGlobal.callid;
    document.myOcx.Answer(callid, true);
}
//add
function AnswerCallMultiple(obj) {
    var callid = ixuGlobal.callid;
	if(obj.id=='btnAnswer1')
	{		
		document.myOcx.Answer(callid, isVideo);
	}
	else if(obj.id=='btnAnswer2')
	{
		document.myOcx2.Answer(callid, isVideo);
	}
	else if(obj.id=='btnAnswer3')
	{
		document.myOcx3.Answer(callid, isVideo);	
	}
	else if(obj.id=='btnAnswer4')
	{
		document.myOcx4.Answer(callid, isVideo);
	}
}
function GetDownLostRatio1(obj) {
    var callid = ixuGlobal.callid;
    var result = "";
    if (obj.id == 'btngetdown1') {
        result=document.myOcx.ME_GetDownLostRatio(callid);
    }
    else if (obj.id == 'btngetdown2') {
        result=document.myOcx2.ME_GetDownLostRatio(callid);
    }
    else if (obj.id == 'btngetdown3') {
        result=document.myOcx3.ME_GetDownLostRatio(callid);
    }
    else if (obj.id == 'btngetdown4') {
        result=document.myOcx4.ME_GetDownLostRatio(callid);
    }
}

function Preview(obj) {
    document.myOcx2.ME_StartPreview();
}
function StopPreview(obj) {
    document.myOcx2.ME_StopPreview();
}
function PlayMemberMultiple() {
    var playwd = $("playwd").value;
    var cid = ixuGlobal.addcid;
    var addnumber = $("addnumber").value;
    if (playwd == '1') {
        ixuGlobal.playport=document.myOcx.ME_GetMemberVideo(cid, addnumber, "");
    }
    else if (playwd == '2') {
        ixuGlobal.playport=document.myOcx2.ME_GetMemberVideo(cid, addnumber, "");
    }
    else if (playwd == '3') {
        ixuGlobal.playport=document.myOcx3.ME_GetMemberVideo(cid, addnumber, "");
    }
    else if (playwd == '4') {
        ixuGlobal.playport=document.myOcx4.ME_GetMemberVideo(cid, addnumber, "");
    }
}
function PlayMemberMultiple1() {
    var playwd = $("playwd").value;
    var cid = ixuGlobal.addcid;
    var addnumber = $("addnumber").value;
    var showhwnd = 0;
    if (playwd == '1') {
        showhwnd = document.myOcx.ME_GetHwnd();
    }
    else if (playwd == '2') {
        showhwnd = document.myOcx2.ME_GetHwnd();
    }
    else if (playwd == '3') {
        showhwnd = document.myOcx3.ME_GetHwnd();
    }
    else if (playwd == '4') {
        showhwnd = document.myOcx4.ME_GetHwnd();
    }
    ixuGlobal.playport = document.myOcx.ME_GetMemberVideo1(cid, addnumber, "", showhwnd);
}
function StopPlayMemberMultiple() {
    var playwd = $("playwd").value;
    var cid = ixuGlobal.addcid;
    var addnumber = $("addnumber").value;
    var localport = ixuGlobal.playport;
    if (playwd == '1') {
        document.myOcx.ME_StopGetMemberVideo(cid, addnumber, "", localport);
    }
    else if (playwd == '2') {
        document.myOcx2.ME_StopGetMemberVideo(cid, addnumber, "", localport);
    }
    else if (playwd == '3') {
        document.myOcx3.ME_StopGetMemberVideo(cid, addnumber, "", localport);
    }
    else if (playwd == '4') {
        document.myOcx4.ME_StopGetMemberVideo(cid, addnumber, "", localport);
    }
}
function HangupCall() {
    var cid = ixuGlobal.callid;
    document.myOcx.Hangup(cid);
}
function HoldCall() {
    var cid = ixuGlobal.callid;    
    document.myOcx.Hold(cid);
}
function UnHoldCall() {
    var cid = ixuGlobal.callid;
    document.myOcx.UnHold(cid);
}
function Login() {
    var dispatchhost = $("dispatchhost").value;
    var dispatchport = $("dispatchport").value;
    var employeeid = $("employeeid").value;
    var employeepwd = $("employeepwd").value;    
    var ret = document.myOcx.LoginDPServer(dispatchhost, dispatchport, employeeid, employeepwd);
    if (ret)
        rem("调度台登陆成功");
    else
        rem("调度台登陆失败");
}
function Logout() {
    var ret = document.myOcx.LogoutDPServer();
    if (ret)
        rem("调度台登出成功");
    else
        rem("调度台登出失败");
}
function BindPhoneHandle() {   
	var left = $("leftnum").value;
	var middle = $("middlenum").value;
	var right = $("rightnum").value; 
        document.myOcx.BindPhoneHandle(left, middle, right);
}
function SetNightService() {
    var targetnum = $("nightnum").value;
    document.myOcx.SetNightService(targetnum);
}
function SetNightServiceCancel() {
    document.myOcx.SetNightService("");
}

function onCallStatusChanged(mynum, othersidenum, callid, callstatus, isvideo) {
    ixuGlobal.callid = callid;
    isVideo = isvideo;
    var strMsg = "呼出:" + mynum + '|' + othersidenum + '|' + callid + '|' + callstatus + '|' + isvideo;
    rem(strMsg);
}
function onCallStatusWithHwnd(mynum, othersidenum, callid, callstatus, isvideo, showhwnd) {
    ixuGlobal.callid = callid;
    isVideo = isvideo;
    var strMsg = "呼出:" + mynum + '|' + othersidenum + '|' + callid + '|' + callstatus + '|' + isvideo + ' hwnd:' + showhwnd;
    rem(strMsg);
}

function onIncomingCall(mynum, othersidenum, callid, callstatus, isvideo,idscontent) {
    ixuGlobal.callid = callid;
    isVideo = isvideo;
    var strMsg = "呼入:" + mynum + '|' + othersidenum + '|' + callid + '|' + callstatus + '|' + isvideo + '|' + idscontent;
    rem(strMsg);
    if (callstatus == 2) {
        rem("您有新的来电：" + othersidenum);
    }
}
function CreateConf() {
    var called = $("calleds").value;
    document.myOcx.CreateSnapMetting(called, false);
}
function CreateVideoConf() {
    var called = $("calleds").value;
    var username = $("uname").value;
    document.myOcx.ME_CreateSnapMetting1(username, called, true);
}
function CreateMCUConf1() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateMCUMetting(called, true,false);
}
function CreateMCUConf2() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateMCUMetting(called, true, true);
}
function CreateMCUConf3() {
    var called = $("calleds").value;
    var code = $("mcucode").value;
    document.myOcx.ME_CreateMCUMetting1(called, true, true, code);
}
function CreateConf1() {
    var called = $("calleds").value;
    var code = $("mcucode").value;
    document.myOcx.ME_CreateConference("",called, false, false, code);
}
function GetMySession() {
    document.myOcx.GetMySession();
}
function GetMember() {
    var addcid = ixuGlobal.addcid;
    document.myOcx.GetCallMember(addcid);
}
function GetMember1() {
    var addcid = ixuGlobal.addcid;
    document.myOcx.GetCallMember1(addcid);
}
function EndConf() {
    var addcid = ixuGlobal.addcid;
    document.myOcx.ForceEndConfe(addcid);
}
function AddMember() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.AddMember(addcid, addnumber);
}
function AddMember1() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var jsonstr = "[{\"called\":\"" + addnumber + "\",\"details\":[]}]";
    document.myOcx.ME_AddMember1(addcid, jsonstr,true,false,"test内容");
}
function AddMemberByOrder() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var jsonstr = "[{\"called\":\"" + addnumber + "\",\"details\":[{\"number\":\"" + addnumber + "\",\"index\":1,\"ringtime\":15},{\"number\":\"2000\",\"index\":2,\"ringtime\":30}]}]";
    document.myOcx.ME_AddMemberbyOrder(addcid,jsonstr,false);
}
function DeleteMember() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.DeleteMember(addcid, addnumber);
}
function NotSpeak() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.SetMemberSpeak(addcid, addnumber,1);
}
function CanSpeak() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.SetMemberSpeak(addcid, addnumber,2);
}
function NotHear() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.SetMemberHear(addcid, addnumber, 1);
}
function CanHear() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.SetMemberHear(addcid, addnumber, 2);
}
function PushVideo() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    document.myOcx.ME_MemberPush(addcid, addnumber);
}
function PushToMember() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var pushtonums = $("pushtonums").value;
    document.myOcx.ME_MCUPushMemberToOther(addcid, addnumber, pushtonums);
}
function StopPushToMember() {
    var addcid = ixuGlobal.addcid;
    document.myOcx.ME_StopMCUPushMemberToOther(addcid);
}
function UnPushMCU() {
    var addcid = ixuGlobal.addcid;
    document.myOcx.ME_MemberPush(addcid,"");
}
function SetReCall() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var jsonstr = "[{\"number\":\"" + addnumber + "\",\"callnum\":0}]";
    document.myOcx.ME_SetReCallInfo(addcid, jsonstr);
}
function StopReCall() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var jsonstr = "[{\"number\":\"" + addnumber + "\",\"callnum\":-1}]";
    document.myOcx.ME_SetReCallInfo(addcid, jsonstr);
}
function onCallSessionChanged(mynum, othersidenum, strcallid, callstatus, isvideo, calltype) {    
    isVideo = isvideo;
    var strMsg = "SESSIONINFO:" + mynum + '|' + othersidenum + '|' + strcallid + '|' + callstatus + '|' + isvideo + '|' + calltype;
    rem(strMsg);   
}
function onRegStatusChanged(regstatus, statuscode) {
    var strCode_1 = "注册状态:已注册";
    var strCode_2 = "注册失败:错误码" + "[" + statuscode + "]";
    var strMsg = strCode_2;
    if (regstatus)
        strMsg = strCode_1;
    else {
        if (statuscode == 200) {
            strMsg = "注册状态:已注销";
        }
        else if(statuscode == 10000)
        {
            strMsg = "超出允许的注册数";
        }
        else if (statuscode == 10001) {
            strMsg = "当前用户已在其它设备登录";
        }
    }
    rem(strMsg);
}
function onErrorMsgChanged(errCode, errDesc) {
    rem("错误[" + errCode + "] 内容：" + errDesc);
}
function onReceiveMsg(number, content) {
    rem("收到短信来自：" + number + " 内容：" + content);
}
function TreateReceivePublishMsg(header, content) {
    rem( content);
    rem( header );
    if (header == "session.mysession")
    {
        var json = eval('(' + content + ')');
        rem(json[0].cid);
    }
    if (header == "session.create") {
        var json = eval('(' + content + ')');
        ixuGlobal.addcid = json[0].cid;
    }
    if(header=="Session.State.Change")
    {
        var json = eval('(' + content + ')');
        ixuGlobal.addcid = json[0].cid;
    }
    if (header == "COM.MSG.CB")
    {
        if (content == "06066600666666061818F806189E")
        {
            ApplySpeak();
        } else if (content == "06066600666666001818F806189E") {
            ReleaseSpeak();
        }

    }

    if (header == "Video.Bug.Event") {
      var json = eval('(' + content + ')');
      var ocxName = window.ixuGlobal.ocxCallingName;
      rem('接收监控');
      var ocxELE = window[ocxName];
      console.log(' 接收监控名称', ocxName, ocxELE,'aaa', myOcx);
      ocxELE.ME_StartReceiveVideo(json[0].serverip, json[0].serverport,  json[0].serverport, ocxELE.ME_GetHwnd(), 0, 0);
      ixuGlobal.serverport[ocxName] = json[0].serverport;
    }
}
function ClearDesp() {
    $("Prompt").value = "";
}
function rem(strMsg) {
    var myPrompt = document.getElementById("Prompt");
    console.log('日志', myPrompt, strMsg)
    if (myPrompt != null)
        myPrompt.innerText =strMsg+"\n" + myPrompt.innerText;
}
function $(itemID) {
    if (document.getElementById) {
        return document.getElementById(itemID);
    }
    else {
        return document.all(itemID);
    }
}
function PlayHistoryVideo() {
    var number = $("videonum").value;
    var starttime = $("starttime").value;
    var endtime = $("endtime").value;
    document.myOcx.ME_PlayHistoryVideo(number, starttime, endtime);
}
function GetMointorInfo() {
    document.myOcx.ME_GetConfigMoitorPlat(false);
}
function GetMointorDetail() {
    var orgid = $("orgid").value;
    document.myOcx.ME_GetConfigMonitorDetail1("1", orgid);
                   
}
function SetLocalVideo() {
    var localvideow = $("localvideow").value;
    var localvideoh = $("localvideoh").value;
    var localvideozl = $("localvideozl").value;
    var localvideoml = $("localvideoml").value;
    document.myOcx.SetLocalCameraCodec(localvideow, localvideoh, localvideozl, localvideoml);
}
function GetEmployeeTree() {
    document.myOcx.ME_GetConfigMyGroupTree();
}
function GetGroupDetail() {
    var groupnum = $("groupnum").value;
    var dnsprefix = "";
    document.myOcx.ME_GetConfigGroupDetail(groupnum, dnsprefix);
}
function SetMcuScreen() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var mucscreen = $("mucscreen").value;
    var jsonstr = "";
    if (addnumber != "")
    {
        jsonstr = "[{\"index\":1,\"number\":\"" + addnumber + "\",\"hasstream\":1}]";
    }
    document.myOcx.ME_SetMCUScreen(addcid, mucscreen, jsonstr);
}
function ApplySpeak() {
    var called = ixuGlobal.othersidenum;
    document.myOcx.ME_ApplySpeak(called);
}
function ReleaseSpeak() {
    var called = ixuGlobal.othersidenum;
    document.myOcx.ME_ReleaseSpeak(called);
}
function LeftApplySpeak() {
    var called = ixuGlobal.othersidenum;
    var leftphone = $("leftphone").value;
    document.myOcx.ME_ApplySpeakByCaller(called, leftphone);
}
function LeftReleaseSpeak() {
    var called = ixuGlobal.othersidenum;
    var leftphone = $("leftphone").value;
    document.myOcx.ME_ReleaseSpeakByCaller(called, leftphone);
}
function RightApplySpeak() {
    var called = ixuGlobal.othersidenum;
    var rightphone = $("rightphone").value;
    document.myOcx.ME_ApplySpeakByCaller(called, rightphone);
}
function RightReleaseSpeak() {
    var called = ixuGlobal.othersidenum;
    var rightphone = $("rightphone").value;
    document.myOcx.ME_ReleaseSpeakByCaller(called, rightphone);
}
function CreateTmpIntercom() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateTmpInterCom(called);
}

function SendDtmfbyCid() {
    var addnumber = $("addnumber").value;
    var addcid = ixuGlobal.addcid;
    var txtciddtmf = $("txtciddtmf").value;
    document.myOcx.ME_SendDTMFbyCid(addcid, addnumber, txtciddtmf);
}
function GetInterComInfo()
{
    var cid = ixuGlobal.addcid;
    document.myOcx.ME_GetIntercomInfo(cid);
}
function SetInterComInfo() {
    var cid = ixuGlobal.addcid;
    document.myOcx.ME_SetIntercomInfo(cid, "100", "100", "10", "");
}
function CreateSingelCallByOrder() {
 
    var called = ixuGlobal.othersidenum;
    var jsonstr = "[{\"called\":\"" + called + "\",\"details\":[{\"number\":\"" + called + "\",\"index\":1,\"ringtime\":15},{\"number\":\"1005\",\"index\":2,\"ringtime\":30}]}]";
    document.myOcx.ME_CreateSingleCallByOrder(jsonstr,false);
}
function CreateSingelCallByOrder1() {

    var called = ixuGlobal.othersidenum;
    var jsonstr = "[{\"called\":\"" + called + "\",\"details\":[{\"number\":\"" + called + "\",\"index\":1,\"ringtime\":15},{\"number\":\"1005\",\"index\":2,\"ringtime\":30}]}]";
    document.myOcx.ME_CreateSingleCallByOrder(jsonstr, true);
}
function SipPhoneVideoBug()
{
    var called = ixuGlobal.othersidenum;
    var isprecamera = $("isprecamera").value;
    var isautoanswer = $("isautoanswer").value;
    document.myOcx.ME_SipPhoneVideoBug(called, isprecamera, isautoanswer,"");
}

function VideoBug(ocxName, called) {
    console.log('开始监控',ocxName, called, document[ocxName], window[ocxName] )
    ixuGlobal.callid = new Date().valueOf()
    window.ixuGlobal.ocxCallingName = ocxName
    document[ocxName].ME_VideoBug(called, true, true);
}
function ForceInterpose()
{
    var dstnumber = $("dstnumber").value;
    var cid= $("dstcid").value;
    document.myOcx.ME_ForceInterposeCall(dstnumber, cid);
}
function ForceMointor() {
    var dstnumber = $("dstnumber").value;
 var cid= $("dstcid").value;
    document.myOcx.ME_ForceMonitorCall(dstnumber, cid);
}
function ForceMointor1() {
    var supervisor = $("supervisor").value;
    var dstnumber = $("dstnumber").value;
    var cid = $("dstcid").value;
    document.myOcx.ME_ForceMonitorCall1(supervisor,dstnumber, cid);
}
function ForceRemove() {
    var dstnumber = $("dstnumber").value;
	var cid= $("dstcid").value;
    document.myOcx.ME_ForceRemoveCall(dstnumber, cid);
}
function Substitute() {
    var dstnumber = $("dstnumber").value;
	var cid= $("dstcid").value;
    document.myOcx.ME_SubstituteCall(dstnumber, cid);
}
function SwitchCall() {
    var switchcalled = $("switchcalled").value;
    var switchcid = $("switchcid").value;
    var switchdstnumber = $("switchdstnumber").value;
    document.myOcx.ME_SwitchCall(switchdstnumber, switchcalled, switchcid);
}
function NegoTransfer() {
    var cid1 = $("cid1").value;
    var cid2 = $("cid2").value;
    var called1 = $("called1").value;
    var called2 = $("called2").value;
    document.myOcx.ME_NegoTransfer(cid1, called1,cid2,called2);
}
function GetDownLostRatio() {
    var callid = ixuGlobal.callid;
    var result = document.myOcx.ME_GetDownLostRatio(callid);
}
function GetUpLostRatio() {
    var callid = ixuGlobal.callid;
    document.myOcx.ME_GetUpLostRatio(callid);
}
function GetDelayInMs() {
    var callid = ixuGlobal.callid;
    document.myOcx.ME_GetDelayInMS(callid);
}
function GetBandWidth() {
    var callid = ixuGlobal.callid;
    document.myOcx.ME_GetBandWidth(callid);
}
function GetAudioDev() {
    document.myOcx.ME_GetAudioDevices();
}
function GetVudioDev() {
    document.myOcx.ME_GetVideoDevice();
}
function SetAudioDev() {
    var input = $("audioinput").value;
    var output = $("audiooutput").value;
    document.myOcx.ME_SetDefaultAudioDev(input,output);
}
function SetNoAudioDev() {
    document.myOcx.ME_SetDefaultAudioDev(-99, -99);
}
function SetVideoDev() {
    var videodev = $("videodev").value;
    document.myOcx.ME_SetDefaultVideoDev(videodev);
}
function SetOcxFlag() {
    var ocxflag = $("ocxflag").value;
    document.myOcx.ME_SetOcxflag(ocxflag);
}
function SetVocieSend() {
    var callid = ixuGlobal.callid;
    var lev = $("voicesend").value;
    document.myOcx.ME_SetVoiceSendLevel(callid, lev);
}
function GetVocieSend() {
    var callid = ixuGlobal.callid;
    var lev = document.myOcx.ME_GetVoiceSendLevel(callid);
    rem("发送音量" + lev);
}
function SetVoiceReceive() {
    var callid = ixuGlobal.callid;
    var lev = $("voicereceive").value;
    document.myOcx.ME_SetVoiceReceiveLevel(callid, lev);
}
function GetVoiceReceive() {
    var callid = ixuGlobal.callid;
    var lev = document.myOcx.ME_GetVoiceReceiveLevel(callid);
    rem("接收音量" + lev);
}
function GetSystemSpeakerVolume() {
    var lev = document.myOcx.ME_GetSystemVolume(true);
    rem("扬声器音量" + lev);
}
function SetSystemSpeakerVolume() {
    var lev = $("txtSpeakerVolume").value;
    document.myOcx.ME_SetSystemVolume(true, lev);
}
function GetSystemMicVolume() {
    var lev = document.myOcx.ME_GetSystemVolume(false);
    rem("麦克风音量" + lev);
}
function SetSystemMicVolume() {
    var lev = $("txtMicVolume").value;
    document.myOcx.ME_SetSystemVolume(false, lev);
}
function SessionJoin() {
    var joincid1 = $("joincid1").value;
    var joincid2 = $("joincid2").value;
    var jsonstr = "[{\"cid\":\"" + joincid1 + "\"},{\"cid\":\"" + joincid2 + "\"}]";
    var lev = document.myOcx.ME_SessionJoin(jsonstr);
    rem("接收音量" + lev);
}
function TempSessionJoin() {
    var joincid1 = $("joincid1").value;
    var joincid2 = $("joincid2").value;
    var jsonstr = "[{\"cid\":\"" + joincid1 + "\"},{\"cid\":\"" + joincid2 + "\"}]";
    document.myOcx.ME_SessionTempJoin(jsonstr);
}
function CutSessionJoin() {
    var joincid1 = $("joincid1").value;
    var jsonstr = "[{\"cid\":\"" + joincid1 + "\"}]";
    document.myOcx.ME_SessionTempJoin(jsonstr);
}
function CreateAudioSOSCall() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateSOSCall(called, false);
}
function CreateVideoSOSCall() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateSOSCall(called, true);
}
function CreateAudioBroadcast() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateBroadcast(called, false);
}
function CreateVideoBroadcast() {
    var called = $("calleds").value;
    document.myOcx.ME_CreateBroadcast(called, true);
}
function GetDecoderDevice() {
    document.myOcx.ME_GetDecoderDevice();
}
function GetDisplayCfg() {
    var decoderid = $("decoderid").value;
    document.myOcx.ME_GetDecoderCfg(decoderid);
}
function ForceKickOut() {
    var kickoutid = $("kickoutid").value;
    document.myOcx.ME_ForceKickOut(kickoutid);
}
function GetLocalIP() {
  console.log('获取ip', document.myOcx.ME_GetLocalIPs)
    document.myOcx.ME_GetLocalIPs();
}
function StartRecordAudio(){
    var callid = ixuGlobal.callid;
	var date = new Date();
	var fileName = "d:\\"+date.getFullYear()+
	date.getMonth()+
	date.getDate()+
	date.getHours()+
	date.getMinutes()+
	date.getSeconds()+
	".mp3";
	document.myOcx.ME_StartRecordAudio(callid,fileName);
	
}
function StopRecordAudio(){
    var callid = ixuGlobal.callid;
	document.myOcx.ME_StopRecordAudio(callid);	
}
function StartRecordVideo(){
    var callid = ixuGlobal.callid;
	var date = new Date();
	var fileName = "d:\\"+date.getFullYear()+
	date.getMonth()+
	date.getDate()+
	date.getHours()+
	date.getMinutes()+
	date.getSeconds()+
	".mp4"; //仅支持mp4
	var ret = document.myOcx.ME_StartRecordVideo(callid,fileName);
}
function StopRecordVideo(){
    var callid = ixuGlobal.callid;
	document.myOcx.ME_StopRecordVideo(callid);	
}
function TakeVideoSnapshoot(){	
    var callid = ixuGlobal.callid;
	var date = new Date();
	var fileName = "d:\\学习\\"+date.getFullYear()+
	date.getMonth()+
	date.getDate()+
	date.getHours()+
	date.getMinutes()+
	date.getSeconds()+
	".jpeg";
	document.myOcx.ME_TakeVideoSnapshoot(callid,fileName);
}
function TransferVideo() {
    var cid = $("transfercid").value;
    var number = $("transfernum").value;
    var calleds = $("transfercalled").value;
    document.myOcx.ME_TransferVideo(cid, number, calleds);
}
function TransferVideoToMCU() {
    var cid = $("transfercid").value;
    var number = $("transfernum").value;
    var calleds = $("transfercalled").value;
    document.myOcx.ME_TransferVideoToMCU(cid, number, calleds,"42801E");
}
function GetFileList() {
    document.myOcx.ME_GetFileList("20180101000000", "20190401000000", 6, "", "");
}
function CallPlayAudio() {
    var cid = $("playaudiocid").value;
    var fid = $("fileid").value;
    document.myOcx.ME_CallPlayAudio(cid, fid);
}
function CallStopPlayAudio() {
    var cid = $("playaudiocid").value;
    document.myOcx.ME_CallStopPlayAudio(cid);
}
function GetVideoCodecs() {
    document.myOcx.ME_GetVideoCodecs();
}
function GetAudioCodecs() {
    document.myOcx.ME_GetAudioCodecs();
}
function SetAudioCodec() {
    var audiocodec = $("audiocodec").value;
    var audiopriority = $("audiopriority").value;
    document.myOcx.ME_SetAudioCodecPriority(audiocodec, audiopriority);
}
function SetVideoCodec() {
    var videocodec = $("videocodec").value;
    var videopriority = $("videopriority").value;
    document.myOcx.ME_SetVideoCodecPriority(videocodec, videopriority);
}
function PauseSendVideo() {
    var callid = ixuGlobal.callid;
    document.myOcx.ME_PauseSendVideo(callid);
}
function ResumeSendVideo() {
    var callid = ixuGlobal.callid;
    document.myOcx.ME_ResumeSendVideo(callid);
}
function GetVideoParam() {
    document.myOcx.ME_GetVideoCodecParam();
}
function UseDBClickFull() {
    document.myOcx.ME_SetDBClickFullScreen(true);
}
function NotUseDBClickFull() {
    document.myOcx.ME_SetDBClickFullScreen(false);
}
function  ShowFullScreen()
{
    document.myOcx.ME_ShowFullScreen(true);
}
function notShowFullScreen() {
    document.myOcx.ME_ShowFullScreen(false);
}
function SetGisTrace()
{
    var numbers = $("numbers").value;
    document.myOcx.ME_SetGisTrace(numbers);
}
function CancelGisTrace() {
    var numbers = $("numbers").value;
    document.myOcx.ME_CancelGisTrace(numbers);
}
function UpLoadGisInfo() {
    var longidute = $("longidute").value;
    var latidute = $("latidute").value;
    var msg = $("msg").value;
    document.myOcx.ME_UploadGisInfo(latidute, longidute, msg);
}
function GetGisHistory() {
    var getnumbers = $("getnumbers").value;
    var begintime = $("begintime").value;
    var endtime = $("endtime").value;
    document.myOcx.ME_GetGisHistory(getnumbers, begintime, endtime);
}
function GetRectangle() {
    var longmin = $("longmin").value;
    var longmax = $("longmax").value;
    var latmin = $("latmin").value;
    var latmax = $("latmax").value;
    var usertypes = $("usertypes").value;
    document.myOcx.ME_GetGisInfoByRectangle(longmin, longmax, latmin, latmax, usertypes);
}
function GetEllipse() {
    var longmin = $("longmin").value;
    var longmax = $("longmax").value;
    var latmin = $("latmin").value;
    var latmax = $("latmax").value;
    var usertypes = $("usertypes").value;
    document.myOcx.ME_GetGisInfoByEllipse(longmin, longmax, latmin, latmax, usertypes);
}
function StartPreview() {
    document.myOcx.ME_StartPreview();
}

function GetGisPostion() {
    var numbers = $("numbers").value;
    document.myOcx.ME_GetGisPosition(numbers);
}
function DontUseFec() {
    document.myOcx.ME_SetDefaultFecEnable(false);
}
function UseFec() {
    document.myOcx.ME_SetDefaultFecEnable(true);
}
function LeftPhoneCall()
{
    var leftphone = $("leftphone").value;
    var othersidenum = ixuGlobal.othersidenum;
    document.myOcx.ME_MakeCall1(leftphone, othersidenum, true);
}
function PlayMemberVideo() {
    var cid = ixuGlobal.addcid;
    var addnumber = $("memberid").value;
    var showhwnd = 0;
    showhwnd = document.myOcx4.ME_GetHwnd();
    ixuGlobal.playport = document.myOcx.ME_GetMemberVideo1(cid, addnumber, "", showhwnd);
}
function StopPlayMemberVideo() {
    var port = ixuGlobal.playport;
    var cid = ixuGlobal.addcid;
    var addnumber = $("memberid").value;
    var showhwnd = 0;
    showhwnd = document.myOcx4.ME_GetHwnd();
    document.myOcx.ME_StopGetMemberVideo(cid, addnumber, "", port);
}
function LeftCreateVideoConf() {
    var leftphone = $("leftphone").value;
    var called = $("calleds").value;
    document.myOcx.ME_CreateSnapMetting1(leftphone,called, true);
}
function LeftCreateTmpIntercom() {
    var leftphone = $("leftphone").value;
    var called = $("calleds").value;
    document.myOcx.ME_CreateTmpInterCom1(leftphone,called);
}
function RightCreateTmpIntercom() {
    var rightphone = $("rightphone").value;
    var called = $("calleds").value;
    document.myOcx.ME_CreateTmpInterCom1(rightphone, called);
}
function LeftCreateSingelCallByOrder() {
    var leftphone = $("leftphone").value;
    var called = ixuGlobal.othersidenum;
    var jsonstr = "[{\"called\":\"" + called + "\",\"details\":[{\"number\":\"" + called + "\",\"index\":1,\"ringtime\":15},{\"number\":\"1005\",\"index\":2,\"ringtime\":30}]}]";
    document.myOcx.ME_CreateSingleCallByOrder1(leftphone,jsonstr, true);
}
function LeftCreateVideoSOSCall() {
    var leftphone = $("leftphone").value;
    var called = $("calleds").value;
    document.myOcx.ME_CreateSOSCall1(leftphone,called, true);
}
function LeftCreateVideoBroadcast() {
    var leftphone = $("leftphone").value;
    var called = $("calleds").value;
    document.myOcx.ME_CreateBroadcast1(leftphone,called, true);
}
function LeftCreateMCUConf3() {
    var leftphone = $("leftphone").value;
    var called = $("calleds").value;
    var code = $("mcucode").value;
    document.myOcx.ME_CreateMCUMetting2(leftphone, called, true, true, code);
}

function SetRendererUsesHardwareAcceleration() {
    var index = $("isHardware").selectedIndex;
    if (index == 0) {
        document.myOcx.ME_SetRendererUsesHardwareAcceleration(false);
    } else {
        document.myOcx.ME_SetRendererUsesHardwareAcceleration(true);
    }
}

function SetMessageRecevied() {
    var id = $("txtMsgId").value;
    var username = $("uname").value;
    document.myOcx.ME_SetMessageReceived(id, username);
}

function SetVideoNoBadPicture(){
    var index = $("chkSetVideoNoBadPicture").selectedIndex;
    if (index == 0) {
        document.myOcx.ME_SetVideoNoBadPicture(false);
    } else {
        document.myOcx.ME_SetVideoNoBadPicture(true);
    }
}

function RecordLocalAudio() {
    var filepath = $("txtRecordFileName").value;
    document.myOcx.ME_StartRecordLocalAudio(filepath);
}

function StopRecordLocalAudio() {
    document.myOcx.ME_StopRecordLocalAudio();
}

function RecordLocalVideo() {
    var filepath = $("txtRecordFileName").value;
    document.myOcx.ME_StartRecordLocalVideo(filepath);
}

function StopRecordLocalVideo() {
    document.myOcx.ME_StopRecordLocalVideo();
}

function GetOfflineMsg() {
    document.myOcx.ME_GetOfflineMessage(100);
}
function ApplyUploadFile() {
    var filepath = $("txtFileName").value;
    var receivers = ixuGlobal.othersidenum;
    document.myOcx.ME_ApplyUploadFile(filepath, receivers, 6);
}
function SetFileStateUploading() {
    var fildid = $("txtMsgId").value;
    document.myOcx.ME_SetUploadFileResult(fildid, 1);
}
function SetFileStateUploaded() {
    var fildid = $("txtMsgId").value;
    document.myOcx.ME_SetUploadFileResult(fildid, 2);
}
function SetFileReceived() {
    var fildid = $("txtMsgId").value;
    var username = $("uname").value;
    document.myOcx.ME_SetFileRecieved(fildid, username);
}
function OpenSerailPort() {
    var serialPort = $("txtSerialPort").value;
    var rate = $("txtRate").value;
    document.myOcx.ME_OpenSerailPort(serialPort, rate);
}
function GetSerailPortMsg() {
    document.myOcx.ME_GetSerialPortMsg();
}
function CloseSerialPort() {
    document.myOcx.ME_CloseSerialPort();
}
function AudioDevTestStart() {
    var audioCaptureId = $("txtAudioCaptureId").value;
    var audioSpeakerId = $("txtAudioSpeakerId").value;
    document.myOcx.ME_AudioDevTestStart(audioCaptureId, audioSpeakerId);
}
function AudioDevTestStop() {
    document.myOcx.ME_AudioDevTestStop();
}
function AudioDevTestLevel() {
    document.myOcx.ME_AudioDevTestGetLevel();
}
// function GetVersion() {
//     var version = document.myOcx.ME_GetOcxVersion();
//     $("txtVersion").value = version;
// }
function SetJitBuffer() {
    var index = $("chkJitBuffer").selectedIndex;
    if (index == 0) {
        document.myOcx.ME_SetVidUseJBuffer(true);
    } else {
        document.myOcx.ME_SetVidUseJBuffer(false);
    }
}
function useVad() {
    var index = $("chkUseVad").selectedIndex;
    if (index == 0) {
        document.myOcx.ME_SetAudioCodecParam(true, false, false, false);
    } else {
        document.myOcx.ME_SetAudioCodecParam(false, false, false, false);
    }
}
function GetDecoderAbility() {
    var decoderId = $("decoderid").value;
    document.myOcx.ME_GetDecoderAbility(decoderId);
}
function SetDecoderDisplayChannel() {
    var decoderId = $("decoderid").value;
    var displayId = $("txtDecoderDisplayChannelId").value;
    var winMode = $("txtDecoderDisplayWinMode").value;
    var channels = $("txtDecoderChannels").value;
    document.myOcx.ME_SetDecoderDisplayWindowMode(decoderId, displayId, winMode, channels);
}
function GetDecoderChannelState() {
    var decoderId = $("decoderid").value;
    var channelId = $("txtDecoderChannelId").value;
    document.myOcx.ME_GetDecoderChannelState(decoderId, channelId);
}

function StartDecoder() {
    var decoderId = $("decoderid").value;
    var sessionId = $("txtDecoderCid").value;
    var number = $("txtDecoderNumber").value;
    var channels = $("txtDecoderChannels").value;
    document.myOcx.ME_StartDecoder(sessionId, number,decoderId, channels);
}
function StopDecoder() {
    var decoderId = $("decoderid").value;
    var channels = $("txtDecoderChannels").value;
    document.myOcx.ME_StopDecoder(decoderId, channels);
}
function SetRenderMode() {
    var callid = ixuGlobal.callid;
    var mode = $("cmbRenderMode").value;
    document.myOcx.ME_SetVideoRenderMode(callid, mode);
}
function UploadVideo() {
    var myphone = $("uname").value;
    var called = ixuGlobal.othersidenum;
    document.myOcx.ME_CreateUpLoadVideoCall(myphone,called,true);
}
function GetConfigByKeys() {
    document.myOcx.ME_GetConfigByKeys("MessagePort,SnapMettingIP");
}
//创建群组
function CreateMsgGroup()
{
    var groupName = $("txtGroupName").value;
    var groupMembers = $("txtGroupMembers").value;
    var ret = document.myOcx.ME_CreateMsgGroup(groupName,groupMembers);
	
	ret = ret.replace("{","");
	ret = ret.replace("}","");
	rem(ret);
	
    var grpid = document.getElementById("txtGroupId");
    if (grpid != null)
        grpid.innerText =ret;
}
//获取群组
function GetMsgGroups()
{
    var myphone = $("uname").value;
    var ret = document.myOcx.ME_GetMsgGroups(myphone);
	rem(ret);
	
    var json = eval('(' + ret + ')');
    var grpid = document.getElementById("txtGroupId");
    var grpName = document.getElementById("txtGroupName");
    var grpMembers = document.getElementById("txtGroupMembers");
    if (grpid != null && json != null)
	{
        grpid.innerText =json[0].GroupID;
        grpName.innerText =json[0].GroupName;
		var members="";
		for(var p in json[0].Employees)
			members += json[0].Employees[p].EmployeeID+",";
		if(members!="")
			members = members.substring(0,members.length-1);
		
        grpMembers.innerText =members;
	}
}
//更新群组
function UpdateMsgGroup()
{
    var groupId = $("txtGroupId").value;
    var groupName = $("txtGroupName").value;
    var groupMembers = $("txtGroupMembers").value;
    var ret = document.myOcx.ME_UpdateMsgGroup(groupId,groupName,groupMembers);
	
	rem(ret);
}
//删除群组
function DeleteMsgGroup()
{
    var groupId = $("txtGroupId").value;
    var ret = document.myOcx.ME_DeleteMsgGroup(groupId);
	
	rem(ret);
}
//发送群组文字消息
function SendGroupMsg1() {
    var groupId = $("txtGroupId").value;
    var txt = $("txtGroupMsg").value;
    var ret = document.myOcx.ME_SendGroupMsg1(groupId, txt);
	
	rem(ret);
}
//获取群组离线消息
function GetMsgGroupOffLineMsg()
{
    var ret = document.myOcx.ME_GetMsgGroupOffLineMsg(100);
	
	rem(ret);
}
//组群发文件消息
function GroupUploadFile()
{
    var groupId = $("txtGroupId").value;
    var filePath = $("txtGroupFileName").value;
	filePath = filePath.replace(/\\/g,"/");
    var ret = document.myOcx.ME_SendGroupFileMsg(groupId, filePath);
	
    var json = eval('(' + ret + ')');
	var fid = document.getElementById("txtFileid");
	fid.innerText = json[0].fid;
	rem(ret);
}
//更新群组文件消息上传状态，1=上传中，2=上传完成
function GroupUploadFileUpdateState1()
{
    var fid = $("txtFileid").value;
    document.myOcx.ME_SetUploadFileResult(fid, 1);
}function GroupUploadFileUpdateState2()
{
    var fid = $("txtFileid").value;
    document.myOcx.ME_SetUploadFileResult(fid, 2);
}
//文件下载完成
function GroupDownloadFileCompleted()
{
    var fid = $("txtFileid").value;
    document.myOcx.ME_SetFileRecieved1(fid);
}
//设置FEC参数
function SetFecParams()
{
    var mode = $("redunmode").value;
    var ratio = $("redunratio").value;
	document.myOcx.ME_SetDefaultFecParams(0,0,mode,ratio,16);
}
//设置码率控制策略 0=无，1=清晰度优先，2=流畅度优先
function SetCC()
{
    var val = $("ccStrategy").value;
	var ret = document.myOcx.ME_SetCongestionControlStrtegy(val);
}
//挂断所有呼叫
function HangupAll()
{
	document.myOcx.HangupAll();
}
