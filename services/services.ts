import { User } from "models/models";
import { getSession } from "next-auth/react";
/**
 *
 * @param {string} endPoint string that will be concatenated to the url
 * @returns the url string to call the API
 */
export const ApiUrl = (endPoint: string) => {
  let url = "http://localhost/TestAPI.API/api/"; // unauthenticated URL;

  if (process.env.NODE_ENV == "production")
    url =
      "https://api.byu.edu/lifesciences/<your-app-context-here>/v1.0.0/api/"; // Authenticated URL

  if (endPoint) url = url + endPoint;
  return url;
};

/**
 *
 * @param {T} reqBody the info that is being sent to the API
 * @param {string} reqMethod GET, POST, PUT, DELETE
 * @param {string} serverAuth the authorization token for the middleman api/nextJS server to access the API unauthenticated
 * @returns the header for the outgoing request to the API
 */
export const makeHeader = async <T>(
  reqBody: T,
  reqMethod: string | undefined,
  serverAuth?: string
) => {
  const session = await getSession();
  let req: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(session?.user.accessToken && {
        Authorization: `Bearer ${session?.user.accessToken}`,
      }),
      ...(serverAuth !== undefined && {
        Authorization: `Bearer ${serverAuth}`,
      }),
    },
  };
  if (reqBody) req.body = JSON.stringify(reqBody);
  if (reqMethod) req.method = reqMethod;
  return req;
};

/**
 *
 * @param {unknown} err any caught error from the API
 * this method is to catch any error from the API and display it
 *
 */
export const handleErr = (err: any) => {
  console.log(err);
  let txt =
    "An Error Occurred while processing the request. If the error persists please contact tech support at <a href='mailto:lfsci-webteam@byu.edu'>lfsci-webteam@byu.edu</a>.";
  // if (msg)
  //     txt += "<br /><br />The full error message was: " + msg
  if (err.status === 401) {
    txt = "Your session has timed out, please login again to continue";
  }
  return;
};

/**
 *
 * @param {string} endpoint this string is concatenated to the end of the url to access the correct controller in the API
 * @param {string} method GET, POST, PUT, DELETE
 * @param {any} body this is any data that is being sent to the backend API
 * @param {bool} unauthorized only use this if you are testing authentication or uploading files
 * @param {string} serverAuth the authorization token for the middleman api/nextJS server to access the API unauthenticated
 * @returns a promise with information from the API
 */
export const APICall = async <T>(
  endpoint: string,
  method?: string,
  body?: T,
  serverAuth?: string
) => {
  const response = await fetch(
    ApiUrl(endpoint),
    await makeHeader(body, method, serverAuth)
  );
  if (!response.ok) {
    handleErr(response);
    return Promise.reject(response);
  }
  if (response.status == 204) return await response.text();
  return await response.json();
};

/**
 * This section is where you will be making the most changes and the different API calls to get necessary information from the API
 */
export const getUsers = () => APICall("users");
export const getUser = (netId: string) => APICall("users/" + netId);
export const getUserByNetId = (netId: string) =>
  APICall("users/netId/" + netId);
export const postUser = (data: User) => APICall("users", "POST", data);
export const putUser = (data: User) => APICall("users/" + data.id, "PUT", data);
export const deleteUser = (id: number) => APICall("users/" + id, "DELETE");

export const uploadFile = <T>(data: FormData): Promise<T> =>
  APICall("files", "POST", data);

//This is just a demo function it is not necessary to the app
export const makeFail = () => {
  const p = Promise.reject({
    status: 456,
    url: "https://api.byu.edu/lifesciences/api/some/endpoint",
    statusText: "I failed :/",
    text: function () {
      return Promise.resolve("I failed :/");
    },
  });

  return p;
};
