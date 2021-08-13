import React, { useMemo } from "react";
import "./BasicTable.scss";
import Mock_data from "./MOCK_DATA.json";
import GlobalFilter from "./GlobalFilter";
import Checkbox from "./Checkbox";
import { Button } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useColumnOrder,
  useFilters,
} from "react-table";
import { sticky } from "react-table-sticky";
import ColumnFilter from "./ColumnFilter";

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_data, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  //useTable hooks is the inbuilt hook will get from react-table third party library to build basic table structure

  //useSortBy hook is react-table hook passed as a second argument to useTable function to get toggling functionality in table header
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useColumnOrder
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
    setPageSize,
    rows,
    // footerGroups,
    state,
    setGlobalFilter,
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;

  const { globalFlter, pageIndex, pageSize } = state;
  // console.log(globalFlter);

  const firstPageRows = rows.slice(0, 10);

  // This functionality is for changing the order of the columns
  const changeOrder = () => {
    setColumnOrder(["id", "first_name", "last_name", "age", "email"]);
  };

  console.log(pageSize);
  return (
    <>
      <div>
        <button onClick={changeOrder}>Change column order</button>
      </div>
      <GlobalFilter filter={globalFlter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    //getSortByToggleProps method is used for Toggling according to the ascending or decending order
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ExpandMore />
                          ) : (
                            <ExpandLess />
                          )
                        ) : (
                          ""
                        )}
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
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
      <div style={{ textAlign: "center" }}>
        <span>
          page {pageIndex + 1} of {pageOptions.length}{" "}
        </span>
        <span>
          Go to page :{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              let pageNumber = e.target.value ? e.target.value - 1 : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>{'  '}
        <select value={pageSize} onChange={(e) =>setPageSize(Number(e.target.value))}>
         {
           [10,15,20].map((pageSize) =>{
             return(
             <option id={pageSize} value={pageSize}>
               show {pageSize}
             </option>
             )
           })
         }
        </select>{'  '}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()} />
        Toggle All
      </div>
      {allColumns.map((column) => {
        return (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />
              {column.Header}
            </label>
          </div>
        );
      })}
    </>
  );
};
export default BasicTable;
