import React from "react";
import MaterialIconOutlined from "./MaterialIconOutlined";

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-[240px] p-4 border-r-2 border-gray-200 flex flex-col gap-4 items-center justify-between">
      <div>
        <MaterialIconOutlined
          iconName="home"
          iconClassName="text-[32px] flex items-center justify-center"
          href="/"
        />
      </div>

      <div className="h-full w-full flex flex-col divide-y-2 border-gray-200 grow">
        {[
          { name: "ホーム", href: "/" },
          { name: "プロジェクト", href: "/projects" },
        ].map(({ name, href }) => (
          <React.Fragment key={name}>
            <a href={href} className="w-full p-2 text-blue-500 hover:underline">
              {name}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
