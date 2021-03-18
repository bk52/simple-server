import React, { useState, useMemo, useRef, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {DateCell, LogType} from "./CustomCell";
import SearchHeader from "./SearchHeader";
import Table from "./SimpleTable";

export default function LogsTable({ tableData }) {
    const tableInstance = useRef(null);

    const [filterText, setfilterText] = useState("");

    useEffect(() => {
        if (tableInstance && tableInstance.current) {
            tableInstance.current.setGlobalFilter(filterText);
        }
    }, [filterText]);

    const textChanged = (e) => {
        const val = e.target.value || "";
        setfilterText(val);
    };

    const columns = useMemo(
        () => [
            // {
            //     Header: '',
            //     accessor: '_id',
            //     Cell: (props) => {
            //         return (
            //             <div style={{ display: "inline-flex", width: "80px" }}>
            //                 <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); Edit(props.value) }}><EditIcon /></IconButton>
            //                 <IconButton size="small" aria-label="delete" onClick={(e) => { e.stopPropagation(); Delete(props.value) }}><DeleteIcon /></IconButton>
            //                 <IconButton size="small" aria-label="edit" onClick={(e) => { e.stopPropagation(); Watch(props.value) }}><VisibilityOutlinedIcon /></IconButton>
            //             </div>)
            //     },
            //     disableSortBy: true,
            //     width: 30,
            //     Aggregated: ({ value }) => <div></div>,
            // },
            {
                Header: 'Project Name',
                accessor: 'projectName',
            },
            {
                Header: 'Type',
                accessor: 'logType',
                Cell: LogType,
                width: 40
            },
            {
                Header: 'Message',
                accessor: 'message',
                disableSortBy: true,
                width: 400
            },
            {
                Header: 'Module',
                accessor: 'module',
                disableSortBy: true,
            },
            {
                Header: 'Created Date',
                accessor: 'createdDate',
                Cell: DateCell,
            },
        ],
        []
    )
    return (
        <div>
            <CssBaseline />
            <SearchHeader
                textChanged={textChanged}
                buttonClick={null}
                textLabel={"Search Log"}
                showButton={false}
                buttonIcon={null}
                buttonTooltip={null}
            />
            <Table columns={columns} data={tableData} ref={tableInstance} />
        </div>
    )
}