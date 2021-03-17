import React, { useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

import ProjectList from "../component/ProjectList";
import ProjectDetails from "../component/ProjectDetails";
import Modal from "../component/Modal";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const _projectList = [
    { id: 1, title: "Project-1", description: "Desp-1", active: true, deviceCount: 10, dataCount: 1500, createdDate: "2019-03-10T23:44:56.289Z" },
    { id: 2, title: "Project-2", description: "Desp-2", active: true, deviceCount: 5, dataCount: 150000, createdDate: "2019-03-10T23:44:56.289Z" },
    { id: 3, title: "Project-3", description: "Desp-3", active: false, deviceCount: 89, dataCount: 20489065, createdDate: "2019-03-10T23:44:56.289Z" },
    { id: 4, title: "Project-4", description: "Desp-4", active: true, deviceCount: 156, dataCount: 120750750, createdDate: "2019-03-10T23:44:56.289Z" },
    { id: 5, title: "Project-5", description: "Desp-5", active: false, deviceCount: 14, dataCount: 40450, createdDate: "2019-03-10T23:44:56.289Z" },
    { id: 6, title: "Project-6", description: "Desp-6", active: true, deviceCount: 23, dataCount: 450450, createdDate: "2019-03-10T23:44:56.289Z" },
]

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "calc(100% - 40px)",
        maxHeight: "calc(100% - 40px)",
        overflowY: "scroll"
    },
    formElement: {
        width: "100%",
      },
}));

function ModalNewProject({open,onCloseClick}){
    const classes = useStyles();
    const newProjectRef = useRef();
    return(
        <Modal open={open}
        title={<Typography>New Project</Typography>}
        content={
            <form ref={newProjectRef} onSubmit={(e) => { }}>
                <TextField
                    id="newproject-title"
                    className={classes.formElement}
                    label="Title"
                    variant="outlined"
                />
                 <TextField style={{marginTop: "10px"}}
                    id="newproject-description"
                    className={classes.formElement}
                    label="Description"
                    variant="outlined"
                />
            </form>
        }
        action={
            <div>
                <Button onClick={null} variant="contained" startIcon={<SaveIcon />} color="primary">Save</Button> {" "}
                <Button onClick={onCloseClick} variant="contained" color="secondary" startIcon={<CloseIcon />}>Cancel</Button></div>
        }
    />
    )
}


export default function ProjectsPage() {
    //const userState = useSelector(state => state.auth);
    const classes = useStyles();
    const [showNew, setshowNew] = useState(false);

    return (
        <div>
            <Paper className={classes.paper}>
                {/* <ProjectList list={_projectList} onNewClick={(e) => { setshowNew(true) }} />
                <ModalNewProject open={showNew} onCloseClick={(e) => { setshowNew(false) }}/> */}
                <ProjectDetails/>
            </Paper>

        </div>
    )
}


