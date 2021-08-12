import React, { useMemo } from "react";
import "./BasicTable.scss";
import Mock_data from "./MOCK_DATA.json";
import GlobalFilter from "./GlobalFilter";
import { Button } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import { useTable, useSortBy, useGlobalFilter,usePagination } from "react-table";
import { useState } from "react";

const BasicTable = () => {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_data, []);


  //useTable hooks is the inbuilt hook will get from react-table third party library to build basic table structure

  //useSortBy hook is react-table hook passed as a second argument to useTable function to get toggling functionality in table header
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    rows,
    // footerGroups,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFlter,pageIndex,pageSize } = state
  console.log(globalFlter)

  const firstPageRows = rows.slice(0,10)
  
console.log(pageSize)
  return (
    <>
    <GlobalFilter globalFilter={globalFlter} setFilter={setGlobalFilter}/>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  //getSortByToggleProps method is used for Toggling according to the ascending or decending order
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? <ExpandMore /> : <ExpandLess />) : ''}
                    </span>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      {/* <tfoot>
        {footerGroups.map((footerGroup) => {
          return (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => {
                return (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tfoot> */}
    </table>
    <div style={{textAlign:"center"}}>
      <span>
        page{' '}
        {pageIndex + 1} of {pageOptions.length}
        {' '}
      </span>
      <span>
        
        
        Go to page :{' '}
        <input type="number" defaultValue={pageIndex +1}
        onChange = {(e) =>{
          let pageNumber = e.target.value ? (e.target.value) - 1 : 0
          gotoPage(pageNumber)
        }}
        />
      </span>
      <button onClick={() =>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button onClick={() =>previousPage()} disabled = {!canPreviousPage}>Previous</button>
      <button onClick={() =>nextPage()} disabled = {!canNextPage}>next</button>
      <button onClick={() =>gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
    </div>
    </>
  );
};
export default BasicTable;
