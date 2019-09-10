import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import classNames from "classnames";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "80%"
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  margin: {
    margin: theme.spacing.unit
  },
  gameStart: {
    padding: "10px",
    textAlign: "center"
  },
  joinRoom: {
    textAlign: "center",
    padding: "24px"
  },
  button: {
    marginTop: "15px",
    width: "80%"
  }
});

const Controls = props => {
  const { classes } = props;
  const [room, setRoom] = useState(null);

  if (!props.room) {
    return (
      <form className={classes.joinRoom} onSubmit={() => false}>
        <TextField
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
      <Typography className={classes.gameStart} component="p">
        Waiting for game to start...
      </Typography>
    );
  }

  const { addCharacter, selectPreset, startGame } = props;

  return (
    <React.Fragment>
      <form onSubmit={addCharacter}>
        <Input
          className={classes.input}
          name="name"
          placeholder="Character..."
        />
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
          variant="outlined"
          size="large"
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
