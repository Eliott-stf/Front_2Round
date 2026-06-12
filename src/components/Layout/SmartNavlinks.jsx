import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DropdownItem } from './DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { openCTAModal } from '@store/auth/authSlice';
import { useAuthContext } from '@contexts/AuthContext';

export const SmartNavlinks = ({ data, containerClassName, itemClassName, onLogout }) => {
  const dispatch = useDispatch();
  const { userId } = useAuthContext();
  const { items: conversations } = useSelector((state) => state.conversations);
  const location = useLocation();

  const hasUnreadMessages = React.useMemo(() => {
    if (!userId || !Array.isArray(conversations)) return false;
    return conversations.some(conv => 
      Array.isArray(conv.messages) && conv.messages.some(
        msg => msg && !msg.isRead && msg.senderId !== userId
      )
    );
  }, [conversations, userId]);
  
  return (
    <div className={containerClassName}>
      {data && data.map((item, index) => {
        if (item.options && item.options.length > 0) {
          return (
            <DropdownItem
              key={`dropdown-${index}`}
              item={item}
              className={itemClassName}
              onLogout={onLogout}
            />
          );
        }

        const Icon = item.icon;

        if (item.isCTA) {
          return (
            <button
              key={`link-${index}`}
              onClick={(e) => {
                e.preventDefault();
                dispatch(openCTAModal());
              }}
              className={itemClassName}
            >
              {Icon && <Icon className="w-6 h-6 shrink-0" />}
              {item.title && <span className="ml-2">{item.title}</span>}
            </button>
          );
        }

        if (item.isLogout) {
          return (
            <button
              key={`link-${index}`}
              onClick={onLogout}
              className={itemClassName}
            >
              {Icon && <Icon className="w-6 h-6 shrink-0" />}
              {item.title && <span className="ml-2">{item.title}</span>}
            </button>
          );
        }

        return (
          <NavLink
            key={`link-${index}`}
            to={item.path || "#"}
            className={itemClassName}
          >
            <div className="relative">
              {item.path === "/messages" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={location.pathname === item.path ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" stroke={location.pathname === item.path ? "black" : "currentColor"} />
                </svg>
              ) : (
                Icon && <Icon className={`w-6 h-6 shrink-0 ${location.pathname === item.path ? 'fill-white' : ''}`} />
              )}
              {item.path === "/messages" && !hasUnreadMessages && (
                <span className="absolute top-4 -right-2 w-3 h-3 bg-red rounded-full border-2 border-black z-10" />
              )}
            </div>
            {item.title && <span className="ml-2">{item.title}</span>}
          </NavLink>
        );
      })}
    </div>
  );
};