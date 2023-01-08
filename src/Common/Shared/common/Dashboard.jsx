import React from 'react';
import { useSelector } from 'react-redux';
import DashbordCustomer from '../../../Client/Dashboard/Component/dashbordCustomer';
import DashbordGuess from '../../../Client/Dashboard/Component/dashbordGuess';
import DashbordAdmin from '../../../Admin/Dashboard/dashbordAdmin';



const Dashboard = () => {
    const roles=useSelector(state => state.roles);

  if (roles.includes(1)) {
    return (
      <DashbordGuess/>
    )
  }
  else if (roles.includes(2)) {
    return(
    <DashbordCustomer/>)
  }
  else if (roles.includes(7)||roles.includes(3)||roles.includes(4) ||roles.includes(5) ||roles.includes(6) ||roles.includes(8)) {
    return(
    <DashbordAdmin/>)
  }
}

export default Dashboard