/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import icon_img from "../../assets/icon.png";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <img src={icon_img} className="w-20 mb-4" alt="Icon" />
      <h1 className="text-4xl font-bold mb-2">404 Not Found</h1>
      <p className="text-gray-700 text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
      >
        Go back to home
      </Link>
    </div>
  );
}

export default NotFound;