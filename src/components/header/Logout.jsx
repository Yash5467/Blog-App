import React, { useState } from "react";
import { logout } from "../../features/authSlice";
import authService from "../../services/AuthService";
import { useDispatch } from "react-redux";
import Loader from "../loader/Loader";
function Logout() {
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const btnHandler = async () => {
    try {
      setLoading(true);
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.log("error occured");
      throw error;
    }finally
    {
      setLoading(false);
    }
  };

  return loading?(<Loader/>):(<button type="button" onClick={btnHandler} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>)
}

export default Logout;
