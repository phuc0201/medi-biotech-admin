import { createBrowserRouter } from "react-router-dom";
import { PATH } from "../constants/RoutePaths";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import NewsPage from "../pages/NewsPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    handle: { breadcrumb: "Trang chủ" },
    children: [
      {
        path: PATH.DASHBOARD,
        element: <DashboardPage />,
        handle: { breadcrumb: "Dashboard" },
      },
      {
        path: PATH.NEWS,
        element: <NewsPage />,
        handle: { breadcrumb: "Quản lý tin tức" },
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
