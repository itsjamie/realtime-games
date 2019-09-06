const express = require('express');
const path = require('path');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    serveClient: false,
});
const { SocketState } = require('./socket-state')
const RoomManager = require('./room-manager');
RoomManager.setIO(io);

app.use(express.static(path.resolve('client', 'build')))

app.get("*", function(request, response) {
    response.sendFile(path.resolve('client', 'build', 'index.html'));
})

const port = process.env.PORT || 3000
http.listen(port, () => {
    console.log(`example app listening at *:${port}`)
})

io.on('connect', (socket) => {
    console.log("Connected");
    RoomManager.onConnect(socket)

    socket.on('disconnect', () => {
        SocketState.delete(socket.id)
    })

    socket.on('setName', (name) => {
        const data = SocketState.get(socket.id) || {}
        SocketState.set(socket.id, {
            ...data,
            name,
        })
    })
});