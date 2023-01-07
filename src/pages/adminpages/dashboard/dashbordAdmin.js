import React, {useEffect} from 'react';
import ChartMain from "./chartMain";
import News from '../../news/news';
import SalesBoardForAdmin from '../../../Common/Shared/common/salesBoardForAdmin';
import ReportBlock from "../../../Common/Shared/chart/reportBlock";
import OverDuePaymentsByAttachments from "../../../Common/Shared/common/OverDuePaymentsByAttachments";
import ScheduleJob from "../report/ScheduleJob";

const DashbordAdmin = () => {
    useEffect(()=>{
        function reveal() {
            var reveals = document.querySelectorAll(".reveal");

            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                }
                    // else {
                //     reveals[i].classList.remove("active");
                // }
            }
        }

        document.getElementsByClassName("main-Layout")[0].addEventListener("scroll", reveal);
    },[window])
  return(
      <div >
          <div className="">
          <OverDuePaymentsByAttachments/>
      </div>
          <div className=" ">
              <ReportBlock/>
          </div>
          <div className="reveal fade-right">
              <ChartMain />
          </div>
          <div className="reveal fade-bottom">
              <SalesBoardForAdmin/>
          </div>


<div className="row mt-3 reveal fade-left">
    <div className="col-lg-6 col-sm-12"> <News/></div>
    <div className="col-lg-6 col-sm-12"><ScheduleJob/></div>
</div>





      </div>
  )
}
export default DashbordAdmin