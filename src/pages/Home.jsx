import React, { useEffect, useState } from "react";
import postService from "../services/PostService";
import PostCard from "../components/PostCard/PostCard";
import { Loader } from "../components";
function Home() {
  const [posts, setPosts] = useState([]);
   const [loading,setLoading]=useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      postService.getPosts([]).then((res) => setPosts(res.documents));
    } catch (error) {
      throw error;
    }
    finally{
      setLoading(false);
    }
  }, []);

  return !loading? posts.length > 0 ? (
    <div className="flex flex-wrap m-7 gap-11" >
      {posts.map((post) => (
        <PostCard key={post.$id} {...post} />
      ))}
    </div>
  ) : (
    <div className="flex w-full h-[100vh] justify-center items-center" ><span className="text-2xl text-red-600" >please login</span></div>
  ):(<Loader/>)
}

export default Home;
