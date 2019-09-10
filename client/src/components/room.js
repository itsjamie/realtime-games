import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  roles: {
    textAlign: "center"
  },
  text: {
    padding: "10px",
    width: "80%",
    margin: "0 auto",
    marginTop: "10px",
    textAlign: "center",
    marginBottom: "19px"
  }
});

const Room = props => {
  const { classes, players } = props;
  const name = props.name.replace("\\", "");

  let listGameInfo = null;
  if (props.playing) {
    listGameInfo = props.gameInfo.map(item => <li>{item}</li>);
  }

  return (
    <React.Fragment>
      {props.room && props.name && (
        <Paper className={classes.text} elevation={1}>
          <Typography variant="h6" component="h3">
            Display Name: {name}
          </Typography>
        </Paper>
      )}
      {props.room && (
        <List className={classes.root}>
          <ListItem>
            {props.character === "Merlin" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/merlin.png" />
              </ListItemAvatar>
            )}
            {props.character === "Percival" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/percival.jpg" />
              </ListItemAvatar>
            )}
            {props.character === "Morgana" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/morgana.jpeg" />
              </ListItemAvatar>
            )}
            {props.character === "Mordred" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/mordred.jpg" />
              </ListItemAvatar>
            )}
            {props.character === "Oberon" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/oberon.jpeg" />
              </ListItemAvatar>
            )}
            {props.character === "Loyal Servant" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/loyal.jpeg" />
              </ListItemAvatar>
            )}
            {props.character === "Assassin" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/assassin.jpeg" />
              </ListItemAvatar>
            )}
            {props.character && (
              <ListItemText primary="Character" secondary={props.character} />
            )}
          </ListItem>
        </List>
      )}
      {props.room && props.playing && (
        <div>
          <Typography className={classes.heading}>You See:</Typography>
  
          <Typography>
            <ul>{listGameInfo}</ul>
          </Typography>

          <Typography className={classes.heading}>
          The game will start with {props.startingPlayer.toString()}
          </Typography>
        </div>
      )}
      {props.room && players && (
        <Paper className={classes.text} elevation={1}>
          <Typography variant="h6" component="h3">
            Players Joined
          </Typography>
          <hr></hr>
          {players.map(playerName => 
          <Typography variant="h6" component="h3">
            {playerName}
          </Typography>
          )}
        </Paper>
      )}
      {props.room && !props.name && (
        <Paper className={classes.text} elevation={1}>
          <Typography variant="h6" component="h3">
            Okay... really funny... Now be sure to tell everyone that you're the
            one that didn't put their name in.... and that your name shows up
            blank in the UI. Way to go, dood!
          </Typography>
        </Paper>
      )}

      {props.room &&
        props.setupInfo &&
        props.setupInfo.characters &&
        props.setupInfo.characters.length !== 0 && (
          <div className={classes.roles}>
            <Typography variant="h7">Roles In Game:</Typography>
            <List>
              {props.setupInfo &&
                props.setupInfo.characters &&
                props.setupInfo.characters.map(name => {
                  return <ListItem>{name}</ListItem>;
                })}
            </List>
          </div>
        )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Room);
