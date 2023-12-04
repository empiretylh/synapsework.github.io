import React, { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import {
    CourseRequestUpdate,
    DeviceLists,
    RequestList,
    createNotification,
    fetchCourses,
} from "../../api/api";
import Navigation from "../Navigation/Navigation";
import { assets } from "../../data/data";
import { isValidFCMToken, numberWithCommas } from "../extra/extra";
import { useAuth } from "../../auth/AuthProvider";

const SettingsView = () => {
    //   const [course, setCourse] = React.useState([]);
    const {LOGOUT} = useAuth();


    return (
        <div className="flex font-mono relative h-screen">
            <Navigation />

            <div className="flex flex-col  px-5 py-3 w-full relative">
                <div className="flex flex-row items-center relative">
                    <div className="flex flex-row items-center">
                        <img
                            src={assets.noti_icon}
                            className={`w-8 h-8 filter brightness-0 mx-2`}
                            alt={"startup"}
                        />
                        <h1 className="text-2xl font-semibold">Settings</h1>
                    </div>
                </div>
                <div className="border-b-2 border-gray-300 w-full mt-3"></div>
                <div className="flex" style={{ height: "calc(100vh - 70px)" }}>
                   {/* Logo Out button  */}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => LOGOUT()}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
