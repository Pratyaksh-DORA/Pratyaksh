import React, { useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

function IndiaMap() {
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");

  function onLocationClick(event) {
    setStateCode(event.target.id);
    setStateName(event.target.getAttribute("name"));
  }

  return (
    <>
      <p>{stateName}</p>
      <p>{stateCode}</p>
      <div className="w-96 h-96">

      <SVGMap map={India} onLocationClick={onLocationClick} />
      </div>
    </>
  );
}

export default IndiaMap;
