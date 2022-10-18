import { addNewArticleEventHandler } from './utils';

const CONTEXT_MENU_ID_SAVE = 'save';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID_SAVE,
    title: "Save to reading list",
    contexts:["page"]
  })
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: addNewArticleEventHandler,
    args: [info.pageUrl],
  });
});