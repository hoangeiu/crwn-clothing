import { all, call, takeLatest, put, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import CartActionTypes from "./cart.types";
import { clearCart, setCartFromFireBase } from "./cart.actions";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selector";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield call(getUserCartRef, user.id);

  const cartSnapshot = yield cartRef.get();

  yield put(setCartFromFireBase(cartSnapshot.data().cartItems));
}

export function* updateCartToFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield call(getUserCartRef, currentUser.id);

      const cartItems = yield select(selectCartItems);

      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* onUserUpdateCart() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartToFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onUserSignIn),
    call(onUserUpdateCart),
  ]);
}
