import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { RiExternalLinkLine } from "react-icons/ri";

const GIS = () => {
  const [data, setData] = useState([]);
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    // iconUrl: require("./../placeholder.png"),
    iconSize: [38, 38],
  });

  const Map = () => {
    const map = useMap();
    map.setView([28.7041, 77.1025], 5);
    return null;
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/getAllProjects"
      );
      const data = await response.json();
      console.log(data.projects);
      setData(data.projects);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="h-screen top-0">
      <MapContainer
        className="h-screen"
        center={[20.8866, 79.8522]}
        zoom={5.49}
        fullscreenControl={true}
        touchZoom={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((project) => (
                    <Marker key={project._id} position={project.location.coordinates} icon={customIcon}>
                        <Popup>
                            This is {project.name} <br /> 
                            Status: {project.status} <br /> 
                            <a href={`http://localhost:3001/${project._id}`} target="_blank"> 
                            Know more  </a> 
                        </Popup>
                    </Marker>
                ))}
      </MapContainer>
    </div>
  );
};
export default GIS;
