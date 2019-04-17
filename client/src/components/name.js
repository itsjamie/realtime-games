import React from "react";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

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

const Name = props => {
  const { classes } = props;
  const setName = e => {
    e.preventDefault();
    window.localStorage.setItem("name", e.target.name.value);
    props.onNameSet(e.target.name.value);
  };

  if (!props.name) {
    return (
      <form onSubmit={setName}>
        <TextField
          id="standard-dense"
          label="Enter your name:"
          name="name"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
        />
      </form>
    );
  }

  return null;
};

export default withStyles(styles)(Name);
