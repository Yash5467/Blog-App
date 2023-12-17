import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  AddPost,
  EditPost,
  AllPosts,
  Home,
  Login,
  SignUp,
  Post,
} from "./pages/index.js";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element:   <SignUp />
        
        ,
      },
      {
        path: "/all-posts",
        element: 
        
          
            <AllPosts />
        
        ,
      },
      {
        path: "/add-post",
        element: 
         
            <AddPost />
       
        
      },
      {
        path: "/edit-post/:slug",
        element: 
         
            <EditPost />
       
        
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider  router={routes} />
    </Provider>
  </React.StrictMode>
);
