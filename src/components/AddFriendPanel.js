import React, { useRef, useEffect } from 'react';

const AddFriendPanel = ({ isOpen, onClose }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={panelRef}
            className="h-32 absolute right-0  bg-[#181818] text-white rounded-lg shadow-[#121212] shadow-sm w-80 p-4 mt-1"
        >
            <div className="flex items-center mb-4">
                <box-icon name='user-plus' type='solid' color='white' size="24px"></box-icon>
                <h2 className="text-lg font-semibold ml-2">Add Friend</h2>
            </div>
            <p>Este é o painel de Add Friend.</p>
        </div>
    );
};

export default AddFriendPanel;