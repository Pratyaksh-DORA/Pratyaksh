import React, { useEffect, useState } from 'react';

const Milestone = () => {
    const [mileStoneList, setMileStoneList] = useState([
        {
            id: 1,
            name: "Land acquisition",
        },
        {
            id: 2,
            name: "Contract Execution",
        },
        {
            id: 3,
            name: "Soil Study",
        },
        {
            id: 4,
            name: "Ground water Table Study",
        },
        {
            id: 5,
            name: "Design and Laydown of Foundation",
        },
        {
            id: 6,
            name: "Establishment of Columns",
        },
        {
            id: 7,
            name: "Establishemnt of Slabs",
        },
    ]);

    const [milestoneChoosen, setMileStoneChoosen] = useState([]);

    const handleMileStone = (id) => {
        setMileStoneChoosen([...milestoneChoosen, mileStoneList[id]]);
        setMileStoneList((prevList) => prevList.filter((_, index) => index !== id));
    };

    return (
        <div className='flex justify-center items-center h-screen'>

            <div className='bg-gray-100 flex flex-col p-4'>
                <p className='text-2xl font-bold'>
                    Milestones
                </p>
                <div className=''>

                    {milestoneChoosen &&
                        milestoneChoosen.map((x) => (
                            <p key={x.id} className='text-left'>{x.name}</p>
                        ))}
                </div>
            </div>
            <div className='w-1/2 flex flex-col p-4 item-start ml-80 bg-gray-300'>

                {mileStoneList.map((x, index) => (
                    <button key={x.id} onClick={() => handleMileStone(index)} className='text-left'>
                        {x.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Milestone;
