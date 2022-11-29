import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UpdateShippingReport } from '../../../../services/outScopeService';
import { FadeLoader } from 'react-spinners/FadeLoader';


const UpdateAllShiping = () => {
const[loading,setLoading]=useState(false)
const navigate=useNavigate()
    let color = "#0c4088"
    const update = async () => {
        setLoading(true)
        try {
            const { data, status } = await UpdateShippingReport()
            if (status === 200) {
                setLoading(false)
            }
            navigate(-1)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{

        update()
    },[])

    if (loading) {
        return (

            <div className="text-center m-auto" >
                <p>دریافت اطلاعات ...</p>
                <FadeLoader style={{ position: 'absolute', top: '50%', left: '50%' }} loading={loading} color={color} />
            </div>
        )
    }
}

export default UpdateAllShiping