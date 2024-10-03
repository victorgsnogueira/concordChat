import React, { useState } from 'react';
import 'boxicons';

const MessageSender = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isFileIconHovered, setIsFileIconHovered] = useState(false);
  const [isSmileIconHovered, setIsSmileIconHovered] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className=" w-[100%] h-full self-end mb-[16px]">
      <div className="flex items-center bg-[#121212] p-2 rounded-lg shadow-sm">
        {/* Botão de adicionar arquivo */}
        <button
          className="flex p-2 text-gray-400 rounded-lg hover:text-white hover:bg-[#181818]"
          onMouseEnter={() => setIsFileIconHovered(true)}
          onMouseLeave={() => setIsFileIconHovered(false)}
        > 
          <box-icon name="plus" color={isFileIconHovered ? 'white' : '#666'}></box-icon>
        </button>

        {/* Input de mensagem */}
        <input
          type="text"
          className="flex-grow mx-2 p-2 bg-[#181818] text-white rounded-lg focus:outline-none"
          placeholder="Escreva uma mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {/* Botão de adicionar emoji */}
        <button
          className="flex p-2 text-gray-400 rounded-lg hover:text-white hover:bg-[#181818]"
          onMouseEnter={() => setIsSmileIconHovered(true)}
          onMouseLeave={() => setIsSmileIconHovered(false)}
        >
          <box-icon name="smile" color={isSmileIconHovered ? 'white' : '#666'}></box-icon>
        </button>
      </div>
    </div>
  );
};

export default MessageSender;