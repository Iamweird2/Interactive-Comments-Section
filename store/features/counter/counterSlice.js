// import { createSlice } from "@reduxjs/toolkit";

// let comments = data.comments;
// let user = data.currentUser;
// const initialState = {
//   comments: comments,
//   user: user,
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state, { payload }) => {
//       let commentCard = state.comments.find((each) => each.id == payload);
//       commentCard.score = commentCard.score + 1;
//     },
//     decrement: (state, { payload }) => {
//       let commentCard = state.comments.find((each) => each.id == payload);
//       if (commentCard.score == 1) {
//         return;
//       } else {
//         commentCard.score = commentCard.score - 1;
//       }
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;
