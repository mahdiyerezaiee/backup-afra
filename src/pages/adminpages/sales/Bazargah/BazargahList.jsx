import React, { useState, useMemo } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en";
import { NavLink } from 'react-router-dom';

import { GetBazargahKharidList } from './../../../../services/outScopeService';
import MyTable from '../../../../components/form/MyTable';

import FadeLoader from 'react-spinners/FadeLoader'
import MyTableBazargah from "../../../../components/form/MyTableBazargah";


const BazargahList = () => {
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [Response, SetResponse] = useState([]);
    const [clicked, SetClicked] = useState(false)
    const[selectedRows,setSelectedRows]=useState([])
    const [stateSuccess , SetStateSuccess ] = useState(0)
    const [stateError , SetStateError ] = useState(0)
    const[show,SetShow]=useState(false);
    const[disable,setDisable]=useState(false);

    const[open,SetOpen]=useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#0c4088");
    const close = () => {
        SetOpen(false);
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
        // const arrayOfData=getSelectedData(selectedRows);
        // let successCount=0;
        // let errorCount=0;
        // for (let i = 0; i < arrayOfData.length; i++) {
        //
        //     try {
        //         const{data,status}=await DeleteGroup(arrayOfData[i].id)
        //         if(data.result.success ===true){
        //             SetOpen(true)
        //
        //             SetStateSuccess ( successCount+=1)
        //         } if(data.result.success ===false){
        //             SetOpen(true)
        //
        //             SetStateError (errorCount+=1)
        //         }
        //
        //
        //
        //     } catch (error) {
        //         SetOpen(true)
        //
        //         SetStateError (errorCount+=1)
        //
        //
        //     }
        //
        //
        // }

    }
    const copySelectedItem=async()=>{
        // const arrayOfData=getSelectedData(selectedRows);
        // const copyData= arrayOfData.map(item=>{return{...item,id:0,active:true,createDate:new Date()}})
        //
        // let successCount=0;
        // let errorCount=0;
        // for (let i = 0; i < copyData.length; i++) {
        //
        //
        //     try {
        //         let payload={
        //             'group':copyData[i]
        //         }
        //         const{data,status}=await SetGroup(payload)
        //         if(status===200){
        //             SetOpen(true)
        //
        //             SetStateSuccess ( successCount+=1)
        //         }
        //
        //
        //     } catch (error) {
        //         SetOpen(true)
        //
        //         SetStateError (errorCount+=1)
        //     }
        //
        //
        // }


    }
    const enableSelectedItem=async()=>{
        // const arrayOfData=getSelectedData(selectedRows);
        // const copyData= arrayOfData.map(item=>{return{...item,active:true}})
        //
        // let successCount=0;
        // let errorCount=0;
        // for (let i = 0; i < copyData.length; i++) {
        //
        //
        //     try {
        //         let payload={
        //             'group':copyData[i]
        //         }
        //
        //         const{data,status}=await SetGroup(payload)
        //         if(status===200){
        //             SetOpen(true)
        //
        //             SetStateSuccess ( successCount+=1)
        //         }
        //
        //
        //     } catch (error) {
        //         SetOpen(true)
        //
        //         SetStateError (errorCount+=1)
        //     }
        //
        // }
        //

    }
    const disableSelectedItem=async()=>{
        // const arrayOfData=getSelectedData(selectedRows);
        // const copyData= arrayOfData.map(item=>{return{...item,active:false}})
        //
        // let successCount=0;
        // let errorCount=0;
        // for (let i = 0; i < copyData.length; i++) {
        //
        //
        //     try {
        //
        //         let payload={
        //             'group':copyData[i]
        //         }
        //         const{data,status}=await SetGroup(payload)
        //         SetOpen(true)
        //         if(status===200){
        //
        //             SetStateSuccess( successCount+=1)
        //
        //         }
        //
        //         console.log(open)
        //     } catch (error) {
        //         SetOpen(true)
        //
        //         SetStateError (errorCount+=1)
        //
        //     }finally {
        //
        //     }
        //
        //
        // }
        //

    }

    const handleStartDate = (value) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید
      
        setStartDate(value.toString())

       console.log(show);


    }
    const handleEndDate = (value) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید

        setEndDate(value.toString())



    }
    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const { data, status } = await GetBazargahKharidList(StartDate, EndDate);
            if (status === 200) {

                SetResponse(data.result.bazarGahKharidList);
                SetClicked(true);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handelFrom=()=>{
           SetClicked(false)
    }
    let formatter = new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0, 


    });
    let formater = new Intl.NumberFormat('fa-IR', {
     

    });

    const columns = useMemo(() => [
        { Header: 'شناسه', accessor: 'id' },
        {Header:'تاریخ',accessor:'date'},
        { Header: 'کوتاژ', accessor: 'goodTag' },
        { Header: 'کالا', accessor: 'productName' },
        { Header: 'وزن', accessor: 'qty',Cell:row=>(formater.format(row.row.original.qty)) },
        { Header: 'تحویلی', accessor: 'wBarnameShode',Cell:row=>(formater.format(row.row.original.wBarnameShode)) },
        { Header: 'پیگری', accessor: 'traceCode' },
        { Header: 'خریدار', accessor: 'buyerName' },
        { Header: 'شماره همراه', accessor: 'buyerPhone' },
        { Header: 'شناسه ملی', accessor: 'buyerId' },
        { Header: 'شناسه یکتا', accessor: 'buyerUniqueId' },
        { Header: 'مبلغ-ریال', accessor: 'totalValue', Cell:row=>(formater.format(row.row.original.totalValue))},
        { Header: 'پرداخت', accessor: 'paymentTerm' },
        { Header: 'شناسه واریز', accessor: 'buyerpaymentId' },
        { Header: 'قیمت-ریال', accessor: 'fee' ,Cell:row=>(formater.format(row.row.original.fee))},
        { Header: 'تخصیص', accessor: 'allocationState',Cell:row=>((row.row.original.allocationState)?'تخصیص یافته':'تخصیص نیافته')},
        { Header: 'ثبت', accessor:d=>{

                let condition=(d.storedInDb?'ثبت شده':'ثبت نشده')
                return(`${condition}`)

            },Cell:row=>((row.row.original.storedInDb)?'ثبت شده':'ثبت نشده')},
            { Header: 'قفل', accessor:d=>{

                let condition=(d.lockedData?'قفل شده':'قفل نشده')
                return(`${condition}`)

            },Cell:row=>((row.row.original.lockedData)?'قفل شده':'قفل نشده')}


       

    ]);
    const data = useMemo(() => Response);;
    console.log(data)
    if (!clicked) {
        if(!loading){
        return (
            <div className='user-progress' >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                        <h5 >درخواست اطلاعات </h5>
                        <p>در این بخش می توانید اطلاعات سفارش ها را از بازارگاه دریافت کنید.</p>
                    </div>
                </div>
                <div className='row d-flex justify-content-center '>
                    <div className='widget box shadow col-4'>


                        <form >
                            <div className='row'>
                                <div className=" col ">
                                    <div className=" mb-4 " style={{ position: 'relative' }}>
                                        <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>از تاریخ </label>
                                        <div className='form-group '>
                                            <DatePicker
                                                calendar={persian}

                                                locale={persian_en}
                                                style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                value={StartDate}
                                                onChange={handleStartDate}
                                            />

                                        </div>
                                        </div>
                                       {show? <p  style={{color:'red'}}> شروع تاریخ از 1401/4/1 است</p>:null}
                                </div>
                                <div className=" col ">
                                    <div className=" mb-4 " style={{ position: 'relative' }}>
                                        <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تا تاریخ </label>
                                        <div className='form-group '>
                                            <DatePicker
                                            
                                                calendar={persian}

                                                locale={persian_en}
                                                style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                value={EndDate}
                                                onChange={handleEndDate}
                                            />

                                        </div></div>

                                </div>
                            </div>
                            <div className='row justify-content-between'>
                                <div className='col-6 '>
                                    <button type="submit" disabled={disable} className="btn btn-success float-left " onClick={handelSubmit} >تایید</button>
                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/dashboard' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
           
            </div>

        )
        }
        else{
            return(
                <div style={{position:'fixed',top:'40%',left:'40%'}}>
                    <p>دریافت اطلاعات ...</p>
            <FadeLoader loading={loading} color={color}/>
            </div>
            )

        }
    }
  
    else {

        return (
            <div className=" statbox widget-content widget-content-area ">
            <div>
                <button className="btn btn-primary m-3" onClick={handelFrom} >تغییر تاریخ</button>
              
                <MyTableBazargah columns={columns} data={data} getData={rows=>setSelectedRows(rows)}   rowProps={row => ({
                   
                   
                    style: {
                        backgroundColor: row.values.ثبت === 'ثبت شده'? 'lightgreen':(row.values.قفل ==='قفل شده' &&row.values.ثبت === 'ثبت شده'  )?'yellow':'#ff00003b',

                        cursor: "pointer"
                    }
                })} bulkJob={getBulkJob}/>
                {/*<ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />*/}
            </div>
            </div>

        )

    }
}

export default BazargahList