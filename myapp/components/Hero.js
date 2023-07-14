import React from 'react'
import hero from "../public/hero.png"

const Hero = () => {
  return (
    <section>
        <div className="carousel carousel-center rounded-box">
  <div className="carousel-item">
    <img src={hero} alt="Pizza" />
  </div> 
  <div className="carousel-item">
  <img src={hero} alt="Sprinkle" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Pizza" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Pizza" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Pizza" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Pizza" />
  </div> 
  <div className="carousel-item">
    <img src="/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Pizza" />
  </div>
</div>
    </section>
  )
}

export default Hero