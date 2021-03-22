import React, { useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux"
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from "./SimpleTable";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import {DateCell, DeviceType} from "./CustomCell";
import formatDate from "../common/formatDate";


export default function DeviceTable({ filterText, tableData }) {
  const tableInstance = useRef(null);
  const dispatch = useDispatch();

  const EditItem = (value) => {}

  useEffect(() => {
    if (tableInstance && tableInstance.current) {
      tableInstance.current.setGlobalFilter(filterText);
    }
  }, [filterText]);


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
      },
      // {
      //   Header: '',
      //   accessor: '_id',
      //   Cell: (props) => {
      //     return (
      //       <div style={{ display: "inline-flex", width:"30px"}}>
      //         <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); EditItem(props.value) }}><VisibilityOutlinedIcon /></IconButton>
      //       </div>)
      //   },
      //   disableSortBy: true,
      //   width:30,
      //   Aggregated: ({ value }) =><div></div>,
      // },
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