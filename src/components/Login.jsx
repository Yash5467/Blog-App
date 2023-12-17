import authService from "../services/AuthService";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import Input from "./input/Input";
import Loader from "./loader/Loader";

function Login() {
  const { register, handleSubmit } = useForm();
  const [errors, setErros] = useState("");
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    try {
      setErros("");
      let session = await authService.login(data);
      if (session) {
        let userData = await authService.checkLogin();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setErros(error.message);
    }
    finally
    {
      setLoading(false);
    }
  };

  return !loading? (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <button type="submit" className="w-full">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  ):<Loader/>;
}

export default Login;
