import {getExtraData} from "../../../services/extraService";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {ExportToExcel} from "../Common/ExportToExcel";

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

const ExtraShipping = ({id ,modalIsOpen,closeModal }) => {
    console.log(id)
    const [extra , setExtra] = useState([])
    const getExter = async () => {

      try {
          if (id === null){
              setExtra(null)
          }
         const {data , status}=await getExtraData( id,2)

          setExtra(JSON.parse(data.result.extraData.data))
      }catch (e) {
          console.log(e)
      }
    }

    useEffect(()=>{
       getExter()
    },[id])
    if (extra){
        const dataForExcel = extra.map(item => ({

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
                                <th style={{fontSize:'10px' }} className="text-center">کد باربری</th>
                                <th style={{fontSize:'10px' }} className="text-center"> تاریخ بارنامه</th>
                                <th style={{fontSize:'10px' }} className="text-center">شماره بارنامه</th>
                                <th style={{fontSize:'10px' }} className="text-center">شماره سریال بارنامه</th>
                                <th style={{fontSize:'10px' }}  className="text-center">شماره تلفن راننده</th>
                                <th style={{fontSize:'10px' }} className="text-center">وزن بارنامه</th>
                                <th style={{fontSize:'10px' }}  className="text-center">کد تخصیص بازارگاه</th>
                                <th style={{fontSize:'10px' }}  className="text-center">کرایه بار</th>
                                <th style={{fontSize:'10px' }}  className="text-center">نام راننده</th>
                                <th style={{fontSize:'10px' }}  className="text-center"> فامیلی راننده</th>
                                <th style={{fontSize:'10px' }}  className="text-center">پلاک</th>
                                <th style={{fontSize:'10px' }}  className="text-center"> ساعت بارنامه</th>
                                <th style={{fontSize:'10px' }}  className="text-center">  شناسه یا کد ملی تحویل گیرنده</th>
                                <th style={{fontSize:'10px' }}  className="text-center"> نام تحویل گیرنده</th>
                                <th style={{fontSize:'10px' }}  className="text-center"> شماره قرارداد</th>
                                <th style={{fontSize:'10px' }}  className="text-center">آدرس بارنامه</th>
                            </tr>
                            </thead>
                            <tbody >
                            {extra.map((item , index) => (
                                <tr  className='text-center'>

                                    <td >{index + 1}</td>
                                    <td>{item.CompanyCode}</td>
                                    <td >{item.barDate}</td>
                                    <td >{item.bar_n}</td>
                                    <td >{item.bar_n_s}</td>
                                    <td title={item.dTel} >{item.dTel.substring(0,10)}...</td>
                                    <td >{item.netT}</td>
                                    <td >{item.kaCode}</td>
                                    <td >{item.kra2}</td>
                                    <td >{item.dName}</td>
                                    <td >{item.dFam}</td>
                                    <td >{item.tplk}</td>
                                    <td >{item.barTime}</td>
                                    <td>{item.ka_E_Code}</td>
                                    <td >{item.tarGetName}</td>
                                    <td >{item.ghErtebat}</td>
                                    <td title={item.barAdd} >{item.barAdd.substring(0,10)}...</td>

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