
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import IndividualDonut from "./IndividualDonut";


const DonutShop = () => {
    const { data: session } = useSession();
  const [allPrompts, setAllDonuts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(false);

  useEffect(() => {
    const fetchDonuts = async () => {
      const response = await fetch(`/api/donut/`);
      const data = await response.json();

      setAllDonuts(data);
    };

     fetchDonuts();
  }, [session]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPrompts.filter(
      (item) => regex.test(item.category) || regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 300)
    );
  };

  return (
   <div
   className='mt-7 px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-auto'
   >
    {searchText
          ? searchedResults.map((singlePrompt) => (
              <IndividualDonut
                {...singlePrompt}
              ></IndividualDonut>
            ))
          : allPrompts.map((singlePrompt) => (
              <IndividualDonut
                {...singlePrompt}
              ></IndividualDonut>
            ))}
   </div>
  )
}

export default DonutShop
