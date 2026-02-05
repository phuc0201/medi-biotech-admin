import { createBrowserRouter } from "react-router-dom";
import { PATH } from "../constants/RoutePaths";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import NewsPage from "../pages/NewsPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: PATH.DASHBOARD, element: <DashboardPage /> },
      { path: PATH.NEWS, element: <NewsPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
