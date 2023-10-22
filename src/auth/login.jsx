/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import icon_img from "../assets/icon.png";

const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Error is close when the 1s is over

  useEffect(() => {
    const time = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(time);
  }, [error]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .postForm("/auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        axios.defaults.headers.common = {Authorization: `Token ${res.data.token}`};
        if (res.data.is_admin) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
        localStorage.setItem("token", res.data.token);
        // window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        setError("Error : Logging in. Your username or password is incorrect.");
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
      <div
        className={`bg-white rounded-lg shadow-lg w-250 p-5 transform transition duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } `}
      >
        <form onSubmit={onLogin}>
          <h1 className="text-2xl font-bold mb-5">Login</h1>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5"
              role="alert"
            >
              <strong className="font-bold">{error}</strong>
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-900 focus:outline-none my-1"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col items-center lg:items-start p-5">
          <a
            href="/auth/register"
            className="text-black hover:text-gray-900 underline"
          >
            Register instead, if you don't have an account
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

export default Login;
