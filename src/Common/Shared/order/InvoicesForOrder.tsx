import React, { useState } from 'react'
import QueryString from 'qs';
import { GetInvoicesWithSearch } from '../../../services/invoiceService';
import { useEffect } from 'react';
import { PriceUnitEnums } from './../../Enums/PriceUnit';
import { PaymentStatusEnums } from './../../Enums/PaymentStatus';
import { PaymentStructureEnums } from './../../Enums/PaymentStructureEnums';
import { AiOutlineDollar } from 'react-icons/ai';
import PaymentModalForInvoices from './../../../Admin/Payment/Component/PaymentModalForInvoices';


interface Props {
    Order: any
}
const InvoicesForOrder: React.FC<Props> = ({ Order }) => {

    const { id } = Order
    const [Invoices, SetInvoice] = useState<any>([])
    const[modalOpenPayment,SetModalOpenPayment]=useState<boolean>(false)
    const[RowId,SetId]=useState(0)

    const getInvoice = async () => {

        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                EntityId: id,
                IsAdmin: true,
                PageNumber: 0,
                PageSize: 1000

            }
            ,
            paramsSerializer: (params: any) => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetInvoicesWithSearch(config);
            if (status === 200) {

                SetInvoice(data.result.invoices.values)


            }
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getInvoice()

    }, [id])

    let formatterForMoney = new Intl.NumberFormat('fa-IR', {

        currency: 'IRR'


    });
    const OpenPaymentModal=(id:any)=>{
        SetId(id)
        SetModalOpenPayment(true)
    }
    const closePaymnetModal=()=>{
SetModalOpenPayment(false)
    }

    if (Invoices) {
        return (

            <div>

                <div className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark  mt-4 p-2 "  >
                    <label> صورتحسابها </label>
                <PaymentModalForInvoices modalOpen={modalOpenPayment} closeModal={closePaymnetModal} InvoiceId={RowId} />
                    
                    <div className="p-2 ">
                        <table className="table m-1 table-striped  fixed_header  ">
                            <thead>
                                <tr>
                                    <th >#</th>
                                    <th >قیمت</th>
                                    <th >واحد</th>
                                    <th >وضعیت پرداخت</th>
                                    <th >نوع پرداخت</th>
                                    <th >تاریخ ثبت صورتحساب</th>
                                    <th >تاریخ سررسید </th>
                                    <th > توضیحات </th>
                                    <th >  پرداخت ها  </th>
                                </tr>
                            </thead>
                            <tbody className="text-center" id="InvoiceTable">
                                {Invoices && Invoices.map((item: any) => (

                                    <tr key={item.id}>
                                        <td data-th="#"  >{item.id}</td>
                                        <td data-th="قیمت"  >{formatterForMoney.format(item.price)}</td>
                                        <td data-th="واحد"  >{PriceUnitEnums.filter((i: any) => i.id === item.priceUnitId).map((i: any) => i.name)}</td>
                                        <td data-th="وضعیت پرداخت"  >{PaymentStatusEnums.filter((i: any) => i.id === item.paymentStatusId).map((i: any) => i.name)}</td>
                                        <td data-th="نوع پرداخت"  >{PaymentStructureEnums.filter((i: any) => i.id === item.paymentMethodId).map((i: any) => i.name)}</td>
                                        <td data-th="تاریخ ثبت صورتحساب"  >{item.createDate!==null? new Date(item.createDate).toLocaleDateString('fa-IR'):null }</td>
                                        <td data-th="تاریخ سررسید"  >{item.installmentStartDate!==null?new Date(item.installmentStartDate).toLocaleDateString('fa-IR'):null}</td>
                                        <td data-th="توضیحات"  >{item.comment}</td>
                                        <td data-th="پرداخت ها"  ><button className='border-0 bg-transparent ' onClick={()=>OpenPaymentModal(item.id)} ><AiOutlineDollar size={"1.5rem"}/></button></td>
                                       
                                        {/* new Date(rows.row.original.createDate).toLocaleDateString('fa-IR') */}

                                    </tr>


                                ))

                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
    else {
        return (<div>
            <div className="form-group mb-4 textOnInput col-lg-12 rounded border text-center border-dark  mt-4 p-2 ">
                <label>صورتحسابها  </label>
                <span className="text-center" >صورتحساب موجود نیست</span>

            </div>   </div>
        )
    }
}

export default InvoicesForOrder