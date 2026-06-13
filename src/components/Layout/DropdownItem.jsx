import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const DropdownItem = ({ item, className, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const Icon = item.icon;

  const isActive = item.options?.some(option => option.path && option.path === location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      >
        {Icon && <Icon className={`w-6 h-6 md:w-7 md:h-7 shrink-0 transition-transform duration-200 ${isActive ? 'fill-white' : ''}`} style={{ transform: isOpen ? 'scale(0.95)' : 'scale(1)' }} />}
        {item.title && <span className="sr-only md:not-sr-only md:ml-2">{item.title}</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-60 bg-black border border-gray-dark rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.8)] z-50 py-2 flex flex-col gap-1 origin-top-right animate-in fade-in zoom-in-95 duration-200">
          {item.options.map((option, index) => {
            const OptionIcon = option.icon;

            // Condition : Si l'option est marquée comme "Déconnexion"
            if (option.isLogout) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="group flex items-center px-4 py-2.5 mx-2 font-inter text-sm text-gray hover:text-white hover:bg-gray-dark rounded-xl transition-all duration-200 text-left"
                >
                  {OptionIcon && <OptionIcon className="w-4 h-4 mr-3 text-gray group-hover:text-white transition-colors duration-200 shrink-0" />}
                  <span className="font-medium tracking-wide">{option.title}</span>
                </button>
              );
            }

            // Condition : Si le lien est une ancre (#)
            if (option.path && option.path.startsWith('#')) {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const targetId = option.path.substring(1);
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      // S'il n'est pas sur la page, on redirige vers l'accueil avec l'ancre
                      window.location.href = '/' + option.path;
                    }
                  }}
                  className="group flex items-center px-4 py-2.5 mx-2 font-inter text-sm text-gray hover:text-white hover:bg-gray-dark rounded-xl transition-all duration-200 text-left w-[calc(100%-1rem)]"
                >
                  {OptionIcon && (
                    <OptionIcon className="w-4 h-4 mr-3 text-gray group-hover:text-white transition-colors duration-200 shrink-0" />
                  )}
                  <span className="font-medium tracking-wide">{option.title}</span>
                </button>
              );
            }

            // Rendu standard pour les liens de navigation
            return (
              <NavLink
                key={index}
                to={option.path}
                onClick={() => setIsOpen(false)}
                className="group flex items-center px-4 py-2.5 mx-2 font-inter text-sm text-gray hover:text-white hover:bg-gray-dark rounded-xl transition-all duration-200"
              >
                {OptionIcon && (
                  <OptionIcon className="w-4 h-4 mr-3 text-gray group-hover:text-white transition-colors duration-200 shrink-0" />
                )}
                <span className="font-medium tracking-wide">{option.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};