import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ImCross, ImUser } from "react-icons/im"
import { GetOrganisationById } from "../../services/organisationService";
import { RootState } from "../../store";
import { GetAddress, GetAllProvince } from "../../services/addressService";
import { IoLocationOutline } from "react-icons/io5";
import { BsPinMap, BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { RiCellphoneLine } from "react-icons/ri";
import { AiOutlineMail, AiTwotoneDelete } from "react-icons/ai";
import ImageFileUploader from './../../Utils/ImageFileUploader';
import { FaUserCircle } from 'react-icons/fa';
import { TiPencil } from "react-icons/ti";
import { DeleteAttachments, GetAttachments } from './../../services/attachmentService';
import QueryString from 'qs';
import { toast } from 'react-toastify';


const attachmetURL = (window as any).globalThis.stie_att


const UserProfile: React.FC = () => {
  const Navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user);
  const roles = useSelector((state: RootState) => state.roles);
  const [attachments, Setattachments] = useState([]);

  const [address, setAddress] = useState([]);
  const [province, setProvince] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const getProvince = async () => {
    const { data, status } = await GetAllProvince();
    setProvince(data.result.provinces);
  }
  const handelGetAttachment = async () => {

    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        entityTypeId: 1,
        entityId: Number(localStorage.getItem('connect')),
        attachmentTypeId:3
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };
    try {
      const { data, status } = await GetAttachments(config);
      if (status === 200) {
        Setattachments(data.result.attachments);


      }
    } catch (error) {
      console.log(error);


    }
  }
  useEffect(() => {
    getProvince();
    fetchApi();
    handelGetAttachment()
  }, []);
  const cities = province.filter((data: any) => data.parentId !== null);
  const CitiesrenderList = (id: any) => {
    return (cities.filter((item: any) => item.id === id).map((data: any) => data.name))
  }





  async function fetchApi() {
    const { data, status } = await GetAddress(1, Number(localStorage.getItem('connect')));
    setAddress(data.result.addresses);
  }

  const navitage = () => {

    Navigate("/client/editProfile")



  }

  const navitageAddress = (id: any) => {

    Navigate(`/client/editAddress/${id}`)

  }

  const hadelNewAdrress = () => {
    Navigate('/client/newAddress')
  }
  const openModalUpload = () => {
    setModalOpen(true)
  }
  const CloseModalUpload = () => {
    setModalOpen(false)
  }
  const HandelDeleteAttachment = async (id: number) => {
    try {

      const { data, status } = await DeleteAttachments(id)
      if (status === 200) {

        toast.success("ویرایش با موفقعیت انجام شد", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        });

      }

    } catch (error) {

      console.log(error);
 
    }



  }
  let iconStyles = { color: "black", fontSize: "1em", fill: 'black' };
  let newAttachment: any = []
  newAttachment = attachments.filter((item: any) => item.deleted === false && item.attachmentTypeId===3)
  return (

    <div className="row layout-spacing">

      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 layout-top-spacing" >

        <div className="user-profile layout-spacing">
          <div className=" dashboard-widget widget-content widget-content-area dashboard-widget">
            <div className="d-flex justify-content-between">
              <h3 className="">اطلاعات</h3>

              <svg onClick={navitage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="feather feather-edit-3">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>

            </div>
            {newAttachment.length === 0 ? <div className="text-center user-info">



              <ImUser size={"4rem"} />
              <button onClick={() => openModalUpload()} className="border-0 bg-transparent non-hover"><TiPencil size="1.5rem" color="blue" /></button>
              <p >{user.firstName} {user.lastName}</p>

            </div> : <div className="text-center user-info">



              <img src={`${attachmetURL}${newAttachment[0].path}`} className="rounded-circle " alt={`${user.firstName} ${user.lastName}`} style={{height:"80px",width:"80px"}} />
              <button onClick={() => HandelDeleteAttachment(newAttachment[0].id)} className="border-0 bg-transparent non-hover"><ImCross size="1rem" color="red" title="حذف عکس"/></button>
              <p >{user.firstName} {user.lastName}</p>

            </div>}
            <div className="user-info-list">

              <div className="">
                <ul className="contacts-block list-unstyled">

                  <li className="contacts-block__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="feather feather-calendar">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {user.nationalCode}
                  </li>

                  <li className="contacts-block__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="feather feather-mail">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    {user.email}
                  </li>
                  <li className="contacts-block__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="feather feather-phone">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    {user.userName}
                  </li>

                </ul>
              </div>
              <ImageFileUploader closeModal={CloseModalUpload} modalIsOpen={ModalOpen} comment={'بارگزاری عکس پروفایل'} EntityTypesId={1} EntityId={user.id} />
            </div>
          </div>
        </div>



      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 layout-top-spacing" >

        <div className="user-profile layout-spacing">
          <div className=" dashboard-widget widget-content widget-content-area dashboard-widget">
            <div className="d-flex justify-content-between">
              <h5 className="">  آدرس ها</h5>

              <svg onClick={hadelNewAdrress} style={{ width: '24px', height: '38px' }} xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                className="bi bi-plus-circle" viewBox="0 0 17 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>




            </div>
            <div className="text-center user-info">



            </div>
            <div className="text-left ">

              <div className="">

                {address ? address.map((item: any) =>
                (

                  <>
                    <ul className="contacts-block list-unstyled">
                      <li className="contacts-block__item m-2">
                        <IoLocationOutline style={iconStyles} title=' آدرس' />
                        {item.fullAddress}
                      </li>
                      <li className="contacts-block__item m-2">
                        <AiOutlineMail style={iconStyles} title=' کد پستی' />
                        {item.postalCode}
                      </li>

                      <li className="contacts-block__item m-2">
                        <RiCellphoneLine style={iconStyles} title='تلفن همراه' />
                        {item.receiverMobile}
                      </li>
                    </ul>
                    <hr />
                  </>

                )
                ) : ''


                }

              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

  )
}
export default UserProfile