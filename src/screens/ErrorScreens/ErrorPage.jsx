import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white p-6">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Page introuvable</h2>
          <p className="text-neutral-400 max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 px-8 py-3 bg-white text-black font-medium rounded-full hover:scale-105 hover:bg-neutral-200 transition-all duration-200 ease-in-out"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;