import React,{useState,useMemo} from 'react'
import  QueryString  from 'qs';
import { GetInvoicesWithSearch } from '../../../services/invoiceService';
import { accessor } from 'react-widgets/esm/PropTypes';

const InvoiceList:React.FC = () => {
    const [PageNumber, setPageNumber] = useState(getPage().PageNumber ? getPage().PageNumber : 0)
    const [PageSize, setPageSize] = useState(getPage().PageSize ? getPage().PageSize : 10)
    const [totalCount, setTotalCount] = useState(0);
    const [selectedRows, setSelectedRows] = useState([])
    const [getData, setGeData] = useState(false)
    const [invoices,SetInvoice]=useState([])


    const param = { PageSize, PageNumber }

    function getPage() {
        let items = JSON.parse(String(sessionStorage.getItem(`param${window.location.pathname}`)));
        return items ? items : ''


    }
    const params = { }
    function getDefault() {
        let items = JSON.parse(String(sessionStorage.getItem(`params${window.location.pathname}`)));
        return items ? items : ''

    }
    let arrayOfSelectedData = [];
    const getSelectedData = (data:any) => {

        arrayOfSelectedData = data.map((item:any) => item.original);


        return (arrayOfSelectedData)

    }
    const getBulkJob = (selected:any) => {
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
        const copyData = arrayOfData.map((item:any) => {
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
        const copyData = arrayOfData.map((item:any) => {
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
        const copyData = arrayOfData.map((item:any) => {
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

    const GetIvoices = async () => {
        if (getData) {
            sessionStorage.clear()

        }

        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {
                
                PageNumber,
                PageSize


            }
            ,
            paramsSerializer: (params:any) => {

                return QueryString.stringify(params)
            }

        };

        try {
            const { data, status } = await GetInvoicesWithSearch(config);
            if (status === 200) {
                setGeData(false)
                SetInvoice(data.result.invoices.values)
                setTotalCount(data.result.invoices.totalCount)
            
            }
        } catch (err) {
            console.log(err)
        }

    }

const columns=useMemo(()=>[
    {Header:'#' ,accessor:'id'},
    {Header:'نام و نام خانوادگی' ,accessor:'customerName'},
    {Header:'نام سازمان' ,accessor:'organizationName'},
    {Header:'نوع صورتحساب' ,accessor:'invoiceTypeId'},
    {Header:'نوع موجودیت' ,accessor:'entityTypeId'},
    {Header:'شناسه ' ,accessor:'entityId'},
    {Header:'قیمت' ,accessor:'price'},
    {Header:'واحد' ,accessor:'priceUnitId'},
    {Header:'نوع پرداخت' ,accessor:'paymentStatusId'},
    {Header:'' ,accessor:'paymentStatusId'},
    {Header:'نوع پرداخت' ,accessor:'paymentStatusId'},
    {Header:'نوع پرداخت' ,accessor:'paymentStatusId'},


],[])
  return (
    <div>InvoiceList</div>
  )
}

export default InvoiceList