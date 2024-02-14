import { Client, Databases, Account } from "appwrite";
// import { APP_PROJECT_ENDPOINT, APP_PROJECT_ID } from "@env";

// const appProjectEndpoint = APP_PROJECT_ENDPOINT;
// const appProjectID = APP_PROJECT_ID;

// export const client = new Client()
//   .setEndpoint("https://appadmin.casthost.net/v1")
//   .setProject("64d7d6158c3fc789f63b");

// client
//   .setEndpoint("https://appadmin.casthost.net/v1")
//   .setProject("64d7d6158c3fc789f63b"); // Replace with your project ID

// export const account = new Account(client);
// export { ID } from "appwrite";

export const endPoint = "https://appadmin.casthost.net/v1";
export const projectID = "64d7d6158c3fc789f63b";

const client = new Client().setEndpoint(endPoint).setProject(projectID);

export const account = new Account(client);

export const databases = new Databases(client);
export default client;
