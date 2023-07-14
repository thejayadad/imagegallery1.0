
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IndividualDonut from "@/components/IndividualDonut";

const ProfilePage = ({params}) => {
    const { data: session } = useSession();
  const [userPrompt, setUserPrompt] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/user/${params.id}`);
      const data = await response.json();

      setUserPrompt(data);
    };

    fetchPrompts();
  },[session]);

  return (
    <section>
      <h2>Profile Page</h2>
      <div className="flex">
      {userPrompt.length < 1 ? (
          <h3>
            Donuts Are Still In The Oven
          </h3>
        ) : (
          userPrompt.map((singleUserPrompt) => (
            <IndividualDonut {...singleUserPrompt}  />
          ))
        )}
      </div>
    </section>
  )
}

export default ProfilePage



// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'


// const ProfilePage = ({params}) => {
  


//   return (
//     <section>
//   <h1>{user.username}'s Donuts</h1>
//       {user.donuts.map((donut) => (
//         <div key={donut._id}>
//           <p>{donut.title}</p>
//         </div>
//       ))}
//     </section>
//   )
// }

// export default ProfilePage