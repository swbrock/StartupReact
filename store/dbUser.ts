import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//CHANGE ALL "unknown" TO MATCH THE DATABASE'S USER MODEL

interface DbUserSliceProps {
  dbUser?: unknown;
}

const initialState: DbUserSliceProps = {};

export const DbUserSlice = createSlice({
  name: "dbUser",
  initialState,
  reducers: {
    setDbUser: (
      state: DbUserSliceProps,
      action: PayloadAction<unknown | undefined>
    ) => {
      state.dbUser = action.payload;
    },
  },
});

export const { setDbUser } = DbUserSlice.actions;

export default DbUserSlice.reducer;
