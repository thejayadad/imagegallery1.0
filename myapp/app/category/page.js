'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import IndividualDonut from '@/components/IndividualDonut';

const Category = () => {
  const [donuts, setDonuts] = useState([]);
  const [filteredDonuts, setFilteredDonuts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    'Hot',
    'Sprinkle',
    'Custom',
    'Filled',
    'Seasonal',
  ];

  useEffect(() => {
    const fetchDonuts = async () => {
      try {
        const response = await fetch('/api/donut/');
        const data = await response.json();
        setDonuts(data);
        setFilteredDonuts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDonuts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredDonuts(donuts);
    } else {
      const filteredDonuts = donuts.filter(
        (donut) => donut.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredDonuts(filteredDonuts);
    }
  }, [activeCategory, donuts]);

  return (
    <section>
      <div className='tabs w-full flex justify-center align-center'>
        {categories.map((category) => (
          <span           
          className='tab tab-lg text-5xl mt-8 mb-8'
            key={category}
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveCategory(category)}
          >
            {category} 
          </span>
        ))}
      </div>
      <div>
        {filteredDonuts.length > 0 ? (
          <div className='flex gap-4'>
            {filteredDonuts.map((donut) => (
                <IndividualDonut
                key={donut._id}
                _id={donut._id}
                category={donut.category}
                title={donut.title}
                authorId={donut.authorId}
                creator={donut.authorId.username}
                imageUrl={donut.imageUrl}
                />
            ))}
          </div>
        ) : (
          <h3 className='text-center'>No Donuts</h3>
        )}
      </div>
    </section>
  );
};

export default Category;
