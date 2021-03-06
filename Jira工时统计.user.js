// ==UserScript==
// @name         Jira工时统计
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  try to take over the world!
// @author       You
// @match        http://migujira.cmread.com/issues/?*
// @grant        none
// ==/UserScript==
( function () {
    'use strict';
    var $ = $ || window.$;
    var log_count = 1;
    var db = window.localStorage;
    function log(c1, c2, c3) {
        c1 = c1 ? c1 : '';
        c2 = c2 ? c2 : '';
        c3 = c3 ? c3 : '';
        console.log('#' + ('00'+log_count++).slice(-2) + '-日志--', c1, c2, c3);
    }
    //版本周期
    var cmr_period = db.getItem("cmr_period");
    if(cmr_period == null)
    {
        db.setItem("cmr_period",21);
        cmr_period = Number(db.getItem("cmr_period"));
    }
    //MDG研发人力
    var cmr_mdgResources = db.getItem("cmr_mdgResources");
    if(cmr_mdgResources == null)
    {
        db.setItem("cmr_mdgResources",34);
        cmr_mdgResources = Number(db.getItem("cmr_mdgResources"));
    }
    //用户组
    var cmr_usrResources = db.getItem("cmr_usrResources");
    if(cmr_usrResources == null)
    {
        db.setItem("cmr_usrResources",11);
        cmr_usrResources = Number(db.getItem("cmr_usrResources"));
    }
    //内容组
    var cmr_cpsResources = db.getItem("cmr_cpsResources");
    if(cmr_cpsResources == null)
    {
        db.setItem("cmr_cpsResources",19);
        cmr_cpsResources = Number(db.getItem("cmr_cpsResources"));
    }
    //营销
    var cmr_mktResources = db.getItem("cmr_mktResources");
    if(cmr_mktResources == null)
    {
        db.setItem("cmr_mktResources",19);
        cmr_mktResources = Number(db.getItem("cmr_mktResources"));
    }
    //互动
    var cmr_snsResources = db.getItem("cmr_snsResources");
    if(cmr_snsResources == null)
    {
        db.setItem("cmr_snsResources",24);
        cmr_snsResources = Number(db.getItem("cmr_snsResources"));
    }
    //公共
    var cmr_opfResources = db.getItem("cmr_opfResources");
    if(cmr_opfResources == null)
    {
        db.setItem("cmr_opfResources",31);
        cmr_opfResources = Number(db.getItem("cmr_opfResources"));
    }
    //公共
    var cmr_dealResources = db.getItem("cmr_dealResources");
    if(cmr_dealResources == null)
    {
        db.setItem("cmr_dealResources",31);
        cmr_dealResources = Number(db.getItem("cmr_dealResources"));
    }
    //系数
    var cmr_ratio = db.getItem("cmr_ratio");
    if(cmr_ratio == null)
    {
        db.setItem("cmr_ratio",1.2);
        cmr_ratio = Number(db.getItem("cmr_ratio"));
    }
    //可承接工时
    var kcj= Math.round(cmr_period*cmr_ratio*(cmr_mdgResources*1+cmr_usrResources*1+cmr_cpsResources*1+cmr_snsResources*1+cmr_opfResources*1+cmr_mktResources*1+cmr_dealResources*1));
    //log("可承接"+kcj);
    //统计函数
    function jext(){
        var sum = 0;
        var count = 0;
        var tds;
        //customfield_10119 MDG
        tds = $(".customfield_10119");
        if(tds.length > 0) {
            for (var i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            //$("[title='排序 MDG工时']").get(0).innerHTML = "MDG工时<br/>(估算" + count + ")(可接"+Math.round(cmr_mdgResources*cmr_period*cmr_ratio)+")";
            $("[data-id='customfield_10119']").get(0).innerHTML = "MDG工时<br/>(估算" + count + ")(可接"+Math.round(cmr_mdgResources*cmr_period*cmr_ratio)+")";
            log("MDG工时" + count);
            sum += count;
            count = 0;
        }
        //customfield_10120 用户
        tds = $(".customfield_10120");
        if(tds.length > 0) {
            for (i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            $("[title='排序 用户工时']").get(0).innerHTML = "用户工时<br/>(估算" + count + ")(可接"+Math.round(cmr_usrResources*cmr_period*cmr_ratio)+")";
            log("用户工时" + count);
            sum += count;
            count = 0;
        }

        //customfield_10121 交易
        tds = $(".customfield_10121");
        if(tds.length > 0) {
            for (i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            $("[title='排序 交易工时']").get(0).innerHTML = "交易工时<br/>(估算" + count + ")(可接"+Math.round(cmr_dealResources*cmr_period*cmr_ratio)+")";
            log("交易工时" + count);
            sum += count;
            count = 0;
        }
        //customfield_10122 内容
        tds = $(".customfield_10122");
        if(tds.length > 0) {
            for (i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            $("[title='排序 内容工时']").get(0).innerHTML = "内容工时<br/>(估算" + count + ")(可接"+Math.round(cmr_cpsResources*cmr_period*cmr_ratio)+")";
            log("内容工时" + count);
            sum += count;
            count = 0;
        }
        //customfield_10124 营销
        tds = $(".customfield_10124");
        if(tds.length > 0) {
            for (i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            $("[title='排序 营销工时']").get(0).innerHTML = "营销工时<br/>(估算" + count + ")(可接"+Math.round(cmr_mktResources*cmr_period*cmr_ratio)+")";
            log("营销工时" + count);
            sum += count;
            count = 0;
        }
        //customfield_10123 互动
        tds = $(".customfield_10123");
        if(tds.length > 0) {
            for (i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            $("[title='排序 互动工时']").get(0).innerHTML = "互动工时<br/>(估算" + count + ")(可接"+Math.round(cmr_snsResources*cmr_period*cmr_ratio)+")";
            log("互动工时" + count);
            sum += count;
            count = 0;
        }
        //customfield_10125 公共
        tds = $(".customfield_10125");
        if(tds.length > 0) {
            for (i = 0; i < tds.size(); i++) {
                count = count + Number(tds.get(i).textContent.trim());
            }
            $("[title='排序 公共工时']").get(0).innerHTML = "公共工时<br/>(估算" + count + ")(可接"+Math.round(cmr_opfResources*cmr_period*cmr_ratio)+")";
            log("公共工时" + count);
            sum += count;
        }
        if(sum!=0){
            $(".results-count-text").append("<span class='results-count-start'>&nbsp;&nbsp汇总工时 "+sum+"&nbsp&nbsp可承接："+kcj+"&nbsp&nbsp</span>");
            log("工时 汇总"+sum);
        }
        //aggregateprogress
        var progressFieldTh = $("[data-id='aggregateprogress']");

        if(progressFieldTh.length > 0) {
            //hideOnPrint
            var pgs = $(".hideOnPrint");
            //console.log(pgs);
            //初始预估 - 3 天
            var initialValue = 0 ;
            //剩余的估算 - 3 天
            var surplusValue = 0;
            //耗费时间 - 1 小时
            var costValue = 0;
            var tmp = 0;
            //耗费时间 - 2 周, 2 天, 11 分   剩余的估算 - 2 天, 7 小时, 59 分
            $.each(pgs,function(i,pg){
                var pgtitle = pg.title;
                //log(pgtitle);
                //增加容错
                pgtitle = pgtitle.replace("尚未指定","");
                pgtitle = pgtitle.replace("没有要求时间","");
                if(pgtitle.indexOf("初始预估")>=0){
                    var gsstr = pgtitle.replace("初始预估 - ","")
                    .replace(/周,?/,"*5*8*60+")
                    .replace(/天,?/,"*8*60+")
                    .replace(/小时,?/,"*60+")
                    .replace("分","+");
                    gsstr +="0"
                    //console.log("计算串"+gsstr);
                    initialValue+=eval(gsstr);
                    //console.log(initialValue);
                }
                gsstr = "";
                if(pgtitle.indexOf("剩余的估算")>=0){
                    gsstr = pgtitle.replace("剩余的估算 - ","")
                        .replace(/周,?/,"*5*8*60+")
                        .replace(/天,?/,"*8*60+")
                        .replace(/小时,?/,"*60+")
                        .replace("分","+");
                    gsstr +="0"
                    //console.log("计算串"+gsstr);
                    surplusValue+=eval(gsstr);
                }
                if(pgtitle.indexOf("耗费时间")>=0){
                    gsstr = pgtitle.replace("耗费时间 - ","")
                        .replace(/周,?/,"*5*8*60+")
                        .replace(/天,?/,"*8*60+")
                        .replace(/小时,?/,"*60+")
                        .replace("分","+");
                    gsstr +="0"
                    //console.log("计算串"+gsstr);
                    costValue+=eval(gsstr);
                }
            });


            var progress = Math.round(costValue/initialValue*100,2)+"%";
            //log("初始预估 "+initialValue+"剩余的估算 "+surplusValue+"耗费时间 "+costValue);
            $(".results-count-text").append("<br/>本页：总体时间进度"+Math.round(costValue/initialValue*100,2)+"%"
                                            +"<br/>初始预估 "+Math.round(initialValue/60/8,2)+"天,剩余的估算"+Math.round(surplusValue/60/8,2)+"天,耗费时间"+Math.round(costValue/60/8,2)+"天,");
        }
        //对表格进行重新排序，EPIC Stroy SubTask
        var issuetypeTh = $("[data-id='issuetype']");
        var epicLinkTh = $("[data-id='customfield_10103']");
        var epicNameTh = $("[data-id='customfield_10105']");
        if(issuetypeTh.length > 0 && epicLinkTh.length > 0 && epicNameTh.length > 0){
            var storyTds = $(".customfield_10103");
            var epicTds = $(".customfield_10105");
            var issueTds = $(".issuetype");
            var imgs = $("IMG");

            var allTaskTds = new Array();
            var designTaskTds = new Array();
            for(i=0;i<imgs.length;i++){
                if(imgs[i].src.indexOf("avatarId=10309") > 0){
                    allTaskTds.push(imgs[i].parentNode.parentNode);
                }
                if(imgs[i].src.indexOf("avatarId=10321") > 0){
                    allTaskTds.push(imgs[i].parentNode.parentNode);
                }
                if(imgs[i].src.indexOf("avatarId=10304") > 0){
                    allTaskTds.push(imgs[i].parentNode.parentNode);
                }
                if(imgs[i].src.indexOf("avatarId=10322") > 0){
                    designTaskTds.push(imgs[i].parentNode.parentNode);
                }
            }

            $.each(epicTds,function(i,epicTd){
                var epicId = epicTd.innerHTML.trim();
                if(epicId.length > 0){
                    var epicTrId = "#" + epicTd.parentNode.id;
                    $(epicTrId).css({"background":"#FF9933"});
                    var epicTaskId = $(epicTrId).data("issuekey");
                    $.each(designTaskTds,function(z,designTaskTd){
                        var designTaskTrId = "#" + designTaskTd.parentNode.id;
                        if(epicTaskId == $(designTaskTrId).children(".summary").children("P").children(".parentIssue").html()){
                            $(designTaskTrId).css({"background":"#FFFF33"});
                            $(designTaskTrId).insertAfter($(epicTrId));
                        }
                    });
                    $.each(storyTds,function(x,storyTd){
                        if(storyTd.innerHTML.trim().indexOf(epicId) > -1){
                            var storyTrId = "#" + storyTd.parentNode.id;
                            $(storyTrId).css({"background":"#FFCC33"});
                            $(storyTrId).insertAfter($(epicTrId));
                            var storyId = $(storyTrId).children(".issuekey").children(".issue-link").html().trim();
                            $.each(allTaskTds,function(y,taskTd){
                                var taskTrId = "#" + taskTd.parentNode.id;
                                if(storyId == $(taskTrId).children(".summary").children("P").children(".parentIssue").html()){
                                    $(taskTrId).css({"background":"#FFFF33"});
                                    $(taskTrId).insertAfter($(storyTrId));
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    jext();
    //解决异步请求不生效问题
    $(document).ajaxComplete(function(event, xhr, settings) {
        //log(settings);
        if ( settings.url == "/rest/issueNav/1/issueTable" || settings.url == "/rest/issueNav/1/issueTable/stable") {
            log( "Triggered ajaxComplete handler. ",settings.url);
            jext();
        }
    });
    // Your code here...
}
)();
