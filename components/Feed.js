import React, { useEffect, useState } from "react";
import Story from "./Story";
import WhatsOnYourMind from "./WhatsOnYourMind";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Set this to false when there are no more posts to load

  const fetchMorePosts = () => {
    // Fetch more posts here and add them to the 'posts' state
    // You can use a similar query with offset and limit
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="mx-auto mt-4 max-w-[600px] 2xl:max-w-[800px] mb-10">
      <Story />
      <WhatsOnYourMind />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading more posts...</h4>}
      >
        {posts.map((post) => (
          <Post key={post.id} id={post.id} data={post.data()} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
