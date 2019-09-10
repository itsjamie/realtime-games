const shuffle = require("fisher-yates-shuffle");
const generateNumber = require("random-number-csprng");
const { SocketState } = require("./socket-state");

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

const UNSET_MAX_PLAYERS = Number.POSITIVE_INFINITY;
class Room {
  constructor(name, io) {
    this.setup = {
      characters: [],
      game: "freeform",
      maxPlayers: UNSET_MAX_PLAYERS,
      name: name
    };
    this.players = [];
    this.io = io;
  }

  joinPlayer(socket, admin) {
    const state = SocketState.get(socket.id),
      name = state.name || "Player" + this.players.length;

    this.players.push({ socket, name });
    socket.join(this.setup.name);

    if (admin) {
      this.listenAdmin(socket);
      socket.emit("admin");
    }

    socket.emit("setupInfo", JSON.stringify(this.setup, null, 4));
    this.io
      .to(this.setup.name)
      .emit("players", this.players.map(getPlayerName));
  }

  removePlayer(socket) {
    const idx = this.players.findIndex(s => {
      return socket.id === s.socket.id;
    });

    this.players.splice(idx, 1);
    this.io
      .to(this.setup.name)
      .emit("players", this.players.map(getPlayerName));
  }

  listenAdmin(socket) {
    socket.on("addCharacter", name => {
      this.addCharacter(name);
    });

    socket.on("setGame", name => {
      this.setup.game = name;
      this.io
        .to(this.setup.name)
        .emit("setupInfo", JSON.stringify(this.setup, null, 4));
    });

    socket.on("startGame", () => {
      this.startGame().then(() => {
        console.log("started game");
      });
    });

    socket.on('startWithAutoRoles', () => {
      if(AvalonAutoRoles(this.players.length, this.setup)) {
        this.startGame().then(() => {
          console.log(`started game with auto roles for ${this.players.length} players`);
        });
      }
    });
  }

  addCharacter(characterName) {
    this.setup.characters.push(characterName);
    this.io
      .to(this.setup.name)
      .emit("setupInfo", JSON.stringify(this.setup, null, 4));
  }

  async startGame() {
    const num = await generateNumber(0, 1000);
    const shuffledCards = shuffle(this.setup.characters, () => num / 1000);
    const startingPlayer = this._determineStartingPlayer(this.players, num);
    for (let i = 0; i < shuffledCards.length; i++) {
      this._assignCharacter(this.players[i].socket, shuffledCards[i]);
    }

    switch (this.setup.game) {
      case "Avalon":
        AvalonGameInfo(this.players, shuffledCards, num, startingPlayer);
        break;
    }

    this.io.to(this.setup.name).emit("startGame");
  }

  _assignCharacter(socket, character) {
    socket.emit("character", character);
  }

  _determineStartingPlayer(players, num) {
    const shufflePlayers = shuffle(players, () => num / 1000);
    return shufflePlayers[0].name;
  }
}

const AvalonAutoRoles = (numPlayers, setup) => {
    if (numPlayers < 5 || numPlayers > 10) return false;

    const AvalonBaseConfiguration = ['Merlin', 'Mordred', 'Oberon', 'Loyal Servant', 'Loyal Servant']
    const AvalonConfigurations = [
        AvalonBaseConfiguration,
        AvalonBaseConfiguration.concat(['Loyal Servant']),
        AvalonBaseConfiguration.concat(['Percival', 'Morgana']),
        AvalonBaseConfiguration.concat(['Percival', 'Morgana', 'Loyal Servant']),
        AvalonBaseConfiguration.concat(['Percival', 'Morgana', 'Loyal Servant', 'Loyal Servant']),
        AvalonBaseConfiguration.concat(['Percival', 'Morgana', 'Assassin', 'Loyal Servant', 'Loyal Servant'])
    ]

    setup.characters = AvalonConfigurations[numPlayers - 5];
    return true;
}

const AvalonGamePlayerInfo = [
  { name: "Merlin", knows: ["Morgana", "Oberon", "Assassin"] },
  { name: "Loyal Servant", knows: [] },
  { name: "Percival", knows: ["Merlin", "Morgana"] },
  { name: "Morgana", knows: ["Mordred", "Assassin"] },
  { name: "Assassin", knows: ["Mordred", "Morgana"] },
  { name: "Mordred", knows: ["Morgana", "Assassin"] },
  { name: "Oberon", knows: [] }
];

const getKnownAvalonPlayers = (knownList, players, deck) => {
  return knownList.reduce((knownNames, name) => {
    const index = deck.findIndex(card => card == name);
    if (index !== -1 && SocketState.get(players[index].socket.id)) {
      knownNames.push(SocketState.get(players[index].socket.id).name);
    }
    return knownNames;
  }, []);
};

const AvalonGameInfo = (players, deck, num, startingPlayer) => {
  for (let i = 0; i < AvalonGamePlayerInfo.length; i++) {
    const playerData = AvalonGamePlayerInfo[i];
    const playerIndex = deck.findIndex(card => card == playerData.name);

    for (let i = 0; i < players.length; i++) {
      players[i].socket.emit("startingPlayer", startingPlayer);
    }

    if (playerIndex !== -1) {
      data = getKnownAvalonPlayers(playerData.knows, players, deck);

      const shuffledRoles = shuffle(data, () => num / 1000);
      players[playerIndex].socket.emit(
        "gameInfo",
        JSON.stringify(shuffledRoles)
      );
    }
  }
};

const getPlayerName = player => {
  return player.name;
};

module.exports = new RoomManager();
