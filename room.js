const shuffle = require('fisher-yates-shuffle')
const generateNumber = require('random-number-csprng');

class RoomManager {
    constructor() {
        this.rooms = {}
    }

    setIO(io) {
        this.io = io
    }

    onConnect(socket) {
        socket.on('room', (roomName) => {
            this.joinRoom(socket, roomName)

            socket.on('disconnect', () => {
                console.log("Disconnect socket from room");
                this.rooms[roomName].removePlayer(socket)
                if (this.rooms[roomName].players.length === 0) {
                    delete this.rooms[roomName]
                }
            })
        })
    }

    createRoom(roomName) {
        this.rooms[roomName] = new Room(roomName, this.io)
    }

    joinRoom(socket, roomName) {
        let admin = false;
        if (!this.rooms[roomName]) {
            admin = true;
            this.createRoom(roomName)
        }
        this.rooms[roomName].joinPlayer(socket, admin)
    }
}

const UNSET_MAX_PLAYERS = Number.POSITIVE_INFINITY
class Room {
    constructor(name, io) {
        this.setup = {
            characters: [],
            maxPlayers: UNSET_MAX_PLAYERS,
            name: name,        
        }
        this.players = []
        this.io = io
    }

    joinPlayer(socket, admin) {
        this.players.push(socket)
        socket.join(this.setup.name)

        if (admin) {
            this.listenAdmin(socket)
            socket.emit('admin');
        }

        socket.emit('setupInfo', JSON.stringify(this.setup, null, 4))
        this.io.to(this.setup.name).emit('playerCount', this.players.length);        
    }

    removePlayer(socket) {
        const idx = this.players.findIndex((s) => {
            console.log(s.id)
            return (socket.id === s.id)
        })
        
        this.players.splice(idx, 1);
        this.io.to(this.setup.name).emit('playerCount', this.players.length);
    }

    listenAdmin(socket) {
        socket.on('addCharacter', (name) => {
            this.addCharacter(name)
        })

        socket.on('startGame', () => {
            this.startGame().then(() => {
                console.log("started game")
            })
        })
    }
    
    addCharacter(characterName) {
        this.setup.characters.push(characterName)
        this.io.to(this.setup.name).emit('setupInfo', JSON.stringify(this.setup, null, 4))
    }

    async startGame() {
        const num = await generateNumber(0, 1000)
        console.log(num);
        const shuffledCards = shuffle(this.setup.characters, () => num / 1000)
        for (let i = 0; i < shuffledCards.length; i++) {
            this.players[i].emit('startGame');
            this._assignCharacter(this.players[i], shuffledCards[i])
            console.log(shuffledCards)
            console.log(i);
        }
    }

    _assignCharacter(socket, character) {
        socket.emit('character', character)
    }
}

module.exports = new RoomManager();