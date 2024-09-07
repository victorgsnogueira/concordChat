import React, { useState } from 'react';
import 'boxicons';

const RightPanelButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className="flex w-10 h-10 p-2 bg-[#121212] text-white rounded-lg hover:bg-[#181818]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <box-icon name='group' type='solid' color='white' animation={isHovered ? 'tada' : undefined} ></box-icon>
        </button>
    );
};

export default RightPanelButton;
