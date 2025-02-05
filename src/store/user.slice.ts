import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    token: string | null;
}

const initialState: UserState = {
    token: null,
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
