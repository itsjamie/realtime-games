const shuffle = require('fisher-yates-shuffle')
const generateNumber = require('random-number-csprng');
const { SocketState } = require('./socket-state');

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
            const state = SocketState.get(socket.id)

            socket.on('disconnect', () => {
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
            game: 'freeform',
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
            return (socket.id === s.id)
        })
        
        this.players.splice(idx, 1);
        this.io.to(this.setup.name).emit('playerCount', this.players.length);
    }

    listenAdmin(socket) {
        socket.on('addCharacter', (name) => {
            this.addCharacter(name)
        })

        socket.on('setGame', (name) => {
            this.setup.game = name
            this.io.to(this.setup.name).emit('setupInfo', JSON.stringify(this.setup, null, 4))
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
        const shuffledCards = shuffle(this.setup.characters, () => num / 1000)
        for (let i = 0; i < shuffledCards.length; i++) {
            this._assignCharacter(this.players[i], shuffledCards[i])
        }

        switch (this.setup.game) {
        case "Avalon":
            AvalonGameInfo(this.players, shuffledCards, num)
            break;
        }

        this.io.to(this.setup.name).emit('startGame')
    }

    _assignCharacter(socket, character) {
        socket.emit('character', character)
    }
}

const AvalonGameInfo = (players, deck, num) => {
    const Merlin = deck.findIndex(card => card == "Merlin")
    const Morgana = deck.findIndex(card => card == "Morgana")
    const Assassin = deck.findIndex(card => card == "Assassin")
    const Mordred = deck.findIndex(card => card == "Mordred")
    const Oberon = deck.findIndex(card => card == "Oberon")
 
    const MerlinRoles = []
    const MorganaRoles = []
    const PercivalRoles = []
    const AssassinRoles = []
    const MordredRoles = []

    if (Merlin !== -1) {
        PercivalRoles.push(SocketState.get(players[Merlin].id).name)
    }
    if (Morgana !== -1) {
        MerlinRoles.push(SocketState.get(players[Morgana].id).name)
        PercivalRoles.push(SocketState.get(players[Morgana].id).name)
        AssassinRoles.push(SocketState.get(players[Morgana].id).name)
        MordredRoles.push(SocketState.get(players[Morgana].id).name)
    }
    if (Assassin !== -1) {
        MerlinRoles.push(SocketState.get(players[Assassin].id).name)
        MorganaRoles.push(SocketState.get(players[Assassin].id).name)
        MordredRoles.push(SocketState.get(players[Assassin].id).name)
    }
    if (Oberon !== -1) {
        MerlinRoles.push(SocketState.get(players[Oberon].id).name)
    }
    if (Mordred !== -1) {
        AssassinRoles.push(SocketState.get(players[Mordred].id).name)
        MorganaRoles.push(SocketState.get(players[Mordred].id).name)
    }

    for (let i = 0; i < deck.length; i++) {
        let data;
        switch (deck[i]) {
            case "Merlin":
                data = MerlinRoles;    
                break;
            case "Morgana":
                data = MorganaRoles
                break;
            case "Percival":
                data = PercivalRoles
                break;
            case "Assassin":
                data = AssassinRoles
                break;
            case "Mordred":
                data = MordredRoles
                break;
        }
        const shuffledRoles = shuffle(data, () => num / 1000)
        players[i].emit('gameInfo', JSON.stringify(shuffledRoles))
    }
}

module.exports = new RoomManager();