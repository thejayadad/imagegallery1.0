import React from "react";

import { useSession } from "next-auth/react";


const IndividualDonut = ({_id, category, title, creator, imageUrl}) => {

  return (
    <div>
        <h2>{title}</h2>

    </div>
  )
}

export default IndividualDonut