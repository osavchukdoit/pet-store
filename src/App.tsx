import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { AppNavbar } from "./components/AppNavbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import React, { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { fetchStoreItems } from "./store/slices/storeItemsSlice";
import { ShoppingCart } from "./components/ShoppingCart";
import {Tracker} from "./pages/Tracker";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStoreItems());
  }, []);

  return (
    <>
      <AppNavbar />
      <Container className={"mb-4"}>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/tracker"} element={<Tracker />} />
          <Route path={"/store"} element={<Store />} />
          <Route path={"/about"} element={<About />} />
        </Routes>
      </Container>
      <ShoppingCart />
    </>
  );
};

export default App;
