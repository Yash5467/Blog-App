import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rtx } from "../index";
import { useNavigate } from "react-router-dom";
import postService from "../../services/PostService";
import storageService from "../../services/StorageService";
import { Input } from "../index";
function PostForm({ post }) {
  const [img, setImg] = useState();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        postId: post?.postId || "",
        content: post?.content || "",
        status: post?.status || "",
        file: post?.file || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    post
      ? storageService
          .previewImage(post.featuredImage)
          .then((res) => setImg(res))
      : null;
  }, []);
  const submit = async (data) => {
    try {
      if (post) {
        let imgUrl = await storageService.uploadImage(data.file[0]);

        if (imgUrl) {
          await storageService.deleteImage(post.featuredImage);
        }

        const dbPost = await postService.editPost({
          ...data,
          featuredImage: imgUrl.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const image = await storageService.uploadImage(data.file[0]);
        data.featuredImage = image.$id;
        console.log(data);
        const dbPost = await postService.createPost({
          ...data,
          userId: userData.$id,
        });
        console.log("error " + dbPost);
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.log("error occured");
      throw error;
    }
  };

  const titleTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subsciption = watch((value, { name }) => {
      if (name === "tittle") setValue("slug", titleTransform());
    });
  }, [watch, setValue, titleTransform]);
  return (
    <form onSubmit={handleSubmit(submit)} >
      <div className="px-2">
        <div className="flex w-full  justify-between mx-11 flex-wrap ">
        <div>
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
        </div>
         <div>
         </div>
          <div>
          <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("file", { required: !post })}
        />
       
          </div>
          
        </div>
      </div>
      <div className="w-[70%] mx-auto px-2">
      <Rtx
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />

      
      </div>
      <div className="mx-auto py-11 w-full flex justify-center " >
      <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
