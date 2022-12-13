import {GetnProceessAttachments} from "../../../services/reportService";
import React, {useMemo, useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ExportToExcel} from "../../../components/common/ExportToExcel";
import MyTableBazargah from "../../../components/form/MyTableBazargah";

const ProceessAttachments = () => {
    const Navigate = useNavigate()
    const[selectedRows,setSelectedRows]=useState([])

    const [report ,setReport] = useState([])
    const showDetial = (id) => {
     Navigate(`/customerAttachment/${id}`)
    }
    const getBulkJob=(selected)=>{


    }
  const GetProcessAtt =async () => {
    try {
        const {data , status} = await GetnProceessAttachments()
        setReport(data.result.inProceessAttachments)
    }catch (e) {
        console.log(e)
    }
  }
  useEffect(()=>{
      GetProcessAtt()
  },[])
    const columns = useMemo(() => [

        { Header: 'شناسه مشتری', accessor: 'customerId' },
        { Header: 'نام باربری', accessor: 'userName' },
        {Header: 'نام سند', accessor: 'name'},
        {Header: 'مبلغ سند', accessor: 'value'},
        {Header: 'تعداد اسناد', accessor: 'attachmentCount'}
        ,{Header: 'حداقل تاریخ موعد', accessor: 'minDueDate', Cell: row => {
                return (new Date(row.row.original.minDueDate).toLocaleDateString("fa-IR"))
            }
        },
{Header: 'حداکثر تاریخ موعد', accessor: 'maxDueDate', Cell: row => {
                return (new Date(row.row.original.maxDueDate).toLocaleDateString("fa-IR"))
            }
        },

        {
            Header: 'مشاهده اسناد', accessor: '11', Cell: row => {

                return (
                    <div>
                <span onClick={() => showDetial(row.row.original.customerId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width='25' height='25' viewBox="0 0 256 256"><rect
                        width="256" height="256" fill="none"/><line x1="201.1" y1="127.3" x2="224" y2="166.8"
                                                                    fill="none" stroke="#000" strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="12"/><line
                        x1="154.2" y1="149.3" x2="161.3" y2="189.6" fill="none" stroke="#000" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="12"/><line x1="101.7" y1="149.2" x2="94.6" y2="189.6"
                                                                       fill="none" stroke="#000" strokeLinecap="round"
                                                                       strokeLinejoin="round" strokeWidth="12"/><line
                        x1="54.8" y1="127.3" x2="31.9" y2="167" fill="none" stroke="#000" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="12"/><path
                        d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1" fill="none" stroke="#000"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/></svg>
                </span>
                    </div>
                )
            }
        }
    ])
    const data = useMemo(() => report)
    if (report){
        return(
            <div className=" statbox widget-content widget-content-area rounded">
                <div>

                    <MyTableBazargah columns={columns} data={data} getData={rows=>setSelectedRows(rows)} bulkJob={getBulkJob}/>

                    {/*<ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError}/>*/}
                </div>

            </div>
        )
    }else
    {
        return(
            <div className=" statbox widget-content widget-content-area rounded">

                <div className='text-center mt-5'>
                    <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                </div>
            </div>
        )
    }

}
export default ProceessAttachments