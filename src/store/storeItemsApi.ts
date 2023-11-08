import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const storeItemsApi = createApi({
  reducerPath: "storeItemsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchDbStoreItems: builder.query({
      async queryFn() {
        try {
          const products: DocumentData[] = [];
          const productsSnapshot = await getDocs(
            collection(db, "products-test")
          );
          productsSnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            products.push(doc.data());
          });
          return { data: products };
        } catch (error) {
          console.error("Failed to get products:", error);
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchDbStoreItemsQuery } = storeItemsApi;
