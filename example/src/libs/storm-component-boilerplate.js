/**
 * @name storm-component-boilerplate: 
 * @version 0.1.0: Tue, 23 Feb 2016 23:13:45 GMT
 * @author stormid
 * @license MIT
 */(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormComponentBoilerplate = factory();
  }
}(this, function() {
	'use strict';
    
    var instances = [],
        assign = require('object-assign'),
        merge = require('merge'),
        defaults = {
            delay: 200,
            callback: null
        },
        StormComponentPrototype = {
            init: function() {
                this.DOMElement.addEventListener('click', this.handleClick.bind(this), false);
            },
            handleClick: function(e) {
                console.log(e.target, 'I\'ve been clicked');
            }
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Boilerplate cannot be initialised, no augmentable elements found');
        }
        
        els.forEach(function(el, i){
            instances[i] = assign(Object.create(StormComponentPrototype), {
                DOMElement: el,
                settings: merge({}, defaults, opts)
            });
            //add further objects as assign arguments for object composition
            instances[i].init();
        });
        return instances;
    }
    
    function reload(els, opts) {
        destroy();
        init(els, opts);
    }
    
    function destroy() {
        instances = [];  
    }
    
	return {
		init: init,
        reload: reload,
        destroy: destroy
	};
	
 }));