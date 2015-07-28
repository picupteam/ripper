var Server = require('bittorrent-tracker').Server;
var port = 3500;
var hostname = '127.0.0.1';

var server = new Server(
		{
			udp : true, // enable udp server? [default=true]
			http : true, // enable http server? [default=true]
			ws : true, // enable websocket server? [default=false]
			filter : function(infoHash, params, cb) {
				// Blacklist/whitelist function for allowing/disallowing
				// torrents. If this option is
				// omitted, all torrents are allowed. It is possible to
				// interface with a database or
				// external system before deciding to allow/deny, because this
				// function is async.

				// It is possible to block by peer id (whitelisting torrent
				// clients) or by secret
				// key (private trackers). Full access to the original HTTP/UDP
				// request parameters
				// are available n `params`.

				// This example only allows one torrent.
				console.log("Torrent: " + infoHash);
				//Infohash is case sensitive.
				var allowed = (infoHash === 'cf8dc10e582abeaac52adad28a2d9e6bb3a91209');
				cb(allowed);

				// In addition to returning a boolean (`true` for allowed,
				// `false` for disallowed),
				// you can return an `Error` object to disallow and provide a
				// custom reason.
			}
		});

// Internal http, udp, and websocket servers exposed as public properties.
// server.http
// server.udp
// server.ws

server.on('error', function(err) {
	// fatal server error!
	console.log("Error: " + err.message);
});

server.on('warning', function(err) {
	// client sent bad data. probably not a problem, just a buggy client.
	console.log("Warning: " + err.message);
});

server.on('listening', function() {
	// fired when all requested servers are listening
	console.log('listening on http port:' + server.http.address().port);
	console.log('listening on udp port:' + server.udp.address().port);
});

// start tracker server listening! Use 0 to listen on a random free port.
server.listen(port, function() {});

// listen for individual tracker messages from peers:

server.on('start', function(addr) {
	console.log('got start message from ' + addr);
	console.log('Peer ' + server.torrents['cf8dc10e582abeaac52adad28a2d9e6bb3a91209'].incomplete);
});

server.on('complete', function(addr) {
	console.log('got complete message from ' + addr);	
});
server.on('update', function(addr) {
	console.log('got update message from ' + addr);
});
server.on('stop', function(addr) {
	console.log('got stop message from ' + addr);
});

// get info hashes for all torrents in the tracker server
Object.keys(server.torrents);

// get the number of seeders for a particular torrent
// server.torrents[infoHash].complete

// get the number of leechers for a particular torrent
// server.torrents[infoHash].incomplete

// get the peers who are in a particular torrent swarm
// server.torrents[infoHash].peers
module.exports = server;