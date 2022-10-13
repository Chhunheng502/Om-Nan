// import { addNewArticleEventHandler } from './utils'

const CONTEXT_MENU_ID_HIGHLIGHT = 'highlight';
const CONTEXT_MENU_ID_SAVE = 'save';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID_HIGHLIGHT,
    title: "Highlight: %s", 
    contexts:["selection"]
  });

  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID_SAVE,
    title: "Save to reading list",
    contexts:["page"]
  })
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId == CONTEXT_MENU_ID_HIGHLIGHT) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: highlightText,
      args: [info.selectionText, info.pageUrl],
    });
  } else if (info.menuItemId == CONTEXT_MENU_ID_SAVE) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: saveToReadingList,
      args: [info.pageUrl],
    });
  }
});

function highlightText(selectionText) {
  
}

function saveToReadingList(pageUrl) {
  // addNewArticleEventHandler(document.body.innerHTML, pageUrl);
}