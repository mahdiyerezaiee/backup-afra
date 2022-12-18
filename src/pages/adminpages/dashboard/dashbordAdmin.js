import React from 'react';
import ChartMain from "./chartMain";
import News from '../../news/news';
import SalesBoardForAdmin from './../../../components/common/salesBoardForAdmin';
import ReportBlock from "../../../components/chart/reportBlock";
import OverDuePaymentsByAttachments from "../../../components/common/OverDuePaymentsByAttachments";
import ScheduleJob from "../report/ScheduleJob";

const DashbordAdmin = () => {
  return(
      <div >
          <OverDuePaymentsByAttachments/>
          <hr/>
          <ReportBlock/>
          <hr/>
          <ChartMain/>
          <hr/>

          <SalesBoardForAdmin/>
        <hr/>
<div className="row">
    <div className="col-lg-6 col-sm-12"> <News/></div>
    <div className="col-lg-6 col-sm-12"><ScheduleJob/></div>
</div>





      </div>
  )
}
export default DashbordAdmin