import { url } from "../apiUrl";
import {api,ErrorHandler} from "../apiRoot";

export function GetProject(payload) {
  return api.get(url.PROJECT,{params:{payload}})
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}

export function SetProject(payload){
    return api.post(url.PROJECT,{project:payload})
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}