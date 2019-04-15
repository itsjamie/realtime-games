import React from 'react';

const Controls = (props) => {
    if (props.playing) {
        return <div>Your character is: {props.character}</div>
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
        <form onSubmit={props.startGame}>
            <input type="submit" value="Start Game" />
        </form>
        </React.Fragment>
    )
}

export {
    Controls
}