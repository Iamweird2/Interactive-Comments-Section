import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import replyReducer from "./features/Replies/replySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    reply: replyReducer,
  },
});
