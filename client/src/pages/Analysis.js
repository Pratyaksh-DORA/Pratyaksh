import React, { useState, useEffect } from "react";
import { fetchData } from "../utilis/Api";

const Analysis = () => {
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
        const fetchDataAsync = async () => {
            try {
                // const response = await fetchData("/getAllProjects");
                // setProjectData(response);
                // console.log(response);
                const responseUpdates = await fetchData("/getAllUpdatesOfProject");
                console.log(responseUpdates);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataAsync();
    }, []);

    const renderMarkedCoordinates = () => {
        return markedCoordinates.map((point, index) => (
            <>
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
                >
                </div>
                <iframe
                    src="http://localhost:3000/d-solo/a7422de5-fd7f-48b4-8e64-2da96e8e2fa4/dora?orgId=1&from=1703023727656&to=1703045327656&panelId=4"
                    width="450"
                    height="200"
                    frameborder="0"
                    title="1"
                ></iframe>
                <iframe
                    src="http://localhost:3000/d-solo/a7422de5-fd7f-48b4-8e64-2da96e8e2fa4/dora?orgId=1&from=1703023757604&to=1703045357605&panelId=3"
                    width="450"
                    height="200"
                    frameborder="0"
                    title="2"
                ></iframe>
            </>
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
}

export default Analysis;