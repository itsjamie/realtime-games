import React from 'react';

const Controls = (props) => {
    if (props.playing) {
        const listGameInfo = props.gameInfo.map(item => (
            <li>{item}</li>
        ))
        return <div>
            <p>Your character is: {props.character}</p>
            <p>You See:</p>
            <ul>{listGameInfo}</ul>
        </div>
    }

    if (!props.room) {
        return (
            <form onSubmit={props.joinRoom}>
                <input name="room" type="text" placeholder="Room" />
            </form>
        )
    }

    if (!props.admin) {
        return <div>Waiting for game to start...</div>
    }

    return (
        <React.Fragment>
        <form onSubmit={props.addCharacter}>
            <input name="name" type="text" placeholder="Character..."></input>
        </form>
        <button onClick={props.selectPreset} value="Avalon">Avalon</button>
        <form onSubmit={props.startGame}>
            <input type="submit" value="Start Game" />
        </form>
        </React.Fragment>
    )
}

export {
    Controls
}