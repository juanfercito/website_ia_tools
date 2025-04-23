import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import UserLayout from '../../components/UserLayout';
import styles from '../styles/userMainPanel';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <UserLayout
      username={user.username}
      profilePicture={user.profilePicture}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    >
      <div style={styles.mainContent}>
        <h1>Welcome, {user.username}!</h1>
        <p>This is your dashboard. Here you can manage your account and access your tools.</p>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
