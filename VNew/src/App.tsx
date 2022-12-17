import React from 'react';
import MainLayout from "./component/layouts/MainLayout";
import {BrowserRouter} from "react-router-dom";
import AdminPannel from "./container/adminPannel";



function App() {
  return (
      <BrowserRouter>
        <AdminPannel/>

      </BrowserRouter>
  );
}

export default App;
