import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import handler from "./api/hello";
import { data } from "autoprefixer";
import { increment, decrement } from "../store/features/counter/counterSlice";
import { pushToReply } from "../store/features/Replies/replySlice";

export default function Home() {
  const comments = useSelector((state) => state.counter.comments);
  const replyArray = useSelector((state) => state.reply.value);
  const [newComments, setNewComments] = useState(comments);
  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/Iamweird2/Interactive-Comments-Section/resources"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => setNewComments(data));
  }, []);

  const [newReplyArray, setNewReplyArray] = useState(replyArray);
  const user = useSelector((state) => state.counter.user);
  const dispatch = useDispatch();

  function handleReply(name, id, replyDiv) {
    replyDiv.classList.replace("hidden", "block");
  }
  function handleReplySend(inputValue, id, replyingTo) {
    let target = newReplyArray.find(
      (each) => newReplyArray.indexOf(each) + 1 == id
    );
    let newValue = {
      id: 3,
      content: inputValue,
      createdAt: "1 week ago",
      score: 4,
      replyingTo: replyingTo,
      user: {
        image: {
          png: "/images/avatars/image-juliusomo.png",
          webp: "/images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };
    dispatch(pushToReply([id, newValue]));
  }
  return (
    <main className="flex flex-col w-screen h-full gap-2 py-6 bg-bgColor text-textColor">
      {/* CHATS AND REPLIES */}
      {newComments.map((each) => {
        return (
          <div key={each.id} className="flex flex-col gap-4">
            <div className="flex flex-col w-[90%] bg-white mx-auto px-4 pt-4 pb-6 rounded-lg">
              <div className="flex gap-3">
                <span className="relative rounded-full w-7 h-7">
                  <Image src={each.user.image.png} alt="user Image" fill />
                </span>
                <span className="font-bold text-nameColor">
                  {each.user.username}
                </span>
                <span>{each.createdAt}</span>
              </div>
              <div className="my-3">{each.content}</div>
              <div className="flex justify-between w-full ">
                <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-counterBg">
                  <span
                    className="relative w-2 h-2"
                    onClick={() => dispatch(increment(each.id))}
                  >
                    <Image
                      fill
                      src="/images/icon-plus.svg"
                      alt="increment counter"
                    />
                  </span>
                  <span className="text-counterText">{each.score}</span>
                  <span
                    className="relative w-2 h-[2px]"
                    onClick={() => dispatch(decrement(each.id))}
                  >
                    <Image
                      fill
                      src="/images/icon-minus.svg"
                      alt="decrement counter"
                    />
                  </span>
                </div>
                <div className="flex items-end gap-2 text-counterText">
                  {" "}
                  {each.user.username !== "juliusomo" ? (
                    <>
                      <div className="relative w-3 h-3 mb-1">
                        {" "}
                        <Image src="/images/icon-reply.svg" alt="reply" fill />
                      </div>
                      <div
                        onClick={(e) => {
                          handleReply(
                            each.user.username,
                            each.id,
                            e.target.parentElement.parentElement.parentElement
                              .nextSibling
                          );
                        }}
                      >
                        Reply
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-3 row">
                      <div className="flex items-center gap-1">
                        <div className="relative flex items-center w-3 h-3">
                          <Image
                            src="/images/icon-delete.svg"
                            alt="delete-icon"
                            fill
                          />
                        </div>
                        <span>Delete</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="relative w-3 h-3 row">
                          <Image
                            src="/images/icon-edit.svg"
                            alt="delete-icon"
                            fill
                          />
                        </div>
                        <span>Edit</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* CONTAINER TO TAKE IN REPLIES */}
            <div className=" reply hidden w-[90%] py-4 mx-auto bg-white  rounded-xl">
              <div className="w-[90%] mx-auto mb-4 p-3 h-20  border-slate-300 border-[1px] rounded-md">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full outline-none text-start"
                />
              </div>
              <div className="flex justify-between w-[90%] mx-auto">
                <div className="relative rounded-full w-7 h-7">
                  <Image src={user.image.png} alt="user" fill />
                </div>
                <button
                  className="px-5 py-2 text-white rounded-lg bg-counterText"
                  onClick={(e) => {
                    handleReplySend(
                      e.target.parentElement.parentElement.firstChild.firstChild
                        .value,
                      each.id,
                      each.user.username
                    );
                  }}
                >
                  {" "}
                  SEND
                </button>
              </div>
            </div>

            {/* EACH COMMENT REPLY. STRAIGHT LINE AND REPLY CONTENT */}
            <div className="flex flex-row items-stretch w-[90%] mx-auto justify-between">
              <div className="w-[2px] bg-slate-300  "></div>
              <div className="w-[90%] flex flex-col gap-4">
                {console.log(newComments, newReplyArray)}
                {newReplyArray
                  .find(
                    (eachReplyArray) =>
                      newReplyArray.indexOf(eachReplyArray) + 1 == each.id
                  )
                  .map((eachReply) => {
                    return (
                      <div
                        key={eachReply.id}
                        className="flex flex-col w-full bg-white  px-[13px] pt-4 pb-6 rounded-lg"
                      >
                        <div className="flex gap-3">
                          <span className="relative rounded-full w-7 h-7">
                            <Image
                              src={eachReply.user.image.png}
                              alt="user Image"
                              fill
                            />
                          </span>
                          <span className="font-bold text-nameColor">
                            {eachReply.user.username}
                          </span>
                          <span>{eachReply.createdAt}</span>
                        </div>
                        <div className="my-3">
                          <span className="mr-1 font-bold">
                            @ {eachReply.replyingTo}
                          </span>
                          {eachReply.content}
                        </div>
                        <div className="flex justify-between w-full ">
                          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-counterBg">
                            <span
                              className="relative w-2 h-2"
                              onClick={() => dispatch(increment(eachReply.id))}
                            >
                              <Image
                                fill
                                src="/images/icon-plus.svg"
                                alt="increment counter"
                              />
                            </span>
                            <span className="text-counterText">
                              {eachReply.score}
                            </span>
                            <span
                              className="relative w-2 h-[2px]"
                              onClick={() => dispatch(decrement(eachReply.id))}
                            >
                              <Image
                                fill
                                src="/images/icon-minus.svg"
                                alt="decrement counter"
                              />
                            </span>
                          </div>
                          <div className="flex items-end gap-2 text-counterText">
                            {" "}
                            {eachReply.user.username !== "juliusomo" ? (
                              <>
                                <div className="relative w-3 h-3 mb-1">
                                  {" "}
                                  <Image
                                    src="/images/icon-reply.svg"
                                    alt="reply"
                                    fill
                                  />
                                </div>
                                <div
                                  onClick={(e) =>
                                    handleReply(
                                      eachReply.user.username,
                                      each.id,
                                      e.target.parentElement.parentElement
                                        .parentElement.nextSibling.nextSibling
                                    )
                                  }
                                >
                                  Reply
                                </div>
                              </>
                            ) : (
                              <div className="flex gap-3 row">
                                <div className="flex items-center gap-1">
                                  <div className="relative flex items-center w-3 h-3">
                                    <Image
                                      src="/images/icon-delete.svg"
                                      alt="delete-icon"
                                      fill
                                    />
                                  </div>
                                  <span>Delete</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="relative w-3 h-3 row">
                                    <Image
                                      src="/images/icon-edit.svg"
                                      alt="delete-icon"
                                      fill
                                    />
                                  </div>
                                  <span>Edit</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* {replyArray.map((eachArray) => {
                  if (replyArray.indexOf(eachArray) + 1 == each.id) {
                  }
                  eachArray.map((eachReply) => {
                    return (
                      // <div
                      //   key={eachReply.id}
                      //   className="flex flex-col w-full bg-white  px-[13px] pt-4 pb-6 rounded-lg"
                      // >
                      //   <div className="flex gap-3">
                      //     <span className="relative rounded-full w-7 h-7">
                      //       <Image
                      //         src={eachReply.user.image.png}
                      //         alt="user Image"
                      //         fill
                      //       />
                      //     </span>
                      //     <span className="font-bold text-nameColor">
                      //       {eachReply.user.username}
                      //     </span>
                      //     <span>{eachReply.createdAt}</span>
                      //   </div>
                      //   <div className="my-3">
                      //     <span className="mr-1 font-bold">
                      //       @ {eachReply.replyingTo}
                      //     </span>
                      //     {eachReply.content}
                      //   </div>
                      //   <div className="flex justify-between w-full ">
                      //     <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-counterBg">
                      //       <span
                      //         className="relative w-2 h-2"
                      //         onClick={() => dispatch(increment(eachReply.id))}
                      //       >
                      //         <Image
                      //           fill
                      //           src="/images/icon-plus.svg"
                      //           alt="increment counter"
                      //         />
                      //       </span>
                      //       <span className="text-counterText">
                      //         {eachReply.score}
                      //       </span>
                      //       <span
                      //         className="relative w-2 h-[2px]"
                      //         onClick={() => dispatch(decrement(eachReply.id))}
                      //       >
                      //         <Image
                      //           fill
                      //           src="/images/icon-minus.svg"
                      //           alt="decrement counter"
                      //         />
                      //       </span>
                      //     </div>
                      //     <div className="flex items-end gap-2 text-counterText">
                      //       {" "}
                      //       {eachReply.user.username !== "juliusomo" ? (
                      //         <>
                      //           <div className="relative w-3 h-3 mb-1">
                      //             {" "}
                      //             <Image
                      //               src="/images/icon-reply.svg"
                      //               alt="reply"
                      //               fill
                      //             />
                      //           </div>
                      //           <div
                      //             onClick={(e) =>
                      //               handleReply(
                      //                 eachReply.user.username,
                      //                 each.id,
                      //                 e.target.parentElement.parentElement
                      //                   .parentElement.nextSibling.nextSibling
                      //               )
                      //             }
                      //           >
                      //             Reply
                      //           </div>
                      //         </>
                      //       ) : (
                      //         <div className="flex gap-3 row">
                      //           <div className="flex items-center gap-1">
                      //             <div className="relative flex items-center w-3 h-3">
                      //               <Image
                      //                 src="/images/icon-delete.svg"
                      //                 alt="delete-icon"
                      //                 fill
                      //               />
                      //             </div>
                      //             <span>Delete</span>
                      //           </div>
                      //           <div className="flex items-center gap-1">
                      //             <div className="relative w-3 h-3 row">
                      //               <Image
                      //                 src="/images/icon-edit.svg"
                      //                 alt="delete-icon"
                      //                 fill
                      //               />
                      //             </div>
                      //             <span>Edit</span>
                      //           </div>
                      //         </div>
                      //       )}
                      //     </div>
                      //   </div>
                      // </div>
                    );
                  });
                })} */}
              </div>
            </div>
          </div>
        );
      })}
      {/* input box */}
      <div className="w-[90%] py-4 mx-auto bg-white  rounded-xl">
        <div className="w-[90%] mx-auto mb-4 p-3 h-20  border-slate-300 border-[1px] rounded-md">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full break-words whitespace-pre-wrap outline-none text-start word-break"
          />
        </div>
        <div className="flex justify-between w-[90%] mx-auto">
          <div className="relative rounded-full w-7 h-7">
            <Image src={user.image.png} alt="user" fill />
          </div>
          <button
            className="px-5 py-2 text-white rounded-lg bg-counterText"
            onClick={(e) => {
              let id = newComments.length + 1;
              setNewComments([
                ...newComments,
                {
                  id: id,
                  content:
                    e.target.parentElement.previousElementSibling.firstChild
                      .value,
                  createdAt: "now",
                  score: 0,
                  user: {
                    image: {
                      png: "/images/avatars/image-juliusomo.png",
                    },
                    username: "juliusomo",
                  },
                  replies: [],
                },
              ]);
              setNewReplyArray([...newReplyArray, []]);
            }}
          >
            {" "}
            SEND
          </button>
        </div>
      </div>
    </main>
  );
}

// {
//   id: 3,
//   content: inputValue,
//   createdAt: "1 week ago",
//   score: 4,
//   replyingTo: replyingTo,
//   user: {
//     image: {
//       png: "/images/avatars/image-juliusomo.png",
//       webp: "/images/avatars/image-juliusomo.webp",
//     },
//     username: "juliusomo",
//   },

// {comments.map((each) => {
//   return (
//     <>
{
  /* <div
  key={each.id}
  className="flex flex-col w-[90%] bg-white mx-auto px-4 pt-4 pb-6 rounded-lg"
>
  <div className="flex gap-3">
    <span className="relative rounded-full w-7 h-7">
      <Image src={each.user.image.png} alt="user Image" fill />
    </span>
    <span className="font-bold text-nameColor">{each.user.username}</span>
    <span>{each.createdAt}</span>
  </div>
  <div className="my-3">{each.content}</div>
  <div className="flex justify-between w-full ">
    <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-counterBg">
      <span
        className="relative w-2 h-2"
        onClick={() => dispatch(increment(each.id))}
      >
        <Image fill src="/images/icon-plus.svg" alt="increment counter" />
      </span>
      <span className="text-counterText">{each.score}</span>
      <span
        className="relative w-2 h-[2px]"
        onClick={() => dispatch(decrement(each.id))}
      >
        <Image fill src="/images/icon-minus.svg" alt="decrement counter" />
      </span>
    </div>
    <div className="flex items-end gap-2 text-counterText">
      {" "}
      <div className="relative w-3 h-3 mb-1">
        {" "}
        <Image src="/images/icon-reply.svg" alt="reply" fill />
      </div>{" "}
      <div
        onClick={(e) =>
          handleReply(
            each.user.username,
            each.id,
            e.target.parentElement.parentElement.parentElement.nextSibling
              .nextSibling
          )
        }
      >
        Reply
      </div>
    </div>
  </div>
</div>; */
}

//       {/* PLACE TO PUT USER INPUTS */}
//       <div className="hidden flex-col w-[80%] bg-white ml-[15%] px-4 pt-4 pb-6 rounded-lg">
//         <div className="flex gap-3">
//           <span className="relative rounded-full w-7 h-7">
//             <Image src={user.image.png} alt="user Image" fill />
//           </span>
//           <span className="font-bold text-nameColor">
//             {user.username}
//           </span>
//           <span>1 min ago</span>
//         </div>
//         <div className="my-3">
//           <span className="font-bold text-counterText">
//             {" "}
//             @{each.user.username}
//           </span>{" "}
//           {inputContent}
//         </div>
//         <div className="flex justify-between w-full ">
//           <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-counterBg">
//             <span
//               className="relative w-2 h-2"
//               onClick={() => dispatch(increment())}
//             >
//               <Image
//                 fill
//                 src="/images/icon-plus.svg"
//                 alt="increment counter"
//               />
//             </span>
//             <span className="text-counterText">0</span>
//             <span
//               className="relative w-2 h-[2px]"
//               onClick={() => dispatch(decrement())}
//             >
//               <Image
//                 fill
//                 src="/images/icon-minus.svg"
//                 alt="decrement counter"
//               />
//             </span>
//           </div>
//           <div className="flex items-end gap-2 text-counterText">
//             {" "}
//             <div className="relative w-3 h-3 mb-1">
//               {" "}
//               <Image src="/images/icon-reply.svg" alt="reply" fill />
//             </div>{" "}
//             <div>Reply</div>
//           </div>
//         </div>
//       </div>

// {/* REPLYING TO OLD COMMENTS */}
// <div className=" reply hidden w-[90%] py-4 mx-auto bg-white  rounded-xl">
//   <div className="w-[90%] mx-auto mb-4 p-3 h-20  border-slate-300 border-[1px] rounded-md">
//     <input
//       type="text"
//       placeholder="Add a comment..."
//       className="w-full outline-none text-start"
//     />
//   </div>
//   <div className="flex justify-between w-[90%] mx-auto">
//     <div className="relative rounded-full w-7 h-7">
//       <Image src={user.image.png} alt="user" fill />
//     </div>
//     <button
//       className="px-5 py-2 text-white rounded-lg bg-counterText"
//       onClick={(e) => {
//         handleSend(
//           e.target.parentElement.parentElement.firstChild.firstChild
//             .value,
//           e.target.parentElement.parentElement.previousSibling,
//           e.target.parentElement.parentElement
//         );
//       }}
//     >
//       {" "}
//       SEND
//     </button>
//   </div>
// </div>
//       {/*  REPLIES FROM DATA.JSON */}
// {/* <div className="flex flex-row items-stretch w-[90%] mx-auto justify-between">
//   <div className="w-[2px] bg-slate-300   mr-"></div>
//   <div className="w-[90%] flex flex-col gap-2">
//     {each.replies.map((each) => {
//       return (
//         <div
//           key={each.id}
//           className="flex flex-col w-full bg-white  px-[13px] pt-4 pb-6 rounded-lg"
//         >
//           <div className="flex gap-3">
//             <span className="relative rounded-full w-7 h-7">
//               <Image
//                 src={each.user.image.png}
//                 alt="user Image"
//                 fill
//               />
//             </span>
//             <span className="font-bold text-nameColor">
//               {each.user.username}
//             </span>
//             <span>{each.createdAt}</span>
//           </div>
//           <div className="my-3">
//             <span className="mr-1 font-bold">
//               @ {each.replyingTo}
//             </span>
//             {each.content}
//           </div>
//           <div className="flex justify-between w-full ">
//             <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-counterBg">
//               <span
//                 className="relative w-2 h-2"
//                 onClick={() => dispatch(increment(each.id))}
//               >
//                 <Image
//                   fill
//                   src="/images/icon-plus.svg"
//                   alt="increment counter"
//                 />
//               </span>
//               <span className="text-counterText">{each.score}</span>
//               <span
//                 className="relative w-2 h-[2px]"
//                 onClick={() => dispatch(decrement(each.id))}
//               >
//                 <Image
//                   fill
//                   src="/images/icon-minus.svg"
//                   alt="decrement counter"
//                 />
//               </span>
//             </div>
//             <div className="flex items-end gap-2 text-counterText">
//               {" "}
//               <div className="relative w-3 h-3 mb-1">
//                 {" "}
//                 <Image
//                   src="/images/icon-reply.svg"
//                   alt="reply"
//                   fill
//                 />
//               </div>{" "}
//               <div>Reply</div>
//             </div>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div> */}
//     </>
//   );
// })}
{
  /* ADDING NEW COMMENTS */
}
{
  /* <div className="w-[90%] py-4 mx-auto bg-white  rounded-xl">
  <div className="w-[90%] mx-auto mb-4 p-3 h-20  border-slate-300 border-[1px] rounded-md">
    <input
      type="text"
      placeholder="Add a comment..."
      className="w-full break-words whitespace-pre-wrap outline-none text-start word-break"
    />
  </div>
  <div className="flex justify-between w-[90%] mx-auto">
    <div className="relative rounded-full w-7 h-7">
      <Image src={user.image.png} alt="user" fill />
    </div>
    <button
      className="px-5 py-2 text-white rounded-lg bg-counterText"
      onClick={() => handleSend()}
    >
      {" "}
      SEND
    </button>
  </div>
</div>; */
}
