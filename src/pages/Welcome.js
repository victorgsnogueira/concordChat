import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">BATE-PAPO EM GRUPO REPLETO DE DIVERSÃO E JOGOS</h1>
        <p className="text-lg mb-6">
          O Concord é ótimo para jogar e relaxar com os amigos, ou até mesmo para criar uma comunidade mundial.
          Personalize seu espaço para conversar, jogar e curtir.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-500 text-black p-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;
