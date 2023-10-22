import React from "react";
import icon from "../../assets/icon.png";
import { assets } from "../../data/data";
import { useLocation } from "react-router-dom";

//Create array contain name, img, link
//Dashboard, Course, Lesson, Request, User,

const nav = [
  {
    name: "Dashboard",
    img: assets.dashbaord,
    link: "/dashboard",
  },
  {
    name: "Course",
    img: assets.books,
    link: "/course",
  },
  {
    name: "Lesson",
    img: assets.lesson,
    link: "/lesson",
  },
  {
    name: "Request",
    img: assets.startup,
    link: "/request",
  },
  {
    name: "User",
    img: assets.user,
    link: "/user",
  },
];

//Naviagtion Top
const Navigation = () => {
  const [open, setOpen] = React.useState(false);
  var location = useLocation();

  const [nav_select, set_nav_select] = React.useState(location.pathname);

  return (
    <div
      className={`h-screen bg-gray-900 font-mono text-white ${"w-20"} duration-300 relative`}
    >
      <div className="flex flex-row items-center py-3 px-2 ">
        <img
          src={icon}
          className="w-14 h-14 filter brightness-0 invert"
          alt="synapse-work"
        />
        <h1
          className={`${
            !open && "scale-0"
          } duration-200 origin-left ml-2 text-xl font-semibold`}
        >
          Synapse Work
        </h1>
      </div>
      <div className="border-b-2 border-gray-800 w-full"></div>
      {/* Navgiation */}
      <ul className="mt-6 px-2">
        {nav.map((item, index) => (
          <li
            key={index}
            className={`flex flex-col items-center py-2 px-2 my-2 rounded-lg hover:bg-gray-800 cursor-pointer ${
              item.link === nav_select && "bg-gray-800"
            }`}
            onClick={() => (window.location.href = item.link)}
          >
            <img
              src={item.img}
              className={`w-6 h-6 filter brightness-0 invert mb-3`}
              alt={item.name}
            />
            <p
              className={'text-[11px]'}
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
