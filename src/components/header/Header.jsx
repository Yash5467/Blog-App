import React from "react";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import { Link, useNavigate} from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
 const navigate= useNavigate();

  const links = [
    {
      link: "Home",
      redirect: "/",
      status: true,
    },
    {
      link: "All Post",
      redirect: "/all-posts",
      status: authStatus,
    },
    {
      link: "Create Post",
      redirect: "/add-post",
      status: authStatus,
    },
    {
      link: "login",
      redirect: "/login",
      status: !authStatus,
    },
    {
      link: "Sign Up",
      redirect: "/signup",
      status: !authStatus,
    },
  ];
  return (
    <Container>
      <div className="w-full bg-white text-[#001E2B] py-5 border bottom-1 border-gray-400" >
        <nav className="flex justify-around items-center" >
          <div><span className="font-semibold">Blog App</span></div>
          <div>
            <ul className="flex gap-6 text-[#001E2B] " >
            {links.map((item,index)=> (item.status?<li className="text-[#001E2B] hover:text-[#00684A] cursor-pointer"  onClick={()=>navigate(item.redirect)} key={index} >{item.link}</li>:null))}
            
            </ul>

         
           
          </div>
          <div>
      {    authStatus?<Logout/>:null}
          </div>
        </nav>
   
      </div>
    </Container>
  );
};

export default Header;
