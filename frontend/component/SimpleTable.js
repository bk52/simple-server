import React, { useImperativeHandle, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './SimpleTablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination, useGroupBy, useExpanded } from "react-table";
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",//theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: "bold"
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        //minWidth: 700,
    },
    container: {
        maxHeight: "calc(100% - 120px)",
    },
});

const Table = React.forwardRef(({ columns, data, groupField }, ref) => {
    const classes = useStyles();
    const instance = useTable(
        {
            columns,
            data,
        }, 
        useGlobalFilter,    
        useGroupBy,
        useSortBy,   
        useExpanded,
        usePagination,
    );

    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        setGroupBy,
        // preGlobalFilteredRows,
        // setGlobalFilter,
        state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    } = instance;


    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
        setGroupBy("projectName")
    }

    useImperativeHandle(ref, () => instance);
    useEffect(() => {
        if (groupField && groupField !== "") {
            setGroupBy([groupField]);
        }
    }, [data]);

    return (
        <div>
            <TableContainer className={classes.container}>
                <MaUTable {...getTableProps()} className={classes.table} stickyHeader>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <StyledTableCell  {...column.getHeaderProps(column.getSortByToggleProps())} style={{width:column.width}}>
                                        {column.render("Header")}
                                        {column.id !== 'selection' ? (
                                            <TableSortLabel
                                                active={column.isSorted}
                                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                                            />
                                        ) : null}
                                    </StyledTableCell >
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell {...cell.getCellProps()} style={{width:cell.column.width}}>
                                                {
                                                    cell.isGrouped ? (   
                                                         <div style={{display:"inline-flex"}}>
                                                            <span  {...row.getToggleRowExpandedProps()}>
                                                                {row.isExpanded ? <ExpandMoreOutlinedIcon/> :<ChevronRightOutlinedIcon/>}
                                                            </span>{' '}
                                                           {cell.render('Cell')} ({row.subRows.length})</div>
                                                    ) : cell.isAggregated ? (
                                                        cell.render('Aggregated')
                                                    ) : cell.isPlaceholder ? null : ( 
                                                        cell.render('Cell')
                                                    )
                                                }
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: 'All', value: data.length },
                                ]}
                                colSpan={3}
                                count={data.length}
                                labelRowsPerPage="Rows per page "
                                rowsPerPage={pageSize}
                                page={pageIndex}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </MaUTable>

            </TableContainer>
        </div>
    );
})


export default Table