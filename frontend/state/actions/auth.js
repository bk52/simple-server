import { url } from "../apiUrl";
import {api,ErrorHandler} from "../apiRoot";

export function Login(payload) {
  let { username, password } = payload;
  return api.post(url.AUTH,{ username, password })
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}
