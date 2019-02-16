// ==UserScript==
// @name         Jira工时统计
// @namespace    http://tampermonkey.net/
// @version      0.1.2
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
    //customfield_10119 MDG
    tds = $(".customfield_10119");
    for(var i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 MDG工时']").get(0).innerHTML="MDG工时<br/>("+count+")";
    console.log("MDG工时"+count);
    sum+=count;
    count = 0;
     //customfield_10120 用户
    tds = $(".customfield_10120");
    for( i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 用户工时']").get(0).innerHTML="用户工时<br/>("+count+")";
    console.log("用户工时"+count);
    sum+=count;
    count = 0;
    //customfield_10121 交易
    tds = $(".customfield_10121");
    for( i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 交易工时']").get(0).innerHTML="交易工时<br/>("+count+")";
    console.log("交易工时"+count);
    sum+=count;
    count = 0;
    //customfield_10122 内容
    tds = $(".customfield_10122");
    for( i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 内容工时']").get(0).innerHTML="内容工时<br/>("+count+")";
    console.log("内容工时"+count);
    sum+=count;
    count = 0;
    //customfield_10124 营销
    tds = $(".customfield_10124");
    for( i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 营销工时']").get(0).innerHTML="营销工时<br/>("+count+")";
    console.log("营销工时"+count);
    sum+=count;
    count = 0;
    //customfield_10123 互动
    tds = $(".customfield_10123");
    for( i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 互动工时']").get(0).innerHTML="互动工时<br/>("+count+")";
    console.log("互动工时"+count);
    sum+=count;
    count = 0;
    //customfield_10125 公共
    tds = $(".customfield_10125");
    for( i = 0; i < tds.size() ;i++)
    {
        count = count + Number(tds.get(i).textContent.trim());
    }
    $("[title='排序 公共工时']").get(0).innerHTML="公共工时<br/>("+count+")";
    console.log("公共工时"+count);
    sum+=count;
    $(".results-count-text").append("<span class='results-count-start'>&nbsp;&nbsp汇总工时 "+sum+"&nbsp&nbsp</span>");
    console.log("工时 汇总"+sum);
    // Your code here...
})();
