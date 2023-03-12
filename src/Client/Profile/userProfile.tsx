import React, {Fragment, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ImCross, ImUser } from "react-icons/im";
import { GetOrganisationById } from "../../services/organisationService";
import { RootState } from "../../store";
import { GetAddress, GetAllProvince } from "../../services/addressService";
import { IoLocationOutline } from "react-icons/io5";
import { BsPinMap, BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { RiCellphoneLine } from "react-icons/ri";
import { AiOutlineMail, AiTwotoneDelete } from "react-icons/ai";
import ImageFileUploader from "./../../Utils/ImageFileUploader";
import { FaUserCircle } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import {
  DeleteAttachments,
  GetAttachments,
} from "./../../services/attachmentService";
import QueryString from "qs";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";
import { BiLocationPlus } from "react-icons/bi";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const attachmetURL = (window as any).globalThis.stie_att;

const UserProfile: React.FC = () => {
  const Navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const roles = useSelector((state: RootState) => state.roles);
  const [attachments, Setattachments] = useState([]);

  const [address, setAddress] = useState([]);
  const [province, setProvince] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const getProvince = async () => {
    const { data, status } = await GetAllProvince();
    setProvince(data.result.provinces);
  };
  const handelGetAttachment = async () => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        entityTypeId: 1,
        entityId: Number(localStorage.getItem("connect")),
        attachmentTypeId: 3,
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
  };
  useEffect(() => {
    getProvince();
    fetchApi();
    handelGetAttachment();
  }, []);
  const cities = province.filter((data: any) => data.parentId !== null);
  const CitiesrenderList = (id: any) => {
    return cities
      .filter((item: any) => item.id === id)
      .map((data: any) => data.name);
  };

  async function fetchApi() {
    const { data, status } = await GetAddress(
      1,
      Number(localStorage.getItem("connect"))
    );
    setAddress(data.result.addresses);
  }

  const navitage = () => {
    Navigate("/client/editProfile");
  };


  const hadelNewAdrress = () => {
    Navigate("/client/newAddress");
  };
 
 
  
  let iconStyles = { color: "black", fontSize: "1em", fill: "black" };
  let newAttachment: any = [];
  newAttachment = attachments.filter(
    (item: any) => item.deleted === false && item.attachmentTypeId === 3
  );

  
  return (
    <div className="row layout-spacing p-0 m-0">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 layout-top-spacing p-0 m-lg-0 mt-3">
        <div className="user-profile layout-spacing p-0 m-0">
          <div className=" dashboard-widget widget-content widget-content-area p-3">
            {newAttachment.length === 0 ? (
              <div className="text-center ">
                <img src="/assets/img/avatar.svg" />
                <div className="userProfileInfo">
                  <p>
                    {" "}
                    {user.firstName} {user.lastName}
                  </p>
                  <p> {user.userName}</p>
                  <p> {user.email}</p>
                  <p>
                    {" "}
                    اعتبار کیف پول: {user.maxValidity
                      ? user.maxValidity
                      : 0}{" "}
                    ریال
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center ">
                <img
                  src={`${attachmetURL}${newAttachment[0].path}`}
                  className="rounded-circle "
                  alt={`${user.firstName} ${user.lastName}`}
                  style={{ height: "80px", width: "80px" }}
                />
                <div className="userProfileInfo">
                  <p>
                    {" "}
                    {user.firstName} {user.lastName}
                  </p>
                  <p> {user.userName}</p>
                  <p> {user.email}</p>
                  <p>
                    {" "}
                    اعتبار کیف پول: {user.maxValidity
                      ? user.maxValidity
                      : 0}{" "}
                    ریال
                  </p>
                </div>
              </div>
            )}
            <div className="user-info-list">
              <div className="editProfileBtn">
                <span className="">
                  <svg
                    onClick={navitage}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit-3"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  ویرایش اطلاعات کاربری
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 layout-top-spacing py-3 px-0 m-0">
        <div className="user-profile layout-spacing">
          <div className=" dashboard-widget widget-content widget-content-area dashboard-widget pb-1">
            <div className="d-flex justify-content-center p-3 addressHeader">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><title>ionicons-v5-n</title>
                <path d="M256,48c-79.5,0-144,61.39-144,137,0,87,96,224.87,131.25,272.49a15.77,15.77,0,0,0,25.5,0C304,409.89,400,272.07,400,185,400,109.39,335.5,48,256,48Z"
                      style={{
                        fill: "none",
                        stroke:"#000",
                        strokeLinecap:"round",
                        strokeLinejoin:"round",
                        strokeWidth:"32px"}}
                />
                <circle cx="256" cy="192" r="48" style={{
                fill: "none",
                stroke:"#000",
                strokeLinecap:"round",
                strokeLinejoin:"round",
                strokeWidth:"32px"}}/></svg>
              <h5 className=""> آدرس ها</h5>
            </div>

            <div className="text-center ">
              <div className="">
              <div className="row m-auto text-center addressFiled ">
                {address.length !==0 ? (
                  address.map((item: any , index) => (
                    < Fragment key={index} >
                      <div className=" col-lg-6">
                        <div  className=" addressUser">
                        <p className="">
                         آدرس :
                          {item.fullAddress}
                        </p>
                        <p className="">
                          کدپستی :
                          {item.postalCode}
                        </p>

                        <p className="">
                        تلفن همراه : 
                          {item.receiverMobile}
                        </p>
                        </div>
                      </div>
                    </Fragment>
                  ))
                ) : (
                  <span className="p-3"> شما هیچ آدرسی ثبت نکردید</span>
                )}
                </div>
                <div className="addAddressUser">
                 
                  <MdOutlineAddLocationAlt   onClick={hadelNewAdrress} size="3rem"/>
                  <br/>
                  ثبت آدرس جدید
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
