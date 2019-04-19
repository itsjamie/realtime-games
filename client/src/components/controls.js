import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { MenuItem, TextField, Button } from "@material-ui/core/";
import classNames from "classnames";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const Controls = props => {
  const { classes } = props;
  const [room, setRoom] = useState(null);
  if (props.playing) {
    const listGameInfo = props.gameInfo.map(item => <li>{item}</li>);
    return (
      <div>
        <p>Your character is: {props.character}</p>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>You See:</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ul>{listGameInfo}</ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  if (!props.room) {
    return (
      <form onSubmit={() => false}>
        <Input
          id="standard-dense"
          placeholder="Enter room name:"
          name="room"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          onChange={e => setRoom(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.joinRoom(room)}
          className={classes.button}
        >
          Join Room
        </Button>
      </form>
    );
  }

  if (!props.admin) {
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="p" component="p">
          Waiting for game to start...
        </Typography>
      </Paper>
    );
  }

  const { addCharacter, selectPreset, startGame } = props;

  return (
    <React.Fragment>
      <form onSubmit={addCharacter}>
        <input name="name" type="text" placeholder="Character..." />
      </form>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={classes.margin}
        onClick={selectPreset}
        value="Avalon"
      >
        Avalon
      </Button>
      <form onSubmit={startGame}>
        <Button
          size="small"
          color="primary"
          className={classes.margin}
          type="submit"
          value="Start Game"
        >
          Start Game
        </Button>
      </form>
    </React.Fragment>
  );
};

export default withStyles(styles)(Controls);
