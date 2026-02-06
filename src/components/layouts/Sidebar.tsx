import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const siderStyle: React.CSSProperties = {
  height: "calc(100vh - 65px)",
  position: "sticky",
  top: 65,
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const getSelectedKey = (pathname: string) => {
    if (pathname.startsWith("/news")) return "news";
    return "dashboard";
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", "#1890ff");
  }, []);

  return (
    <Sider
      theme="light"
      style={siderStyle}
      width={250}
      className="custom-sidebar py-3!"
    >
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey(location.pathname)]}
        items={[
          {
            key: "dashboard",
            icon: <MdDashboard />,
            label: <Link to={"/"}>Dashboard</Link>,
          },
          {
            key: "news",
            icon: <AiOutlineBarChart />,
            label: <Link to={"news"}>Quản lý tin tức</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
