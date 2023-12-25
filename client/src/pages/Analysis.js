import React, { useState, useEffect } from "react";
import { fetchData } from "../utilis/Api";

const Analysis = () => {
    const [markedCoordinates, setMarkedCoordinates] = useState([]);
    const markedPoints = [];
    const imageUrl = require("../assets/test.jpg");
    const [progressData, setProgressData] = useState("");
    const [noOfBricks, setNoOfBricks] = useState("");
    const [imageURL, setimageURL] = useState("");

    useEffect(() => {
        setMarkedCoordinates(markedPoints);
    }, []);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
               
                const responseUpdates = await fetchData("/getAllUpdatesOfProject");
                console.log(responseUpdates);
                const latestUpdate = responseUpdates.length > 0 ? responseUpdates[responseUpdates.length - 1] : 0;

                if (latestUpdate) {
                    setProgressData(latestUpdate.progress);
                    setNoOfBricks(latestUpdate.noOfBricks);
                    setimageURL(latestUpdate.markedPoints[0].imageData);
                    console.log(latestUpdate.markedPoints[0].imageData);
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
            <>
            <div className="flex flex-wrap gap-4 m-4">
       
        </div>
        <iframe src="https://ishika2413.grafana.net/d-solo/c91c5e3a-6211-4f27-afac-1478ccd74e7a/pie-chart?orgId=1&from=1703049605498&to=1703071205498&panelId=2" width="450" height="200" frameborder="0"></iframe>
        <iframe src="https://ishika2413.grafana.net/d-solo/c91c5e3a-6211-4f27-afac-1478ccd74e7a/pie-chart?orgId=1&from=1703049644929&to=1703071244929&panelId=1" width="450" height="200" frameborder="0"></iframe>
                <a
                    key={index}
                    href={imageURL}
                    target="_blank"
                    rel="noopener noreferrer"
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
                </a>
             
            </>
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
                        alt="Tagged"
                        width={375}
                    />
                    {renderMarkedCoordinates()}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 m-4">
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
    </div>
        </div>
    );
}

export default Analysis;
