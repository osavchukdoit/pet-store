import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { AppNavbar } from "./components/AppNavbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ShoppingCart } from "./components/ShoppingCart";
import { Tracker } from "./pages/Tracker";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  return (
    <>
      <AppNavbar />
      <Container className={"mb-4"}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/tracker"} element={<Tracker />} />
          <Route path={"/store"} element={<Store />} />
          <Route path={"/about"} element={<About />} />
        </Routes>
      </Container>
      <ShoppingCart />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
