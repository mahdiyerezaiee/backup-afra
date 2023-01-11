import React, { Fragment,useEffect,useState } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';

import PageSizeTable from "../../../Utils/PageSize";
import Pagination from "../../../Utils/pagination";
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

const MyTable = ({ columns, data ,getData,bulkJob ,setPageNumber,PageNumber,setPageSize,PageSize,getDataBySearch , total,  rowProps = () => ({}) } ) => {

    const [selectFunc,setSelectFunc]=useState(0);
    const [Func, SetFunc] = useState([]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        state,
        selectedFlatRows,
        state: { selectedRowIds }

    } = useTable({ columns, data ,initialState: {

            hiddenColumns:  Func
        },
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect, hooks => {
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
    const formattedvalues = [];
    const values= Object.values(rows.map(i =>  i.values));

    useEffect(() => {
       const vl= Object.values(values).filter((item) => item.nationalCode !== '').length
       const notNullable = values.reduce((r, o) => 
       r + +!Object.values(o).includes("")
     , 0);
     const notNullable2 = values.reduce((r, o) => 
       r + +!Object.values(o).includes('  ')
     , 0);
        
             values.forEach(task =>
            Object.entries(task).forEach(([key, value]) =>
                value ===  null  ? formattedvalues.push(key): value ===  ""  ? formattedvalues.push(key): value ===  '  '  ? formattedvalues.push(key):null 
            )
        );
            SetFunc(notNullable === 0 ?  formattedvalues:notNullable2 === 0 ? formattedvalues:[])



    }, [rows])
    useEffect(()=>{
        getData(selectedFlatRows);
    },[selectedRowIds])

    return (
        <Fragment>

            {/*<GlobalFilter filter={globalfilter} setFilter={setGlobalFilter} />*/}

            <div className="table-responsive "
                 style={{overflowX:'auto' }}
            >
                <div className='d-block clearfix mt-3 float-right'>
                    {/*<span  className=" py-3" style={{fontSize:'smaller'}} > تعداد نمایش در صفحه : </span>*/}
                    <PageSizeTable getDataBySearch={getDataBySearch} pageSize={PageSize} setPageSize={setPageSize}/>

                </div>
                <div className='d-block clearfix mt-3 float-left'>
                    <span  className=" py-3" style={{fontSize:'smaller'}} > اقدام دسته جمعی: </span>
                    {rows.find(item =>item.original.active === true || item.original.active === false) ?
                        <select
                        // style={{height:'20px'}}
                        className='btn m-1  non-hover  bg-transparent shadow-none  p-0 '
                        style={{fontSize:'smaller'}}
                        value={selectFunc}
                        onChange={e => {
                            setSelectFunc(Number(e.target.value))
                        }}
                    >
                        {[ {id:1,name:'انتخاب'} ,  {id: 2, name: 'فعال '},{id:5,name:'غیرفعال '},{id:3,name:'کپی'},{id:4,name:'حذف'} ].map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>

                        ))}
                    </select> :   <select
                            // style={{height:'20px'}}
                            className='btn m-1  non-hover  bg-transparent shadow-none  p-0 '
                            style={{fontSize:'smaller'}}
                            value={selectFunc}
                            onChange={e => {
                                setSelectFunc(Number(e.target.value))
                            }}
                        >
                            {[ {id:1,name:'انتخاب'},{id:3,name:'کپی'},{id:4,name:'حذف'} ].map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>

                            ))}
                        </select> }
                    <button className='btn-sm btn-light' onClick={()=>bulkJob(selectFunc)}>ثبت</button>
                </div>

                <table className='table mb-4 ' {...getTableProps()}
                    // style={{ transform:'rotateX(180deg)'}}
                >

                    <thead className='text-center'>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {
                                                column.render('Header')
                                            }
                                            <span>
                        {column.isSorted
                            ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                            : ''}
                      </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </thead>
                    <tbody className='text-center' {...getTableBodyProps()}>
                    { // loop over the rows

                        rows.map(row  => {
                            prepareRow(row)

                            return (
                                <tr  {...row.getRowProps(rowProps(row))}>

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
                <hr/>
                <div className='d-block m-2   float-right'>
              <span className=" " style={{fontSize: 'small'}}>
                  نمایش
                  {""} {PageSize >= total ? total : PageSize} {""}


                  آیتم از
                  {""} {total === 0 ? rows.length : total} {""}
              </span>


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

            <Pagination setPageNumber={setPageNumber} PageNumber={PageNumber}  getDataBySearch={getDataBySearch} PageSize={PageSize} total={total}/>


        </Fragment>
    );

}

export default MyTable