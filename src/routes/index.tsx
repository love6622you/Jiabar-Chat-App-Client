import { useRoutes, Navigate } from "react-router-dom";
import { lazyLoad } from "./lazyload";

const routes = [
  {
    path: "/login",
    element: lazyLoad("../layout/PureLayout", "layout"),
    children: [
      {
        path: "/login",
        element: lazyLoad("../pages/auth/LoginRegister")
      }
    ]
  },

  {
    path: "/",
    element: lazyLoad("../layout/MainLayout", "layout"),
    children: [
      {
        path: "/",
        element: lazyLoad("../pages/home/Home")
      },
      {
        path: "/chat/:id",
        element: lazyLoad("../pages/chat/Chat")
      }
    ]
  },
  {
    path: "/about",
    element: lazyLoad("../layout/WithHeaderLayout", "layout"),
    children: [
      {
        path: "/about",
        element: lazyLoad("../pages/about/About")
      }
    ]
  },
  {
    path: "*",
    element: lazyLoad("../pages/notFound/NotFound")
  }
];

const Routes = () => useRoutes(routes);

export { Routes };
