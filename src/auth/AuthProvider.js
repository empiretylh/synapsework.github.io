import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { UserList } from "../api/api";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);


  console.log("Token", token);
  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const LOGOUT = () => {
    setToken(null);
    localStorage.removeItem("token");
    axios.defaults.headers.common = { Authorization: null };
  }


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common = { Authorization: `Token ${token}` };
      localStorage.setItem("token", token);
    
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
   
    }
  }, [token]);

  const user_data = useQuery(["user_data", "me"], UserList,{
    enabled :false,
  });

  useEffect(()=>{
    user_data.refetch()

   
  
  },[])


  useEffect(() => {
    if (user_data) {
      if (user_data?.data?.data?.is_admin) {
        setIsAdmin(true);
      }
      if (user_data?.data?.data?.is_editor) {
        setIsEditor(true);
      }
    }
    // console.log(user_data.error.)

    //err status 401
    if(user_data.error?.response?.status === 401){
      LOGOUT()
      window.location.href = "/auth/login"
    }
  }, [user_data.data]);


  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      isAdmin,
      isEditor,
      LOGOUT,
    }),
    [token, isAdmin, isEditor]
  );

  if (user_data.isFetching && token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center space-x-2 text-2xl font-semibold text-gray-800">
          <span className="font-mono">Syncing</span>
          <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
        </div>
      </div>
    )
  }
  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
