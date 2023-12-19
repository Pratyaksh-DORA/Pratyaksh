import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../components";

const Main = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`rounded-lg page-content flex-grow ${isCollapsed ? 'ml-20' : 'ml-52 w-1/3'} `}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
