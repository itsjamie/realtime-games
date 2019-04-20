import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
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
                <Avatar alt="Remy Sharp" src="/images/merlin.webp" />
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

          {props.admin && (
            <ListItem>
              <Avatar>
                <i class="material-icons">info</i>
              </Avatar>
              <ListItemText primary="Setup Info" />
              {JSON.stringify(props.setupInfo, null, 4)}
            </ListItem>
          )}
        </List>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Room);
