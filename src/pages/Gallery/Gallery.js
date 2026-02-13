
import React, { useState } from 'react';
import './Gallery.css';

const images = [
  'FB_IMG_1523039746977.jpg',
  'IMG_20190329_121454.jpg',
  'IMG_20190401_082016.jpg',
  'IMG_20190402_125304.jpg',
  'IMG_20250302_172604.jpg',
  'IMG_20190330_172807.jpg',
  'IMG_20190401_151001.jpg',
  'ijk.jpg',
  'ijk.jpg',
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
            <img src={`Images/${image}`} alt={`Gallery Image ${index + 1}`} />
            <div className="gallery-overlay">
              <span className="gallery-zoom">&#128269;</span>
            </div>
          </div>
        ))}
      </div>
      {selectedImg && (
        <div className="gallery-modal" onClick={() => setSelectedImg(null)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <img src={`Images/${selectedImg}`} alt="Enlarged" />
            <button className="gallery-modal-close" onClick={() => setSelectedImg(null)}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
