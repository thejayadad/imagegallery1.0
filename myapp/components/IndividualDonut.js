import React from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";

const IndividualDonut = ({_id, category, title, creator, imageUrl}) => {

  return (
    <div>
        <div className="
        relative 
        before:absolute
        before:h-full before:w-full
        before:rounded-3xl
        before:z-10
        hover:before:bg-gray-600 
        before:opacity-50
        cursor-pointer
        ">
      <Link class="" href='/'>

        <img 
        width={500}
        height={500}
        className='rounded-3xl 
        cursor-pointer relative z-0'       
        src={imageUrl} id="img"/>
        </Link>

    </div>
    </div>
  )
}

export default IndividualDonut