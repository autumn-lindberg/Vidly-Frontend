import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// If response is an error, handle it
Axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  if (response && response.status >= 400 && response.status < 500) {
    toast(`Error ${response.status}`);
    return Promise.reject(error);
  } else {
    toast("An Unexpected Error Occurred");
    return Promise.reject(error);
  }
});

// export functions in case http library changes in the future
const httpService = {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
};
export default httpService;
