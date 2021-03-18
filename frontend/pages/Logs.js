import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import LogsTable from "../component/LogsTable";
import { _logData } from "../common/testData";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "calc(100% - 40px)",
        maxHeight: "calc(100% - 40px)",
        overflowY: "scroll"
    }
}));

export default function LogsPage() {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
                <LogsTable tableData={_logData}></LogsTable>
            </Paper>
        </div >
    );
}