var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');
var io = require('socket.io')();

//-----------------------------------------------------------------------------

var STREAM_SECRET = process.argv[2];
var	STREAM_PORT = process.argv[3] || 8082;
var	WEBSOCKET_PORT = process.argv[4] || 8084;
var	STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes

var width = 320;
var	height = 240;

// Websocket Server
var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});
socketServer.on('connection', function(socket) {
	// Send magic bytes and video size to the newly connected socket
	// struct { char magic[4]; unsigned short width, height;}
	var streamHeader = new Buffer(8);
	streamHeader.write(STREAM_MAGIC_BYTES);
	streamHeader.writeUInt16BE(width, 4);
	streamHeader.writeUInt16BE(height, 6);
	socket.send(streamHeader, {binary:true});

	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );

	socket.on('close', function(code, message){
		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
	});
});

socketServer.broadcast = function(data, opts) {
	for( var i in this.clients ) {
		if (this.clients[i].readyState == 1) {
			this.clients[i].send(data, opts);
		}
		else {
			console.log( 'Error: Client ('+i+') not connected.' );
		}
	}
};

/* Starting ffmpeg server */
var exec = require('child_process').exec;

var ffmpeg = 'ffmpeg -s 640x480 -f video4linux2 -i /dev/video0 -f mpeg1video -b 800k -r 30 http://127.0.0.1:8082';

app.post('./routes/controller', function(req, res) {
	console.log(req.method);
	res.connection.setTimeout(0);
	width = 640;
	height = 480;
	console.log(
		'Stream Connected: ' + req.socket.remoteAddress +
		':' + req.socket.remotePort + ' size: ' + width + 'x' + height
	);
	req.on('data', function(data){
		socketServer.broadcast(data, {binary:true});
	});
});


app.get('/jsmpg.js', function(req, res) {
	res.sendFile(__dirname + '/public/js/jsmpg.js');
});
//-----------------------------------------------------------------------------

app.set('port', process.env.PORT || 8082 );
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Roux Meetups';
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'));

app.use(require('./routes/home'));
app.use(require('./routes/contact'));
app.use(require('./routes/details'));
app.use(require('./routes/documentation'));
app.use(require('./routes/controller'));
app.use(require('./routes/api'));

var server = app.listen(STREAM_PORT, function() {
	console.log('server is running on port : ' + STREAM_PORT);

	exec(ffmpeg, function(error, stdout, stderr) {
		console.log('ffmpeg is running.......');
		console.log('stdout: ' + stdout);
		if (error !== null) {
		    console.log('exec error: ' + error);
		}
	});
});
/*
var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));

  exec(ffmpeg, function(error, stdout, stderr) {
  console.log('ffmpeg is running.......');
  console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

});
*/
/*
io.attach(server);

io.on('connection', function(socket){
  console.log('User Connected');

  socket.on('postKeyPressed', function(data){
    console.log('A key has been pressed: '+data.keyPressed);
  });

  socket.on('stop', function(){
    console.log('The car has stopped');
  });

  socket.on('forwardButtonPressed', function(data){
    console.log('A button has been pressed: '+data.buttonPressed);
  });

  socket.on('leftButtonPressed', function(data){
    console.log('A button has been pressed: '+data.buttonPressed);
  });

  socket.on('rightButtonPressed', function(data){
    console.log('A button has been pressed: '+data.buttonPressed);
  });

  socket.on('backButtonPressed', function(data){
    console.log('A button has been pressed: '+data.buttonPressed);
  });

  socket.on('tempDetailsPressed', function(data){
    console.log('A button has been pressed: '+data.buttonPressed);

    io.emit('temperaturePostDetails',{
      temperature: 30,
      activity: 'Active',
      time: 'Now',
    });
  });

});
*/
reload(server, app);
