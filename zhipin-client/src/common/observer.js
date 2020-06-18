const observer = {
    clientList: {},

    addlisten(key, fn) {
        this.clientList[key] = this.clientList[key] || [];
        this.clientList[key].push(fn);
    },

    trigger() {
        var key = [].shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    
    remove(key, fn) {
        
        var fns = this.clientList[key]; 
        if (!fns) { 
            return false;
        }
        if (!fn) { 
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) { 
                if (fn === fns[l]) {
                    fns.splice(l, 1); 
                }
            }
        }
    }
}

export default observer;