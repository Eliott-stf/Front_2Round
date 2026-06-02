import React from "react";
import { ChevronLeft, CreditCard } from "lucide-react";

export default function PaymentInfo({ onBack, amount }) {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bebas text-3xl text-white tracking-wide ml-2">
          Paiement sécurisé
        </h2>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="border border-white bg-white/5 rounded-lg p-3 flex flex-col justify-between w-[120px] h-[72px] cursor-default">
          <CreditCard className="w-5 h-5 text-white" />
          <span className="font-inter text-[13px] font-medium text-white">Carte</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="block font-inter text-[13px] font-medium text-white mb-2">
            Numéro de carte
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="1234 1234 1234 1234" 
              className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3.5 text-white font-inter placeholder:text-[#555555] focus:outline-none focus:border-white transition-colors" 
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5 items-center pointer-events-none">
              <div className="w-8 h-5 bg-white rounded-[3px] flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#1a1f71] tracking-tighter">VISA</span>
              </div>
              <div className="w-8 h-5 bg-[#222] rounded-[3px] flex items-center justify-center overflow-hidden">
                <div className="flex -space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#eb001b]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f79e1b]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-inter text-[13px] font-medium text-white mb-2">
              Date d'expiration
            </label>
            <input 
              type="text" 
              placeholder="MM/AA" 
              className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3.5 text-white font-inter placeholder:text-[#555555] focus:outline-none focus:border-white transition-colors" 
            />
          </div>
          <div className="flex-1">
            <label className="block font-inter text-[13px] font-medium text-white mb-2">
              Code de sécurité
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="CVC" 
                className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3.5 text-white font-inter placeholder:text-[#555555] focus:outline-none focus:border-white transition-colors pr-10" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <CreditCard className="w-5 h-5 opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pb-2">
        <button className="w-full flex items-center justify-center py-4 rounded-xl font-bebas text-[22px] tracking-wider bg-white text-black transition-all duration-200 hover:bg-[#e5e5e5]">
          Payer {amount.toFixed(2)} €
        </button>
      </div>
    </div>
  );
}