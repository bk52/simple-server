import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchHeader from "../component/SearchHeader";
import AddIcon from "@material-ui/icons/Add";
import DeviceTable from "../component/DeviceTable";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
// import CustomerDialog from "../components/CustomerDialog";

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

  const _devicesList=[{
      _id:"1",
      deviceName:"Test Device 1",
      deviceId:"AE10DAE",
      ip:"127.0.0.1",
      projectName:"Test Project",
      deviceType:1,
      lastActive:"2019-03-10T23:44:56.289Z"
  },
  {
    _id:"2",
    deviceName:"Test Device 2",
    deviceId:"AE10DAB",
    ip:"127.0.0.2",
    projectName:"Test Project",
    deviceType:2,
    lastActive:"2019-03-10T23:44:56.289Z"
},
{
    _id:"2",
    deviceName:"Test Device 10",
    deviceId:"AE10DAC",
    ip:"127.0.0.2",
    projectName:"Log Project",
    deviceType:1,
    lastActive:"2019-03-10T23:44:56.289Z"
},]

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
                            buttonIcon={<AddIcon />}
                            buttonTooltip={"New Device"}
                        />
                        <DeviceTable filterText={filterText} tableData={apiData} />
                        {/* <CustomerDialog open={customerState.openModal} loading={customerState.customerFormLoading}></CustomerDialog> */}
                    </div>
                )}
            </Paper>
        </div>
    );
}