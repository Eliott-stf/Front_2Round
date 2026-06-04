//on récup le hook
import React from 'react';

const UserCard = ({ user, handleToggleBan, handleOpenDetail }) => {
    //on déclare nos const de confort
    const userIdShort = user.id.substring(0, 8) + '...';
    const initialName = user.name.charAt(0) + user.lastname.charAt(0);
    const isAdmin = user.role === 'ADMIN';

    return (
        <tr 
            onClick={() => handleOpenDetail(user.id)}
            className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
        >
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {userIdShort}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    {/* Avatar Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center">
                        <span className="font-bebas text-white text-sm">
                            {initialName}
                        </span>
                    </div>
                    <span className="font-inter text-sm text-white">
                        {user.name} {user.lastname}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {user.email}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-inter uppercase tracking-wider border rounded-md ${
                    isAdmin ? 'border-white text-white' : 'border-[#333333] text-[#888888]'
                }`}>
                    {user.role}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={`font-inter text-sm ${user.isActive ? 'text-[#888888]' : 'text-[#555555] line-through'}`}>
                    {user.isActive ? 'Actif' : 'Banni'}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBan(user.id);
                    }}
                    className="font-inter text-sm text-white hover:text-[#888888] underline transition-colors"
                >
                    {user.isActive ? 'Bannir' : 'Débannir'}
                </button>
            </td>
        </tr>
    );
};

export default UserCard;
