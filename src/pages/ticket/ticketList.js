import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {GetSupportRequesstsAdmin, GetSupportRequesstsUser, setSupportRequessts} from "../../services/TicketService";
import {useMemo} from "react";
import {SetProduct} from "../../services/productService";
import MyTable from "../../components/form/MyTable";
import {useNavigate} from "react-router-dom";
import ModalGroupWork from "../../components/common/ModalGroupWork";
import QueryString from "qs";
import {GetShoppingContracts} from "../../services/ShippingService";

const TicketList = () => {
  const roles = useSelector(state => state.userRole)
  const user=useSelector(state=>state.userInfo);

const Navigate=useNavigate()
    const [PageNumber, setPageNumber] = useState(0)
    const [PageSize, setPageSize] = useState(10)
    const [totalCount , setTotalCount]=useState(0) ;
  const [ticket , setTicket]=useState([])
    const[selectedRows,setSelectedRows]=useState([])
    const [stateSuccess , SetStateSuccess ] = useState(0)
    const [stateError , SetStateError ] = useState(0)
    const[open,SetOpen]=useState(false);
    const close = () => {
        SetOpen(false);
    }
    const getDataBySearch = async () => {

        let config = {

            headers: {'Content-Type': 'application/json'},

            params: {

                PageNumber,
                PageSize


            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            if(roles.includes(7) || roles.includes(5) ||roles.includes(8)){
                const {data , status}= await GetSupportRequesstsAdmin(config)
                setTicket(data.result.supportRequests.values)
            }else {
                const {data , status}= await GetSupportRequesstsUser(user.id , config)
                setTicket(data.result.supportRequests.values)

            }
        } catch (error) {
            console.log(error);
        }
    }
   let arrayOfSelectedData=[];
const getSelectedData=(data)=>{
    
   arrayOfSelectedData= data.map(item=>item.original);
   

    return(arrayOfSelectedData)
   
   }
    const getBulkJob=(selected)=>{
        if(selected===2){
            enableSelectedItem()
        }
        if(selected===3){
            copySelectedItem()
        }if(selected===4){
            DeleteSelectedItem()
        }
        if(selected===5){
            disableSelectedItem()
        }
    }
    const DeleteSelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < arrayOfData.length; i++) {

            try {
                // const{data,status}=await DeleteGroup(arrayOfData[i].id)
                if(data.result.success ===true){
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                } if(data.result.success ===false){
                    SetOpen(true)

                    SetStateError (errorCount+=1)
                }



            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)


            }


        }

    }
    const copySelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        const copyData= arrayOfData.map(item=>{return{...item,id:0,active:true,createDate:new Date()}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'supportRequestDto':copyData[i]
                }
                const{data,status}=await setSupportRequessts(payload)
                if(status===200){
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
            }


        }


    }
    const enableSelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        const copyData= arrayOfData.map(item=>{return{...item,active:true}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'supportRequestDto':copyData[i]
                }

                const{data,status}=await setSupportRequessts(payload)
                if(status===200){
                    SetOpen(true)

                    SetStateSuccess ( successCount+=1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)
            }

        }


    }
    const disableSelectedItem=async()=>{
        const arrayOfData=getSelectedData(selectedRows);
        const copyData= arrayOfData.map(item=>{return{...item,active:false}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload={
                    'supportRequestDto':copyData[i]
                }
                const{data,status}=await setSupportRequessts(payload)
                SetOpen(true)
                if(status===200){

                    SetStateSuccess( successCount+=1)

                }

              
            } catch (error) {
                SetOpen(true)

                SetStateError (errorCount+=1)

            }finally {

            }


        }


    }

  const getTicket= async ()=>{
    if(roles.includes(7) || roles.includes(5) ||roles.includes(8)){
      const {data , status}= await GetSupportRequesstsAdmin()
      setTicket(data.result.supportRequests.values)
        setTotalCount(data.result.supportRequests.totalCount)
    }else {
      const {data , status}= await GetSupportRequesstsUser(user.id)
setTicket(data.result.supportRequests.values)
        setTotalCount(data.result.supportRequests.totalCount)

    }
  }
  useEffect(()=>{
    getTicket()
  },[])
  const newTicket = () => {
    Navigate("/newTicket")
  }
  const showMessage = (id , title) => {
    Navigate(`/message/${id}/${title}`)
  }
  const columns = useMemo(()=> [
    { Header: 'شناسه', accessor: 'id' },
    { Header: 'نام', accessor: 'creatorName' }
    , { Header: 'عنوان', accessor: 'title' },
      { Header: 'نمایش پیام ', accessor: '',Cell: row => (
          <span onClick={()=>showMessage(row.row.original.id , row.row.original.title)}>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye"
                  viewBox="0 0 16 16">
                    <path
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
          </span>
          )},

    { Header: 'عملیات' , accessor: 'عمل' , Cell: row=>(
          <ul className="table-controls">

            {/*<button className="border-0  non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="ویرایش"*/}
            {/*        onClick={e => editHandler(row.row.original.id)}>*/}
            {/*  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
            {/*       viewBox="0 0 24 24" fill="none"*/}
            {/*       stroke="currentColor" strokeWidth="2" strokeLinecap="round"*/}
            {/*       strokeLinejoin="round"*/}
            {/*       className="feather feather-edit-2">*/}
            {/*    <path*/}
            {/*        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>*/}
            {/*  </svg>*/}
            {/*</button>*/}


            <a href="#" data-toggle="tooltip" data-placement="top" title="حذف">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                   viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round"
                   className="feather feather-trash-2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>

              </svg>
            </a>


          </ul>
      )}])

  const data=useMemo(()=>ticket);
    if(ticket){
        return(<div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>

                    </div>
                </div>

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button className="btn btn-primary m-3"  onClick={newTicket}>ثبت تیکت جدید</button>

                        <MyTable   columns={columns} data={data} getData={rows=>setSelectedRows(rows)} bulkJob={getBulkJob}
                                   total={totalCount}
                                   setPageSize={setPageSize}
                                   PageSize={PageSize}
                                   getDataBySearch={getDataBySearch}
                                   setPageNumber={setPageNumber}
                                   PageNumber={PageNumber}
                        />
                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />
                    </div>
                </div>
            </div>
        )}
    else {
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area">
                    <div>




                        <button className="btn btn-primary m-3"  onClick={newTicket}>ثبت تیکت جدید</button>



                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>


                    </div>
                </div>

            </div>
        )
    }


}
export default TicketList