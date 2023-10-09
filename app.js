const http = require('http'); // Import the 'http' module
const fs = require('fs');
const path = require('path');
const SerialPort = require("serialport");
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({ delimeter: '\r\n' });

// Create an HTTP server
const server = http.createServer(function (req, res) {
    const filePath = path.join(__dirname, req.url);

    if (filePath === path.join(__dirname, '/')) {
        // Serve your index.html file as before
        fs.readFile('index.html', function (error, content) {
            if (error) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(content, 'utf-8');
            }
        });
    } else {
        // Serve static files (including script.js)
        fs.readFile(filePath, function (error, content) {
            if (error) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                // Determine the content type based on the file extension
                let contentType = 'text/html';
                if (filePath.endsWith('.js')) {
                    contentType = 'text/javascript';
                }

                res.writeHead(200, {"Content-Type": contentType});
                res.end(content, 'utf-8');
            }
        });
    }
});


// EDIT SERIAL PORT
const port = new SerialPort('/dev/cu.usbmodem14101', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});

port.pipe(parser);

// Set up Socket.io
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('Node.js is listening for WebSocket connections!');
});

parser.on('data', function(data) {
    io.emit('data', data);
});

// Start the server
const portNumber = 3000;
server.listen(portNumber, function () {
    console.log(`Server is running on http://localhost:${portNumber}`);
});