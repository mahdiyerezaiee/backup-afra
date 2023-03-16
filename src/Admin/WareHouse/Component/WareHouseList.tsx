import React, { useState, useEffect } from 'react';
import {GetAllWareHouses, DeleteHouses, SetWareHouses} from '../../../services/wareHouseService';
import { useNavigate } from 'react-router-dom';
import {ModalHeader, Table} from 'react-bootstrap';
import { useMemo } from "react";
import MyTable from "../../../Common/Shared/Form/MyTable";
import { GetAttribute, GetAttributeValues } from '../../../services/attributeService'
import { DeleteNews } from "../../../services/newsService";
import Modal from "react-modal";
import { GetGroupsForEntity, GetGroupWithCompany } from '../../../services/GroupService';
import {toast} from "react-toastify";
import {DeleteSupplier, SetSupplier} from "../../../services/supplyService";
import ModalGroupWork from "../../../Common/Shared/Common/ModalGroupWork";
import MyTableBazargah from "../../../Common/Shared/Form/MyTableBazargah";
import { GetCompanyChild } from '../../../services/companiesService';
import MySimpleTable from './../../../Common/Shared/Form/MySimpleTable';

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
};

const WareHouseList:React.FC = () => {
    const [warehouse, setwarehouse] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [consumableQuantity, setConsumableQuantity] = useState<any>({});
    const [reservedQuantity, setReservedQuantity] = useState(0);
    const [id, setId] = useState(0)
    const [stateSuccess , SetStateSuccess ] = useState(0)
    const [stateError , SetStateError ] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const[selectedRows,setSelectedRows]=useState([])
    const[open,SetOpen]=useState(false);
    const [wareTypes, setWareTypes] = useState<any>([])

    const getTypesware = async () => {


        const response = await GetCompanyChild();
        let companies = response.data.result.companies
        let arr = []
        let finalArr:any=[]
        for (let i = 0; i < companies.length; i++) {

            const { data, status } = await GetGroupWithCompany(4, companies[i].id);

            if(data.result.groups.length>0)
            {
               arr.push(data.result.groups)
            }


        }

        finalArr=Array.prototype.concat.apply([], arr);

        setWareTypes(finalArr);



    }

   

    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData=[];
    const getSelectedData=(data:any)=>{

        arrayOfSelectedData= data.map((item:any)=>item.original);


        return(arrayOfSelectedData)

    }
    const getBulkJob=(selected:any)=>{
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
                const{data,status}=await DeleteHouses(arrayOfData[i].id)
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
        const copyData= arrayOfData.map((item:any)=>{return{...item,id:0,active:true,createDate:new Date()}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'wareHouse':copyData[i]
                }
                const{data,status}=await SetWareHouses(payload)
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
        const copyData= arrayOfData.map((item:any)=>{return{...item,active:true}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'wareHouse':copyData[i]
                }

                const{data,status}=await SetWareHouses(payload)
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
        const copyData= arrayOfData.map((item:any)=>{return{...item,active:false}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload={
                    'wareHouse':copyData[i]
                }
                const{data,status}=await SetWareHouses(payload)
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

    const openModal = (id:number) => {
        setIsOpen(true);
        setId(id)
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const closeModal2 = () => {
        setIsOpen2(false);
    }
    const getWareHouses = async () => {
        try {
            const { data, status } = await GetAllWareHouses();

            setwarehouse(data.result.wareHouses)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getTypesware()
        getWareHouses();

    }, [])
    
    const navigate = useNavigate()
    const editHandler = (id:number) => {
        navigate(`/admin/editwarehouse/${id}`)
    }
    const formHandler = () => {
        navigate("/admin/newwarehouse")
    }
    const deleteHandler = async () => {

        setIsOpen2(true)
        setIsOpen(false)

    }
    const deleteHandler2 = async () => {
        try {
            const { data, status } = await DeleteHouses(id)
            if (status === 200)
            {
                closeModal2()
                toast.success("انبار با موفقیت حذف شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                setIsOpen(false)
                getWareHouses()
            }if (status === 500)
            {
                closeModal2()

                toast.error("این انبار به یک یا چند کالا اختصاص داده شده است", {
                    position: "top-right",
                    closeOnClick: true
                });
                setIsOpen(false)

            }
        } catch (err) {
            console.log(err)
        }
        closeModal2()
        setIsOpen(false)

    }

    var formatter = new Intl.NumberFormat('fa-IR', {



    });
   let groupsname=wareTypes
    
    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'نام', accessor: 'name' },
        {
            Header: 'گروه انبار', accessor: (d:any)=>{
                
                let WareHosueType = groupsname.filter((item:any) => item.id ==d.groupId).map((item:any) => item.name)
                return(`${WareHosueType }`)
            }, Cell: (row:any) => {
              
                
               return( groupsname.filter((item:any) => item.id ==row.row.original.groupId).map((item:any) => item.name))


            }
        },
        {
            Header: 'حجم-کیلوگرم', accessor: 'capacity'
            
        },{Header:'نام شرکت',accessor:'companyName'},
        {
            Header: 'آدرس', accessor:'address'
        }
        ,
        {
            Header: 'عملیات', accessor: 'عمل', Cell: (row:any) => {



                return (
                    <ul className="table-controls">

                        <button className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="ویرایش"
                                onClick={e => editHandler(row.row.original.id)}   >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="feather feather-edit-2">
                                <path
                                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                        </button>


                        <button className="border-0 bg-transparent  non-hover edit-btn"
                                onClick={() => openModal(row.row.original.id)}

                                data-toggle="tooltip" data-placement="top" title="حذف">
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
                        </button>


                    </ul>
                )
            }
        }],[groupsname])
    const data = useMemo(() => warehouse,[warehouse,groupsname]);

    if(warehouse && warehouse.length >0){

        return (
            <div className='' >
                
                <div className=" statbox widget-content widget-content-area">
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Selected Option"
                        ariaHideApp={false}

                    >
                        <div style={{width:'20rem'}}>
                            <div className="d-block clearfix mb-2"   onClick={closeModal}><svg
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


                            <p> آیا مطمئنید  انبار  {warehouse.filter((data:any) => data.id === id).map((data:any) => data.name)}  </p>
                            <p>حذف شود ؟ </p>



                            <button className="btn btn-danger  float-left" onClick={deleteHandler}>حذف
                            </button>

                            {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}
                        </div>

                    </Modal>
                    <Modal
                        isOpen={modalIsOpen2}
                        onRequestClose={closeModal2}
                        style={customStyles}
                        contentLabel="Selected Option"
                        ariaHideApp={false}

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"
                             className="feather feather-alert-triangle text-danger p-2">
                            <path
                                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12" y2="17"></line>
                        </svg>


                        <>


                            <p>با پاک کردن انبار تمام اطلاعات  آن محصول در انبار پاک میشود </p>
                            <p>حذف شود ؟ </p>



                            <button className="btn btn-danger  float-left" onClick={deleteHandler2}>حذف
                            </button>

                            <button className="btn btn-success float-right" onClick={closeModal2}>خیر</button>
                        </>
                    </Modal>
                    <div >
                        <button className="btn btn-primary m-3" onClick={formHandler}> تعریف انبار جدید</button>


                        <MySimpleTable columns={columns} data={data} getData={(rows:any)=>setSelectedRows(rows)} bulkJob={getBulkJob}/>
                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                    </div>
                </div>
            </div>


        )}
    else{
        return(
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <button className="btn btn-primary m-3" onClick={formHandler}> تعریف انبار جدید</button>





                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>




                    </div>
                </div>


            </div>
        )
    }
}

export default WareHouseList