import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invoice from "./components/nehemj/Invoice.js"
import Contract from './components/contract/Contract';
import Payment from './components/payment/Payment'
import Login from './pages/auth/Login';
import axios from "axios"
import ContractList from './components/contract/ContractList';
import SingleContract from './components/contract/SingleContract';
import NotFound from './pages/NotFound/NotFound';


axios.defaults.headers.common = { 'authorization': `Bearer ${localStorage.token}` }
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/invoice' element={<Invoice />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contract' element={<Contract />} />
      <Route path='/contract/list' element={<ContractList />} />
      <Route path='/contract/single/auth' element={<SingleContract />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
