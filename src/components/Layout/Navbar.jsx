import React from 'react';
import { Search, Camera, LayoutDashboard } from 'lucide-react';
import { dataNavbarAuth, dataNavbarGuest, ROLES } from '@constants/appConstant';
import { SmartNavlinks } from './SmartNavlinks';
import { Logo } from '@components/UI/Logo';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';

const Navbar = () => {
  const { userId, role, signOut } = useAuthContext();
  const navigate = useNavigate();

  //Si on est Auth ou non
  const currentNavData = userId ? dataNavbarAuth : dataNavbarGuest;

  //Méthode onLogout
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="w-full bg-black flex items-center justify-between px-4 md:px-12 lg:px-25.5 py-4 lg:py-8">
      <div className="w-25 md:w-30 lg:w-38.25 shrink-0">
        <Link to="/">
          <Logo className="w-full h-auto" fill="white" />
        </Link>
      </div>

      <div className="hidden md:flex flex-1 max-w-199.25 mx-4 lg:ml-27 lg:mr-auto h-11 lg:h-13.5 border border-white rounded-full px-4 lg:px-5.5 items-center">
        <Search className="text-white w-4 h-4 lg:w-5 lg:h-5 mr-3 lg:mr-3.5 shrink-0" />
        <input
          type="text"
          placeholder="Recherche des articles"
          className="flex-1 bg-transparent text-neutral-400 text-sm lg:text-base outline-none placeholder:text-neutral-400 min-w-0"
        />
        <button className="flex items-center justify-center p-1 shrink-0 ml-2">
          <Camera className="text-white w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-6 lg:gap-10.5 lg:pr-8">
        {role === ROLES.ADMIN && (
          <NavLink
            to="/admin"
            className="flex items-center text-white hover:opacity-75 transition-opacity"
          >
            <LayoutDashboard className="w-6 h-6 shrink-0" />
          </NavLink>
        )}

        <SmartNavlinks
          data={currentNavData}
          onLogout={handleLogout}
          containerClassName="flex items-center gap-4 md:gap-6 lg:gap-10.5"
          itemClassName="flex items-center text-white hover:opacity-75 transition-opacity"
        />
      </div>
    </header>
  );
};

export default Navbar;