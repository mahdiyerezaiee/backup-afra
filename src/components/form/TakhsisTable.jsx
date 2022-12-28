import React, { Fragment, useEffect, useState } from 'react'
import { useTable, useFilters } from 'react-table';

import PageSizeTable from "../../utils/PageSize";
import Pagination from "../../utils/pagination";



const TakhsisTable = ({ columns, data }) => {


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,


    } = useTable({ columns, data }, useFilters)

    return (
        <Fragment>

            {/*<GlobalFilter filter={globalfilter} setFilter={setGlobalFilter} />*/}

            <div className="table-responsive "
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
                                            <th {...column.getHeaderProps()}>
                                                {
                                                    column.render('Header')
                                                }
                                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody className='text-center' {...getTableBodyProps()}>
                        { // loop over the rows

                            rows.map(row => {
                                prepareRow(row)

                                return (
                                    <tr  {...row.getRowProps()}>

                                        { // loop over the rows cells

                                            row.cells.map(cell =>

                                            (<td  {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>)

                                            )
                                        }

                                    </tr>
                                )
                            })
                        }

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

export default TakhsisTable