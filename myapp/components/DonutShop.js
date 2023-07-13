
import React from "react";
import IndividualDonut from "./IndividualDonut";

export async function fetchDonuts(){
    const res = await fetch('http://localhost:3000/api/donut', {cache: 'no-store'})
  
    return res.json()
  }

export default async function DonutShop() {
    const donuts = await fetchDonuts()

    return (
     <div>
      {donuts?.length > 0 && <h2>Donut Shop</h2>}
       <div>
        {donuts?.length > 0 
         ? donuts.map((donut) => (
          <IndividualDonut key={donut._id} donut={donut}/>
        )) : <h3>No Donuts</h3>}
       </div>
     </div>
    )}


