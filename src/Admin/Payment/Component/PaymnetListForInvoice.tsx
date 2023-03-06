
import React, { useState, useMemo, useEffect } from 'react'
import QueryString from 'qs';
import { GetInvoicesWithSearch } from '../../../services/invoiceService';
import { accessor } from 'react-widgets/esm/PropTypes';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import AdvancedSearch from '../../../Common/Shared/Common/AdvancedSearch';
import Modal from 'react-modal';
import Select from 'react-select';
import { DateObject } from 'react-multi-date-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { EntityTypes } from '../../../Common/Enums/EntityTypesEnums';
import { PriceUnitEnums } from '../../../Common/Enums/PriceUnit';
import { PaymentStatusEnums } from '../../../Common/Enums/PaymentStatus';
import MyTable from '../../../Common/Shared/Form/MyTable';
import ModalGroupWork from '../../../Common/Shared/Common/ModalGroupWork';
import { InvoceTypes } from '../../../Common/Enums/InvoiceTypeIdEnums';
import { PaymentStructureEnums } from '../../../Common/Enums/PaymentStructureEnums';
import { ChangePaymentStatus, GetPayments } from '../../../services/paymentService';
import ChangePayment from './ChangePayment';
import { PaidEnum } from './../../../Common/Enums/PaidEnum';
import { ConfirmedEnum } from './../../../Common/Enums/ConfirmedEnum';
import { HasAttchmentEnum } from './../../../Common/Enums/HasAttchmentEnum';
import ImagePriviewerForPayment from '../../../Utils/ImagePriviewerForPayment';
import AdminImagePreviwerForPaymentList from './../../../Utils/AdminImagePreviwerForPaymentList';
import { toast } from 'react-toastify';
import MyTableBazargah from './../../../Common/Shared/Form/MyTableBazargah';
import TableForPaymentsInOrder from './../../../Common/Shared/Form/TableForPaymentsInOrder';





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
    InvoiceId: any
}
const PaymnetListForInvoice: React.FC<Props> = ({ InvoiceId }) => {


    const [selectedRows, setSelectedRows] = useState([])
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [payments, SetPayments] = useState([])


    const companies = useSelector((state: RootState) => state.companies)




    let arrayOfSelectedData = [];
    const getSelectedData = (data: any) => {

        arrayOfSelectedData = data.map((item: any) => item.original);


        return (arrayOfSelectedData)

    }
    const getBulkJob = (selected: any) => {
        if (selected === 2) {
            enableSelectedItem()
        }
        if (selected === 3) {
            copySelectedItem()
        }
        if (selected === 4) {
            DeleteSelectedItem()
        }
        if (selected === 5) {
            disableSelectedItem()
        }
    }



    const DeleteSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < arrayOfData.length; i++) {

            // try {
            //     const { data, status } = await DeleteSupply(arrayOfData[i].id)
            //     if (data.result.success === true) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }
            //     if (data.result.success === false) {
            //         SetOpen(true)

            //         SetStateError(errorCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }

    }
    const copySelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map((item: any) => {
            return { ...item, id: 0, active: true, createDate: new Date() }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            // try {
            //     let payload = {
            //         'supply': copyData[i]
            //     }
            //     const { data, status } = await SetSupply(payload)
            //     if (status === 200) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }


    }
    const enableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map((item: any) => {
            return { ...item, active: true }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            // try {
            //     let payload = {
            //         'supply': copyData[i]
            //     }

            //     const { data, status } = await SetSupply(payload)
            //     if (status === 200) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }


    }
    const disableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map((item: any) => {
            return { ...item, active: false }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            // try {

            //     let payload = {
            //         'supply': copyData[i]
            //     }

            //     const { data, status } = await SetSupply(payload)
            //     if (status === 200) {
            //         SetOpen(true)
            //         SetStateSuccess(successCount += 1)
            //     }


            // } catch (error) {
            //     SetOpen(true)

            //     SetStateError(errorCount += 1)
            // }


        }


    }



    const getDataBySearch = async () => {
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




    useEffect(() => {
        getDataBySearch()

    }, [InvoiceId])
    let formatterForMoney = new Intl.NumberFormat('fa-IR', {

        currency: 'IRR'


    });
    const CompaniesIDs = () => {
        return (companies.map(data => ({ label: data.name, value: data.id })))
    }
    const EntityTypesIDs = () => {

        return (EntityTypes.filter((item: any) => item.id === 10 || item.id === 11).map((data: any) => ({ label: data.name, value: data.id })))
    }
    const PriceUnitIDS = () => {
        return (PriceUnitEnums.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const PaymentStatusIds = () => {
        return (PaymentStatusEnums.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const PaumentMrthodIds = () => {
        return (PaymentStructureEnums.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const Paids = () => {
        return (PaidEnum.map((data: any) => ({ label: data.name, value: data.value })))
    }
    const Confirms = () => {
        return (ConfirmedEnum.map((data: any) => ({ label: data.name, value: data.value })))
    }
    const HasAttach = () => {
        return (HasAttchmentEnum.map((data: any) => ({ label: data.name, value: data.value })))

    }
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'کد پیگیری', accessor: 'trackingCode' },
        {
            Header: 'قیمت', accessor: 'price', Cell: (rows: any) => {

                return (formatterForMoney.format(rows.row.original.price))

            }
        },
        {
            Header: 'واحد', accessor: 'priceUnitId', Cell: (rows: any) => {

                return (PriceUnitEnums.filter((i: any) => i.id === rows.row.original.priceUnitId).map((i: any) => i.name))
            }
        },
        {
            Header: 'وضعیت پرداخت', accessor: 'paymentStatusId', Cell: (rows: any) => {

                return (PaymentStatusEnums.filter((i: any) => i.id === rows.row.original.paymentStatusId).map((i: any) => i.name))
            }
        },
        {
            Header: 'نوع پرداخت', accessor: 'paymentMethodId', Cell: (rows: any) => {


                return (PaymentStructureEnums.filter((i: any) => i.id === rows.row.original.paymentMethodId).map((i: any) => i.name))
            }
        },
        {
            Header: 'تاریخ ثبت ', accessor: 'createDate', Cell: (rows: any) => {

                return (new Date(rows.row.original.createDate).toLocaleDateString('fa-IR'))
            }
        },
        {
            Header: 'تاریخ سررسید ', accessor: 'paymentDueDate', Cell: (rows: any) => {



                if (rows.row.original.paymentDueDate !== null) {
                    return (new Date(rows.row.original.paymentDueDate).toLocaleDateString('fa-IR'))
                }
                else {
                    return ('')
                }
            }
        },


        { Header: 'توضیحات', accessor: 'comment' },
        {
            Header: '  پرداخت شده', accessor: '', Cell: (row: any) => {
                const [active, setActive] = useState(row.row.original.paid)
                const id = row.row.original.id

                const activeChang = {

                    "paymentId": id,
                    "paymentStatusId": null,
                    "confirmed": null,
                    "paid": !active

                }

                const activeHandler = async () => {
                    setActive(!active);
                    try {
                        const { data, status } = await ChangePaymentStatus(activeChang)
                        if (status === 200) {
                            toast.success('وضعیت پرداخت با موفقیت تغییر کرد',
                                {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined
                                })
                        }
                    } catch (err) {
                        console.log(err)
                    }


                }
                if (active === true) {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="feather feather-check  " onClick={activeHandler} style={{ color: 'green' }}>
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>)
                } else {
                    return (<svg xmlns="http://www.w3.org/2000/svg" data-dismiss="alert" width="21" height="21"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x  danger " onClick={activeHandler} style={{ color: 'red' }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>)
                }


            }
        }, {
            Header: '  تایید شده', accessor: '', Cell: (row: any) => {
                const [active, setActive] = useState(row.row.original.confirmed)
                const id = row.row.original.id

                const activeChang = {

                    "paymentId": id,
                    "paymentStatusId": null,
                    "confirmed": !active,
                    "paid": null

                }

                const activeHandler = async () => {
                    setActive(!active);



                    try {
                        const { data, status } = await ChangePaymentStatus(activeChang)
                        if (status === 200) {
                            toast.success('وضعیت تایید با موفقیت تغییر کرد',
                                {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined
                                })
                        }
                    } catch (err) {
                        console.log(err)
                    }


                }
                if (active === true) {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="feather feather-check  " onClick={activeHandler} style={{ color: 'green' }}>
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>)
                } else {
                    return (<svg xmlns="http://www.w3.org/2000/svg" data-dismiss="alert" width="21" height="21"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x  danger " onClick={activeHandler} style={{ color: 'red' }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>)
                }


            }
        },





    ], [payments])

    const data = useMemo(() => payments, [payments])



    console.log(data);

    if (payments) {
        return (
            <div className="rounded">

                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12  '>
                    </div>
                </div>


                <div className=" statbox widget-content widget-content-area">





                    {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}


                    <div>

                        <TableForPaymentsInOrder columns={columns} data={data}


                        />



                    </div>
                    <div className="d-flex justify-content-end">

                    </div>
                </div>

            </div >


        )
    }
    else {
        return (
            <div className="rounded text-center">

           

                <p>پرداختی جهت نمایش موجود نمیباشد</p>
                

            </div >)
    }


}

export default PaymnetListForInvoice