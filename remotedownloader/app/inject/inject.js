'use strict';
var inj = inj || {};

inj.Injector = class Injector {
    constructor() {
        let downloadables = this.getDownloadables();
        if (downloadables.length > 0) {
            this.createPort().then((data) => {
                downloadables.forEach((d) => {
                    var control = this.createControl(d);
                    control.$control.on('click',()=>{
                        this.download(control.url)
                    });
                    this.addControl(d, control.$control);
                });
            }, (err) => {
                console.log(`error: ${err}`)
            });

        }
    }
    addControl($control) {

    }
    createControl(d) {

    }
    getDownloadables() {
        return false;
    }
    download(url){
        this.port.postMessage({download: {url:url}});
    }
    createPort(callback) {
        return new Promise((resolve, reject) => {
            this.port = chrome.runtime.connect({name: "injector"});
            this.port.postMessage({check: true});
            this.port.onMessage.addListener((msg) => {
                if (msg.check) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
}
