import React, { useState, useEffect } from "react";
import axios from 'axios';

const ImageTagging = () => {
    const [markedCoordinates, setMarkedCoordinates] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const markedPoints = [
        { x: 0.99, y: 0.67 },
        { x: 56.33, y: 240 },
        { x: 165.67, y: 180.33 },
        { x: 319.67, y: 276.67 }
    ];
    const imageUrl = require("../assets/test.jpg");

    useEffect(() => {
        setMarkedCoordinates(markedPoints);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/getAllProjects");
                setProjectData(response.data.projects);
                const responseUpdates = await axios.get("http://localhost:5000/api/v1/getAllUpdatesOfProject");
                console.log(responseUpdates);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        console.log(projectData); // This will log the updated state when it changes
    }, [projectData]);

    const renderMarkedCoordinates = () => {
        return markedCoordinates.map((point, index) => (
            <div
                key={index}
                style={{
                    position: "absolute",
                    top: point.y, // Adjust as needed
                    left: point.x, // Adjust as needed
                    width: "20px",
                    height: "20px",
                    background: "blue",
                    borderRadius: "50%",
                }}
            />
        ));
    };

    

    return (
        <div>
            <div>

            </div>
            <div style={{ position: "absolute" }}>
                <div>
                    <img
                        src={imageUrl}
                        alt="Tagged Image"
                        width={375}
                    />
                    {renderMarkedCoordinates()}
                </div>
            </div>
        </div>
    );
};

export default ImageTagging;
