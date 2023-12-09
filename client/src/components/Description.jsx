import React from "react";
import RealTimeMonitoring from "../assets/realtimeMonitoring.jpg";
import gisDashboard from "../assets/gisDashborad.jpg";
import analyticsDashboard from "../assets/anlytics.jpg";
import simulationDashboard from "../assets/simulation.jpg";
import Ai from "../assets/artificial-intelligence-calendar.jpg";
const Description = () => {
    return (
        <div className="flex flex-col gap-20 bg-background">
            <div className="flex flex-col md:flex-row py-24 gap-16 items-center md:items-start justify-center bg-white">
                <img className="w-5/6 md:w-2/6" src={RealTimeMonitoring} alt="" />
                <div className="w-80 md:w-96 text-left gap-4 flex flex-col ">
                    <p className="px-4 font-bold text-2xl">Real-Time Monitoring</p>

                    <ol className="list-decimal text-sm gap-2 flex flex-col">
                        <li>
                            Cutting-Edge Technology: Pratyaksh harnesses cutting-edge
                            technology, including geotagged images, drones, and CCTV, to
                            provide you with real-time project monitoring. Say goodbye to
                            outdated manual methods.
                        </li>
                        <li>
                            Blueprint Precision: Our system compares actual progress against
                            the project's blueprints, ensuring that every step aligns
                            seamlessly with the original plan. No more costly deviations.
                        </li>
                        <li>
                            Visibility at Your Fingertips: With Pratyaksh, you have 24/7
                            visibility into your projects, from anywhere in the world. Monitor
                            progress even when you're on the move.
                        </li>
                    </ol>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row  py-4 gap-16 items-center md:items-start justify-center">
                <div className="w-80 md:w-96 text-left gap-4 flex flex-col">
                    <p className="px-4 font-bold text-2xl">AI Task Scheduling</p>

                    <ol className="list-decimal text-sm gap-2 flex flex-col">
                        <li>
                            AI-Powered Efficiency: Pratyaksh employs artificial intelligence
                            to optimize project schedules. Our AI algorithms adapt to
                            real-time conditions, ensuring that your projects are completed on
                            time, every time.
                        </li>
                        <li>
                            Instant Alerts: Receive instant alerts about potential delays or
                            issues. Take proactive measures to keep your projects on track,
                            saving both time and money.
                        </li>
                        <li>
                            Resource Allocation: Pratyaksh's AI evaluates resource
                            availability and allocation, maximizing efficiency and minimizing
                            downtime.
                        </li>
                    </ol>
                </div>
                <img className="w-5/6 md:w-2/6" src={Ai} alt="" />
            </div>
            <div className="flex flex-col md:flex-row py-24 gap-16 items-center md:items-start justify-center  bg-white">
                <img className="w-5/6 md:w-2/6" src={gisDashboard} alt="" />
                <div className="w-80 md:w-96 text-left gap-4 flex flex-col">
                    <p className="px-4 font-bold text-2xl">GIS Integration</p>

                    <ol className="list-decimal text-sm gap-2 flex flex-col">
                        <li>
                            Interactive Dashboards: Pratyaksh's GIS integration brings your
                            data to life. Interactive dashboards provide a visual
                            representation of your project's status, including crucial weather
                            and resource data.
                        </li>
                        <li>
                            Data-Driven Decisions: Make informed decisions with confidence.
                            Access real-time data on the conditions that can impact your
                            project's timeline and budget.
                        </li>
                        <li>
                            Streamlined Communication: GIS integration fosters better
                            communication among project stakeholders, ensuring everyone is on
                            the same page.
                        </li>
                    </ol>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row  py-4 gap-16 items-center md:items-start justify-center">
                <div className="w-80 md:w-96 text-left gap-4 flex flex-col">
                    <p className="px-4 font-bold text-2xl">Analytics and Reports</p>

                    <ol className="list-decimal text-sm gap-2 flex flex-col">
                        <li>
                            Comprehensive Oversight: Pratyaksh provides a suite of analytics
                            tools, including Gantt charts, Milestone tracking, and Waterfall
                            charts. These tools offer a comprehensive overview of your
                            project's phases, making it easier to manage budgets and
                            timelines.
                        </li>
                        <li>
                            Customizable Reports: Tailor your reports to your specific needs.
                            Pratyaksh allows you to generate detailed reports that highlight
                            the metrics most important to you and your stakeholders.
                        </li>
                        <li>
                            Transparency: Demonstrate transparency to clients, investors, and
                            regulatory bodies. Pratyaksh's reporting capabilities help you
                            maintain trust and accountability throughout the project
                            lifecycle.
                        </li>
                    </ol>
                </div>
                <img className="w-5/6 md:w-2/6" src={analyticsDashboard} alt="" />
            </div>
            <div className="flex flex-col md:flex-row  py-24 gap-16 items-center md:items-start justify-center  bg-white">
                <img className="w-5/6 md:w-2/6" src={simulationDashboard} alt="" />
                <div className="w-80 md:w-96 text-left gap-4 flex flex-col">
                    <p className="px-4 font-bold text-2xl">Simulation Module</p>

                    <ol className="list-decimal text-sm gap-2 flex flex-col">
                        <li>
                            Strategic Planning: Pratyaksh's Simulation Module is your crystal
                            ball for infrastructure projects. It identifies optimal strategies
                            by simulating various delay and cost scenarios.
                        </li>
                        <li>
                            Informed Decision-Making: With the ability to explore potential
                            roadblocks and their solutions, you can make informed decisions
                            that maximize efficiency and minimize risk.
                        </li>
                        <li>
                            Project Optimization: Streamline your projects like never before.
                            By considering multiple scenarios, Pratyaksh ensures that your
                            projects are optimized for success from start to finish.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Description;
