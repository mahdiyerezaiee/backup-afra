import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { GaugeChartCustom } from "../../../Common/Shared/Chart/GaugeChartCustom";
import { GetCoutaggeBrief } from "../../../services/reportService";
import GaugeChart from 'react-gauge-chart'

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


                        
                       

                            {Berief.map((item: any,index:number) =>
                                <>
                                 <div className="col-6 text-center">
                                    <h4 >{`${item.company.companyName}`}</h4>
                                    <GaugeChart id={` gauge${index}`} nrOfLevels={10} percent={(item.supplyAmount.quantity)/100}/>
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