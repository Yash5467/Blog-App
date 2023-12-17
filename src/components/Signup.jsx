import authService from "../services/AuthService";
import { login as storeLogin } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Input from "./input/Input";
import React from "react";

function Signup() {
  const [errors, setErros] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const signUp = async (data) => {
    console.log("signup triggered");
    try {
      setErros("");
      let session = await authService.createAccount(data);
      if (session) {
        let userData = await authService.checkLogin();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/")
        }
      }
    } catch (error) {
      setErros(error.message);
    }
  };
  return <div className="flex items-center justify-center">
  <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

      <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
      <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
          >
              Sign In
          </Link>
      </p>
      {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}

      <form onSubmit={handleSubmit(signUp)}>
          <div className='space-y-5'>
              <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("userName", {
                  required: true,
              })}
              />
              <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                  required: true,
                  validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
              })}
              />
              <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                  required: true,})}
              />
              <button type="submit" className="w-full">
                  Create Account
              </button>
          </div>
      </form>
  </div>

</div>
}

export default Signup;
