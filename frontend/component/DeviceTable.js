import React, { useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux"
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from "./SimpleTable";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';

import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import formatDate from "../common/formatDate";
// import { useConfirm } from 'material-ui-confirm';
// import {types} from "../redux/constants/action-types";

// function InfoCell({ value }) {
//   return <div>
//     <div>{value.name ? value.name : ""}</div>
//     <div style={{fontSize:"12px", color:"grey"}}>{value.deviceId ? value.deviceId : ""}</div>
//   </div>
// }

function DateCell({value}){
  let dt=formatDate(value);
  return <div>
    <div>{dt[0]}</div>
    <div>{dt[1]}</div>
  </div>
}

function DeviceType({value}){
  let deviceIcon="";
  if(value==1){deviceIcon=<RouterOutlinedIcon/>}
  else if(value==2){deviceIcon=<DevicesOtherOutlinedIcon/>}
  else {deviceIcon=<HelpOutlineOutlinedIcon/>}
  return deviceIcon;
}

export default function DeviceTable({ filterText, tableData }) {
  const tableInstance = useRef(null);
  // const confirm = useConfirm();
  const dispatch = useDispatch();

  const EditItem = (value) => {}

  const DeleteItem = (value) => {}

  useEffect(() => {
    if (tableInstance && tableInstance.current) {
      tableInstance.current.setGlobalFilter(filterText);
    }
  }, [filterText]);


  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: '_id',
        Cell: (props) => {
          return (
            <div style={{ display: "inline-flex", width:"30px"}}>
              <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); EditItem(props.value) }}><EditIcon /></IconButton>
              <IconButton size="small" aria-label="delete" onClick={(e) => { e.stopPropagation(); DeleteItem(props.value) }}><DeleteIcon /></IconButton>
            </div>)
        },
        disableSortBy: true,
        width:30,
        Aggregated: ({ value }) =><div></div>,
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
        Header: 'Ip',
        accessor: 'ip',
      },
      {
        Header: 'Project Name',
        accessor: 'projectName',
        disableSortBy: true,
        width:100,
      },
      {
        Header: 'Type',
        accessor: 'deviceType',
        disableSortBy: true,
        Cell:DeviceType,
        Aggregated: ({ value }) =><div></div>,
      },
      {
        Header: 'Last Active',
        accessor: 'lastActive',
        disableSortBy: true,
        Cell: DateCell,
      }
    ],
    []
  )
  // const data = React.useMemo(() => [tableData], [])
  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={tableData} ref={tableInstance} groupField="projectName"/>
    </div>
  )
}