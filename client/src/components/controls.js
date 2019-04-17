import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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

  return (
    <React.Fragment>
      <form onSubmit={props.addCharacter}>
        <input name="name" type="text" placeholder="Character..." />
      </form>
      <button onClick={props.selectPreset} value="Avalon">
        Avalon
      </button>
      <form onSubmit={props.startGame}>
        <input type="submit" value="Start Game" />
      </form>
    </React.Fragment>
  );
};

export default withStyles(styles)(Controls);
