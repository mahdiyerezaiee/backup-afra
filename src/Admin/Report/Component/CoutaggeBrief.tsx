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
    const style = {

        height: '100px'
    }
    return (
        <div className=" statbox widget-content widget-content-area">
            <div className="row  ">
                <div className="mb-3 text-center col-12">
                    <p className="text-center">گزارش بر مبنای کوتاژ</p>
                </div>
                <div className="col-12 ">
                    <div className="row mt-4">


                        <div className="row  text-center">





                            {Berief.map((item: any, index: number) =>
                                <>
                                    <div className="col-4 text-center">
                                        <GaugeChart id={` gauge${index}`} percent={(item.supplyAmount.quantity)} textColor='#000' formatTextValue={() => item.supplyAmount.quantity} />

                                        <GaugeChart id={` gauge${index}`} percent={(item.salesAmount.quantity)} textColor='#000' formatTextValue={() => item.salesAmount.quantity} />

                                        <h5 >{`${item.company.companyName}`}</h5>
                                        <hr />

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