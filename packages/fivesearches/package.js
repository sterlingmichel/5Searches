/* global Npm, Package, ex */

var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
    summary: 'Contains all custom libraries',
    version: '1.0.3',
    name: 'fivesearches',
    "description": "A collection of libraries for the 5Searches UI.",
    "main": "package.js",
    "directories": {
        "test": "test"
    },
    "scripts": {
        "test": "./node_modules/karma/bin/karma start test/karma.conf.js --single-run",
        "debug": "./node_modules/karma/bin/karma start test/karma.conf.js",
        "coverage": "./node_modules/karma/bin/karma start test/karma.conf.js --single-run; cd .coverage; python -m SimpleHTTPServer 8000;"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/sterlingmichel/fivesearches.git"
    },
    "keywords": [
        "angular",
        "meteor"
    ],
    "author": "Sterling Michel",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/sterlingmichel/fivesearches/issues"
    },
    "homepage": "https://github.com/sterlingmichel/fivesearches",
    "devDependencies": {
        "angular": "^1.3.13",
        "angular-mocks": "^1.3.13",
        "istanbul": "^0.3.5",
        "jasmine-core": "^2.1.3",
        "jquery": "^2.1.3",
        "karma": "^0.12.31",
        "karma-chrome-launcher": "^0.1.7",
        "karma-coverage": "^0.2.7",
        "karma-firefox-launcher": "^0.1.4",
        "karma-jasmine": "^0.3.4",
        "lodash": "^2.4.1"
    }
});

// Adding the app's packages.json as a used file for this package will get
// Meteor to watch it and reload this package when it changes
Package.onUse(function (api) {
    api.versionsFrom('1.0.4');
    api.use(['mongo-livedata', 'meteorhacks:collection-utils@1.2.0'], ['server']);

    //api.use('linto:jquery-ui', 'client');

    api.add_files([
        'css/jquery.contextmenu.css',
        'css/simone.css',
        'css/qtip.css',
        'css/layout.css',
        'css/liteaccordion.css',
        'css/roundabout.css',
        'css/blue/style.css',
        'css/jquery.tablesorter.pager.css',
        'css/dropzone.css',
        'script/jquery-ui.min.js',
        'script/i18n/datepicker.all.js',
        'script/simone.js',
        'script/i18n/simone.en.min.js',
        'script/i18n/simone.fr.min.js',
        'script/i18n/simone.es.min.js',
        'script/browser.js',
        'script/center.js',
        'script/coverflow.js',
        'script/jqDock.js',
        'script/jquery.layout.js',
        'script/jquery.scrollTo.js',
        'script/liteaccordion.js',
        'script/qtip.js',
        'script/query.contextmenu.js',
        'script/resizeOnApproach.js',
        'script/roundabout.js',
        'script/roundrr.js',
        'script/test.js',
        'script/ElementQueries.js',
        'script/ResizeSensor.js',
        'script/jquery.responsiveiframe.js',
        'script/jquery.metadata.js',
        'script/jquery.tablesorter.js',
        'script/jquery.tablesorter.pager.js',
        'script/dropzone.js'

    ], 'client');

    api.add_files('script/mongo-group.js', 'server');

});
