import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { googleSignIn } = useContext(AuthContext);
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          emai: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // if (res.data.insertedId) {
          //   Swal.fire({
          //     position: "top-end",
          //     icon: "success",
          //     title: "User Created Succesfully",
          //     showConfirmButton: false,
          //     timer: 1500,
          //   });
          // }
          console.log(res.data);
          navigate("/");
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Logged in Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 bg-slate-700 text-white p-3 rounded-lg h-10 w-72 mt-1 ml-28 uppercase hover:opacity-95"
      >
        <FaGoogle></FaGoogle> continue with google
      </button>
    </div>
  );
};

export default SocialLogin;
