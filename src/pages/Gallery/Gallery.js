
import React, { useState } from 'react';
import './Gallery.css';

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg',
];

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="gallery">
      <h2 className="gallery-title">Tour Gallery</h2>
      <p className="gallery-desc">Explore breathtaking moments from our tours. Click any image to view it larger!</p>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item" onClick={() => setSelectedImg(image)}>
            <img src={`path-to-images/${image}`} alt={`Gallery Image ${index + 1}`} />
            <div className="gallery-overlay">
              <span className="gallery-zoom">&#128269;</span>
            </div>
          </div>
        ))}
      </div>
      {selectedImg && (
        <div className="gallery-modal" onClick={() => setSelectedImg(null)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <img src={`path-to-images/${selectedImg}`} alt="Enlarged" />
            <button className="gallery-modal-close" onClick={() => setSelectedImg(null)}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
