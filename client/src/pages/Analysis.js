import React from "react";

const Analysis = () => {
  return (
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
  );
};

export default Analysis;
