const url1 = "https://tucan.tu-darmstadt.de"
const url2 = "https://www.tucan.tu-darmstadt.de"
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });
  


chrome.action.onClicked.addListener(async (tab) => {

    if (tab.url.startsWith(url1) || tab.url.startsWith(url2)) {
        
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    
        // Set the action badge to the next state
        await chrome.action.setBadgeText({
          tabId: tab.id,
          text: nextState
        });
    
        if (nextState === 'ON') {
          // Insert the CSS file when the user turns the extension on
          await chrome.scripting.insertCSS({
            files: ['style.css', 'Fucan.png'],
            target: { tabId: tab.id }
          });
        } else if (nextState === 'OFF') {
          // Remove the CSS file when the user turns the extension off
          await chrome.scripting.removeCSS({
            files: ['style.css'],
            target: { tabId: tab.id }
          });
        }
      }
    });