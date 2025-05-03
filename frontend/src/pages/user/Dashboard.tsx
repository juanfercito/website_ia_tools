import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import UserLayout from '../../components/UserLayout';
import '../styles/UserMainPanel.css';

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
      <div className="mainContent">
        <h2>Welcome, {user.username}!</h2>
        <p>This is your dashboard. Here you can manage your account and access your tools.</p>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
