import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postLogin } from "../../api/rsvpApi";
import { RootState } from "../root";

const getLoginFromLocalStorage = () => {
  try {
    const token = localStorage.getItem("token");
    console.log("wat", token);
    return token || undefined;
  } catch (e) {
    console.log(e);
  }
};

const initialState: {
  token: string | undefined;
  status: string;
  error: any;
} = {
  token: getLoginFromLocalStorage(),
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // userAdded(state, action) {
    //   state.users.push(action.payload);
    // },
    // userArrived(state, action) {
    //   const { userId, arrived } = action.payload;
    //   const existingUser = state.users.find((user) => user.id === userId);
    //   if (existingUser) {
    //     existingUser.arrived = arrived;
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const selectLogin = (state: RootState) => state.login.token;

export const login = createAsyncThunk(
  "login/login",
  async ({ username, password }: { username: string; password: string }) => {
    const data = await postLogin(username, password);
    localStorage.setItem("token", data.token);
    return data;
  }
);
