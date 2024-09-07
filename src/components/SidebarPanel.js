import React from 'react';
import FriendsList from './FriendsList';

const SidebarPanel = ({ currentUserId, isSidebarExpanded, content }) => {
  return (
    <div 
      className={`fixed top-8 transition-all duration-300 ${isSidebarExpanded ? 'left-[calc(230px+20px)]' : 'left-[calc(80px+20px)]'} 
      w-[250px] h-[calc(100vh-4rem)] bg-[#181818] rounded-lg`}
    >
      <div className="p-4 text-white h-full">
        {content === 'Direct' ? (
          currentUserId ? (
            <FriendsList currentUserId={currentUserId} />
          ) : (
            <p>Usuário não definido.</p>
          )
        ) : content === 'Server' ? (
          <p>Conteúdo do server</p>
        ) : (
          <p>Selecione uma opção.</p>
        )}
      </div>
    </div>
  );
};

export default SidebarPanel;
