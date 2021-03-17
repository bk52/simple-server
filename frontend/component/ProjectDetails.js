import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from "./SimpleTable";
import Tabs from "./Tabs";
import formatDate from "../common/formatDate";
import SearchHeader from "../component/SearchHeader";

import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddIcon from "@material-ui/icons/Add";
import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import { _devicesList } from "../common/testData";

const useStyles = makeStyles({});

function DateCell({ value }) {
    let dt = formatDate(value);
    return <div>
        <div>{dt[0]}</div>
        <div>{dt[1]}</div>
    </div>
}

function DeviceType({ value }) {
    let deviceIcon = "";
    if (value == 1) { deviceIcon = <RouterOutlinedIcon /> }
    else if (value == 2) { deviceIcon = <DevicesOtherOutlinedIcon /> }
    else { deviceIcon = <HelpOutlineOutlinedIcon /> }
    return deviceIcon;
}

const ProjectDevices = ({ tableData }) => {
    const tableInstance = useRef(null);
    // const confirm = useConfirm();
    const dispatch = useDispatch();
    const [filterText, setfilterText] = useState("");
    const EditItem = (value) => { }

    useEffect(() => {
        if (tableInstance && tableInstance.current) {
            tableInstance.current.setGlobalFilter(filterText);
        }
    }, [filterText]);

    const textChanged = (e) => {
        const val = e.target.value || "";
        setfilterText(val);
    };

    const addNew = () => { }

    const columns = useMemo(
        () => [
            {
                Header: 'Device Name',
                accessor: 'deviceName',
            },
            {
                Header: 'Device ID',
                accessor: 'deviceId',
            },
            {
                Header: 'Ip',
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
            {
                Header: '',
                accessor: '_id',
                Cell: (props) => {
                    return (
                        <div style={{ display: "inline-flex", width: "30px" }}>
                            <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); EditItem(props.value) }}><VisibilityOutlinedIcon /></IconButton>
                        </div>)
                },
                disableSortBy: true,
                width: 30,
                Aggregated: ({ value }) => <div></div>,
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
        </div>
    )
}

const ProjectInfo = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField value={""} label="Title" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField value={""} label="Description" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField value={""} label="API Key" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField disabled value={""} label="Created Date" fullWidth />
            </Grid>
        </Grid>
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
        icon: <HelpOutlineOutlinedIcon />,
        component: <ProjectInfo/>
    },
];


export default function ProjectDetails() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Header projectName={"Project Name"} />
            <Tabs tabList={tabList}></Tabs>
        </div>
    );
}




