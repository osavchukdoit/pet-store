import reducer, {
  setOperations,
  setOperation,
  removeOperation,
  initialState,
  Operation,
  OperationType,
} from "./operationsSlice";
import { describe, expect, test } from "vitest";

const mockOperations: Operation[] = [
  {
    id: "000",
    type: OperationType.income,
    title: "orange",
    amount: 2.35,
    date: 1699885162167,
  },
];
const newOperation = {
  id: "001",
  type: OperationType.income,
  title: "apple",
  amount: 1.42,
  date: 1699885162269,
};

describe("operationsSlice Reducer", () => {
  test("return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  test("set operations", () => {
    expect(reducer(initialState, setOperations(mockOperations))).toEqual({
      items: mockOperations,
    });
  });
  test("add new operation to empty state", () => {
    expect(reducer(initialState, setOperation(newOperation))).toEqual({
      items: [newOperation],
    });
  });
  test("add new operation to existing items", () => {
    expect(
      reducer({ items: mockOperations }, setOperation(newOperation))
    ).toEqual({
      items: [...mockOperations, newOperation],
    });
  });
  test("add new operation to existing items", () => {
    const modifiedMockOperation = {
      id: "000",
      type: OperationType.income,
      title: "orange",
      amount: 3.35,
      date: 1699885162167,
    };
    expect(
      reducer({ items: mockOperations }, setOperation(modifiedMockOperation))
    ).toEqual({
      items: [modifiedMockOperation],
    });
  });
  test("remove operation", () => {
    expect(
      reducer(
        { items: [...mockOperations, newOperation] },
        removeOperation({ id: "001" })
      )
    ).toEqual({
      items: [...mockOperations],
    });
  });
});
