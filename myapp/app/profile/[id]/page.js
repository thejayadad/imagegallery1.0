
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IndividualDonut from "@/components/IndividualDonut";

const ProfilePage = ({params}) => {
    const { data: session } = useSession();
  const [userPrompt, setUserPrompt] = useState([]);
  const user = params.id

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
      <h2 className="text-center">Profile Page</h2>
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

