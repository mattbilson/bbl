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
    bbl.set = function(langRes){
        dt = langRes;
    }
	bbl.resourcex = function() {
		console.log('get it');
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
        var resKey = resEl.getAttribute(attrName);
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

