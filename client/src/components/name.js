import React from "react";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";

const styles = theme => ({
  button: {
    marginTop: "15px",
    width: "70%"
  },
  form: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column",
    padding: "24px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "70%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const Name = props => {
  const { classes } = props;
  const setName = ({ target }) => {
    const name = target.parentElement.previousElementSibling.querySelector(
      "input"
    ).value;

    window.localStorage.setItem("name", name);
    props.onNameSet(name);
  };

  if (!props.name) {
    return (
      <form className={classNames(classes.form)} onSubmit={() => false}>
        <TextField
          id="standard-dense"
          label="Enter your name:"
          name="name"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={setName}
          className={classes.button}
        >
          Enter Name
        </Button>
      </form>
    );
  }

  return null;
};

export default withStyles(styles)(Name);
