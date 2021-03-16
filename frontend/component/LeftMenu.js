import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import CardTravelOutlinedIcon from '@material-ui/icons/CardTravelOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const drawerWidth = 200;
const drawerTop = 64;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: drawerTop,
    zIndex: 0,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
}));

const MenuItems = [
  { key: 1, icon: <HomeOutlinedIcon />, title: "Home", url: "/home" },
  { key: 2, icon: <RouterOutlinedIcon/>, title: "Devices", url: "/devices" },
  { key: 3, icon: <DnsOutlinedIcon/>, title: "Server", url: "/coming" },
  { key: 4, icon: <StorageOutlinedIcon/>, title: "Database", url: "/coming" },
  { key: 5, icon: <CardTravelOutlinedIcon/>, title: "Projects", url: "/projects" },
  { key: 6, icon: <ListOutlinedIcon/>, title: "Logs", url: "/coming" },
  { key: 7, icon: <InfoOutlinedIcon/>, title: "About", url: "/coming" },
];

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.menuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {MenuItems.map((item) => (
            <ListItem key={item.key} button component={Link} to={item.url}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}