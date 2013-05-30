(function(){
    var dt = null;
    
    var _ = function(aPhrase, parms){
        var a = dt[aPhrase];
        if (a == null) 
            a = aPhrase;
        if (parms == null) 
            return a;
        var c = 0;
        for (c = 0; c < parms.length; c++) {
            var pv = this._(parms[c]);
            a = a.replace('{' + c + '}', pv);
        }
        return a;
    }
    _.set = function(langRes){
        dt = langRes;
    }
    _.resource = function(langFile, readyCallback){
        $.get(langFile, function(){
            _.all();
            if (readyCallback != null) 
                readyCallback();
        }).fail(function(){
            throw 'Error -- could not find language file ' + langFile;
        });
    }
    _.getDictionary = function(){
        return dt;
    }
    _.one = function(resEl, attrName){
        var resKey = resEl.getAttribute(attrName);
        var resParms = resEl.getAttribute('data-parms');
        var rp = null;
        if (resParms != null) 
            rp = resParms.split("|");
        
        switch (attrName) {
            case 'data-trans-html':
                resEl.innerHTML = _(resKey, rp);
                break;
            case 'data-trans-text':
                resEl.text = _(resKey, rp);
                break;
            case 'data-trans-value':
                resEl.value = _(resKey, rp);
                break;
        }
    }
    _.all = function(){
        var ats = ['data-trans-html', 'data-trans-text', 'data-trans-value'];
        for (var a in ats) {
            var resElms = document.querySelectorAll('[' + ats[a] + ']');
            for (var n = 0; n < resElms.length; n++) {
                var resEl = resElms[n];
                this.one(resEl, ats[a]);
            }
        }
    }
    window._ = _;
})();

