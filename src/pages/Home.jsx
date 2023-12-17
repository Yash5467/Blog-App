import React, { useEffect, useState } from "react";
import postService from "../services/PostService";
import PostCard from "../components/PostCard/PostCard";
import { Loader } from "../components";
function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    try {
      postService.getPosts([]).then((res) => setPosts(res.documents));
    } catch (error) {
      throw error;
    }
  }, []);

  return posts? posts.length > 0 ? (
    <div className="flex flex-wrap m-7 gap-11" >
      {posts.map((post) => (
        <PostCard key={post.$id} {...post} />
      ))}
    </div>
  ) : (
    <div>please login</div>
  ):(<Loader/>)
}

export default Home;
