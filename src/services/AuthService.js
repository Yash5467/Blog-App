import { Client, Account, ID } from "appwrite";
import config from "../config/config";
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    try {
      const accountInfo = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return this.login(email, password);
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const loginInfo = await this.account.createEmailSession(email, password);

      return loginInfo;
    } catch (error) {
      throw error;
    }
  }

  async checkLogin() {
    try {
      const loginInfo = await this.account.get();
      return loginInfo;
    } catch (error) {
     console.log("not logged in")
    }
  }

  async logout() {
    try {
      const logoutInfo = await this.account.deleteSession("current");
      return logoutInfo;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
