import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownItem } from './DropdownItem';

export const SmartNavlinks = ({ data, containerClassName, itemClassName }) => {
  return (
    <div className={containerClassName}>
      {data && data.map((item, index) => {
        if (item.options && item.options.length > 0) {
          return (
            <DropdownItem 
              key={`dropdown-${index}`} 
              item={item} 
              className={itemClassName} 
            />
          );
        }

        const Icon = item.icon;
        return (
          <NavLink
            key={`link-${index}`}
            to={item.path}
            className={itemClassName}
          >
            {Icon && <Icon className="w-6 h-6 mr-2 shrink-0" />}
            {item.title && <span>{item.title}</span>}
          </NavLink>
        );
      })}
    </div>
  );
};