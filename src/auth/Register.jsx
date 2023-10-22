/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import icon_img from "../assets/icon.png";

// fields = ['name', 'username', 'password','email', 'phone']

const Register = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const register = (e) => {
    e.preventDefault();
    axios
      .postForm("/auth/register/", {
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/auth/login";
      })
      .catch((err) => {
        setError("Error : Creating your account.");
      });
  };

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
      </div>
      {/* login form with box shadow */}
      <div className="bg-white rounded-lg shadow-lg w-250 p-5 my-2 lg:ml-16">
        <h1 className="text-2xl font-bold mb-5">Register</h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {" "}
            <strong className="font-bold">Error!</strong>{" "}
            <span className="block sm:inline">{error}</span>{" "}
          </div>
        )}
        <form onSubmit={register}>
          <h2 className="text-1xl font-bold mt-2">Username</h2>
          <input
            type="text"
            placeholder="Username"
            className="block border border-grey-light w-full p-2 rounded"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <h2 className="text-1xl font-bold mt-2">Full Name</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="block border border-grey-light w-full p-2 rounded"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <h2 className="text-1xl font-bold mt-2">Email</h2>
          <input
            type="email"
            placeholder="Email"
            className="block border border-grey-light w-full p-2 rounded"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h2 className="text-1xl font-bold mt-2">Phone Number</h2>
          <input
            type="phone"
            placeholder="Phone Number"
            className="block border border-grey-light w-full p-2 rounded"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <h2 className="text-1xl font-bold mt-2">Password</h2>
          <input
            type="password"
            placeholder="Password"
            className="block border border-grey-light w-full p-2 rounded"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-900 focus:outline-none my-3"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col items-center lg:items-start p-5">
          <a
            href="/auth/login"
            className="text-black hover:text-gray-900 underline"
          >
            Login instead, if you already have an account
          </a>
          <a
            href="/auth/login"
            className="text-black hover:text-gray-900 underline"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
