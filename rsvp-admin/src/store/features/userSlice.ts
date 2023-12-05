import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRSVPUsers, markArrived } from "../../api/rsvpApi";
import { RootState } from "../root";

export enum Language {
  "FIN" = "FIN",
  "ENG" = "ENG",
}

export enum Source {
  "FORMS" = "FORMS",
  "TG" = "TG",
  "CUSTOM" = "CUSTOM",
}

export interface User {
  id: number;
  name?: string;
  arrived?: null | boolean;
  source: Source;
}

const initialState: {
  users: User[];
  status: string;
  error: any;
} = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
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
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(markUserArrived.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(markUserArrived.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.map((u) =>
          action.payload.id === u.id && action.payload.source === u.source
            ? { ...u, arrived: action.payload.arrived }
            : u
        );
      })
      .addCase(markUserArrived.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  /*postAdded, postUpdated, reactionAdded*/
} = userSlice.actions;

export default userSlice.reducer;

export const selectAllUsers = (state: RootState) => state.tg.users;

export const selectUserById = (state: RootState, userId: number) =>
  state.tg.users.find((user) => user.id === userId);

export const fetchUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "tg/fetchUsers",
  async (_, { getState }) => {
    const state = getState();
    if (!state.login.token) throw new Error("No token");
    return await fetchRSVPUsers(state.login.token);
  }
);

export const markUserArrived = createAsyncThunk<
  {
    id: number;
    arrived: boolean;
    source: Source;
  },
  {
    id: number;
    arrived: boolean;
    source: Source;
  },
  { state: RootState }
>(
  "tg/markArrived",
  async (
    { id, arrived, source }: { id: number; arrived: boolean; source: Source },
    { getState }
  ) => {
    const state = getState();
    if (!state.login.token) throw new Error("No token");
    return await markArrived(id, arrived, source, state.login.token);
  }
);
