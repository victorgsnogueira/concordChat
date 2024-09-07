import React, { useState } from 'react';
import 'boxicons';

const AddFriendButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            className="flex w-10 h-10 p-2 bg-[#121212] text-white rounded-lg hover:bg-[#181818]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <box-icon name='user-plus' type='solid' animation={isHovered ? 'tada' : undefined} color='white' size='24px'></box-icon>
        </button>
    );
};

export default AddFriendButton;