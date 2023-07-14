import React from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";

const IndividualDonut = ({_id, category, title, authorId, creator, imageUrl}) => {

  return (
    <div>
        <div className="
        card shadow rounded-lg
        ">
      <Link class=""  href={`/donut/${_id}`}>

        <img 
  className="artboard phone-1
  grid flex-grow h-32 card bg-white rounded-box place-items-center
  
  "
        
        src={imageUrl} id="img"/>
       <div className="overlay">
      <h2
      className="title-font font-medium text-black mb-1"
      >{title}</h2>
      <p>{category}</p>
      <span>{authorId.username}</span>
      </div>

        </Link>

    </div>
    </div>
  )
}

export default IndividualDonut