import React, { useState, useEffect } from 'react';
import { Search, Camera, LayoutDashboard } from 'lucide-react';
import { dataNavbarAuth, dataNavbarGuest, ROLES } from '@constants/appConstant';
import { SmartNavlinks } from './SmartNavlinks';
import { Logo } from '@components/UI/Logo';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';

import { useDispatch } from 'react-redux';
import { setFilters } from '@store/product/productSlice';

const Navbar = () => {
  const { userId, role, signOut } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery.trim() }));
      navigate('/catalogue');
    } else {
      dispatch(setFilters({ search: '' }));
      navigate('/catalogue');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //Si on est Auth ou non
  const currentNavData = userId ? dataNavbarAuth : dataNavbarGuest;

  //Méthode onLogout
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-500">
      <header
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isScrolled
            ? 'w-[95%] md:w-[90%] max-w-[1400px] mt-4 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-5 lg:px-8 py-2.5 shadow-[0_12px_48px_rgba(0,0,0,0.6)]'
            : 'w-full bg-black px-4 md:px-12 lg:px-25.5 py-4 lg:py-8 border-b border-transparent'
          }`}
      >
        {!isScrolled && (
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none"
          />
        )}

        <div className="flex items-center shrink-0">
          <Link to="/" className={`block transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isScrolled ? 'w-20 md:w-24 lg:w-28' : 'w-25 md:w-30 lg:w-38.25'}`}>
            <Logo className="w-full h-auto" fill="white" />
          </Link>
        </div>

        <div className={`hidden md:flex flex-1 max-w-199.25 mx-4 lg:mx-8 border border-white/20 rounded-full items-center transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isScrolled ? 'h-10 lg:h-11 px-4' : 'h-11 lg:h-13.5 px-4 lg:px-5.5'}`}>
          <button onClick={handleSearch} className="flex items-center justify-center shrink-0">
            <Search className="text-white w-4 h-4 mr-3 cursor-pointer hover:text-red transition-colors" />
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Recherche des articles"
            className="flex-1 bg-transparent font-inter text-white/80 text-base outline-none placeholder:text-neutral-500 min-w-0"
          />
          <button className="flex items-center justify-center p-1 shrink-0 ml-2 hover:opacity-75 transition-opacity">
            <Camera className="text-white w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end shrink-0 gap-4 md:gap-6 lg:gap-8">
          {role === ROLES.ADMIN && (
            <NavLink
              to="/admin"
              className="flex items-center text-white hover:opacity-75 transition-opacity"
            >
              <LayoutDashboard className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
            </NavLink>
          )}

          <SmartNavlinks
            data={currentNavData}
            onLogout={handleLogout}
            containerClassName="flex items-center gap-4 md:gap-6 lg:gap-8"
            itemClassName="flex items-center text-white hover:opacity-75 transition-opacity"
          />
        </div>
      </header>
    </div>
  );
};

export default Navbar;