document.addEventListener('DOMContentLoaded', function () {
  $("#tabOptions").on("change", function(e){tabOptionChanged(e)});
  $("#closeEmptyTabsBtn").on("click", function(e){closeEmptyTabs(e)});
});
var showDropdown = function (element) {
  var event;
  event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousedown', true, true, window);
  element.dispatchEvent(event);
}
$(document).ready(function(){
  setTimeout(function () {
    showDropdown($("#tabOptions")[0]);
  }, 500);
})
function tabOptionChanged(e) {
  chrome.tabs.update(parseInt(e.target.value), {selected: true});
}
function closeEmptyTabs (e) {
  var emptyTabs;
  var interval = setInterval(function () {
    chrome.tabs.query({"url": "chrome://newtab/"}, function(tabs){emptyTabs = tabs})
    if (emptyTabs.length > 0) {
      for (var i = emptyTabs.length - 1; i >= 0; i--) {
        chrome.tabs.remove(emptyTabs[i].id);
      };
    } else {
      clearInterval(interval)
    };
    alert(1);
  }, 100)
}