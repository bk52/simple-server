import React, { useState, useRef, useEffect } from "react";
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
import Toast from "../component/Snackbar"

import {GetProject, SetProject} from "../state/actions/project";


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

function ModalNewProject({open,onCloseClick, onSaveClick}){
    const classes = useStyles();
    const newProjectRef = useRef();
    const Save=()=>{
        if(newProjectRef.current){
            let title=newProjectRef.current["newproject-title"].value;
            let description=newProjectRef.current["newproject-description"].value;
            onSaveClick({title,description});
        }
    }
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
                <Button onClick={Save} variant="contained" startIcon={<SaveIcon />} color="primary">Save</Button> {" "}
                <Button onClick={onCloseClick} variant="contained" color="secondary" startIcon={<CloseIcon />}>Cancel</Button></div>
        }
    />
    )
}

export default function ProjectsPage() {
    const classes = useStyles();
    const [showNew, setshowNew] = useState(false);
    const [projectList, setProjectList]=useState([]);
    const [details, setDetails]=useState({show:false,_id:""})
    function GetData(){
        GetProject().then((data)=>{if(data.result)setProjectList(data.result)}).catch((error)=>{Toast.error(error)})
    }
    useEffect(() => {GetData()}, []);
    const onDetailsClick=(_id)=>{setDetails({show:true,_id:_id})}
    const onBackClick=()=>{setDetails({show:false,_id:""})}
    const onNewProjectClick=(val)=>{
        SetProject(val)
        .then((result)=>{Toast.success("Project created"); GetData(); setshowNew(false)})
        .catch((error)=>{Toast.error("API Error")})
    }
    return (
        <div>
            <Paper className={classes.paper}>
                 {details.show 
                 ? <ProjectDetails projectId={details._id} onBackClick={onBackClick}/> 
                 : <div><ProjectList list={projectList} onDetailsClick={onDetailsClick} onNewClick={(e) => { setshowNew(true) }} />
                 <ModalNewProject open={showNew} onSaveClick={onNewProjectClick} onCloseClick={(e) => { setshowNew(false) }}/></div>
                 }
            </Paper>

        </div>
    )
}


