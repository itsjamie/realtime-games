import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { Room } from './components/room';
import { Controls } from './components/controls';

const socket = io();

class App extends Component {
  constructor() {
    super()
    this.state = {
      room: '',
      admin: false,
      connected: false,
      playing: false,
      character: '',
      playerCount: 0,
      setupInfo: '',
    }

    socket.on('connect', () => {
      this.setState({
        connected: true,
      })
    })
    socket.on('disconnect', () => {
      this.setState({
        connected: false,
      })
    })
    socket.on('admin', () => {
      this.setState({
        admin: true,
      })
    })
    socket.on('startGame', () => {
      this.setState({
        playing: true,
      })
    })
    socket.on('character', (character) => {
      this.setState({
        character,
      })
    })
    socket.on('playerCount', (playerCount) => {
      this.setState({
        playerCount
      })
    })
    socket.on('setupInfo', (setupInfo) => {
      this.setState({
        setupInfo,
      })
    })
  }

  joinRoom = (e) => {
    e.preventDefault()
    socket.emit('room', e.target.room.value)
    this.setState({
      room: e.target.room.value,
    })
  }

  addCharacter(e) {
    e.preventDefault()
    socket.emit('addCharacter', e.target.name.value)
  }

  startGame(e) {
    e.preventDefault()
    socket.emit('startGame');
  }

  render() {
    return (
      <React.Fragment>
      <Room {...this.state}></Room>
      <Controls 
        {...this.state}
        addCharacter={this.addCharacter}
        joinRoom={this.joinRoom}
        startGame={this.startGame}>
      </Controls>
      </React.Fragment>
    );
  }
}

export default App;
