import React from 'react';
import ChartMain from "./chartMain";
import News from '../../news/news';
import SalesBoardForAdmin from './../../../components/common/salesBoardForAdmin';
import ReportBlock from "../../../components/chart/reportBlock";

const DashbordAdmin = () => {
  return(
      <div >
          <ReportBlock/>
          <hr/>

          <SalesBoardForAdmin/>
        <hr/>
          <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12" >
                  <News/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                  <ChartMain/>

              </div>
          </div>


      </div>
  )
}
export default DashbordAdmin