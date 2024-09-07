import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile, addUserToFirestore, signInWithPopup, provider, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../errorMessages';

const Register = () => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null); // Estado para armazenar o arquivo da foto
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Dados do Google:', {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });

      navigate('/channels', {
        state: {
          googleUserData: {
            email: user.email,
            displayName: user.displayName
          },
          isGoogleSignUp: true
        }
      });
    } catch (error) {
      setError(getErrorMessage(error.code));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = '';
      if (photo) {
        // Cria uma referência para o arquivo no Firebase Storage
        const photoRef = ref(storage, `profilePictures/${user.uid}`);
        // Faz o upload do arquivo
        await uploadBytes(photoRef, photo);
        // Obtém a URL do arquivo enviado
        photoURL = await getDownloadURL(photoRef);
      }

      await updateProfile(user, { displayName, photoURL });

      await addUserToFirestore(user.uid, {
        name,
        displayName,
        birthDate,
        gender,
        email,
        profilePicture: photoURL // Adiciona a URL da foto de perfil
      });

      navigate('/channels');
    } catch (error) {
      setError(getErrorMessage(error.code));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])} // Define o arquivo selecionado
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Sign up
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">ou</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
