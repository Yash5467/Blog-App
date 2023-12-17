import { Client, Storage, ID } from "appwrite";
import config from "../config/config";

class StorageService {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadImage(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async previewImage(imgId) {
    try {
      return await this.storage.getFilePreview(config.appwriteBucketId, imgId);
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(imgId){
   try {
      return await this.storage.deleteFile(config.appwriteBucketId,imgId);
   } catch (error) {
       throw error
   }
  }
}
const storageService=new StorageService();
export default storageService