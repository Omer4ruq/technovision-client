import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { AuthContext } from "../../providers/AuthProviders";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(form);
    signIn(email, password)
      .then((result) => {
        console.log(result);
        navigate(from);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Loggedin Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("keya be" + error);
      });
  };
  return (
    <div className="grid grid-cols-2 bg-black h-full">
      <div className=" mr-16">
        <h1 className="text-white text-4xl text-center font-semibold mt-7">
          Sign in with your email
        </h1>
        <div>
          <form onSubmit={handleLogin} className="w-full max-w-sm ">
            <div className="flex items-center  py-4">
              <div className="ml-32 gap-8">
                <input
                  type="text"
                  className="appearapy-5nce-none  bg-transparent w-full border-t-0 border-r-0 border-l-0 border-b-2 border-teal-500 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4"
                  placeholder="Email"
                  name="email"
                  aria-label="Full name"
                />
                <input
                  type="password"
                  className="appearance-none bg-transparent  w-full border-t-0 border-r-0 border-l-0 border-b-2 border-teal-500 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4"
                  placeholder="Password"
                  name="password"
                  aria-label="Full name"
                />

                {/* <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                Sign Up
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
              >
                Cancel
              </button> */}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 
         hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 w-72 mt-1 ml-28"
            >
              Sign in
            </button>
            <SocialLogin></SocialLogin>
          </form>
          <div>
            {" "}
            <h1 className="text-white text-2xl font-bold">
              Don’t have a BBC account?
            </h1>
            <NavLink to="/signup">
              <h2 className="underline text-blue-600 mr-6">Registration</h2>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="ml-32"></div>
    </div>
  );
};

export default Login;
