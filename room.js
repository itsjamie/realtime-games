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

const AvalonGamePlayerInfo = [
   { name: "Merlin", knows: ["Morgana", "Oberon", "Assassin"]},
   { name: "Loyal", knows: []},
   { name: "Percival", knows: ["Merlin", "Morgana"]},
   { name: "Morgana", knows: ["Mordred", "Assassin"]},
   { name: "Assassin", knows: ["Mordred", "Morgana"]},
   { name: "Mordred", knows: ["Morgana", "Assassin"]},
   { name: "Oberon", knows: []}
];

const getKnownAvalonPlayers = (knownList, players, deck) => {
    return knownList.reduce((knownNames, name) => {
        const index = deck.findIndex(card => card == name);
        if (index !== -1 && SocketState.get(players[index].id)) {
            knownNames.push(SocketState.get(players[index].id).name);
        }
        return knownNames;
    }, []);
}

const AvalonGameInfo = (players, deck, num) => {
    for (let i = 0; i < AvalonGamePlayerInfo.length; i++) {
        const playerData = AvalonGamePlayerInfo[i];
        const playerIndex = deck.findIndex(card => card == playerData.name);
        if (playerIndex !== -1) {
            data = getKnownAvalonPlayers(playerData.knows, players, deck);

            const shuffledRoles = shuffle(data, () => num / 1000)
            players[playerIndex].emit('gameInfo', JSON.stringify(shuffledRoles))
        }
    }
}

module.exports = new RoomManager();