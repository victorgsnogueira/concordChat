import React from 'react';
import 'boxicons';

const UserActivityPanel = () => {
    return (
        <div className=' bg-[#181818] text-white rounded-lg p-2 w-[210px] h-[50px] flex items-center border border-[#181818] mb-5'>
            {/* Perfil do Usuário */}
            <div className='flex items-center mr-4'>
                <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/concordchat.appspot.com/o/profilePictures%2FUI2cEQK0SlVt4T6NjKw2fJdcTJL2?alt=media&token=ebb8db0d-77dd-459a-8120-b591ccaf45a6' alt='Perfil' className='w-9 h-9 rounded-full object-cover' />
                </div>
                <span className='ml-2 text-xs select-none'>Nome</span>
            </div>

            {/* Ícones com botões */}
            <div className='flex  ml-auto'>
                <button className='flex items-center justify-center w-[30px] h-[30px] rounded-lg hover:bg-[#121212] transition-colors'>
                    <box-icon name='microphone' type='solid' color='white' size='22px'></box-icon>
                </button>
                <button className='flex items-center justify-center w-[30px] h-[30px] rounded-lg hover:bg-[#121212] transition-colors'>
                    <box-icon name='headphone' type='solid' color='white' size='22px'></box-icon>
                </button>
                <button className='flex items-center justify-center w-[30px] h-[30px] rounded-lg hover:bg-[#121212] transition-colors'>
                    <box-icon name='cog' type='solid' color='white' size='22px'></box-icon>
                </button>
            </div>
        </div>
    );
};

export default UserActivityPanel;