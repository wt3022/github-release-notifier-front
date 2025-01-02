import React from "react";

const Header: React.FC = () => {
  return (
    <header className="h-20 border-b-2 border-gray-200 flex divide-x-2">
      <div className="h-full w-full p-4 grow flex items-center">
        {[
          { name: "ホーム", href: "/" },
          { name: "プロジェクト", href: "/projects" },
        ].map(({ name, href }, index, array) => (
          <React.Fragment key={name}>
            <a href={href} className="text-blue-500 hover:underline">
              {name}
            </a>
            {index < array.length - 1 && <span className="mx-2">{">"}</span>}
          </React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default Header;
