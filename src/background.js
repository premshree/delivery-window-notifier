// maps notification IDs to tab IDs
let notifMap = { };

let notifAudio = new Audio('../audio/notification.mp3');

chrome.runtime.onMessage.addListener((data, sender) => {
    console.log(sender);
    if (data.type === 'notification') {
        chrome.notifications.create('', data.options, (notifId) => {
            notifMap[notifId] = sender.tab.id;
        });
        notifAudio.play();
    }
});

chrome.notifications.onClicked.addListener((notifId) => {
    chrome.tabs.update(notifMap[notifId], {selected: true});
});