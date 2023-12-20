import React, { useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

function IndiaMap() {
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");

  const stateCodesMapped = {
    ai: { totalProjects: 10, underImplementation: 1, totalCost: 1626.98 },
    ap: { totalProjects: 490, underImplementation: 0, totalCost: 344371.08 },
    ar: { totalProjects: 176, underImplementation: 0, totalCost: 297219.64 },
    as: { totalProjects: 182, underImplementation: 0, totalCost: 65265.09 },
    br: { totalProjects: 505, underImplementation: 0, totalCost: 244809.40 },
    ch: { totalProjects: 2, underImplementation: 0, totalCost: 954.00 },
    cg: { totalProjects: 232, underImplementation: 0, totalCost: 267942.56 },
    dn: { totalProjects: 3, underImplementation: 0, totalCost: 172.53 },
    dl: { totalProjects: 60, underImplementation: 0, totalCost: 68092.74 },
    ga: { totalProjects: 43, underImplementation: 0, totalCost: 19330.81 },
    gj: { totalProjects: 538, underImplementation: 0, totalCost: 350357.70 },
    hr: { totalProjects: 122, underImplementation: 0, totalCost: 97622.24 },
    hp: { totalProjects: 178, underImplementation: 0, totalCost: 109244.35 },
    jk: { totalProjects: 57, underImplementation: 0, totalCost: 79194.49 },
    jh: { totalProjects: 323, underImplementation: 0, totalCost: 106638.47 },
    ka: { totalProjects: 698, underImplementation: 0, totalCost: 310234.61 },
    kl: { totalProjects: 147, underImplementation: 0, totalCost: 58714.13 },
    mp: { totalProjects: 849, underImplementation: 0, totalCost: 341063.00 },
    mh: { totalProjects: 1154, underImplementation: 0, totalCost: 727225.53 },
    mn: { totalProjects: 13, underImplementation: 0, totalCost: 19380.85 },
    ml: { totalProjects: 17, underImplementation: 0, totalCost: 13440.34 },
    mz: { totalProjects: 4, underImplementation: 0, totalCost: 6609.09 },
    nl: { totalProjects: 7, underImplementation: 0, totalCost: 5988.58 },
    or: { totalProjects: 455, underImplementation: 0, totalCost: 227381.39 },
    py: { totalProjects: 6, underImplementation: 0, totalCost: 3166.42 },
    pb: { totalProjects: 147, underImplementation: 0, totalCost: 59358.86 },
    rj: { totalProjects: 582, underImplementation: 0, totalCost: 212719.15 },
    sk: { totalProjects: 30, underImplementation: 0, totalCost: 33742.43 },
    tn: { totalProjects: 459, underImplementation: 0, totalCost: 341081.08 },
    tg: { totalProjects: 219, underImplementation: 0, totalCost: 309631.29 },
    tr: { totalProjects: 36, underImplementation: 0, totalCost: 17055.28 },
    ut: { totalProjects: 130, underImplementation: 0, totalCost: 63732.44 },
    up: { totalProjects: 547, underImplementation: 0, totalCost: 394125.26 },
    wb: { totalProjects: 444, underImplementation: 0, totalCost: 181869.06 },
    an: { totalProjects: 377, underImplementation: 0, totalCost: 1433647.45 },
  };
  

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
        {/* <div className="w-52 bg-green-200 rounded-md p-4 m-4 text-center flex flex-col gap-4">
          <p>Under Implementation</p>
          <p>{selectedStateData &&selectedStateData.underImplementation}</p>
        </div> */}
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
