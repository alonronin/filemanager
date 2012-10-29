var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express.__app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 80);
    app.set('mongo', process.env.MONGOLAB_URI || 'mongodb://localhost/filemanager');
    app.set('cloudinary', (process.env.CLOUDINARY_URL ? process.env.CLOUDINARY_URL : process.env.CLOUDINARY_URL='cloudinary://257582562521111:espYKm0g78k1eeWrccO20svbALc@ronin'));

    app.engine('html', require('consolidate').dust);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));

    app.use(express.compress());

    app.use(express.favicon());

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser('magical secret filemanager'));
    app.use(express.cookieSession({cookie: { maxAge: 60 * 1000 * 20 }}));

    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});

require('mongoose').connect(app.get('mongo'));
require('./routes');

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
