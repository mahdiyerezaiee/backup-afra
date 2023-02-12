import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetOrganisationById } from "../../services/organisationService";
import { RootState } from "../../store";
import {AiOutlineWarning} from "react-icons/ai"
import {FcOrganization} from "react-icons/fc"
import { useNavigate } from "react-router-dom";
const OrganizationClient:React.FC=()=>{
    const user = useSelector((state:RootState) => state.user);
    const Navigate = useNavigate()

    const [organization, setOrganization] = useState<any>({});

    const getOrganiz = async () => {
if(user.organizationId !== null){
    try {
        let id = user.organizationId
        const { data, status } = await GetOrganisationById(id)
        setOrganization(data.result.organization)
      } catch (error) {
        console.log(error);
      }
}
       
      }
      const navigateOrganization = () => {
   
        Navigate(`/client/editorganization/${user.organizationId}`)
      
      }
    useEffect(()=>{
        getOrganiz()
    },[])
    if(user.organizationId !== null ){
        return(
            <Fragment>
                
        <div className=" dashboard-widget">
        <div className="row mt-2" >
<div className="col-12">
        <svg onClick={navigateOrganization} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="feather feather-edit-3  float-right">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg></div>
            {/* <FcOrganization size="5rem" /> */}

<div className="col-12"><h4 className="text-primary">نام سازمان</h4><b>{organization.name}</b></div>
<div className="col-12"><h4 className="text-primary">شناسه ملی </h4> <b>{organization.nationalId}</b></div>
<div className="col-12"><h4 className="text-primary">شماره ثبت سازمان</h4><b>{organization.registrationNumber}</b></div>
</div>
      </div></Fragment>)
    }else{
        return(<div className="text-center dashboard-widget">
            <AiOutlineWarning  size="5rem " color="gold"/>
<div>اطلاعاتی برای نمایش وجود ندارد</div>
        </div>)

    }
      
}
export default OrganizationClient