import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchHeader from "../component/SearchHeader";
import AddIcon from "@material-ui/icons/Add";
import DeviceTable from "../component/DeviceTable";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import {_devicesList} from "../common/testData";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "calc(100% - 40px)"
    },
  }));

export default function DevicesPage() {
    //const customerState = useSelector((state) => state.customer);
    //const dispatch = useDispatch();
    const classes = useStyles();
    const [filterText, setfilterText] = useState("");
    const [apiData, setData] = useState([]);

    useEffect(() => {fillTable();}, []);
    //useEffect(() => {if(customerState.reloadTable){fillTable();}}, [customerState.reloadTable]);
    const fillTable=()=>{
        setData(_devicesList)
    }
    const addNew = () => {}

    const textChanged = (e) => {
        const val = e.target.value || "";
        setfilterText(val);
    };

    return (
        <div>
            <Paper className={classes.paper}>
                {false ? (
                    <LinearProgress />
                ) : (
                    <div>
                        <SearchHeader
                            textChanged={textChanged}
                            buttonClick={addNew}
                            textLabel={"Search Device"}
                            showButton={false}
                            buttonIcon={<AddIcon />}
                            buttonTooltip={"New Device"}
                        />
                        <DeviceTable filterText={filterText} tableData={apiData} />
                    </div>
                )}
            </Paper>
        </div>
    );
}