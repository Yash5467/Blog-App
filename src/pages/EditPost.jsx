import React ,{useEffect,useState} from 'react'
import postService from '../services/PostService';
import { useParams } from 'react-router-dom';
import { Loader, PostForm } from '../components';

function EditPost() {
    const [postData,setPostData]=useState(null);
    const {slug}=useParams();

    useEffect(()=>{
       postService.getPost(slug).then((res)=>setPostData(res));
    },[])
   return postData?(
  <div>
      <PostForm post={postData}/>
  </div>
   ):<Loader/>;
}

export default EditPost