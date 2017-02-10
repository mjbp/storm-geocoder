#Storm Geocoder

[![Build Status](https://travis-ci.org/mjbp/storm-geocoder.svg?branch=master)](https://travis-ci.org/mjbp/storm-geocoder)
[![codecov.io](http://codecov.io/github/mjbp/storm-geocoder/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-geocoder?branch=master)
[![npm version](https://badge.fury.io/js/storm-geocoder.svg)](https://badge.fury.io/js/storm-geocoder)

Light promisified Google Maps API geocoder loader and abstraction layer.

##Example
[https://mjbp.github.io/storm-geocoder](https://mjbp.github.io/storm-geocoder)

##Usage
JS
```
npm install storm-geocoder
```

either using es6 import
```
import Geocoder from 'storm-geocoder';

Geocoder
    .init({key: 'Your key here'})
    .then(geocoder => {
        geocoder
            .promise('EH6 7BG')
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    });

```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-geocoder.standalone.js')
    .then(() => {
        Geocoder
            .init({key: 'Your key here'})
            .then(geocoder => {
                geocoder
                    .promise('EH6 7BG')
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    });
```

###Options
Your own Google Maps API key will be required
```
    defaults = {
        key: null
    }
```

##Tests
```
npm run test
```

##Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

##Dependencies
Import storm-load(https://mjbp.github.io/storm-load)

##License
MIT