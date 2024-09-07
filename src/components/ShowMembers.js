import React, { useRef, useEffect } from 'react';

const ShowMenbers = ({ isOpen, onClose }) => {
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
            className="fixed top-16 right-4 bg-[#181818] text-white rounded-lg shadow-[#121212] shadow-sm w-80 p-4"
        >
            <div className="flex items-center mb-4">
                <box-icon name='inbox' type='solid' color='white' size="24px"></box-icon>
                <h2 className="text-lg font-semibold ml-2">Inbox</h2>
            </div>
            <p>Este é o painel de Inbox.</p>
        </div>
    );
};

export default ShowMenbers;