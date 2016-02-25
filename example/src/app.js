var STORM = (function(w, d) {
        'use strict';

        var init = function() {
                StormGoogleMaps.init(null, {
                    cb: function(){
                        //this.find('Boston');
                        this.find('EH6 1PY');
                    }
                });
            };

        return {
            init: init
        };

    })(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);