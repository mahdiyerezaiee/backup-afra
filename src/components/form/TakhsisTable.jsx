import React, { Fragment, useEffect, useState } from 'react'
import { useTable, useFilters ,  useGlobalFilter, useAsyncDebounce } from 'react-table';



const TakhsisTable = ({ columns, data }) => {




    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,

        },
        useFilters, // useFilters!
        useGlobalFilter // useGlobalFilter!
    )

    return (
        <Fragment>

            {/*<GlobalFilter filter={globalfilter} setFilter={setGlobalFilter} />*/}

            <div className="table-responsive p-2 "
                style={{ overflowX: 'auto' }}
            >

                <table className='table m-1 table-striped ' {...getTableProps()}
                // style={{ transform:'rotateX(180deg)'}}
                >

                    <thead className='text-center text-nowrap'>
                        {
                            headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>

                                    {
                                        headerGroup.headers.map(column => (
                                            <th  className="text-center" {...column.getHeaderProps()}>

                                                {
                                                    column.render('Header')
                                                }
                                                {column.canFilter ? column.render('Filter') : null}

                                            </th>
                                        ))}
                                </tr>
                            ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td  className="text-center" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <hr />
                <div className='d-block m-2   float-right'>



                </div>
            </div>

            {/*<pre>*/}
            {/*  <code>*/}
            {/*    {*/}
            {/*      JSON.stringify(*/}
            {/*        {*/}
            {/*          selectedFlatRows: selectedFlatRows.map((row) => row.original),*/}
            {/*        }, null, 2*/}
            {/*      )*/}
            {/*    }*/}
            {/*  </code>*/}
            {/*</pre>*/}



        </Fragment>
    );

}
// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'



export default TakhsisTable