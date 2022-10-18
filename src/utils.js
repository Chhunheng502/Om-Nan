const fetchReadingList = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['readingList'], (obj) => {
            resolve(obj['readingList'] ? JSON.parse(obj['readingList']) : []);
        });
    });
};
  
const addNewArticleEventHandler = async (pageUrl) => {
    currentReadingList = await fetchReadingList();

    chrome.storage.sync.set({
        ['readingList']: JSON.stringify([...currentReadingList, pageUrl])
    });
};

export { fetchReadingList, addNewArticleEventHandler };