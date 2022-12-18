import {useEffect} from "react";

const PageSizeTable = ({setPageSize , pageSize , getDataBySearch }) => {
    const pageSizeHandler =async  (data) => {
        setPageSize(data)
}
useEffect(()=>{
    getDataBySearch()
},[pageSize])


  return( <div className='d-block clearfix mt-3 float-right'>
      <span className=" py-3" style={{fontSize: 'smaller'}}> تعداد نمایش در صفحه : </span>
      <select
          // style={{height:'20px'}}
          className='btn m-1  non-hover  bg-transparent shadow-none  p-0 '
          value={pageSize}
          onChange={(e)=>
              pageSizeHandler(e.target.value)
              // getDataBySearch()

          }
      >
          {[10, 25, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                  {pageSize}
              </option>

          ))}
      </select>
  </div>)
}
export default PageSizeTable