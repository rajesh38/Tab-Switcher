var tabsOpen;
var extractDomain = function (url) {
  var domain;
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
  }
  else {
      domain = url.split('/')[0];
  }
  //find & remove port number
  domain = domain.split(':')[0];
  return domain;
}
function optionConstructor (tabs) {
  var optionText = ""
  var titleLengthMaxLimit = 40;
  for (var i = tabs.length - 1; i >= 0; i--) {
    var title = (tabs[i].title.length > titleLengthMaxLimit ? tabs[i].title.substring(0, titleLengthMaxLimit)+'...' :  tabs[i].title) + '(' + extractDomain(tabs[i].url) + ')';
    optionText += "<option value=" + tabs[i].id + ">" + title + "</option>";
  };
  return optionText;
}
setInterval(function () {
  chrome.tabs.query({}, function (openTabs) {
    tabsOpen = openTabs;
  })
  if (tabsOpen) {
    chrome.browserAction.setTitle({"title": tabsOpen.length + ' open tabs'});
    chrome.browserAction.setBadgeText({"text": tabsOpen.length.toString()});
    var views = chrome.extension.getViews({type: "popup"});
    if (views[0] && views[0].document) {
      views[0].document.getElementById('tabOptions').innerHTML=optionConstructor(tabsOpen);
    };
  };
}, 100);
