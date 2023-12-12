import React from "react";

const Analysis = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <iframe
        src="http://localhost:3000/d-solo/a7422de5-fd7f-48b4-8e64-2da96e8e2fa4/dora?orgId=1&from=1702353490758&to=1702375090759&panelId=1"
        width="450"
        height="200"
        frameborder="0"
        title="sd"
      ></iframe>

      <iframe
        src="http://localhost:3000/d-solo/a7422de5-fd7f-48b4-8e64-2da96e8e2fa4/dora?orgId=1&from=1702352882212&to=1702374482212&panelId=2"
        width="550"
        height="300"
        frameborder="0"
        title="fd"
      ></iframe>

      <a href="http://localhost:3000/dashboard/snapshot/XyQH9dkS4eYtN514AZiZ9h3vbGwya90B">Link to Dashboard</a>
    </div>
  );
};

export default Analysis;
