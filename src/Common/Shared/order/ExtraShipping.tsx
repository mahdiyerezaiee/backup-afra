import {getExtraData} from "../../../services/extraService";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {ExportToExcel} from "../Common/ExportToExcel";
import { GetShippingReports } from './../../../services/ShippingService';
import { MeasureUnitSample } from './../../Enums/MeasureUnitSample';

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
    const getExter = async () => {

      try {
          if (id === null){
              setExtra(null)
          }
         const {data , status}=await GetShippingReports(id)

          setExtra(data.result.shippingReports)
      }catch (e) {
          console.log(e)
      }
    }

    useEffect(()=>{
       getExter()
    },[id])
    if (extra){
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

                    <div className=" p-2 table-fixed" style={{  display:"block", overflowY:'scroll', overflowX:'hidden',height:'350px', width:"100%"}}>
                        <table
                            className="table table-bordered table-hover table-striped  mt-2  mb-4"  >
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

                                    <td >{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td >{item.shippingId}</td>
                                    <td >{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                    <td >{MeasureUnitSample.filter((q:any)=> q.id===item.measureUnitId).map((x:any)=>x.name)}</td>
                                    <td >{item.quantity}</td>
                                    <td >{item.shippingNumber}</td>
                                    <td >{item.shippingSerial}</td>
                                    <td >{item.delivererName}</td>
                                    <td >{item.delivererNumber}</td>
                                    <td >{item.delivererPlaque}</td>
                                    

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
    }

}
export default ExtraShipping