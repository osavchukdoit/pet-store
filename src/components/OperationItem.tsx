import React, { useState } from "react";
import { Operation, removeOperation } from "../store/slices/operationsSlice";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { OperationModal } from "./OperationModal";
import { AppModal } from "./AppModal";
import { useAppDispatch } from "../hooks/reduxHooks";

type OperationItemProps = Operation;

export const OperationItem: React.FC<OperationItemProps> = ({
  id,
  title,
  amount,
  category,
  date,
}) => {
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <>
      <Card
        style={{ flexDirection: "row" }}
        className={"d-flex align-items-center mb-3"}
      >
        <Card.Img
          src={"/cart.svg"}
          width={"70px"}
          height={"70px"}
          // style={{ width: "50px", height: "100%" }}
          className={"p-3"}
          variant={"left"}
        />
        <Card.Body className={""}>
          <Card.Title className={"d-flex justify-content-between"}>
            <span>{title}</span>
            <span>{new Date(date).toLocaleDateString("en-US")}</span>
          </Card.Title>
          <Card.Footer
            className={
              "d-flex justify-content-between align-items-center p-0 pt-2"
            }
            style={{ background: "white" }}
          >
            <span className={"text-muted"}>{formatCurrency(amount)}</span>
            <ButtonGroup>
              <Button
                onClick={() => setShowEditModal(true)}
                variant={"secondary"}
              >
                Edit
              </Button>
              <Button
                onClick={() => setShowRemoveModal(true)}
                variant={"danger"}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Card.Body>
      </Card>
      <OperationModal
        title={"Edit operation"}
        show={showEditModal}
        setShow={setShowEditModal}
        id={id}
      />
      <AppModal
        show={showRemoveModal}
        setShow={setShowRemoveModal}
        title={"Remove"}
        body={`Are you sure you want to remove "${title}" operation?`}
        closeTitle={"Close"}
        processTitle={"Remove"}
        onAccept={() => dispatch(removeOperation({ id }))}
      />
    </>
  );
};
