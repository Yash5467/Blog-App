import { Client, ID, Databases, Query } from "appwrite";
import config from "../config/config";

class PostService {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId }) {
    try {
   return   await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );

     
    } catch (error) {
      throw error;

      return false;
    }
  }

  async editPost({ title, content, featuredImage, status, postId }) {
    try {
   return   await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );

    } catch (error) {
      throw error;

      return false;
    }
  }

  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );

      return true;
    } catch (error) {
      throw error;

      return false;
    }
  }

  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(query= [Query.equal("status", "public")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        query
      );
    } catch (error) {
      throw error;
    }
  }
}

const postService = new PostService();

export default postService;
