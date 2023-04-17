import { ApiUrl } from "./services";
/**
 * The purpose of this file is to make any API calls from NextJS server side.
 * For example, filling in the user's session with the user's data from the API.
 */

/**
 * Creates a header, for the server side only.
 * @param {T} reqBody the info that is being sent to the API
 * @param {string} reqMethod GET, POST, PUT, DELETE
 * @param {string} token the authorization token for the middleman api/nextJS server to access the API unauthenticated
 * @returns the header for the outgoing request to the API
 */
const makeServerHeader = async <T>(
  reqBody: T,
  reqMethod: string | undefined,
  token: string
) => {
  let req: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token !== undefined && {
        Authorization: `Bearer ${token}`,
      }),
    },
  };
  if (reqBody) req.body = JSON.stringify(reqBody);
  if (reqMethod) req.method = reqMethod;
  return req;
};

/**
 * Only Call this function on server side calls.
 * @param {string} endpoint this string is concatenated to the end of the url to access the correct controller in the API
 * @param {string} token the authorization token for the middleman api/nextJS server to access the API
 * @param {string} method GET, POST, PUT, DELETE
 * @param {any} body this is any data that is being sent to the backend API
 * @param {bool} unauthorized only use this if you are testing authentication or uploading files
 * @returns a promise with information from the API
 */
export const ServerAPICall = async <T>(
  endpoint: string,
  token: string,
  method?: string,
  body?: T,
  unauthorized?: boolean
) => {
  const headers = await makeServerHeader(body, method, token);
  return await fetch(ApiUrl(endpoint), headers);
};

/*export const serverGetUserForNetId = async (netId: string, token: string) =>
  await ServerAPICall(`employees/${netId}`, token);
export const serverGetUser = async (token: string, netId: string) => {
  const response = await serverGetUserForNetId(netId, token);
  const json: EmployeeDTO = await response.json();
  return json;
};*/
