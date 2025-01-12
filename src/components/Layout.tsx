import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Location } from "../types/location";

interface LayoutProps {
  children: React.ReactNode;
  locationList: Location[];
}

const Layout: React.FC<LayoutProps> = ({ children, locationList }) => {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header locationList={locationList} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
