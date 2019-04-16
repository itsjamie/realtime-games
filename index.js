const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    serveClient: false,
});
const RoomManager = require('./room');
RoomManager.setIO(io);

app.use(express.static('./static'))
const port = process.env.PORT || 3000


http.listen(port, () => {
    console.log(`example app listening at *:${port}`)
})

io.on('connect', (socket) => {
    console.log("Connected");
    RoomManager.onConnect(socket)
});