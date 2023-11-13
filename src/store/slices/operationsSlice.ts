import { createSlice } from "@reduxjs/toolkit";

export enum OperationType {
  income = "income",
  expenses = "expenses",
}

export type Operation = {
  id: string;
  type: OperationType;
  title: string;
  amount: number;
  category?: string;
  date: number;
};

export const initialState = {
  items: <Operation[]>[],
};

const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    setOperations(state, action) {
      state.items = action.payload;
    },
    setOperation(state, action) {
      const { id }: Operation = action.payload;
      if (state.items.find((item) => item.id === id) == null) {
        state.items = [...state.items, action.payload];
      } else {
        const result = state.items.map((item) => {
          if (item.id === id) {
            return { ...item, ...action.payload };
          } else {
            return item;
          }
        });
        state.items = result;
      }
    },
    removeOperation(state, action) {
      const { id }: Operation = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { setOperations, setOperation, removeOperation } =
  operationsSlice.actions;
export default operationsSlice.reducer;
