import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PriceUnitEnums } from "../../../Common/Enums/PriceUnit";
import { CreateCredit } from "../../../services/creditService";
import { creditReducer, CreditState, setCredit, setCreditSuccess } from "../../../store/Slice/credit/CreditSlice";

interface Props {
    values:any ,
    navigate:any,
    dispatch:any,
}
    

export const submitCreateCredit = async (props:Props) => {
    console.log(props.values.value);
    
     try {
            const { data, status } = await CreateCredit();
        props.dispatch(setCredit(props.values))
            if (status === 200) {
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                props.navigate('/admin/Credits')}
 }
        catch (error) {
            console.log(error);
        }

    };
  export  const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });

    export const units=()=>{

        return(PriceUnitEnums.map((item:any)=>({label:item.name,value:item.id})))

    }