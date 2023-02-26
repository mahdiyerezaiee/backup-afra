import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { GaugeChart } from "../../../Common/Shared/Chart/GaugeChart";
import { GetCoutaggeBrief } from "../../../services/reportService";

const CoutaggeBrief: React.FC = () => {
    const params = useParams()
    const [Berief, setBrief] = useState<any>([])


    const GetCoutaggeBerief = async () => {
        try {
            const { data, status } = await GetCoutaggeBrief(params.id)
            setBrief(data.result.result)

        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        GetCoutaggeBerief()

    }, [])
    return (
        <div className=" statbox widget-content widget-content-area">
            <div className="row  ">
              
                <div className="col-12 ">
                    <div className="row mt-4">

                        <div className="row  text-center">


                        
                       

                            {Berief.map((item: any) =>
                                <>
                                 <div className="col-6 text-center">
                                    <h4 >{`${item.company.companyName}`}</h4>
                                    <GaugeChart labels={null} data1={item.supplyAmount.quantity} data2={item.salesAmount.quantity} data3={null} />

                                    </div>
                                </>

                            )}
                        

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CoutaggeBrief