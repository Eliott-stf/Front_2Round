// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@components/UI/Logo';
import { SmartNavlinks } from './SmartNavlinks';
import { 
  footerStaticLinks, 
  footerGuestLinks, 
  footerAuthLinks, 
  footerContact 
} from '@constants/appConstant';

export const Footer = ({ isAuthenticated = false }) => {
  const linkItemClass = "font-inter font-normal text-sm lg:text-[18px] text-gray hover:text-white transition-colors leading-none flex items-center justify-center sm:justify-start w-full";

  return (
    <footer id="contact-footer"className="w-full bg-black border-t border-gray-dark text-white pt-10 lg:pt-16 pb-6 lg:pb-8 px-6 md:px-12 lg:px-25.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10 lg:mb-16">

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 lg:gap-6">
          <Link to="/home" className="block w-40 lg:w-58.75 h-14 lg:h-20.25">
            <Logo className="w-full h-full" fill="white" />
          </Link>
          <p className="font-inter font-normal text-sm text-gray max-w-xs leading-relaxed">
            La marketplace de référence pour donner une seconde vie à vos équipements sportifs.
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 lg:gap-6">
          <h3 className="font-inter font-bold text-base lg:text-[20px] leading-none tracking-normal uppercase">
            Ressources
          </h3>
          <SmartNavlinks 
            data={footerStaticLinks}
            containerClassName="flex flex-col items-center sm:items-start gap-3 lg:gap-4 w-full"
            itemClassName={linkItemClass}
          />
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-8 lg:gap-10">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center sm:items-start gap-4 lg:gap-6 w-full">
              <h3 className="font-inter font-bold text-base lg:text-[20px] leading-none tracking-normal uppercase">
                Rejoindre 2Round
              </h3>
              <SmartNavlinks 
                data={footerGuestLinks}
                containerClassName="flex flex-col items-center sm:items-start gap-3 lg:gap-4 w-full"
                itemClassName={linkItemClass}
              />
            </div>
          ) : (
            footerAuthLinks.map((section, idx) => (
              <div key={`auth-section-${idx}`} className="flex flex-col items-center sm:items-start gap-4 lg:gap-6 w-full">
                <h3 className="font-inter font-bold text-base lg:text-[20px] leading-none tracking-normal uppercase">
                  {section.title}
                </h3>
                <SmartNavlinks 
                  data={section.links}
                  containerClassName="flex flex-col items-center sm:items-start gap-3 lg:gap-4 w-full"
                  itemClassName={linkItemClass}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 lg:gap-6">
          <h3 className="font-inter font-bold text-base lg:text-[20px] leading-none tracking-normal uppercase">
            Contact
          </h3>
          <SmartNavlinks 
            data={footerContact}
            containerClassName="flex flex-col items-center sm:items-start gap-3 lg:gap-4 w-full"
            itemClassName={`${linkItemClass} gap-3 [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-5 lg:[&>svg]:h-5 [&>svg]:flex-shrink-0`}
          />
        </div>

      </div>

      <div className="w-full pt-6 lg:pt-8 border-t border-gray-dark flex justify-center items-center text-center">
        <p className="font-inter font-normal text-xs text-gray-light">
          © 2026 2Round — Tous droits réservés
        </p>
      </div>
    </footer>
  );
};