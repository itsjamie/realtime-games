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
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const Room = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <List className={classes.root}>
        <ListItem>
          <Avatar>
            <i class="material-icons">lock</i>
          </Avatar>
          <ListItemText primary="Admin" secondary={props.admin.toString()} />
        </ListItem>
        <ListItem>
          <Avatar>
            <i class="material-icons">room</i>
          </Avatar>
          <ListItemText primary="Room" secondary={props.room} />
        </ListItem>
        <ListItem>
          <Avatar>
            <i class="material-icons">play_circle_filled</i>
          </Avatar>
          <ListItemText
            primary="Playing"
            secondary={props.playing.toString()}
          />
        </ListItem>
        <ListItem>
          <Avatar>
            <i class="material-icons">link</i>
          </Avatar>
          <ListItemText
            primary="Connected"
            secondary={props.connected.toString()}
          />
        </ListItem>
        <ListItem>
          <Avatar>
            <i class="material-icons">people</i>
          </Avatar>
          <ListItemText primary="Players" secondary={props.playerCount} />
        </ListItem>
        <ListItem>
          <Avatar>
            <i class="material-icons">mood</i>
          </Avatar>
          <ListItemText primary="Character" secondary={props.character} />
        </ListItem>
        <ListItem>
          <Avatar>
            <i class="material-icons">info</i>
          </Avatar>
          <ListItemText
            primary="Setup Info"
            secondary={JSON.stringify(props.setupInfo, null, 4)}
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default withStyles(styles)(Room);
