import React, { useEffect, useState } from "react";
import { AppModal, AppModalProps } from "./AppModal";
import {
  Operation,
  OperationType,
  setOperation,
} from "../store/slices/operationsSlice";
import { Alert, DropdownButton, Form } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import { capitalizeString } from "../utils/formatText";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

type OperationModal = Pick<AppModalProps, "show" | "setShow" | "title">;

type OperationModalProps = OperationModal & {
  id?: string;
};

export const OperationModal: React.FC<OperationModalProps> = ({
  id,
  show,
  setShow,
  title,
}) => {
  const dispatch = useAppDispatch();
  const { items: operations } = useAppSelector((state) => state.operations);

  const operationTypeValues = Object.values(OperationType);
  const [activeType, setActiveType] = useState(OperationType.expenses);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const newOperation: Operation = {
    id: id || Date.now().toString(),
    type: activeType,
    date: Date.now(),
    title: name,
    amount,
  };

  useEffect(() => {
    if (id) {
      const editOperation = operations.find((item) => item.id === id);
      if (!editOperation) return;
      setActiveType(editOperation.type);
      setName(editOperation.title);
      setAmount(editOperation.amount);
    }
  }, [id]);

  const onSave = () => {
    dispatch(setOperation(newOperation));
    if (!id) {
      setName("");
      setAmount(0);
    }
  };

  return (
    <AppModal
      show={show}
      setShow={setShow}
      title={title}
      body={
        <Form>
          <Form.Group className={"mb-2"}>
            <Form.Label>Operation name</Form.Label>
            <Form.Control
              type={"text"}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className={"mb-2"}>
            <Form.Label>Operation type</Form.Label>
            <DropdownButton title={capitalizeString(activeType)}>
              {operationTypeValues.map((item) => (
                <DropdownItem key={item} onClick={() => setActiveType(item)}>
                  {capitalizeString(item)}
                </DropdownItem>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group className={"mb-2"}>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type={"number"}
              min={"0"}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </Form.Group>
        </Form>
      }
      closeTitle={"Decline"}
      processTitle={"Save"}
      backdrop={"static"}
      onAccept={onSave}
    />
  );
};
