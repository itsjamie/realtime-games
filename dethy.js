const Dethy = {
    roles: [
        { 
            name: "mafia", 
            action: function(day, targetPlayer) {
            if (day > 0) {
                // kill player
            }
        },
        {
            name: "Sane Cop",
            action: function(day, targetPlayer) {
                // return alignment of player
            },
        },
        {
            name: "Insane Cop",
            action: function(day, targetPlayer) {
                // return alignment of player reversed
            }
        },
        {
            name: "Paranoid Cop",
            action: function(day, targetPlayer) {
                // always return guilty
            }
        },
        {
            name: "Naive",
            action: function(day, targetPlayer) {
                // always return innocent
            }
        }
    ],
}

class DethyGameState {
    constructor(socketRoom, players, io) {
        this.day = 0;
        this.players = players;
        this.adminPlayer = players.find(player => player.admin);
        this.io = io;
        this.socketRoom = socketRoom;
    }

    assignRoles() {

    }

    setupAdmin() {
        socket.on('advanceDay', () => {
            
        })
    }

    setupPlayer() {

    }

    advanceDay() {
        
    }

    handleRoleAction() {

    }
}


const DethyGameBeforeStart = (players, shuffledCards, num, io, socketRoom) => {
    const game = new DethyGameState(socketRoom, players, io)
    setupDethyAdminEvents(admin.socket, io)
    players.forEach(player => {
        setupPlayerEvents(player, players)
    })
}

const setupPlayerEvents = (player, players) => {
    const socket = player.socket
    socket.on('action', )
}

module.exports = {
    DethyGameBeforeStart
}