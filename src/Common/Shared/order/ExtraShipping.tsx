import { getExtraData } from "../../../services/extraService";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { ExportToExcel } from "../Common/ExportToExcel";
import { GetShippingReports, SetShippingReport } from './../../../services/ShippingService';
import { MeasureUnitSample } from './../../Enums/MeasureUnitSample';
import { LoadingBar } from "react-redux-loading-bar";
import FadeLoader from 'react-spinners/FadeLoader';
import { validatAlpha, validatmin10, validatMobail, validatNumber } from "../../../Utils/validitionParams";
import { Field, Form, Formik } from "formik";
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ClipLoader } from 'react-spinners';

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

interface Props {
    id: number,
    modalIsOpen: any,
    closeModal: any
}
const ExtraShipping: React.FC<Props> = ({ id, modalIsOpen, closeModal }) => {
    const [extra, setExtra] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [check, setChek] = useState(false);
    const [createDate, SetCreateDate] = useState<any>();
    const [quantity, SetQuantity] = useState(0)
    const [shippingNumber, setshippingNumber] = useState('')
    const [shippingSerial, setshippingSerial] = useState('')
    const [delivererName, setdelivererName] = useState('')
    const [delivererNumber, setdelivererNumber] = useState('')
    const [delivererPlaque, setdelivererPlaque] = useState('')
    let [loadingForsubmit, setLoadingForSubmit] = useState(false);

    const getExter = async () => {

        try {
            if (id === null) {
                setExtra(null)
            }
            setLoading(true)
            const { data, status } = await GetShippingReports(id)
            if (status === 200) {

                setLoading(false)
                if (data.result.shippingReports.length > 0) {
                    setExtra(data.result.shippingReports)
                }
                else {
                    setExtra(null)
                }

            }
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(id!==null){
        getExter()}
    }, [id])

    const handelCreateDate = (value: any) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید

        if (value === null) {
            SetCreateDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetCreateDate(new Date(value.toDate().setHours(3, 30, 0, 0)).toJSON())
        }

    }

    const handelSubmit = async () => {
        setLoading(true)
        const body = {

            "report": {
                id: 0,
                shippingId: id,
                createDate,
                quantity: Number(quantity),
                measureUnitId: 5,
                shippingNumber,
                shippingSerial,
                delivererName,
                delivererNumber,
                delivererPlaque,
                extId: null
            }
        }

        try {
            const { data, status } = await SetShippingReport(body)

            if (status === 200) {
                setLoading(false)
                setChek(false)
                handelDeleteState()
                getExter()

            }
        } catch (error) {
            setLoading(false)

        }


    }

    const handelDeleteState = () => {
        SetCreateDate('')
        setdelivererName('')
        SetQuantity(0)
        setdelivererNumber('')
        setdelivererPlaque('')
        setshippingNumber('')
        setshippingSerial('')
    }

    if (!loading) {
        if (extra && extra !== null) {
            const dataForExcel = extra.map((item: any) => ({

                'تاریخ بارنامه': item.barDate,
                'شماره بارنامه': item.bar_n,
                'شماره سریال بارنامه': item.bar_n_s,
                'شماره تلفن راننده': item.dTel,
                'وزن بارنامه': item.netT,
                'کد تخصیص بازارگاه': item.kaCode,
                'کرایه بار': item.kra2,
                'کد باربری': item.companyCode,
                'نا راننده': item.dName,
                'فامیلی راننده': item.dFam,
                'پلاک': item.tplk,
                'ساعت بارنامه': item.barTime,
                'شناسه یا کد ملی تحویل گیرنده': item.ka_E_Code,
                'نام تحویل گیرنده': item.tarGetName,
                'شماه قرارداد': item.ghErtebat,
                'آدرس بارنامه': item.barAdd,


            }))
            return (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Selected Option"
                    ariaHideApp={false}

                >


                    <div className=" rounded  " style={{ border: " 1px solid #bfc9d4" }} >

                        <div className=" p-2 containerT " >
                            <div className="col-lg-4 col-md-6 col-sm-11 ">


                                <label className="text-sm text-black ">

                                    <input type="checkbox" checked={check} className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                    ثبت بارنامه دستی
                                </label>
                            </div>
                            <table
                                className="table table-bordered table-hover table-striped fixed_header mt-2  mb-4"  >
                                <thead >
                                    <tr style={{ fontSize: '10px' }}>
                                        <th style={{ fontSize: '10px' }} className="text-center">ردیف</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">#</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">شناسه حواله</th>
                                        <th style={{ fontSize: '10px' }} className="text-center"> تاریخ بارنامه</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">واحد</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">وزن</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">شماره بارنامه</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">سریال بارنامه</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">نام راننده</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">شماره راننده</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">پلاک </th>

                                    </tr>
                                </thead>
                                <tbody >
                                    {extra.map((item: any, index: number) => (
                                        <tr className='text-center' key={item.id}>

                                            <td data-th="ردیف">{index + 1}</td>
                                            <td data-th="#">{item.id}</td>
                                            <td data-th="شناسه حواله">{item.shippingId}</td>
                                            <td data-th="تاریخ بارنامه">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                            <td data-th="واحد">{MeasureUnitSample.filter((q: any) => q.id === item.measureUnitId).map((x: any) => x.name)}</td>
                                            <td data-th="وزن">{item.quantity}</td>
                                            <td data-th="شماره بارنامه">{item.shippingNumber}</td>
                                            <td data-th="سریال بارنامه">{item.shippingSerial}</td>
                                            <td data-th="نام راننده">{item.delivererName}</td>
                                            <td data-th="شماره راننده">{item.delivererNumber}</td>
                                            <td data-th="پلاک">{item.delivererPlaque}</td>


                                        </tr>

                                    ))}

                                </tbody>
                            </table>



                        </div>
                       
                    </div>
                    {check ? <div className="mt-4"><Formik initialValues={{
                            id: 0,
                            shippingId: id,
                            createDate,
                            quantity,
                            measureUnitId: 5,
                            shippingNumber, shippingSerial, delivererName, delivererNumber,
                            delivererPlaque, extId: null

                        }}
                            enableReinitialize={true}
                            onSubmit={values => {
                                // same shape as initial values
                                handelSubmit()
                            }}>
                            {({ errors, touched, validateField, validateForm, setFieldValue, handleChange, values }) => (


                                <Form >


                                    <div className="n-chk d-flex ">

                                        <div>

                                        </div>
                                    </div>

                                    <div className='form-row '>

                                        <div className="form-group  textOnInput col-md-3">

                                            <label >مفدار</label>
                                            <Field validate={validatNumber} name="quantity" type="number" className="form-control" id="inputZip" value={quantity}
                                                onChange={(e: any) => {
                                                    SetQuantity(e.target.value)

                                                }} />
                                            {errors.quantity && touched.quantity && <div className="text-danger">{errors.quantity}</div>}

                                        </div>
                                        <div className="form-group  textOnInput col-md-3">
                                            <div className="  " style={{ position: 'relative' }}>
                                                <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تاریخ بارنامه</label>
                                                <div className='form-group '>
                                                    <DatePicker

                                                        calendar={persian}

                                                        locale={persian_fa}
                                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                        value={createDate}
                                                        onChange={handelCreateDate}
                                                    />

                                                </div>

                                            </div>

                                        </div><div className="form-group  textOnInput col-md-3">

                                            <label >شماره بارنامه</label>
                                            <Field validate={validatAlpha} name="shippingNumber" type="text" className="form-control" id="inputZip" value={shippingNumber}
                                                onChange={(e: any) => {
                                                    setshippingNumber(e.target.value)

                                                }} />
                                            {errors.shippingNumber && touched.shippingNumber && <div className="text-danger">{errors.shippingNumber}</div>}

                                        </div>
                                        <div className="form-group  textOnInput col-md-3">

                                            <label >سریال بارنامه</label>
                                            <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={shippingSerial}
                                                onChange={(e: any) => {
                                                    setshippingSerial(e.target.value)

                                                }} />
                                            {errors.shippingSerial && touched.shippingSerial && <div className="text-danger">{errors.shippingSerial}</div>}

                                        </div>

                                    </div>
                                    <div className='form-row'>
                                        <div className="form-group  textOnInput col-md-4">

                                            <label >نام راننده</label>
                                            <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererName}
                                                onChange={(e: any) => {
                                                    setdelivererName(e.target.value)

                                                }} />
                                            {errors.delivererName && touched.delivererName && <div className="text-danger">{errors.delivererName}</div>}

                                        </div>
                                        <div className="form-group  textOnInput col-md-4">

                                            <label >شماره راننده</label>
                                            <Field validate={validatMobail} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererNumber}
                                                onChange={(e: any) => {
                                                    setdelivererNumber(e.target.value)

                                                }} />
                                            {errors.delivererNumber && touched.delivererNumber && <div className="text-danger">{errors.delivererNumber}</div>}

                                        </div>
                                        <div className="form-group  textOnInput col-md-4">

                                            <label >شماره پلاک</label>
                                            <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererPlaque}
                                                onChange={(e: any) => {
                                                    setdelivererPlaque(e.target.value)

                                                }} />
                                            {errors.delivererPlaque && touched.delivererPlaque && <div className="text-danger">{errors.delivererPlaque}</div>}

                                        </div>


                                    </div>


                                    <div className='row justify-content-center mt-3'>

                                        <div className='col-2 '>
                                            <button type="submit" className="btn btn-success" >تایید<ClipLoader

                                                loading={loading}
                                                color="#ffff"
                                                size={15}
                                            /></button>
                                        </div>


                                    </div>
                                </Form>

                            )}



                        </Formik></div> : ''}
                    <div className="d-flex justify-content-end m-2">
                        <ExportToExcel apiData={dataForExcel} fileName='لیست گزارش' />
                    </div>
                </Modal>
            )
        } else {

            return (<Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Selected Option"
                ariaHideApp={false}

            >
                <div className=" statbox widget-content widget-content-area">




                    <div className=" rounded  " style={{ border: " 1px solid #bfc9d4" }} >

                        <div className=" p-2 containerT " >
                            <div className="col-lg-4 col-md-6 col-sm-11 ">


                                <label className="text-sm text-black ">

                                    <input type="checkbox" checked={check} className="form-check-input" onChange={e => setChek(e.target.checked)} />
                                    ثبت بارنامه دستی
                                </label>
                            </div>
                            <table
                                className="table table-bordered table-hover table-striped fixed_header mt-2  mb-4"  >
                                <thead >
                                    <tr style={{ fontSize: '10px' }}>
                                        <th style={{ fontSize: '10px' }} className="text-center">ردیف</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">#</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">شناسه حواله</th>
                                        <th style={{ fontSize: '10px' }} className="text-center"> تاریخ بارنامه</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">واحد</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">وزن</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">شماره بارنامه</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">سریال بارنامه</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">نام راننده</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">شماره راننده</th>
                                        <th style={{ fontSize: '10px' }} className="text-center">پلاک </th>

                                    </tr>
                                </thead>
                            </table>


                        </div>

                    </div>
                    {check ? <div className="mt-4"> <Formik initialValues={{
                        id: 0,
                        shippingId: id,
                        createDate,
                        quantity,
                        measureUnitId: 5,
                        shippingNumber, shippingSerial, delivererName, delivererNumber,
                        delivererPlaque, extId: null

                    }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            handelSubmit()
                        }}>
                        {({ errors, touched, validateField, validateForm, setFieldValue, handleChange, values }) => (


                            <Form >


                                <div className="n-chk d-flex  ">

                                    <div>

                                    </div>
                                </div>

                                <div className='form-row '>

                                    <div className="form-group  textOnInput col-md-3">

                                        <label >مفدار</label>
                                        <Field validate={validatNumber} name="quantity" type="number" className="form-control" id="inputZip" value={quantity}
                                            onChange={(e: any) => {
                                                SetQuantity(e.target.value)

                                            }} />
                                        {errors.quantity && touched.quantity && <div className="text-danger">{errors.quantity}</div>}

                                    </div>
                                    <div className="form-group  textOnInput col-md-3">
                                        <div className=" mb-4 " style={{ position: 'relative' }}>
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تاریخ بارنامه</label>
                                            <div className='form-group '>
                                                <DatePicker

                                                    calendar={persian}

                                                    locale={persian_fa}
                                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                    value={createDate}
                                                    onChange={handelCreateDate}
                                                />

                                            </div>

                                        </div>

                                    </div><div className="form-group  textOnInput col-md-3">

                                        <label >شماره بارنامه</label>
                                        <Field validate={validatAlpha} name="shippingNumber" type="text" className="form-control" id="inputZip" value={shippingNumber}
                                            onChange={(e: any) => {
                                                setshippingNumber(e.target.value)

                                            }} />
                                        {errors.shippingNumber && touched.shippingNumber && <div className="text-danger">{errors.shippingNumber}</div>}

                                    </div>
                                    <div className="form-group  textOnInput col-md-3">

                                        <label >سریال بارنامه</label>
                                        <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={shippingSerial}
                                            onChange={(e: any) => {
                                                setshippingSerial(e.target.value)

                                            }} />
                                        {errors.shippingSerial && touched.shippingSerial && <div className="text-danger">{errors.shippingSerial}</div>}

                                    </div>

                                </div>
                                <div className='form-row'>
                                    <div className="form-group  textOnInput col-md-4">

                                        <label >نام راننده</label>
                                        <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererName}
                                            onChange={(e: any) => {
                                                setdelivererName(e.target.value)

                                            }} />
                                        {errors.delivererName && touched.delivererName && <div className="text-danger">{errors.delivererName}</div>}

                                    </div>
                                    <div className="form-group  textOnInput col-md-4">

                                        <label >شماره راننده</label>
                                        <Field validate={validatMobail} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererNumber}
                                            onChange={(e: any) => {
                                                setdelivererNumber(e.target.value)

                                            }} />
                                        {errors.delivererNumber && touched.delivererNumber && <div className="text-danger">{errors.delivererNumber}</div>}

                                    </div>
                                    <div className="form-group  textOnInput col-md-4">

                                        <label >شماره پلاک</label>
                                        <Field validate={validatAlpha} name="shippingSerial" type="text" className="form-control" id="inputZip" value={delivererPlaque}
                                            onChange={(e: any) => {
                                                setdelivererPlaque(e.target.value)

                                            }} />
                                        {errors.delivererPlaque && touched.delivererPlaque && <div className="text-danger">{errors.delivererPlaque}</div>}

                                    </div>


                                </div>


                                <div className='row justify-content-center mt-3'>

                                    <div className='col-2 '>
                                        <button type="submit" className="btn btn-success" >تایید<ClipLoader

                                            loading={loading}
                                            color="#ffff"
                                            size={15}
                                        /></button>
                                    </div>


                                </div>
                            </Form>

                        )}



                    </Formik></div> : ''}
                </div>
            </Modal>)
        }
    }

    else {
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