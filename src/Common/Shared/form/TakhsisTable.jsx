import React, { Fragment, useEffect, useState } from 'react'
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useRowSelect,
    useSortBy,
    usePagination
} from 'react-table';
import {useMemo} from "react";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

const TakhsisTable = ({ columns, data , getData, bulkJob ,  rowProps = () => ({})}) => {

    const [selectFunc, setSelectFunc] = useState(0);

    const filterTypes = useMemo(
        () => ({
            multiple: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? filterValue.includes(rowValue)
                        : undefined;
                });
            }
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        state,
        selectedFlatRows,
        state: {selectedRowIds }
    } = useTable({columns, data,
        filterTypes
    }, useGlobalFilter, useFilters, useRowSelect, hooks => {
        hooks.visibleColumns.push(columns => [
            // Let's make a column for selection
            {
                id: 'selection',
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div>
                        <IndeterminateCheckbox{...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({row}) => (
                    <div>
                        <IndeterminateCheckbox   {...row.getToggleRowSelectedProps()} />
                    </div>
                ),
            },
            ...columns,
        ])
    })
    useEffect(() => {
        getData(selectedFlatRows);
    }, [selectedRowIds])
    
            return (
        <Fragment>

            {/*<GlobalFilter filter={globalfilter} setFilter={setGlobalFilter} />*/}
            <div className='d-block clearfix mt-3 '>
                <span className=" py-3" style={{fontSize: 'smaller'}}> اقدام دسته جمعی: </span>

                <select
                    // style={{height:'20px'}}
                    className='btn m-1  non-hover  bg-transparent shadow-none  p-0 '
                    style={{fontSize: 'smaller'}}
                    value={selectFunc}
                    onChange={e => {
                        setSelectFunc(Number(e.target.value))
                    }}
                >
                    {[{id:1,name:'انتخاب'},{id: 2, name: 'صدور حواله '},{id: 3, name: 'صدور فاکتور بر اساس جزییات سفارش '}].map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>

                    ))}
                </select>
                <button className='btn-sm btn-light' onClick={() => bulkJob(selectFunc)}>ثبت</button>
            </div>
            <div className=" containerT  p-2 "
// style={{overflowX:"auto"}}
            >


                <table className='table m-1 table-striped  fixed_header ' {...getTableProps()}
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
                    <tbody id="tableTakhsis" {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr id={row.original.id} {...row.getRowProps(rowProps(row))}>
                                {row.cells.map(cell => {
                                    return <td data-th={cell.column.Header} className="text-center" {...cell.getCellProps()}>{cell.render('Cell')}</td>
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