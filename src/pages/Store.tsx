import React from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useAppSelector } from "../hooks/reduxHooks";

export const Store = () => {
  const { items, loadingTitle } = useAppSelector((state) => state.storeItems);

  return (
    <div>
      <h1>Store</h1>
      {loadingTitle ? (
        <div className={"d-flex align-items-center justify-content-center"}>
          <Spinner animation="border" variant="primary" className={"me-2"} />{" "}
          {loadingTitle}
        </div>
      ) : (
        <Row md={2} xs={1} lg={3} className={"g-3"}>
          {items.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
