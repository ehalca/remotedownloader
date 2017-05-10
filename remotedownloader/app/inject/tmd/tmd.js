'use strict';
var inj = inj || {};

inj.TmdInjector = class TmdInjector extends inj.Injector {
    constructor () {
        super();
    }
    addControl (d, $control) {
       $(d).append($control);
    }
    createControl(d){
        return {$control:$("<a href='#'>DTV</a>"),url:'https://www.torrentsmd.com/'+$('a.index',d).attr('href')};
    }
    getDownloadables(){
        return $('#details > tbody > tr:nth-child(1) > td:nth-child(2) > div').toArray();
    }
}

inj.TmdBrowseInjector = class TmdBrowseInjector extends inj.TmdInjector {
    getDownloadables(){
        return $('.torrentTablePlusTr[torrentid!="0"]').toArray();
    }
    createControl(d){
        return {$control:$('<a type="button" class="downloadButton" href="#">DTV</a>'),url:'https://www.torrentsmd.com/download.php?id='+$(d).attr('torrentid')};
    }
}
inj.TmdPageInjector = class TmdPageInjector extends inj.TmdInjector {
    getDownloadables(){
        return $('#details > tbody > tr:nth-child(1) > td:nth-child(2) > div').toArray();
    }
}

$(document).ready(function(){
    var injectors = [new inj.TmdPageInjector(), new inj.TmdBrowseInjector()];
});