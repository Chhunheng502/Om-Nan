function getword(info, tab) {

  let value = info.selectionText;
  
  var replaced = $("body").html().replace(/Extensions/g, 'replace');

  $("body").html(replaced);

  chrome.storage.sync.set({ value });
}

chrome.contextMenus.onClicked.addListener(getword);

chrome.storage.sync.get("value", ({ value }) => {

    var elms = document.getElementsByTagName("*");
    len = elms.length;

    for(var i = 0; i < len; i++) {

        var myChildred = elms[i].childNodes;
        len2 = myChildred.length;

        for (var j = 0; j < len2; j++) {
            
            if(myChildred[j].nodeType === 3) {
                // example on update a text node's value
                myChildred[j].nodeValue = myChildred[j].nodeValue.replace(value, "123");
            }
        }
    }

});

document.open();
document.write('<div>Hello World</div>');
document.close();

chrome.contextMenus.onClicked.addListener(async (info, testTab) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: highlight(info.selectionText),
    });
});

function highlightText(selectionText) {
  const text = document.querySelectorAll('div', 'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'td', 'caption', 'span', 'a', 'strong');
  for(let i = 0; i < text.length; i++) {
      if(text[i].innerHTML.includes(selectionText)) {
        let highlightWord = '<span style="color: red;">' + selectionText + '</span>';
        text[i].innerHTML = text[i].innerHTML.replace(selectionText, highlightWord);
        break;
      }
  }
}

import { fetchReadingList } from './src/utils'

loadReadingList();

function loadReadingList() {
    currentReadingList = fetchReadingList();
    let childNodes = '';

    for(let i = 0; i < currentReadingList.length; i++) {
        childNodes += `<li>${currentReadingList[i].pageUrl}</li>`;
    }

    document.getElementById('bookmark-list').innerHTML = childNodes;
}
