import React, { useEffect, useState } from "react";
import postService from "../services/PostService";
import { PostCard } from "../components/index";
import {Loader} from '../components/index'

function AllPosts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    postService.getPosts([]).then((res) => setPosts(res.documents));
  }, []);

  return posts ? (
    <div className="flex flex-row :flex-wrap m-7 gap-11">
       
        {posts.map((post) => {
        return (
         
             <PostCard key={post.$id} {...post} />
        
        )
      })}
       
  
  
    </div>
  ) : (
 <Loader/>
  );
}

export default AllPosts;
