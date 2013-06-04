// bbl Localization Library
// Bark Golgafrincham
// 2013
// http://github.com/barkgolgafrincham/bbl

(function(){
    var dt = null;
    
    var bbl = function(aPhrase, parms){
        var a = dt[aPhrase];
        if (a == null) 
            a = aPhrase;
        if (parms == null) 
            return a;
        var c = 0;
        for (c = 0; c < parms.length; c++) {
            var pv = bbl(parms[c]);
            a = a.replace('{' + c + '}', pv);
        }
        return a;
    }
     bbl.clear = function(){
        // clears the resource content
        dt = null;
    } 
    bbl.set = function(langRes){
        //  adds the resource content to the current dictionary
        if (dt == null) 
            dt = {};
        for (var o in langRes) {
            dt[o] = langRes[o];
        }
        
    }
    
    
    bbl.resource = function(langFile, readyCallback){
        $.get(langFile, function(){
            bbl.all();
            if (readyCallback != null) 
                readyCallback();
        }).fail(function(e){
            throw 'Error -- could not find language file ' + langFile;
        });
    }
    bbl.getDictionary = function(){
        return dt;
    }
    bbl.one = function(resEl, attrName){
        var resKey = null;
        if (attrName == null) 
            attrName = 'data-bbl-html';
        resKey = resEl.getAttribute(attrName);
        if (resKey == null) {
            attrName = 'data-bbl-html';
            resKey = resEl.getAttribute(attrName);
        }
        if (resKey == null) {
            attrName = 'data-bbl-text';
            resKey = resEl.getAttribute(attrName);
        }
        if (resKey == null) {
            attrName = 'data-bbl-value';
            resKey = resEl.getAttribute(attrName);
        }
        var resParms = resEl.getAttribute('data-bbl-parms');
        var rp = null;
        if (resParms != null) 
            rp = resParms.split("|");
        
        switch (attrName) {
            case 'data-bbl-html':
                resEl.innerHTML = bbl(resKey, rp);
                break;
            case 'data-bbl-text':
                resEl.text = bbl(resKey, rp);
                break;
            case 'data-bbl-value':
                resEl.value = bbl(resKey, rp);
                break;
        }
    }
    bbl.all = function(){
        var ats = ['data-bbl-html', 'data-bbl-text', 'data-bbl-value'];
        for (var a in ats) {
            var resElms = document.querySelectorAll('[' + ats[a] + ']');
            for (var n = 0; n < resElms.length; n++) {
                var resEl = resElms[n];
                this.one(resEl, ats[a]);
            }
        }
    }
    window.bbl = bbl;
})();

