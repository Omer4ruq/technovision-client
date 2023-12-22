import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

const Main = () => {
  // const [isAdmin] = useAdmin();

  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
