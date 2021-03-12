import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ImgWorker from '../assets/img/worker.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icons: {
        width: "300px"
    },
}));

export default function ComingSoon() {
    const classes = useStyles();
    return <Grid container className={classes.root} direction="column" alignItems="center" justify="center" style={{ minHeight: "80vh" }}>
        <Paper className={classes.paper}>
            <img className={classes.icons} src={ImgWorker} />
            <Typography className={classes.title} variant="h4" >Coming Soon</Typography>
        </Paper>
    </Grid>
}