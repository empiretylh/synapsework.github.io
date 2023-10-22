import React from "react";
import { Link } from "react-router-dom";
import icon_img from "../assets/icon.png";

const Home = () => {
  return (
    <div className="flex bg-gray-100 h-screen justify-center items-center font-mono flex-col lg:flex-row">
      {/* logo and header */}
      <div className="flex justify-center flex-col items-center lg:flex-row">
        <img src={icon_img} className="w-20 h-20" />
        <div className="flex flex-col items-center lg:items-start p-5">
          <h1 className="text-4xl text-black tracking-tighter">Synapse Work</h1>
          <p className="text-center">
            Synapse Work for Computer Science Students
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start p-5">
          <Link
            to="/auth/login"
            className="text-black hover:text-gray-900 underline"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="text-black hover:text-gray-900 underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
