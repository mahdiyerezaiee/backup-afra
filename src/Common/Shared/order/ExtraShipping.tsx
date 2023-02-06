import {getExtraData} from "../../../services/extraService";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {ExportToExcel} from "../Common/ExportToExcel";
import { GetShippingReports } from './../../../services/ShippingService';
import { MeasureUnitSample } from './../../Enums/MeasureUnitSample';
import { LoadingBar } from "react-redux-loading-bar";
import  FadeLoader  from 'react-spinners/FadeLoader';

const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5%',
        border: '2px ridge black'
    }

}

interface Props{
    id:number,
    modalIsOpen:any,
    closeModal:any
}
const ExtraShipping:React.FC<Props> = ({id ,modalIsOpen,closeModal }) => {
    const [extra , setExtra] = useState<any>([])
    const [loading,setLoading]=useState(false)
    const getExter = async () => {

      try {
          if (id === null){
              setExtra(null)
          }
          setLoading(true)
         const {data , status}=await GetShippingReports(id)
           if(status===200){

            setLoading(false)
          setExtra(data.result.shippingReports)}
      }catch (e) {
          console.log(e)
          setLoading(false)
      }
    }

    useEffect(()=>{
       getExter()
    },[id])
    console.log(extra)

    if(!loading){
    if (extra && extra !== 0 ){
        const dataForExcel = extra.map((item:any) => ({

        'تاریخ بارنامه': item.barDate,
        'شماره بارنامه': item.bar_n,
        'شماره سریال بارنامه': item.bar_n_s,
        'شماره تلفن راننده': item.dTel,
        'وزن بارنامه': item.netT,
        'کد تخصیص بازارگاه':item.kaCode,
        'کرایه بار':item.kra2,
        'کد باربری': item.companyCode,
        'نا راننده': item.dName,
        'فامیلی راننده': item.dFam,
        'پلاک': item.tplk,
        'ساعت بارنامه': item.barTime,
        'شناسه یا کد ملی تحویل گیرنده': item.ka_E_Code,
        'نام تحویل گیرنده':item.tarGetName,
        'شماه قرارداد': item.ghErtebat,
        'آدرس بارنامه': item.barAdd,


    }))
        return(
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Selected Option"
                ariaHideApp={false}

            >


                <div className=" rounded  " style={{border:" 1px solid #bfc9d4" , width:'fit-content',}} >

                    <div className=" p-2 containerT " >
                        <table
                            className="table table-bordered table-hover table-striped fixed_header mt-2  mb-4"  >
                            <thead >
                            <tr style={{fontSize:'10px' }}>
                            <th style={{fontSize:'10px' }} className="text-center">ردیف</th>
                                <th style={{fontSize:'10px' }} className="text-center">#</th>
                                <th style={{fontSize:'10px' }} className="text-center">شناسه حواله</th>
                                <th style={{fontSize:'10px' }} className="text-center"> تاریخ بارنامه</th>
                                <th style={{fontSize:'10px' }} className="text-center">واحد</th>
                                <th style={{fontSize:'10px' }} className="text-center">وزن</th>
                                <th style={{fontSize:'10px' }}  className="text-center">شماره بارنامه</th>
                                <th style={{fontSize:'10px' }} className="text-center">سریال بارنامه</th>
                                <th style={{fontSize:'10px' }}  className="text-center">نام راننده</th>
                                <th style={{fontSize:'10px' }}  className="text-center">شماره راننده</th>
                                <th style={{fontSize:'10px' }}  className="text-center">پلاک </th>
                              
                            </tr>
                            </thead>
                            <tbody >
                            {extra.map((item:any , index:number) => (
                                <tr  className='text-center' key={item.id}>

                                    <td  data-th="ردیف">{index + 1}</td>
                                    <td data-th="#">{item.id}</td>
                                    <td data-th="شناسه حواله">{item.shippingId}</td>
                                    <td data-th="تاریخ بارنامه">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                    <td data-th="واحد">{MeasureUnitSample.filter((q:any)=> q.id===item.measureUnitId).map((x:any)=>x.name)}</td>
                                    <td data-th="وزن">{item.quantity}</td>
                                    <td data-th="شماره بارنامه">{item.shippingNumber}</td>
                                    <td data-th="سریال بارنامه">{item.shippingSerial}</td>
                                    <td data-th="نام راننده">{item.delivererName}</td>
                                    <td data-th="شماره راننده">{item.delivererNumber}</td>
                                    <td data-th="پلاک">{item.delivererPlaque}</td>
                                    

                                </tr>

                            )) }

                            </tbody>
                        </table>


                    </div>
                </div>
                <div className="d-flex justify-content-end m-2">
                    <ExportToExcel apiData={dataForExcel} fileName='لیست گزارش' />
                </div>
            </Modal>
        )}else {

        return ( <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >
            <div className=" statbox widget-content widget-content-area">
                <div>




                    <div className='text-center mt-5'>
                        <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                    </div>




                </div>
            </div>
        </Modal>)
    }}

    else{
        return (
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >
            <div className="loadingAddress" >
                <div className="boxloadingAddress">
                    <p>دریافت اطلاعات ...</p>
                    <FadeLoader loading={loading} color={"#ccc"} />
                </div>
            </div>
            </Modal>)
    }

}
export default ExtraShipping