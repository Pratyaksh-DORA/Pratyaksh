import React from 'react';

const MilestoneChart = ({ milestones }) => {
    const getColor = (status) => {
        switch (status) {
            case 'Not Started':
                return 'bg-gray-300';
            case 'In Progress':
                return 'bg-yellow-400';
            case 'completed':
                return 'bg-green-400';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-24 gap-12 border p-4 bg-white rounded-md shadow-md">
            <div className='w-fit flex items-center justify-between'>
                <div id="dot" className={`w-4 h-4 bg-gray-300 rounded-full mb-2 z-10`} style={{ marginTop: "-40px" }} />
                {milestones.map((milestone, index) => (
                    <div key={milestone._id} className={`flex flex-col gap-4 items-center relative`}>

                        <div className="flex flex-col items-center">
                            <div id="dot" className={`w-4 h-4 ${getColor(milestone.status)} rounded-full mb-2 z-10`} />
                            <div id="line" className={`border w-40`} style={{ marginTop: "-15px" }}>

                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-600 text-center">
                                {milestone.target_date.slice(0, -14)}
                            </div>

                            <div className="text-sm text-black text-center font-semibold mt-1">
                                {milestone.name}
                            </div>
                        </div>

                    </div>
                ))}
                <div id="dot" className={`w-4 h-4 bg-gray-300 rounded-full mb-2 z-10`} style={{ marginTop: "-40px" }} />
            </div>
        </div>
    );
};

export default MilestoneChart;
