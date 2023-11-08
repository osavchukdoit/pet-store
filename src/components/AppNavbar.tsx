import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/reduxHooks";
import { removeUser } from "../store/slices/userSlice";
import { AppModal } from "./AppModal";
import { ShoppingCartButton } from "./ShoppingCartButton";

export const AppNavbar = () => {
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogOut = () => {
    dispatch(removeUser());
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar className={"bg-white shadow-sm mb-3 sticky-top"} data-testid={"nav-bar"}>
        <Container>
          <Nav className={"me-auto"}>
            <Nav.Link to={"/store"} as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to={"/tracker"} as={NavLink}>
              Tracker
            </Nav.Link>
            <Nav.Link to={"/about"} as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <Button
            onClick={isAuth ? () => setShowModal(true) : handleLogIn}
            className={"ms-auto me-3"}
            variant={"outline-primary"}
          >
            {isAuth ? "Log Out" : "Log In"}
          </Button>
          <ShoppingCartButton />
        </Container>
      </Navbar>
      <AppModal
        show={showModal}
        setShow={setShowModal}
        title={"Log Out?"}
        body={`Are you sure you want to logout from ${email}?`}
        closeTitle={"Stay Signed In"}
        processTitle={"Log Out"}
        onAccept={handleLogOut}
      />
    </>
  );
};
