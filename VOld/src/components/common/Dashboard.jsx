import React from 'react';
import { useSelector } from 'react-redux';
import DashbordCustomer from '../../pages/customerpages/dashbord/dashbordCustomer';
import DashbordGuess from '../../pages/guesspages/dashbord/dashbordGuess';
import DashbordAdmin from './../../pages/adminpages/dashboard/dashbordAdmin';



const Dashboard = () => {
    const roles=useSelector(state => state.userRole);

  if (roles.includes(1)) {
    return (
      <DashbordGuess/>
    )
  }
  else if (roles.includes(2)) {
    return(
    <DashbordCustomer/>)
  }
  else if (roles.includes(7)||roles.includes(3)||roles.includes(4) ||roles.includes(5) ||roles.includes(6)) {
    return(
    <DashbordAdmin/>)
  }
}

export default Dashboard