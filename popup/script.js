if (document.querySelector('.twitter-token-login-popup')) {
    document.querySelector('#submit').addEventListener('click', function () {
        var token = document.querySelector('#token').value;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: Login,
                args: [token]
            });
        });
    });
}

function Login(token) {
    var expirationTime = new Date();
    expirationTime.setFullYear(expirationTime.getFullYear() + 1); // expires in 1 year
    document.cookie = `auth_token=${token.replace('"', '')};domain=x.com;path=/;expires=${expirationTime.toUTCString()};Secure`;
    window.location.replace('https://x.com');
}