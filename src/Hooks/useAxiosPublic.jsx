import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://scc-technovision-inc-server-nu.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
