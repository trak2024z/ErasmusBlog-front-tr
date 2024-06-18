import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layouts from './components/Layouts';
import ErrorPage from "./pages/ErrorPage"
import Home from './pages/Home';
import PostDetails from './pages/PostDetais'
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts"
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import Logout from "./pages/Logout";
import "./index.css";
import UserProvider from './context/useContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layouts/></UserProvider>,
    errorElement: <ErrorPage/>,
    children:[
      {index:true, element: <Home/>},
      {path:"posts/:id", element: <PostDetails/>},
      {path:"register", element: <Register/>},
      {path:"login", element: <Login/>},
      {path:"profile/:id", element: <UserProfile/>},
      {path:"authors", element: <Authors/>},
      {path:"create", element: <CreatePost/>},
      {path:"logout", element: <Logout/>},
      {path:"posts/categories/:category", element: <CategoryPosts/>},
      {path:"posts/users/:id", element: <AuthorPosts/>},
      {path:"posts/:id/edit", element: <EditPost/>},
      {path:"posts/:id/delete", element: <DeletePost/>},
      {path:"myposts/:id", element: <Dashboard/>},
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);
