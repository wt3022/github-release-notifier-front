import React from "react";
import { Location } from "../types/location";

const Header: React.FC<{ locationList: Location[] }> = ({ locationList }) => {
  return (
    <header className="h-20 border-b-2 border-gray-200 flex divide-x-2">
      <div className="h-full w-full p-4 grow flex items-center">
        {locationList.map((location, index, array) => (
          <React.Fragment key={location.name}>
            <a href={location.href} className="text-blue-500 hover:underline">
              {location.name}
            </a>
            {index < array.length - 1 && <span className="mx-2">{">"}</span>}
          </React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default Header;
