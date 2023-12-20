import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { MilestoneChart } from "../components";
import { Icon } from "leaflet";
import { PieChart } from "react-minimal-pie-chart";

import "leaflet/dist/leaflet.css";

const Home = () => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    // iconUrl: require("./../placeholder.png"),
    iconSize: [38, 38],
  });

  const project = JSON.parse(localStorage.getItem("project"));
  const milestones = project.milestones;
  const data = [
    { title: "completed", value: 10, color: "#8e44ad" }, // Purple
    { title: "not started", value: 20, color: "#808080" }, // Grey
    { title: "planning", value: 5, color: "#3498db" }, // Blue
    { title: "progress", value: 15, color: "#27ae60" }, // Green
    { title: "cancelled", value: 25, color: "#e74c3c" }, // Red
    { title: "paused", value: 25, color: "#e67e22" }, // Orange
  ];

  const latitude = project.location.coordinates[0];
  const longitude = project.location.coordinates[1];
  return (
    <div className="container mx-auto mt-8 flex flex-col gap-8">
      <div className="flex items-center ml-2 px-4 gap-12">
       
        <div className="container mx-auto mt-8 flex flex-col gap-8">
          <div className="flex items-center ml-2 px-4 gap-12">
            <div className="bg-white rounded-md  shadow-md p-4 w-2/5 flex gap-8 ">
              <img
                className="rounded-md w-40 "
                src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="img"
              />
              <div className="text-sm flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Project :</span>{" "}
                  {project.name}
                </p>
                <p>
                  <span className="font-semibold">Description :</span>{" "}
                  {project.description}
                </p>
                <p>
                  <span className="font-semibold">Contractor :</span>{" "}
                  {project.contractir}
                </p>
                <p>
                  <span className="font-semibold">Progress :</span>{" "}
                  {project.progress}% completed
                </p>
                <p>
                  <span className="font-semibold">Start date:</span>{" "}
                  {project.startDate.slice(0, -14)}
                </p>
                <p>
                  <span className="font-semibold">Actual End date:</span>{" "}
                  {project.endDate.slice(0, -14)}
                </p>
                <p>
                  <span className="font-semibold">Delay by :</span>14 days
                </p>
              </div>
            </div>
            <div className=" flex gap-8 items-center bg-white rounded-lg shadow-md p-4 w-fit py-8">
              <PieChart
                data={data}
                label={({ dataEntry }) => `${dataEntry.value}%`}
                className="w-44"
                style={{
                  fontSize: "6px", // Set the desired font size
                  fill: "#fff", // Set the label text color
                }}
              />

              <div id="description">
                <ul>
                  {data.map((item, index) => (
                    <li key={index}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          backgroundColor: item.color,
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                      {item.title}: {item.value}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <MapContainer
              className="h-52 w-52"
              center={[latitude, longitude]}
              zoom={10}
              fullscreenControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                key={1}
                position={[latitude, longitude]}
                icon={customIcon}
              ></Marker>
            </MapContainer>
          </div>

          <div className="flex items-center p-4 gap-12 ml-2 bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-2 p-4 rounded-md shadow-md  w-72 ">
              <p className="text-3xl font-bold py-4">Budget Analysis</p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-blue-500 to-blue-400 w-72 text-white">
              <p className="text-3xl font-bold">4,500</p>
              <p className="text-sm flex items-center"> Budget Allocated</p>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-yellow-500 to-yellow-400 w-72 text-white">
              <p className="text-3xl font-bold">4,500</p>
              <p className="text-sm flex items-center"> Budget spent</p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-green-500 to-green-400 w-72 text-white">
              <p className="text-3xl font-bold">4,500</p>
              <p className="text-sm flex items-center"> Remaining Budget</p>
            </div>
          </div>
          <div className="ml-2 px-4 ">
            <MilestoneChart milestones={milestones} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
