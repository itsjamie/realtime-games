import React from 'react'

const Room = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <div>Admin: {props.admin.toString()}</div>
            <div>Room: {props.room}</div>
            <div>Playing: {props.playing.toString()}</div>
            <div>Connected: {props.connected.toString()}</div>
            <div>Players: {props.playerCount}</div>
            <div>Character: {props.character}</div>
            <div>Setup Info: <pre>{props.setupInfo}</pre></div>
        </React.Fragment>
    )
}

export {
    Room
}