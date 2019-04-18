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
  const [showBaby, setShowBaby] = useState(false);
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={classes.margin}
        onClick={() => setShowBaby(!showBaby)}
      >
        {showBaby ? "Hide Baby" : "Show Baby"}
      </Button>
      <div className={classes.babyImgContainer}>
        {showBaby ? <img src={dancingBaby} alt="Dancing Baby" /> : null}
      </div>
    </div>
  );
};

export default withStyles(styles)(Baby);
