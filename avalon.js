const AvalonGamePlayerInfo = [
    { name: "Merlin", knows: ["Morgana", "Oberon", "Assassin"] },
    { name: "Loyal", knows: [] },
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

const AvalonGameBeforeStart = (players, deck, num, startingPlayer) => {
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

module.exports = {
    AvalonGameBeforeStart,
}