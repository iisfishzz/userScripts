// ==UserScript==
// @name         Jira工时统计
// @namespace    http://tampermonkey.net/
// @version      0.1.4
// @description  try to take over the world!
// @author       You
// @match        http://migujira.cmread.com/issues/?filter=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = $ || window.$;
    var sum = 0;
    var count = 0;
    var tds;
    var db =  window.localStorage;
    //版本周期
    var cmr_period = db.getItem("cmr_period");
    if(cmr_period == null)
    {
        db.setItem("cmr_period",21);
        cmr_period =  Number(db.getItem("cmr_period"));
    }
    //MDG研发人力
    var cmr_mdgResources = db.getItem("cmr_mdgResources");
    if(cmr_mdgResources == null)
    {
        db.setItem("cmr_mdgResources",34);
        cmr_mdgResources =  Number(db.getItem("cmr_mdgResources"));
    }
    //用户组
    var cmr_usrResources = db.getItem("cmr_usrResources");
    if(cmr_usrResources == null)
    {
        db.setItem("cmr_usrResources",11);
        cmr_usrResources =  Number(db.getItem("cmr_usrResources"));
    }
    //内容组
    var cmr_cpsResources =  db.getItem("cmr_cpsResources");
    if(cmr_cpsResources == null)
    {
        db.setItem("cmr_cpsResources",19);
        cmr_cpsResources =  Number(db.getItem("cmr_cpsResources"));
    }
    //营销
    var cmr_cpsResources = db.getItem("cmr_cpsResources");
    if(cmr_cpsResources == null)
    {
        db.setItem("cmr_cpsResources",19);
        cmr_cpsResources =  Number(db.getItem("cmr_cpsResources"));
    }
    //互动
    var cmr_snsResources =  db.getItem("cmr_snsResources");
    if(cmr_snsResources == null)
    {
        db.setItem("cmr_snsResources",24);
        cmr_snsResources =  Number(db.getItem("cmr_snsResources"));
    }
    //公共
    var cmr_opfResources =  db.getItem("cmr_opfResources");
    if(cmr_opfResources == null)
    {
        db.setItem("cmr_opfResources",31);
        cmr_opfResources =  Number(db.getItem("cmr_opfResources"));
    }
     //公共
    var cmr_dealResources =  db.getItem("cmr_dealResources");
    if(cmr_dealResources == null)
    {
        db.setItem("cmr_dealResources",31);
        cmr_dealResources =  Number(db.getItem("cmr_dealResources"));
    }
    //系数
    var cmr_ratio =  db.getItem("cmr_ratio");
     if(cmr_ratio == null)
    {
        db.setItem("cmr_ratio",1.2);
        cmr_ratio =  Number(db.getItem("cmr_ratio"));
    }
    //可承接工时
    var kcj= Math.round(cmr_period*cmr_ratio*(cmr_mdgResources*1+cmr_usrResources*1+cmr_cpsResources*1+cmr_snsResources*1+cmr_opfResources*1+cmr_cpsResources*1+cmr_dealResources*1));
    console.log("可承接"+kcj);
    //customfield_10119 MDG
    tds = $(".customfield_10119");
    if(tds.length > 0) {
        for (var i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 MDG工时']").get(0).innerHTML = "MDG工时<br/>(" + count + ")("+Math.round(cmr_mdgResources*cmr_period*cmr_ratio)+")";
        console.log("MDG工时" + count);
        sum += count;
        count = 0;
    }
     //customfield_10120 用户
    tds = $(".customfield_10120");
    if(tds.length > 0) {
        for (i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 用户工时']").get(0).innerHTML = "用户工时<br/>(" + count + ")("+Math.round(cmr_usrResources*cmr_period*cmr_ratio)+")";
        console.log("用户工时" + count);
        sum += count;
        count = 0;
    }
    //customfield_10121 交易
    tds = $(".customfield_10121");
    if(tds.length > 0) {
        for (i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 交易工时']").get(0).innerHTML = "交易工时<br/>(" + count + ")("+Math.round(cmr_dealResources*cmr_period*cmr_ratio)+")";
        console.log("交易工时" + count);
        sum += count;
        count = 0;
    }
    //customfield_10122 内容
    tds = $(".customfield_10122");
    if(tds.length > 0) {
        for (i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 内容工时']").get(0).innerHTML = "内容工时<br/>(" + count + ")("+Math.round(cmr_cpsResources*cmr_period*cmr_ratio)+")";
        console.log("内容工时" + count);
        sum += count;
        count = 0;
    }
    //customfield_10124 营销
    tds = $(".customfield_10124");
    if(tds.length > 0) {
        for (i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 营销工时']").get(0).innerHTML = "营销工时<br/>(" + count + ")("+Math.round(cmr_cpsResources*cmr_period*cmr_ratio)+")";
        console.log("营销工时" + count);
        sum += count;
        count = 0;
    }
    //customfield_10123 互动
    tds = $(".customfield_10123");
    if(tds.length > 0) {
        for (i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 互动工时']").get(0).innerHTML = "互动工时<br/>(" + count + ")("+Math.round(cmr_snsResources*cmr_period*cmr_ratio)+")";
        console.log("互动工时" + count);
        sum += count;
        count = 0;
    }
    //customfield_10125 公共
    tds = $(".customfield_10125");
    if(tds.length > 0) {
        for (i = 0; i < tds.size(); i++) {
            count = count + Number(tds.get(i).textContent.trim());
        }
        $("[title='排序 公共工时']").get(0).innerHTML = "公共工时<br/>(" + count + ")("+Math.round(cmr_opfResources*cmr_period*cmr_ratio)+")";
        console.log("公共工时" + count);
        sum += count;
    }
    if(sum!=0){
    $(".results-count-text").append("<span class='results-count-start'>&nbsp;&nbsp汇总工时 "+sum+"&nbsp&nbsp可承接："+kcj+"&nbsp&nbsp</span>");
    console.log("工时 汇总"+sum);
    }
   

    // Your code here...
})();
