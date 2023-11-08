import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useFetchDbStoreItemsQuery } from "../store/storeItemsApi";

export const Store = () => {
  const { data: items, error, isLoading } = useFetchDbStoreItemsQuery("");

  return (
    <div>
      <h1>Store</h1>
      {error ? <div>Something went wrong</div> : null}
      {isLoading ? (
        <div className={"d-flex align-items-center justify-content-center"}>
          <Spinner animation="border" variant="primary" className={"me-2"} />{" "}
          Loading products...
        </div>
      ) : (
        <Row md={2} xs={1} lg={3} className={"g-3"}>
          {items?.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
