import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreItemProps } from "../../components/StoreItem";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

type Item = DocumentData | StoreItemProps;

const initialState = {
  // items: <StoreItemProps[]>[],
  items: <Item[]>[],
  loadingTitle: <string>"",
};

export const fetchStoreItems = createAsyncThunk(
  "storeItems/fetchStoreItems",
  async function () {
    const products: DocumentData[] = [];
    try {
      const productsSnapshot = await getDocs(collection(db, "products-test"));
      productsSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        products.push(doc.data());
      });
    } catch (error) {
      console.error("Failed to get products:", error);
    }
    return products;
  }
);

const storeItemsSlice = createSlice({
  name: " ",
  initialState,
  reducers: {
    setStoreItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoreItems.pending, (state) => {
      state.loadingTitle = "Loading products...";
    });
    builder.addCase(fetchStoreItems.fulfilled, (state, action) => {
      state.loadingTitle = "";
      state.items = action.payload;
    });
  },
});

export const {} = storeItemsSlice.actions;
export default storeItemsSlice.reducer;
