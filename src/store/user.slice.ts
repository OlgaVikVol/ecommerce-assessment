import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
    token: string | null;
}

export interface UserState {
    token: string | null;
}

const initialState: UserState = {
    token: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.token ?? null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
