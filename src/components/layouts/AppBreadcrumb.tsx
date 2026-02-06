import { Breadcrumb } from "antd";
import { IoHome } from "react-icons/io5";
import { Link, useMatches } from "react-router-dom";

interface BreadcrumbHandle {
  breadcrumb: string | React.ReactNode;
}

const AppBreadcrumb = () => {
  const matches = useMatches();

  const items = matches
    .filter(
      (match) => (match.handle as BreadcrumbHandle | undefined)?.breadcrumb,
    )
    .map((match) => {
      const handle = match.handle as BreadcrumbHandle;
      return {
        title:
          match.pathname === "/" ? (
            <div className="text-[#00000073]">{handle.breadcrumb}</div>
          ) : (
            <Link to={match.pathname}>{handle.breadcrumb}</Link>
          ),
      };
    });

  return (
    <div className="pb-4! flex items-center gap-2">
      <IoHome className="text-[#00000073] inline-block" />
      <Breadcrumb items={items} />
    </div>
  );
};

export default AppBreadcrumb;
