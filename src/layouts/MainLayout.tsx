import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";
import AppBreadcrumb from "../components/layouts/AppBreadcrumb";

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout style={{ overflow: "auto" }}>
          <Content style={{ padding: 20 }}>
            <AppBreadcrumb />
            <section className="bg-white rounded-md w-full h-full p-5!">
              <Outlet />
            </section>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
