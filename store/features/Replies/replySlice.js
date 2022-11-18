import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  value: replies,
};

export const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    pushToReply: (state, { payload }) => {
      //   payload.target.push(payload.newValue);
      let newA = (payload[0] = [...payload[0], payload[1]]);
      payload[0] = newA;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pushToReply } = replySlice.actions;

export default replySlice.reducer;
