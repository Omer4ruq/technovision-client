import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Customers from "./components/Customers/Customers";

const Home = () => {
  return (
    <div>
      <div>
        <Banner></Banner>
      </div>
      <div className="mb-4">
        <Customers></Customers>
      </div>
    </div>
  );
};

export default Home;
