import React,{useState,useEffect,useMemo} from 'react'
import {DeleteGroup, GetGroupsForEntity, SetGroup} from '../../../services/GroupService';
import { useNavigate } from 'react-router-dom';
import  Modal  from 'react-modal';
import MyTable from './../../../components/form/MyTable';
import ModalGroupWork from "../../../components/common/ModalGroupWork";
import MyTableBazargah from "../../../components/form/MyTableBazargah";

const WareHouseType = () => {

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
    const navigate=useNavigate();
    const [WarehouseG, setWareHouseG] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id , setId]= useState(0)
    const[selectedRows,setSelectedRows]=useState([])
    const [stateSuccess , SetStateSuccess ] = useState(0)
    const [stateError , SetStateError ] = useState(0)
    const[open,SetOpen]=useState(false);
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
        const arrayOfData=getSelectedData(selectedRows);
        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < arrayOfData.length; i++) {

            try {
                const{data,status}=await DeleteGroup(arrayOfData[i].id)
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
        const copyData= arrayOfData.map(item=>{return{...item,id:0,active:true,createDate:new Date()}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'group':copyData[i]
                }
                const{data,status}=await SetGroup(payload)
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
        const copyData= arrayOfData.map(item=>{return{...item,active:true}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {
                let payload={
                    'group':copyData[i]
                }

                const{data,status}=await SetGroup(payload)
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
        const copyData= arrayOfData.map(item=>{return{...item,active:false}})

        let successCount=0;
        let errorCount=0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload={
                    'group':copyData[i]
                }
                const{data,status}=await SetGroup(payload)
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
    const openModal =  (id) => {
        setIsOpen(true);
        setId(id)

    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const GetWareHouseGroup = async () => {
        const { data, status } = await GetGroupsForEntity(4);
        if (status === 200) {


            setWareHouseG(data.result.groups);
        }

    }
    useEffect(()=>{
        GetWareHouseGroup();
    },[])
    const editHandler = (id) => {
        navigate(`/EditWareHouseTypeName/${id}`)
    }
    const deletHandler =async () => {
        try {
            const {data , status}= await DeleteGroup(id)
            if (status===200)
            {
                setIsOpen(false)
                GetWareHouseGroup();
            }
        }catch (err){
            console.log(err)
        }
    }
    const columns=useMemo(()=>[
        { Header: 'شناسه', accessor: 'id' },
        { Header: 'نوع', accessor: 'name' }, { Header: 'عملیات', accessor: '11', Cell: row =>
            {

                return(
                    <ul className="table-controls">

                        <button className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="ویرایش"
                                onClick={e => editHandler(row.row.original.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="feather feather-edit-2">
                                <path
                                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                        </button>


                        <button  onClick={()=>openModal(row.row.original.id)  } className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="حذف">
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
                )}}
    ])
    const data=useMemo(()=>WarehouseG);
    const handelForm=()=>{
        navigate('/newwarehousetype')
    }

    if(WarehouseG && WarehouseG.length >0){
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>


                    </div>
                </div>

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


                            <p> آیا مطمئنید  گروه {WarehouseG.filter(item=> item.id === id).map(item=> item.name)}   </p>
                            <p>حذف شود ؟ </p>




                            <button className="btn btn-danger float-left" onClick={deletHandler}>حذف
                            </button>

                            {/*<button className="btn btn-success float-right" onClick={closeModal}>خیر</button>*/}
                        </div>
                    </Modal>
                    <div>
                        <button className="btn btn-primary m-3" onClick={handelForm}>تعریف گروه</button>
                        <MyTableBazargah columns={columns} data={data} getData={rows=>setSelectedRows(rows)}  bulkJob={getBulkJob}/>
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
                        <button className="btn btn-primary m-3" onClick={handelForm}>تعریف گروه</button>







                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>



                    </div>
                </div>


            </div>
        )
    }
}

export default WareHouseType