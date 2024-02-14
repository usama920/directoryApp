import { ID, Account, Client } from "appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { projectID, endPoint } from "../hook/config";

const appwriteClient = new Client();

const APPWRITE_ENDPOINT = endPoint;
const APPWRITE_PROJECT_ID = projectID;

class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  //create a new record of user inside appwrite

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //TODO: create login feature
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount() :: " + error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session;
    } catch (error) {
      console.log("Appwrite service :: loginAccount() :: " + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentAccount() :: " + error);
    }
  }

  async logout() {
    try {
      AsyncStorage.removeItem("@user_info");
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: getCurrentAccount() :: " + error);
    }
  }
}

export default AppwriteService;
