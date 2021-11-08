const express = require('express')
const app = express()
const socketio = require('socket.io')
const port = process.env.port || 5000
const path = require('path')

const server = app.listen(port,() => {
    console.log("server is listning")
})

var io=socketio(server)
io.on("connection", (socket) => {
    console.log(`Socket connection id : ${socket.id}`)
    var blob_num=0;
    socket.on('radio', function(blob) {  // blob is input audio data stream
        console.log('hello server here');
        setTimeout(function () {
            // broadcast the voice to other connection  // no need
            // socket.broadcast.emit('voice', blob);  // no need

            // here returning data
            io.sockets.emit('results',++blob_num)
        }, 5000)
    });
})

app.get('/',(req,res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
})

