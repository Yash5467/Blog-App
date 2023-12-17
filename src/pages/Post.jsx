import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../services/PostService";
import storageService from "../services/StorageService";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Loader } from "../components";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
        const [img,setImg]=useState(null);
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                storageService.previewImage(post.featuredImage).then((res)=>setImg(res))
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
       try {
        
        postService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteImage(post.featuredImage);
                navigate("/");
            }
            
        });
        
       } catch (error) {
        throw error
       }
    };

    return post ? (
        <div className="py-8">
        
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={img}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button  className="mr-3">
                                    Edit
                                </button>
                            </Link>
                            <button  onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            
        </div>
    ) : <Loader/>;
}