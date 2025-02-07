import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage";
import { BASE_URL } from "../shared/consts/api";
import { Profile } from "../shared/interfaces/user.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserState {
    token: string | null;
    loginErrorMessage?: string;
    profile?: Profile;
}

const initialState: UserState = {
    token: loadState<UserState>(JWT_PERSISTENT_STATE)?.token ?? null,
};

export const login = createAsyncThunk(
    "user/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorMessage =
                    (await response.json())?.message ||
                    "Invalid email or password";
                return rejectWithValue(errorMessage);
            }

            const data: { access_token: string } = await response.json();
            saveState({ token: data.access_token }, JWT_PERSISTENT_STATE); // Save to storage
            return data;
        } catch (err) {
            return rejectWithValue("Network error");
        }
    }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
    "user/getProfile",
    async (_, thunkApi) => {
        const token = thunkApi.getState().user.token;
        try {
            const response = await fetch(`${BASE_URL}/user/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            saveState({ token: null }, JWT_PERSISTENT_STATE);
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.payload as string;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
