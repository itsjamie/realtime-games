import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import dancingBaby from "../assets/gif/dancing-baby.gif";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  babyImgContainer: {
    margin: "0 auto"
  }
});

const Baby = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.babyImgContainer}>
        {props.showBaby ? <img src={dancingBaby} alt="Dancing Baby" /> : null}
      </div>
    </div>
  );
};

export default withStyles(styles)(Baby);
