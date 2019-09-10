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
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={classes.margin}
        onClick={() => props.startWithAutoRoles() }
        disabled={props.playerCount < 5 || props.playerCount > 10}
      >
        {`Auto Roles x ${props.playerCount}`}
      </Button>
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
