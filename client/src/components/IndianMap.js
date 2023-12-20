import React, { useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import stateCodesMapped from "../data/stateCodesMapped";

function IndiaMap() {
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");

 
  

  function onLocationClick(event) {
    setStateCode(event.target.id);
    setStateName(event.target.getAttribute("name"));
  }
  const selectedStateData = stateCodesMapped[stateCode];


  return (
    <>
      <div className="flex flex-col">
        <div className="w-52 bg-green-200 rounded-md p-4 m-4 text-center flex flex-col gap-4">
          <p>Total Projects in {stateName}</p>
          <p>{selectedStateData ? selectedStateData.totalProjects: 9242	}</p>
        </div>
        <div className="w-52 bg-green-200 rounded-md p-4 m-4 text-center flex flex-col gap-4">
          <p>Total Cost</p>
          <p>{selectedStateData ? selectedStateData.totalCost: 6813008}</p>
        </div>
      </div>
      <div className="w-96 h-96">
        <SVGMap map={India} onLocationClick={onLocationClick} />
      </div>
    </>
  );
}

export default IndiaMap;
