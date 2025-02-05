import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage.tsx";
import { Users, usersLoader } from "./pages/Users.tsx";
import { UserDetail, userDetail } from "./pages/UserDetail.tsx";
import { PostComment, postLoader } from "./pages/PostComment.tsx";
import "./main.css";
import { Albums, albumLoader } from "./pages/Albums.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },

  {
    path: "/users",
    element: <Users />,
    loader: usersLoader,
  },
  {
    path: "/users/:userId",
    element: <UserDetail />,
    loader: userDetail,
  },
  {
    path: "/users/:userId/posts/:postId",
    element: <PostComment />,
    loader: postLoader,
  },
  {
    path: "/users/:userId/albums/:albumId",
    element: <Albums />,
    loader: albumLoader,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
