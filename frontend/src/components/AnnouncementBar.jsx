import React from 'react';

const AnnouncementBar = () => {
    return (
        <div className="bg-yellow-50 border-t border-b border-yellow-200 py-3">
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                `}
            </style>
            <div className="max-w-7xl mx-auto px-4 flex items-center space-x-4 overflow-hidden">
                <span className="text-orange-500 flex-shrink-0 text-xl">📢</span>
                <div className="w-full overflow-hidden">
                    <p className="whitespace-nowrap inline-block animate-[marquee_30s_linear_infinite]">
                        Admissions open for Academic Year 2024-25 | Last date: March 31st | Annual Sports Day: Feb 15 | PTM: Feb 28
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;