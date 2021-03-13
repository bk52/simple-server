import React from 'react';
import Login from "./Login";
import { useSelector } from "react-redux";
import isLogin from "../common/isLogin";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import ImgDevices from '../assets/img/router.png';
import ImgServer from '../assets/img/server.png';
import ImgDatabase from '../assets/img/database.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "500px"
  },
  icons: {
    width: "120px"
  },
  title: {
    paddingTop: "20px"
  },
  info: {
    paddingTop: "20px"
  },
  list: {
    paddingTop: "20px",
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

let _stats = {
  activeDeviceCount: 10,
  serverIp: "192.168.1.1",
  serverWorkTime: "23h40m",
  serverRemainingTime: "500h36m",
  dbConnected: true,
  dbTotalSize: "125MB"
}

export default function ServerApp() {
  const classes = useStyles();
  return  <div>
    <Grid container className={classes.root} direction="column" alignItems="center" justify="center" style={{ minHeight: "80vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img className={classes.icons} src={ImgDevices} />
            <Typography className={classes.title} variant="h4" >Active Devices</Typography>
            <Typography className={classes.info} variant="h1">{_stats.activeDeviceCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img className={classes.icons} src={ImgServer} />
            <Typography className={classes.title} variant="h4" >Server Status</Typography>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary="Ip" secondary={_stats.serverIp} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Work Time" secondary={_stats.serverWorkTime} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Remaining Time" secondary={_stats.serverRemainingTime} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img className={classes.icons} src={ImgDatabase} />
            <Typography className={classes.title} variant="h4" >Database Status</Typography>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary="Connected" secondary={_stats.dbConnected ? <CheckIcon/> : <CloseIcon/>} />
              </ListItem>
              {
                _stats.dbConnected ? <ListItem>
                  <ListItemText primary="Total Size" secondary={_stats.dbTotalSize} />
                </ListItem> : null
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </div>
}