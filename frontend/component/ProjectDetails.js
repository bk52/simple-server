import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from "./SimpleTable";
import Tabs from "./Tabs";

import SearchHeader from "./SearchHeader";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useConfirm } from "material-ui-confirm";
import Toast from "./Snackbar";
import Modal from "./Modal";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { DateCell, DeviceType, DeviceActive } from "./CustomCell";
import { _devicesList } from "../common/testData";

const useStyles = makeStyles((theme) => ({
    formElement: {
        width: "100%",
    },
}));


const ProjectDeviceDetails = ({ open, onModalClose, onModalSave, _id }) => {
    const newDeviceRef = useRef();
    const classes = useStyles();
    const [deviceType, setdeviceType] = React.useState(99);

    const handleChange = (event) => {
        setdeviceType(event.target.value);
    };

    return (
        <Modal open={open}
            title={<Typography>{_id && id !== "" ? "Edit Device" : "New Device"}</Typography>}
            content={
                <form ref={newDeviceRef} onSubmit={(e) => { }}>
                    <Grid container spacing={1}>
                        <Grid xs={12} md={6} item>
                            <TextField id="deviceName" className={classes.formElement} label="Device Name" />
                        </Grid>
                        <Grid xs={12} md={6} item>
                            <TextField id="deviceId" className={classes.formElement} label="Device ID" />
                        </Grid>
                        <Grid xs={12} md={6} item>
                            <FormControl className={classes.formElement}>
                                <InputLabel id="demo-simple-select-label">Device Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="deviceType"
                                    value={deviceType}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}><RouterOutlinedIcon /></MenuItem>
                                    <MenuItem value={2}><DevicesOtherOutlinedIcon /></MenuItem>
                                    <MenuItem value={99}><HelpOutlineOutlinedIcon /></MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {_id && id !== "" ?
                            <Grid xs={12} md={6} item>
                                <TextField id="createdDate" className={classes.formElement} label="Created Date" disabled />
                            </Grid>
                            :
                            null}
                    </Grid>
                </form>
            }
            action={
                <div>
                    <Button onClick={onModalSave} variant="contained" startIcon={<SaveIcon />} color="primary">Save</Button> {" "}
                    <Button onClick={onModalClose} variant="contained" color="secondary" startIcon={<CloseIcon />}>Cancel</Button></div>
            }
        />
    )
}

const ProjectDevices = ({ tableData }) => {
    const tableInstance = useRef(null);
    const confirm = useConfirm();
    const dispatch = useDispatch();
    const [filterText, setfilterText] = useState("");
    const [newModal, setnewModal] = useState(false);
    const EditItem = (value) => { }

    useEffect(() => {
        if (tableInstance && tableInstance.current) {
            tableInstance.current.setGlobalFilter(filterText);
        }
        Toast.success("OK");
    }, [filterText]);

    const Edit = (_id) => { }
    const Delete = (_id) => {
        confirm({ title: "Delete Device", description: "Are you sure you want to delete this device?" })
            .then(() => { })
            .catch(() => { });
    }
    const Watch = (_id) => { }

    const textChanged = (e) => {
        const val = e.target.value || "";
        setfilterText(val);
    };

    const addNew = () => { setnewModal(true) }

    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: '_id',
                Cell: (props) => {
                    return (
                        <div style={{ display: "inline-flex", width: "80px" }}>
                            <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); Edit(props.value) }}><EditIcon /></IconButton>
                            <IconButton size="small" aria-label="delete" onClick={(e) => { e.stopPropagation(); Delete(props.value) }}><DeleteIcon /></IconButton>
                            <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); Watch(props.value) }}><VisibilityOffOutlinedIcon /></IconButton>
                        </div>)
                },
                disableSortBy: true,
                width: 30,
                Aggregated: ({ value }) => <div></div>,
            },
            {
                Header: 'Device Name',
                accessor: 'deviceName',
            },
            {
                Header: 'Device ID',
                accessor: 'deviceId',
            },
            {
                Header: 'Active',
                accessor: 'active',
                width: 50,
                Cell: DeviceActive,
            },
            {
                Header: 'Last Ip',
                accessor: 'ip',
            },
            {
                Header: 'Type',
                accessor: 'deviceType',
                disableSortBy: true,
                Cell: DeviceType,
            },
            {
                Header: 'Last Active',
                accessor: 'lastActive',
                disableSortBy: true,
                Cell: DateCell,
            },
            {
                Header: 'Last Data',
                accessor: 'lastData',
                disableSortBy: true,
                width: 400
            },
        ],
        []
    )
    return (
        <div>
            <CssBaseline />
            <SearchHeader
                textChanged={textChanged}
                buttonClick={addNew}
                textLabel={"Search Device"}
                showButton={true}
                buttonIcon={<AddIcon />}
                buttonTooltip={"New Device"}
            />
            <Table columns={columns} data={tableData} ref={tableInstance} />
            <ProjectDeviceDetails open={newModal} onModalClose={(e) => { setnewModal(false) }} onModalSave={null} />
        </div>
    )
}

const ProjectInfo = () => {
    const settingsRef = useRef();
    const [securityType, setsecurityType] = useState(10);
    const [formVal, setformVal] = useState({});

    function handleInputChange(e) {
        const { name, value } = e.target;
        if (name === "cityID") {
            GetTowns(value);
        }

        setformVal((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function onSettingsSave(){
        console.log(formVal)
    }

    return (
        <form ref={settingsRef}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField id="title" name="title" value={formVal.title} label="Title" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="description" name="description" value={formVal.description} label="Description" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="apiKey" name="apiKey" value={formVal.apiKey} label="API Key" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Security</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="securityType"
                            name="securityType"
                            value={formVal.securityType}
                            onChange={handleInputChange}
                        >
                            <MenuItem value={10}>API Key</MenuItem>
                            <MenuItem value={20}>API Key + Device ID</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField disabled value={""} label="Created Date" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={onSettingsSave} variant="contained" startIcon={<SaveIcon />} color="primary" fullWidth>Save</Button>
                </Grid>
            </Grid>
        </form>
    )
}

const Header = ({ projectName }) => {
    return (<Grid container spacing={1}>
        <Grid style={{ padding: "0px", paddingBottom: "4px" }} item xs={12}>
            <Paper style={{ padding: "8px" }}>
                <Grid container>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                        <Fab
                            size="small"
                            color="primary"
                            aria-label="add"
                            onClick={null}
                            style={{ paddingLeft: "8px" }}
                        >
                            <ArrowBackIosIcon />
                        </Fab>
                    </Grid>
                    <Grid item xs={11} style={{ textAlign: "left", paddingTop: "4px" }}>
                        <Typography color="textSecondary" variant="h5" gutterBottom>{projectName}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>)
}

const tabList = [
    {
        index: 0,
        title: "Devices",
        icon: <RouterOutlinedIcon />,
        component: <ProjectDevices tableData={_devicesList} />
    },
    {
        index: 1,
        title: "Info",
        icon: <InfoOutlinedIcon />,
        component: <ProjectInfo />
    },
];


export default function ProjectDetails() {
    return (
        <div>
            <Header projectName={"Project Name"} />
            <Tabs tabList={tabList}></Tabs>
        </div>
    );
}




