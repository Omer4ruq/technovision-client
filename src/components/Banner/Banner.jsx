import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-150%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 20,
      },
    },
  };
  return (
    <div>
      <div
        className="hero min-h-56"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/jVFN1kV/360-F-514951224-2dx-MLb-Iw5q-NRd-PGD003chpb-Vcx-Wtcp7-K.jpg)",
        }}
      >
        <motion.div
          className="slidingTextContainer"
          variants={sliderVariants}
          initial="initial"
          animate="animate"
        >
          {/* <img
            className="opacity-40 "
            src="https://i.ibb.co/hd9CjzN/1-UEPAg-Ti-BSrid-GQb-LWN5pa-A.jpg"
            alt=""
          /> */}
          <h1 className="opacity-40 text-slate-50 text-5xl font-extrabold mt-48">
            SCC Technovision inc
          </h1>
        </motion.div>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content ">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <NavLink to="/signup">
              {" "}
              <button className="btn btn-primary">Let’s Explore</button>{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
