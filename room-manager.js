class RoomManager {
    constructor() {
        this.rooms = {};
    }
  
    setIO(io) {
        this.io = io;
    }
  
    onConnect(socket) {
        socket.on("room", roomName => {
            this.joinRoom(socket, roomName);
            const state = SocketState.get(socket.id);
    
            socket.on("disconnect", () => {
                this.rooms[roomName].removePlayer(socket);
                if (this.rooms[roomName].players.length === 0) {
                    delete this.rooms[roomName];
                }
            });
        });
    }
  
    createRoom(roomName) {
        this.rooms[roomName] = new Room(roomName, this.io);
    }
  
    joinRoom(socket, roomName) {
        let admin = false;
        if (!this.rooms[roomName]) {
            admin = true;
            this.createRoom(roomName);
        }
        this.rooms[roomName].joinPlayer(socket, admin);
    }
}

module.exports = new RoomManager()