import "./App.css";
import {  Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import { useEffect, useState } from "react";
import authService from "./services/AuthService";
import { Footer, Header ,Input } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [isLoading, serIsLoading] = useState(true);
 const dispatch=useDispatch();
  useEffect(() => {
    authService
      .checkLogin()
      .then((userData) => userData?dispatch(login({ userData })):null)
      .catch((err) => {
        console.log("error occured",err);
      })
      .finally(() => serIsLoading(false));
  });

  return !isLoading ? (
    <div className="h-full" >
      <Header/>
      <div className="min-h-screen" >
           <Outlet/>
     
      </div>
      <Footer/>
      </div>
    
  ) : (
    <div className="h-screen w-screen flex justify-center items-center " >
      <Bars
        height="50"
        width="50"
        color="#000"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
}

export default App;
