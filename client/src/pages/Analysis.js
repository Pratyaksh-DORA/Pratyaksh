import React, { useState, useEffect } from "react";
import { fetchData } from "../utilis/Api";

const Analysis = () => {
    const [markedCoordinates, setMarkedCoordinates] = useState([]);
    const markedPoints = [];
    const imageUrl = require("../assets/test.jpg");
    const [progressData, setProgressData] = useState("");
    const [noOfBricks, setNoOfBricks] = useState("");

    useEffect(() => {
        setMarkedCoordinates(markedPoints);
    }, []);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                // const response = await fetchData("/getAllProjects");
                // setProjectData(response);
                // console.log(response);
                const responseUpdates = await fetchData("/getAllUpdatesOfProject");
                console.log(responseUpdates);
                const latestUpdate = responseUpdates.length > 0 ? responseUpdates[responseUpdates.length - 1] : 0;

                if (latestUpdate) {
                    setProgressData(latestUpdate.progress);
                    setNoOfBricks(latestUpdate.noOfBricks);
                    console.log(progressData);
                    console.log(noOfBricks);
                    console.log(latestUpdate.markedPoints[0].x, latestUpdate.markedPoints[0].y);
                    setMarkedCoordinates([{ x: latestUpdate.markedPoints[0].x, y: latestUpdate.markedPoints[0].y }]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataAsync();
    }, []);

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
                <p className="text-3xl">Progress: {progressData}</p>
                <p className="text-3xl">Amount of Bricks present: {noOfBricks}</p>
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
}

export default Analysis;