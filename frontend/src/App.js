import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import { Layout } from "./components/Layout";
import PriceList from "./components/PriceList";
import AboutUs from "./components/AboutUs";
import Login from "./components/Auth/Login";
import Reg from "./components/Auth/Reg";
import PersonalCab from "./components/PersonalCab";
import Contacts from "./components/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./Redux/Slices/auth";
import Basket from "./components/Basket";
import { fetchBasketAnalyzesMe, fetchBasketMe } from "./Redux/Slices/basket";
import Order from "./components/Order";
import Admin from "./components/Admin";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data || []);
  const basket = useSelector((state) => state.basket.basket || []);
  // const token = window.localStorage.getItem("token");

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (data.length !== 0) {
      dispatch(fetchBasketMe({id: data.id}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    if (basket.length !== 0) {
      dispatch(fetchBasketAnalyzesMe({id: basket.id}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='price' element={<PriceList/>}></Route>
          <Route path='aboutus' element={<AboutUs/>}></Route>
          <Route path='auth/login' element={<Login/>}></Route>
          <Route path='auth/reg' element={<Reg/>}></Route>
          <Route path='personalcab' element={<PersonalCab/>}></Route>
          <Route path='basket' element={<Basket/>}></Route>
          <Route path='order' element={<Order/>}></Route>
          <Route path='contacts' element={<Contacts/>}></Route>
          <Route path='admin' element={<Admin/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
