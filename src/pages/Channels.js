import React, { useState, useEffect } from 'react';
import { auth, db, addUserToFirestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MessageSender from '../components/MessageSender';
import InboxButton from '../components/InboxButton';
import InboxPanel from '../components/InboxPanel';
import UserActivityPanel from '../components/UserActivityPanel';
import AddFriendButton from '../components/AddFriendButton';
import AddFriendPanel from '../components/AddFriendPanel';
import RightPanelButton from '../components/RightPanelButton';
import RightPanel from '../components/RightPanel';
import ProfilePicture from '../components/ProfilePicture';
import { days, months, years } from '../components/DataArrays';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';

const Channels = () => {
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUserId(user.uid);
        const userDoc = await getUserFromFirestore(user.uid);
        if (!userDoc) {
          const providerData = user.providerData[0];
          if (providerData && providerData.providerId === 'google.com') {
            setGoogleUserData({
              email: providerData.email,
              displayName: providerData.displayName,
              photoURL: providerData.photoURL,
            });
            setIsGoogleSignUp(true);
          } else {
            setIsGoogleSignUp(false);
          }
        } else {
          setIsGoogleSignUp(false);
          setProfilePictureURL(userDoc.profilePicture);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);


  const handleCompleteRegistration = async (formData) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const isDisplayNameTaken = await checkIfDisplayNameExists(formData.displayName);
      if (isDisplayNameTaken) {
        setErrorMessage('Já existe um usuário com esse nome. Por favor, escolha outro.');
        return;
      }

      await addUserToFirestore(user.uid, {
        ...formData,
        profilePicture: profilePictureURL
      });
      setIsGoogleSignUp(false);
    } catch (error) {
      console.error('Erro ao completar registro:', error);
    }
  };

  const checkIfDisplayNameExists = async (displayName) => {
    const usersQuery = query(collection(db, 'users'), where('displayName', '==', displayName));
    const querySnapshot = await getDocs(usersQuery);
    return !querySnapshot.empty;
  };

  const getUserFromFirestore = async (userId) => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  };



  return (
    <div className="flex bg-[#222222] min-h-screen">
      {isGoogleSignUp && googleUserData ? (
        <div className="flex items-center justify-center w-full">
          <div className="bg-[#181818] p-6 rounded-lg shadow-sm max-w-3xl w-full mx-auto mt-6">
            <h2 className="text-2xl text-white mb-4">Finish creating your account:</h2>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCompleteRegistration({
                  name: e.target.name.value,
                  displayName: e.target.displayName.value,
                  birthDate: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
                  gender: e.target.gender.value,
                  email: googleUserData.email,
                  profilePicture: profilePictureURL
                });
              }}
              className="flex"
            >
              <div className="bg-[#181818] flex-1 flex flex-col gap-4 pr-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="bg-[#121212] w-full p-2 rounded text-white placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  name="displayName"
                  placeholder="Display name"
                  className="bg-[#121212] w-full p-2 rounded text-white placeholder-gray-500"
                  required
                />
                <div className="flex gap-2">
                  <select
                    name="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="bg-[#121212] w-1/3 p-2 rounded text-gray-500"
                    required
                  >
                    <option disabled selected hidden value="">Day</option>
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <select
                    name="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="bg-[#121212] w-1/3 p-2 rounded text-gray-500"
                    required
                  >
                    <option disabled selected hidden value="">Month</option>
                    {months.map(m => (
                      <option key={m.value} value={m.value}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-[#121212] w-1/3 p-2 rounded text-gray-500"
                    required
                  >
                    <option disabled selected hidden value="">Year</option>
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <select
                  name="gender"
                  className="bg-[#121212] w-full p-2 rounded text-gray-500"
                  required
                >
                  <option disabled selected hidden value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Sign UP
                </button>
              </div>
              <div className="flex-shrink-0 w-32 h-32">
                <ProfilePicture
                  googlePhotoURL={googleUserData.photoURL}
                  onImageUpdate={setProfilePictureURL}
                  className="w-full h-full"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-grow p-6 bg-[#222222]">
            <MessageSender/>
          </div>
          <Sidebar currentUserId={currentUserId} />

          <div className="fixed top-[20px] right-[254px] flex space-x-2">
            <RightPanel />
            <div className="flex space-x-2">
              <InboxButton onClick={() => setIsInboxOpen(!isInboxOpen)} />
              <AddFriendButton onClick={() => setIsAddFriendOpen(!isAddFriendOpen)} />
              <RightPanelButton />
            </div>
          </div>

          <UserActivityPanel />

          <InboxPanel isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
          <AddFriendPanel isOpen={isAddFriendOpen} onClose={() => setIsAddFriendOpen(false)} />
        </>
      )}
    </div>
  );
};

export default Channels;