/**
 * @name storm-google-maps: Google Maps API abstraction layer
 * @version 0.1.0: Thu, 25 Feb 2016 12:03:44 GMT
 * @author stormid
 * @license MIT
 */(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StormGoogleMaps = factory();
    }
}(this, function () {
    'use strict';

    var instance,
        assign = require('object-assign'),
        merge = require('merge'),
        loadScript = require('load-script'),
        defaults = {
            delay: 200,
            callback: null
        },
        StormGoogleMaps = {
            init: function (fn) {
                if (!global.google) { this.loadAPI(fn); }
                else { fn.apply(this, arguments); }
            },
            loadAPI: function (fn) {
                var API = 'http://maps.googleapis.com/maps/api/js?callback=GoogleMapsAPILoaded',
                    GoogleMapsAPILoaded = function () {
                        delete window.GoogleMapsAPILoaded;
                        this.settings.cb && this.settings.cb.apply(this, arguments);
                    }.bind(this);

                window.GoogleMapsAPILoaded = GoogleMapsAPILoaded;

                loadScript(API, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            },
            find: function(q){
                var geocoder = new global.google.maps.Geocoder();
                
                geocoder.geocode({ 
                    address: q
                },
                function (results, status) {
                    if (status !== global.google.maps.GeocoderStatus.OK || results.length === 0) {
                        console.log('Nothing found by Google geocoder...');
                        return;
                    }
                    
                    console.log(results);
                    //console.log(results[0].geometry.location);
                });
            }
        };

    function init(sel, opts) {
        instance = assign(Object.create(StormGoogleMaps), {
            DOMElement: document.querySelector(sel) || null,
            settings: merge({}, defaults, opts)
        });
        instance.init();
    }

    return {
        init: init
    };

}));