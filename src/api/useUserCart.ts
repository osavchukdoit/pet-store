import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { CartItem, setCartItems } from "../store/slices/shoppingCartSlice";
import { collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export const useUserCart = () => {
  const { id } = useAppSelector((state) => state.user);
  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

  const getUserCart = async () => {
    const q = query(collection(db, "users"), where("userId", "==", `${id}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const userProducts = doc.data().products;
      if (userProducts.length) {
        dispatch(setCartItems(userProducts));
      }
    });
  };

  const setUserCart = async (cartItems: CartItem[]) => {
    const usersRef = collection(db, "users");

    if (!isAuth) return;

    await setDoc(doc(usersRef, `${id}`), {
      userId: id,
      products: cartItems,
    });
  };

  return [getUserCart, setUserCart] as [typeof getUserCart, typeof setUserCart];
};
