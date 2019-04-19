import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  players: {
    color: "#fff",
    marginLeft: "10px"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "#fff"
  }
};

function TopBar(props) {
  const { classes } = props;

  const [anchorEl, setanchorEl] = useState(null);
  const handleClick = event => {
    setanchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setanchorEl(null);
  };

  const handleBabyClick = () => {
    props.toggleShowBaby();
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={handleClick}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Avatar>
                <i class="material-icons">lock</i>
              </Avatar>
              <ListItemText
                primary="Admin"
                secondary={props.admin.toString()}
              />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Avatar>
                <i class="material-icons">link</i>
              </Avatar>
              <ListItemText
                primary="Connected"
                secondary={props.connected.toString()}
              />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Avatar>
                <i class="material-icons">info</i>
              </Avatar>
              <ListItemText
                primary="Setup Info"
                secondary={JSON.stringify(props.setupInfo, null, 4)}
              />
            </MenuItem>
            <MenuItem onClick={() => handleBabyClick()}>
              {props.showBaby ? "Hide Baby" : "Show Baby"}
            </MenuItem>
          </Menu>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Realtime Games
          </Typography>

          {props.room && <i class="material-icons">people</i>}
          {props.room && (
            <Typography
              variant="h6"
              color="inherit"
              className={classes.players}
            >
              {props.playerCount}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      {props.room && (
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Room: {props.room}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default withStyles(styles)(TopBar);
