import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaGlobeAmericas } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // Add AiFillLike for the filled like icon
import { TfiComment } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import { deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

const Post = ({ data, id }) => {
    const { data: session } = useSession();
    console.log(session, "session")
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likes ? data.likes.length : 0);

  useEffect(() => {
    // Check if the current user has already liked the post
    if (data.likes && session) {
      setLiked(data.likes.includes(session.user.uid));
    }
  }, [data.likes, session]);

  const toggleLike = async () => {
    // Check if the user is authenticated
    if (!session) {
      // Handle the case where the user is not authenticated
      return;
    }

    const postRef = doc(db, "posts", id);

    if (!liked) {
      // If the user hasn't liked the post, add their UID to the likes array
      await updateDoc(postRef, {
        likes: arrayUnion(session.user.uid),
      });
      setLikesCount(likesCount + 1);
    } else {
      // If the user has liked the post, remove their UID from the likes array
      await updateDoc(postRef, {
        likes: arrayRemove(session.user.uid),
      });
      setLikesCount(likesCount - 1);
    }

    // Toggle the liked state
    setLiked(!liked);
  };

  const isAdmin = (post_data_id, session_id) => {
    if (post_data_id === session_id) return true;
    else if (session_id === "103122479951529079566") return true;

    return false;
  };


  return (
    <div className="py-4 bg-white rounded-[17px] shadow-md mt-5">
      <div className="px-4 flex justify-between items-center">
        <div className="flex gap-2">
          <img
            className="w-[44px] h-[44px] object-cover rounded-full"
            src={data.userImg}
            alt="dp"
          />
          <div>
            <h1 className="text-[16px] font-semibold">{data.username}</h1>
            <div className="text-gray-500 flex items-center gap-2">
              <p>1 d</p>
              <p>·</p>
              <FaGlobeAmericas />
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-[26px] flex gap-4">
          <FiMoreHorizontal className="cursor-pointer" />
          {isAdmin(data.id, session?.user?.uid) && (
            <MdOutlineClose
              className="cursor-pointer"
              onClick={() => {
                deleteDoc(doc(db, "posts", id));
              }}
            />
          )}
        </div>
      </div>

      <p className="px-4 mt-[15px] text-gray-800 font-normal">{data.text}</p>

      <div className="mt-[15px]">
        {data.image && <img src={data.image} alt="post pic" />}
      </div>

      <div className="mx-4 h-[1px] bg-gray-300 mt-[15px]"></div>

      <div className="flex mt-[7px] text-gray-500">
      <div className="flex gap-2 justify-center items-center w-[50%] py-2 rounded-[10px] hover:bg-gray-200 cursor-pointer" onClick={toggleLike}>
        {liked ? <AiFillLike className="text-[26px]" /> : <AiOutlineLike className="text-[26px]" />}
        <p className="font-medium">{likesCount} Likes</p>
      </div>
        <div className="flex gap-2 justify-center items-center w-[50%] py-2 rounded-[10px] hover:bg-gray-200 cursor-pointer">
          <TfiComment className="text-[20px] translate-y-[4px]" />
          <p className="font-medium">Comment</p>
        </div>
      </div>
    </div>
  );
};

export default Post;