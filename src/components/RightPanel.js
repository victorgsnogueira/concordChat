import React from 'react';
import UserActivityPanel from '../components/UserActivityPanel';

const RightPanel = () => {
    return (
        <div className="h-[calc(100vh-2rem)] transition-all duration-300 bg-[#101010] text-white rounded-lg w-[230px] flex flex-col justify-between items-center m-[16px]">
            <div className=''>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem omnis numquam unde velit, at tenetur corporis, vitae rerum rem eius placeat excepturi exercitationem, sint aut et ipsam doloremque nisi fugiat?
Harum, aspernatur sit veniam aliquid illum minus. Ex, enim sed voluptate, tempore libero fugiat, atque non modi corrupti possimus perferendis. Molestias ab exercitationem accusamus sint, dignissimos expedita repudiandae. Dolor, cupiditate.
Exercitationem blanditiis hic sapiente esse laboriosam, nobis aut officia officiis optio modi facere id sint commodi, soluta animi. 
            </div>
            <UserActivityPanel />
        </div>
    );
};

export default RightPanel;