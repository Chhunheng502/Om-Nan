const fetchReadingList = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['readingList'], (obj) => {
            resolve(obj['readingList'] ? JSON.parse(obj['readingList']) : []);
        });
    });
};
  
const addNewArticleEventHandler = async () => {
    const newArticle = {
        htmlContent: currentTime,
        pageUrl: getTime(currentTime),
    };

    currentReadingList = await fetchReadingList();

    chrome.storage.sync.set({
        ['readingList']: JSON.stringify([...currentReadingList, newArticle])
    });
};

export { fetchReadingList, addNewArticleEventHandler };