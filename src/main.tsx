import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage.tsx";
import { Users, usersLoader } from "./pages/Users.tsx";
import { UserDetail, userDetail } from "./pages/UserDetail.tsx";
import { PostComment, postLoader } from "./pages/PostComment.tsx";
import "./main.css";
import { Albums, albumLoader } from "./pages/Albums.tsx";
import { Root } from "./pages/Root.tsx";
import { FavoritesPage } from "./pages/FavoritesPage.tsx";
import { PostFavPage } from "./pages/PostFavPage.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
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
      { path: "/favorites", element: <FavoritesPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
