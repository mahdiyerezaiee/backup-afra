import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { GaugeChartCustom } from "../../../Common/Shared/Chart/GaugeChartCustom";
import { GetCoutaggeBrief } from "../../../services/reportService";
import GaugeChart from "react-gauge-chart";

const CoutaggeBrief: React.FC = () => {
  const params = useParams();
  const [Berief, setBrief] = useState<any>([]);

  const GetCoutaggeBerief = async () => {
    try {
      const { data, status } = await GetCoutaggeBrief(params.id);
      setBrief(data.result.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetCoutaggeBerief();
  }, []);
  const style = {
    height: "100px",
  };
  return (
    <div className=" statbox widget-content widget-content-area">
      <div className="row  ">
        <div className="mb-3 text-center col-12">
          <h4 className="text-center">گزارش بر مبنای کوتاژ</h4>
        </div>
        <div className="col-12 ">
          <div className="row mt-4">
            <div className="row  text-center">
              {Berief.map((item: any, index: number) => (
                <>
                  <div className="col-md-2 text-center rounded shadow m-4">
                    <h6 className="mt-4 mb-4">{`${item.company.companyName}`}</h6>
                    <GaugeChart
                      nrOfLevels={500}
                      cornerRadius={0}
                      arcPadding={0}
                      colors={[
                        "#00ffff",
                        "#009fff",
                        "#0080ff",
                        "#0010d9",
                        "#0020ff",
                      ]}
                      id={` gauge${index}`}
                      percent={item.supplyAmount.quantity}
                      textColor="#000"
                      formatTextValue={() => item.supplyAmount.quantity}
                    />
                    <p>مقدار عرضه</p>
                    <GaugeChart
                      id={` gauge${index}`}
                      percent={item.salesAmount.quantity}
                      textColor="#000"
                      nrOfLevels={1000}
                      cornerRadius={0}
                      arcPadding={0}
                          colors={[ "#50c878","#2e8b57", "#043927" ]}
                      formatTextValue={() => item.salesAmount.quantity}
                    />
                    <p>مقدار فروش</p>

                    {/* <hr className="my-4" style={{borderTop:'1px dashed '}}/> */}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoutaggeBrief;
