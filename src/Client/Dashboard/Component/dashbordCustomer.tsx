import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import News from "../../../Common/Shared/News/news";
import { Fragment, useState } from "react";
import SalesBoardForCustomer from "../../../Common/Shared/Common/salesBoard";
import BlockReport from "../../Reports/BlockReport";
import { GridLoader } from "react-spinners";


const DashbordCustomer: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
       {loading ? <div className="loadingAddress">
        <div className="boxloadingAddress">
          <GridLoader loading={loading} color="#4236d6" />
        </div>
      </div> : null}
      <BlockReport setLoading={setLoading} />
      {/* <hr />
      /* <SalesBoardForCustomer setloading={setLoading} /> */}
      <hr /> 
      <News setloading={setLoading} />
    </Fragment>
  );
};
export default DashbordCustomer;
