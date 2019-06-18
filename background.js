
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  console.log('details', details);
  if (details.url.includes('robertsspaceindustries.com/roadmap/board/1-Star-Citizen')) {
    chrome.tabs.executeScript(null,{file:"main.js"});
  }
});
