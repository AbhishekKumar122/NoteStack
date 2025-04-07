import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <div className="text-center mt-5">Loading user data...</div>;
  }

  

  return (
    <div className="card shadow p-4 mt-5 mx-auto" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">👤 Profile</h3>
      <hr />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
