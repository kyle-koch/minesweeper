import React from 'react';
import { getLocalStorageData } from '../utilities/localStorage';

const UserTimes = () => {
  const userTimes = getLocalStorageData('userTimes') || [];

  return (
    <div>
      <h2>Recently Played User Times</h2>
      <ul>
        {userTimes.map((entry, index) => (
          <li key={index}>
            <strong>Difficulty:</strong> {entry.difficulty},{' '}
            <strong>Time:</strong> {entry.time} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTimes;