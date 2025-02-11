import { configureStore } from "@reduxjs/toolkit";
import { JWT_PERSISTENT_STATE, userSlice } from "./user.slice";
import { saveState } from "./storage";
import { CART_PERSISTENT_STATE, cartSlice } from "./cart.slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
    },
});

store.subscribe(() => {
    saveState({ token: store.getState().user.token }, JWT_PERSISTENT_STATE);
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
