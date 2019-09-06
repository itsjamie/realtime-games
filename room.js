const shuffle = require("fisher-yates-shuffle");
const generateNumber = require("random-number-csprng");
const { SocketState } = require("./socket-state");
const { AvalonGameBeforeStart } = require('./avalon');

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
    this.roomGame;
  }

  joinPlayer(socket, admin) {
    const state = SocketState.get(socket.id);
    const name = state.name || "Player" + this.players.length;

    this.players.push({ socket, name, admin });
    socket.join(this.setup.name);

    if (admin) {
      this.listenAdmin(socket);
      socket.emit("admin");
    }

    socket.emit("setupInfo", JSON.stringify(this.setup, null, 4));
    this.io.to(this.setup.name)
      .emit("players", this.players.map(player => player.name));
  }

  removePlayer(socket) {
    const idx = this.players.findIndex(s => {
      return socket.id === s.socket.id;
    });

    this.players.splice(idx, 1);
    this.io.to(this.setup.name)
      .emit("players", this.players.map(player => player.name));
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
  }

  addCharacter(characterName) {
    this.setup.characters.push(characterName);
    this.io.to(this.setup.name)
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
        AvalonGameBeforeStart(this.players, shuffledCards, num, startingPlayer);
        break;
      case "Dethy":
        this.roomGame = DethyGameBeforeStart(this.players, shuffledCards, num, io, this.setup.name);
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

module.exports = {
  Room,
}