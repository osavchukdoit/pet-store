import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { OperationItem } from "../components/OperationItem";
import { OperationType, setOperations } from "../store/slices/operationsSlice";
import { Button, Tab, Tabs } from "react-bootstrap";
import { OperationModal } from "../components/OperationModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { capitalizeString } from "../utils/formatText";
import { formatCurrency } from "../utils/formatCurrency";

export const Tracker = () => {
  const { items: operations } = useAppSelector((state) => state.operations);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [tabKey, setTabKey] = useState<string>(OperationType.expenses);
  const [localStorageOperations, setLocalStorageOperations] = useLocalStorage(
    "operations",
    operations
  );

  useEffect(() => {
    // dispatch(
    //   setOperations([
    //     {
    //       id: 0,
    //       title: "salary",
    //       amount: 8000,
    //       type: OperationType.income,
    //       date: Date.now(),
    //     },
    //     {
    //       id: 1,
    //       title: "deposit",
    //       amount: 45,
    //       type: OperationType.income,
    //       date: Date.now(),
    //     },
    //     {
    //       id: 5,
    //       title: "grocery",
    //       amount: 25,
    //       type: OperationType.expenses,
    //       date: Date.now(),
    //     },
    //     {
    //       id: 6,
    //       title: "charity",
    //       amount: 2000,
    //       type: OperationType.expenses,
    //       date: Date.now(),
    //     },
    //     {
    //       id: 56,
    //       title: "clothes",
    //       amount: 245,
    //       type: OperationType.expenses,
    //       date: Date.now(),
    //     },
    //   ])
    // );
    dispatch(setOperations(localStorageOperations));
  }, []);

  useEffect(() => {
    setLocalStorageOperations(operations);
  }, [operations]);

  const tabBody = (type: string) => {
    const typeOperations = operations.filter((item) => item.type === type);
    const total = typeOperations.reduce((sum, item) => sum + item.amount, 0);

    return typeOperations.length ? (
      <Tab eventKey={type} title={capitalizeString(type)}>
        {typeOperations.map((item) => (
          <OperationItem key={item.id} {...item} />
        ))}
        <div>
          <p className={"text-muted"}>
            Total {type}: {formatCurrency(total)}
          </p>
          <span></span>
        </div>
      </Tab>
    ) : (
      <p>No operations</p>
    );
  };

  return (
    <>
      <h1>Tracker</h1>
      <Tabs
        id={"tracker-tabs"}
        activeKey={tabKey}
        onSelect={(key) => setTabKey(key || "")}
        fill
      >
        {Object.keys(OperationType).map((key) => tabBody(key))}
      </Tabs>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add operation
      </Button>
      <OperationModal
        title={"Add operation"}
        show={showModal}
        setShow={setShowModal}
      />
    </>
  );
};
