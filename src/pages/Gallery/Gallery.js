import React from 'react';

import './Gallery.css';

const Gallery = () => {
  const images = [
    'image1.jpg', 
    'image2.jpg', 
    'image3.jpg', 
    'image4.jpg',
    'image5.jpg',
    'image6.jpg'
  ];

  return (
    <section className="gallery">
      <h2>Our Gallery</h2>
      <p>Explore some of the beautiful places we've taken our travelers.</p>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={`path-to-images/${image}`} alt={`Gallery Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
