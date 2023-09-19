// pages/api/likePost.js
import { db } from "../../firebase"; // Import your Firebase database

export default async (req, res) => {
  const { postId } = req.body;
  const { user } = req.session;

  try {
    // Check if the user hasn't already liked the post
    const postDoc = await db.collection("posts").doc(postId).get();
    const postData = postDoc.data();

    if (!postData.likes.includes(user.id)) {
      // Update post likes
      await db.collection("posts").doc(postId).update({
        likes: [...postData.likes, user.id],
      });

      // Add the like to the user's liked posts
      await db.collection("users").doc(user.id).update({
        likedPosts: [...user.likedPosts, postId],
      });

      res.status(200).json({ message: "Post liked successfully." });
    } else {
      res.status(400).json({ message: "You already liked this post." });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
