import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import Room from "./components/room";
import Controls from "./components/controls";
import TopBar from "./components/TopBar";
import { GameControls } from "./components/game-controls";
import Name from "./components/name";
import Baby from "./components/baby";

const socket = io();

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: window.localStorage.getItem("name") || "",
      room: "",
      game: "freeform",
      admin: false,
      connected: false,
      playing: false,
      character: "",
      players: [],
      setupInfo: {},
      gameInfo: [],
      showBaby: false,
      startingPlayer: ""
    };

    socket.on("connect", () => {
      this.setState({
        connected: true
      });

      // If the name was set in local storage
      if (this.state.name) {
        socket.emit("setName", this.state.name);
      }
    });
    socket.on("disconnect", () => {
      this.setState({
        connected: false
      });
    });
    socket.on("admin", () => {
      this.setState({
        admin: true
      });
    });
    socket.on("startGame", () => {
      this.setState({
        playing: true
      });
    });
    socket.on("character", character => {
      this.setState({
        character
      });
    });
    socket.on("players", players => {
      this.setState({
        players
      });
    });
    socket.on("setupInfo", setupInfo => {
      const setup = JSON.parse(setupInfo);
      this.setState({
        game: setup.game,
        setupInfo: setup
      });
    });
    socket.on("gameInfo", (gameInfo, startingPlayer) => {
      this.setState({
        gameInfo: JSON.parse(gameInfo),
        startingPlayer
      });
    });
  }

  joinRoom = roomName => {
    socket.emit("room", roomName);
    this.setState({
      room: roomName
    });
  };

  setName = name => {
    socket.emit("setName", name);
    this.setState({
      name
    });
  };

  resetName = () => {
    window.localStorage.removeItem("name");
    socket.emit("setName", "");
    this.setState({
      name: ""
    });
  };

  selectPreset(e) {
    e.preventDefault();
    socket.emit("setGame", e.currentTarget.value);
  }

  addCharacterWithForm(e) {
    e.preventDefault();
    socket.emit("addCharacter", e.target.name.value);
  }

  addCharacterWithName(name) {
    socket.emit("addCharacter", name);
  }

  startGame(e) {
    e.preventDefault();
    socket.emit("startGame");
  }

  toggleShowBaby = () => {
    this.setState({ showBaby: !this.state.showBaby });
  };

  render() {
    return (
      <React.Fragment>
        <TopBar
          {...this.state}
          addCharacter={this.addCharacterWithForm}
          joinRoom={this.joinRoom}
          selectPreset={this.selectPreset}
          startGame={this.startGame}
          toggleShowBaby={this.toggleShowBaby}
          showBaby={this.state.showBaby}
          resetName={this.resetName}
        />
        <Name name={this.state.name} onNameSet={this.setName} />
        <Room {...this.state} />
        <Controls
          {...this.state}
          addCharacter={this.addCharacterWithForm}
          joinRoom={this.joinRoom}
          selectPreset={this.selectPreset}
          startGame={this.startGame}
          startingPlayer={this.state.startingPlayer}
        />
        <GameControls
          admin={this.state.admin}
          game={this.state.setupInfo.game}
          addCharacter={this.addCharacterWithName}
        />
        <Baby showBaby={this.state.showBaby} />
      </React.Fragment>
    );
  }
}

export default App;
