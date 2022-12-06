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
          <ChartMain/>
          <hr/>

          <SalesBoardForAdmin/>
        <hr/>

                  <News/>




      </div>
  )
}
export default DashbordAdmin