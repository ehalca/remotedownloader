(function () {
    'use strict';
    var token = null;
    chrome.runtime.onConnect.addListener(function (port) {
        console.assert(port.name == "injector");
        port.onMessage.addListener(function (msg) {
            if (msg.check) {
                isAlive(port);
            } else if (msg.download) {
                let url = msg.download.url;
                download(port, url);
            }
        });
    });

    function isAlive(port) {
        request('http://192.168.1.99:8181/gui/').then((response) => {
            request('http://192.168.1.99:8181/gui/token.html').then(function (r) {
                return r.text();
            }).then(function (html) {
                let parser = new DOMParser();
                token = parser.parseFromString(html, "text/html").getElementById("token").innerText;
                port.postMessage({check: true});
            }).catch(error => {                  // 3
                console.log(error);
            });
        });
    }

    function download(port, url) {
        request('http://192.168.1.99:8181/gui/?token='+token+'&action=add-url&s=' + url).then((response) => {
            return response.json();
        }).then((r)=>{
           port.postMessage(r); 
        });
    }

    function request(url) {
        return fetch(url, {
            method: 'GET',
            headers: {

                'Authorization': 'Basic ZWhhbGNhOnJmeWJyZWtz',

            }, credentials: 'include',
        });
    }

})();