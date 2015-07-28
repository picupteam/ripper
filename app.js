var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var port = 3500;

var tracker = require('./server');

// Initialize Tracker Server
/*var Server = require('bittorrent-tracker').Server;

var tracker = new Server(
		{
			http : false, // we do our own
			udp : false, // not interested
			filter : function(params) {
				// black/whitelist for disallowing/allowing specific clients
				// [default=allow all]
				// this example only allows the uTorrent client
				// var client = params.peer_id[1] + params.peer_id[2]
				// return whitelist[client]

				var allowed = (infoHash === 'CF8DC10E582ABEAAC52ADAD28A2D9E6BB3A91209');
				cb(allowed);
			}
		});

tracker.on('listening', function() {
	// fired when all requested servers are listening
	console.log('listening on http port:' + tracker.http.address().port);
	console.log('listening on udp port:' + tracker.udp.address().port);
});*/

// Web Server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/*// Start tracker
var onHttpRequest = tracker.onHttpRequest.bind(tracker);
app.get('/announce', onHttpRequest);
app.get('/scrape', onHttpRequest);

// Set port
app.set('port', 3500);
var web_serv = app.listen(app.get('port'), function() {
	console.log('express server listening on port ' + web_serv.address().port);
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);	
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
