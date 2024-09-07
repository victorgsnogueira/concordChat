import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc, addDoc, updateDoc, Timestamp, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();


// Função para adicionar ou atualizar usuário no Firestore
export const addUserToFirestore = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
    console.log('Usuário adicionado ao Firestore com sucesso.');
  } catch (error) {
    console.error('Erro ao adicionar usuário ao Firestore:', error);
  }
};

// Função para enviar solicitação de amizade
const sendFriendRequest = async (user1Id, user2Id) => {
  try {
    await addDoc(collection(db, 'friendRequests'), {
      createdAt: Timestamp.now(),
      status: 'pending',
      user1Id,
      user2Id
    });
  } catch (error) {
    console.error('Erro ao enviar solicitação de amizade:', error);
  }
};

const acceptFriendRequest = async (requestId, user1Id, user2Id) => {
  try {
    // Atualize o status da solicitação de amizade
    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: 'accepted' });

    // Adicione ambos os documentos na coleção de amigos
    await setDoc(doc(collection(db, 'friends'), `${user1Id}_${user2Id}`), {
      user1Id,
      user2Id,
      createdAt: Timestamp.now()
    });

    await setDoc(doc(collection(db, 'friends'), `${user2Id}_${user1Id}`), {
      user1Id,
      user2Id,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Erro ao aceitar solicitação de amizade:', error);
  }
};

const rejectFriendRequest = async (requestId) => {
  try {
    await updateDoc(doc(db, 'friendRequests', requestId), { status: 'rejected' });
  } catch (error) {
    console.error('Erro ao rejeitar solicitação de amizade:', error);
  }
};

const checkIfFriends = async (user1Id, user2Id) => {
  try {
    const docRef = doc(db, 'friends', `${user1Id}_${user2Id}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Erro ao verificar amizade:', error);
    return false;
  }
};

export const getFriendsList = async (userId) => {
  try {
    const friendshipsRef = collection(db, 'friendships');

    const [querySnapshot1, querySnapshot2] = await Promise.all([
      getDocs(query(friendshipsRef, where('user1Id', '==', userId), where('status', '==', 'accepted'))),
      getDocs(query(friendshipsRef, where('user2Id', '==', userId), where('status', '==', 'accepted')))
    ]);

    const friendsIds = [
      ...querySnapshot1.docs.map(doc => doc.data().user2Id),
      ...querySnapshot2.docs.map(doc => doc.data().user1Id)
    ];

    const usersRef = collection(db, 'users');
    const userDocs = await Promise.all(friendsIds.map(id => getDoc(doc(usersRef, id))));

    return userDocs.map(doc => ({
      id: doc.id,
      displayName: doc.data()?.displayName
    }));
  } catch (error) {
    console.error('Erro ao obter lista de amigos:', error);
    return [];
  }
};

export { auth, provider, db, storage, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, updateProfile };