import React from 'react';

const AvalonAdminControls = (props) => {
    if (!props.admin) {
        return null
    }

    return (
        <React.Fragment>
        <button onClick={() => props.addCharacter('Merlin')}>Merlin</button>
        <button onClick={() => props.addCharacter('Morgana')}>Morgana</button>
        <button onClick={() => props.addCharacter('Percival')}>Percival</button>
        <button onClick={() => props.addCharacter('Mordred')}>Mordred</button>
        <button onClick={() => props.addCharacter('Oberon')}>Oberon</button>
        <button onClick={() => props.addCharacter('Assassin')}>Assassin</button>
        <button onClick={() => props.addCharacter('Loyal')}>Loyal</button>
        </React.Fragment>
    )
}

const GameControls = (props) => {
    if (!props.admin) {
        return null
    }

    switch (props.game) {
    case "Avalon":
        return (
            <AvalonAdminControls {...props} />
        )
    }

    return null
}

export {
    GameControls
}