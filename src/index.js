import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import App from './components/index/App';
import Profile from './components/profile/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';
import NotFoundPage from './components/NotFoundPage';
import EditProfile from './components/profile/EditProfile';
import LogOut from './components/LogOut';
import PostPage from './components/postPage/PostPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/edit",
    element: <EditProfile />
  },
  {
    path: "/profile/:username",
    element: <Profile />
  },
  {
    path: "/post/:id",
    element: <PostPage />
  },
  {
    path: "/logout",
    element: <LogOut />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
