import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  roles: {
    textAlign: "center"
  }
});

const Room = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      {props.room && (
        <List className={classes.root}>
          <ListItem>
            {props.character === "Merlin" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/merlin.png" />
              </ListItemAvatar>
            )}
            {props.character === "Percival" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/percival.jpg" />
              </ListItemAvatar>
            )}
            {props.character === "Morgana" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/morgana.jpeg" />
              </ListItemAvatar>
            )}
            {props.character === "Mordred" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/mordred.jpg" />
              </ListItemAvatar>
            )}
            {props.character === "Oberon" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/oberon.jpeg" />
              </ListItemAvatar>
            )}
            {props.character === "Loyal Servant" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/loyal.jpeg" />
              </ListItemAvatar>
            )}
            {props.character === "Assassin" && (
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/images/assassin.jpeg" />
              </ListItemAvatar>
            )}
            {props.character && (
              <ListItemText primary="Character" secondary={props.character} />
            )}
          </ListItem>
        </List>
      )}
      {props.room &&
        props.setupInfo &&
        props.setupInfo.characters &&
        props.setupInfo.characters.length !== 0 && (
          <div className={classes.roles}>
            <Typography variant="h7">Roles In Game:</Typography>
            <List>
              {props.setupInfo &&
                props.setupInfo.characters &&
                props.setupInfo.characters.map(name => {
                  return <ListItem>{name}</ListItem>;
                })}
            </List>
          </div>
        )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Room);
