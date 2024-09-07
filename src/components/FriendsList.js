import React, { useState, useEffect } from 'react';
import { getFriendsList } from '../firebase';

const FriendsList = ({ currentUserId }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) {
      setLoading(false);
      return;
    }

    const fetchFriends = async () => {
      try {
        const friendsData = await getFriendsList(currentUserId);
        setFriends(friendsData);
      } catch (error) {
        console.error('Erro ao buscar amigos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [currentUserId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {friends.length > 0 ? (
          friends.map(friend => (
            <li key={friend.id}>{friend.displayName}</li>
          ))
        ) : (
          <p>puts, looks like you don't have any friends yet. </p>
        )}
      </ul>
    </div>
  );
};

export default FriendsList;