import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { MenuItem, TextField, Button } from "@material-ui/core/";
import classNames from "classnames";

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
  if (props.playing) {
    const listGameInfo = props.gameInfo.map(item => <li>{item}</li>);
    return (
      <div>
        <p>Your character is: {props.character}</p>
        <p>You See:</p>
        <ul>{listGameInfo}</ul>
      </div>
    );
  }

  if (!props.room) {
    return (
      <form onSubmit={props.joinRoom}>
        <TextField
          id="standard-dense"
          label="Enter room name:"
          name="room"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
        />
      </form>
    );
  }

  if (!props.admin) {
    return <div>Waiting for game to start...</div>;
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
