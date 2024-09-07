import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithPopup, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../errorMessages';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (identifier.includes('@')) {

        await signInWithEmailAndPassword(auth, identifier, password);
      } else {

        throw new Error('Usuário não encontrado');
      }

      navigate('/channels');
    } catch (error) {
      setError(getErrorMessage(error.code));
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email or username"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => signInWithPopup(auth, provider)}
            className="w-full bg-red-500 text-white p-2 rounded mt-4"
          >
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="w-full bg-green-500 text-white p-2 rounded mt-4"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;