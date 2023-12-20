import React from 'react';

const PieChart = ({ data }) => {
    const total = data.reduce((sum, value) => sum + value, 0);
    const angles = data.map((value) => (value / total) * 360);

    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-purple-500',
    ];

    let startAngle = 0;

    return (
        <div className="relative w-40 h-40">
            {data.map((value, index) => {
                const rotation = startAngle;
                const angle = angles[index];
                startAngle += angle;

                return (
                    <div
                        key={index}
                        className={`absolute w-full h-full ${colors[index]}`}
                        style={{
                            clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)',
                            transform: `rotate(${rotation}deg)`,
                            borderRadius: angle >= 180 ? '0 0 100% 100%' : '50% 50% 0 0',
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default PieChart;
