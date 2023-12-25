// import image from "../assets/image/signin.png";
// import logo from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FaGoogle } from "react-icons/fa";

import { app } from "../../firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import SocialLogin from "../../components/SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const auth = getAuth(app);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const displayName = form.get("displayName");
    const photoURL = form.get("photoURL");
    if (password.length < 6) {
      setRegisterError("Pasword should be at least 6 characters or longer");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pasword should be at least 6 characters or longer",
      });
      return;
    }
    // else if (!/[A_Z]/.test(password)) {
    //   setRegisterError("Password Must have An Upper Case Character");
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Password Must have An Upper Case Character",
    //   });
    //   return;
    // }
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setRegisterError("Password Must have atleast one spacial Character");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Must have atleast one spacial Character",
      });
      return;
    }
    setRegisterError("");
    setSuccess("");

    createUser(email, password, displayName, photoURL)
      .then((result) => {
        const user = result.user;
        console.log(result);
        updateUserProfile(displayName, photoURL).then(() => {
          console.log("user profile update");
          const userInfo = {
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            premiumTaken: null,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Created Succesfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });

        setSuccess("User Created Succesfully");

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
        // toast.error(registerError);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: setRegisterError,
        });
      });

    console.log(email, password, displayName);
  };
  return (
    <div>
      <div className="grid grid-cols-2 bg-black h-full">
        <div className=" mr-16">
          {/* <img src={logo} className="h-14 ml-48 mt-16" alt="" /> */}
          <h1 className="text-white text-4xl text-center font-semibold mt-7 ">
            Register with the Us
          </h1>
          <div>
            <form onSubmit={handleSignUp} className="w-full max-w-sm ">
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

                  <input
                    type="text"
                    className="appearapy-5nce-none  bg-transparent w-full border-t-0 border-r-0 border-l-0 border-b-2 border-teal-500 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4"
                    placeholder="Name"
                    name="displayName"
                    aria-label="Full name"
                  />
                  <input
                    type="text"
                    className="appearance-none bg-transparent  w-full border-t-0 border-r-0 border-l-0 border-b-2 border-teal-500 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4"
                    placeholder="Photo"
                    name="photoURL"
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
                className="bg-blue-500 
         hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 w-72 mt-1 ml-28"
              >
                Submit
              </button>
              <SocialLogin></SocialLogin>
            </form>
            <div>
              {" "}
              <h1 className="text-white text-2xl font-bold">
                Already have an account?
              </h1>
              <NavLink to="/login">
                <h2 className="underline text-blue-600">Login</h2>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="ml-32">
          {/* <img src={image} className="h-screen" alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
