'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';


const Profiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  return (
    <section>
        <h2>All Chefs</h2>
        {users.map((user) => (
        <div key={user._id}>
          <Link href={`/profile/${user._id}`}>
           
              <h3>{user.username}</h3>
          
          </Link>
        </div>
      ))}

    </section>
  )
}

export default Profiles