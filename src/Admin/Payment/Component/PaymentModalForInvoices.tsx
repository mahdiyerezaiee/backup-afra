
import Modal from 'react-modal';
import { useState } from 'react';
import { GetPayments } from './../../../services/paymentService';
import QueryString from 'qs';
import { MeasureUnitSample } from './../../../Common/Enums/MeasureUnitSample';
import { useEffect } from 'react';
import { PriceUnitEnums } from './../../../Common/Enums/PriceUnit';



const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '30px',
        border: '2px ridge black'
    }

}


interface Props {
    modalOpen: any, closeModal: any, InvoiceId: any
}
const PaymentModalForInvoices: React.FC<Props> = ({ modalOpen, closeModal, InvoiceId }) => {

    const [Payments, SetPayments] = useState<any>([])

    useEffect(() => {
        GetPayment()

    }, [InvoiceId])
    const GetPayment = async () => {


        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                InvoiceId,
                IsAdmin: true,
                PageNumber: 0,
                PageSize: 10000


            }
            ,
            paramsSerializer: (params: any) => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetPayments(config);
            if (status === 200) {

                SetPayments(data.result.payments.values)




            }
        } catch (err) {
            console.log(err)
        }








    }


    let formatterForMoney = new Intl.NumberFormat('fa-IR', {

        currency: 'IRR'


    });
    return (
        <Modal

            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >
            <div className="d-block clearfix mb-2" onClick={closeModal}><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x close"
                data-dismiss="alert"><line x1="18" y1="6"
                    x2="6"
                    y2="18"></line><line
                        x1="6" y1="6" x2="18" y2="18"></line></svg></div>
            <div>
            <p className='text-center'> {`پرداختی های مربوط به صورتحساب شماره ${InvoiceId}`}</p>
                <div className=" rounded  " style={{ border: " 1px solid #bfc9d4" }} >

                    <div className=" p-2 containerT " >
                        <div className="col-lg-4 col-md-6 col-sm-11 ">
                                                        
                        </div>

                        <table
                            className="table table-bordered table-responsive  table-striped fixed_header "  >
                            <thead >
                                <tr style={{ fontSize: '10px' }}>
                                    <th style={{ fontSize: '10px' }} className="text-center">ردیف</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">#</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">کد پیگیری</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">قیمت</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">واحد</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">تاریخ ثبت</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">وضعیت پرداخت</th>
                                    <th style={{ fontSize: '10px' }} className="text-center">وضعیت تایید</th>


                                </tr>
                            </thead>
                            <tbody >
                                {Payments ?
                                    Payments.map((item: any, index: number) => (

                                        <tr  className='text-center' key={item.id}>
                                            <td data-th="ردیف">{index + 1}</td>
                                            <td data-th="#">{item.id}</td>
                                            <td data-th="کد پیگیری">{item.trackingCode}</td>
                                            <td data-th="قیمت">{formatterForMoney.format(item.price)}</td>
                                            <td data-th="واحد">{PriceUnitEnums.filter((q: any) => q.id === item.priceUnitId).map((x: any) => x.name)}</td>
                                            <td data-th="تاریخ ثبت">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                            <td data-th="وضعیت پرداخت">{item.paid ? 'پرداخت شده' : 'پرداخت نشده'}</td>
                                            <td  data-th="وضعیت تایید">{item.confirmed ? 'تایید شده' : 'تایید نشده'}</td>

                                        </tr>

                                    ))

                                    : <tr> <td colSpan={8}>پرداختی وجود ندارد </td></tr>}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </Modal>

    )
}

export default PaymentModalForInvoices