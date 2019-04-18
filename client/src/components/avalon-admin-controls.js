import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

const AvalonAdminControls = props => {
  if (!props.admin) {
    return null;
  }

  const { classes } = props;

  const characters = [
    "Merlin",
    "Morgana",
    "Percival",
    "Mordred",
    "Oberon",
    "Assassin",
    "Loyal Servant"
  ];

  return (
    <React.Fragment>
      {characters.map(character => (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.margin}
          onClick={() => props.addCharacter(character)}
        >
          {character}
        </Button>
      ))}
    </React.Fragment>
  );
};

export default withStyles(styles)(AvalonAdminControls);
