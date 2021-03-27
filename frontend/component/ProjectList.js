import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from "@material-ui/icons/Add";
import SearchHeader from "../component/SearchHeader";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "calc(100% - 40px)",
        maxHeight: "calc(100% - 40px)",
        overflowY: "scroll"
    },
    button: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    icons: {
        fontSize: 30
    },
    iconText: {
        top: "-5px",
        left: "5px",
        fontSize: "16px",
        position: "relative"
    }
}));

export default function ProjectList({ list, onNewClick, onDetailsClick }) {
    const classes = useStyles();
    const [filterText, setfilterText] = useState("");
    const textChanged = (e) => {
        const val = e.target.value || "";
        setfilterText(val);
    };
    return (
       <div>
            <SearchHeader
        textChanged={textChanged}
        buttonClick={onNewClick}
        textLabel={"Search Project"}
        showButton={true}
        buttonIcon={<AddIcon />}
        buttonTooltip={"New Project"}
    />
        <Grid container className={classes.root} spacing={2} style={{ "paddingTop": "20px" }}>
            {
                list.filter((item) => { return item.title.includes(filterText) })
                    .map((item) => {
                        return <Grid key={item._id} item xs={12} md={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <div style={{ width: "100%", textAlign: "left", }}><Typography> {item.title}</Typography></div>
                                    <div style={{ width: "100%", textAlign: "left", fontSize: "12px", paddingTop: "10px" }}><Typography color="textSecondary"> {item.description ? item.description : " "}</Typography></div>
                                    <Grid container className={classes.root} spacing={2} style={{ paddingTop: "20px" }}>
                                        <Grid item xs={4}>{item.active ? <Tooltip title="Project is running"><PlayArrowIcon className={classes.icons} style={{ color: "28A745" }} /></Tooltip> : <Tooltip title="Project is stopped"><PauseIcon className={classes.icons} style={{ color: "DC3545" }} /></Tooltip>}</Grid>
                                        <Grid item xs={4}><Tooltip title="Device Count"><div><RouterOutlinedIcon className={classes.icons} /><span className={classes.iconText}>{item.deviceCount}</span></div></Tooltip></Grid>
                                        <Grid item xs={4}><Tooltip title="Data Count"><div><ListOutlinedIcon className={classes.icons} /><span className={classes.iconText}>{item.dataCount}</span></div></Tooltip></Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="delete" className={classes.margin} style={{ marginLeft: 'auto' }} size="small" onClick={()=>{onDetailsClick(item._id)}}>
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    })
            }
        </Grid>
       </div>
    )
}