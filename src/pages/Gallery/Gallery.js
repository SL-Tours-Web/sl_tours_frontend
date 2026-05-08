import React, { useState } from 'react';
import './Gallery.css';

const images = [
  { file: 'Sigiriya_rock_fortress_aerialimages.jpg', alt: 'Sigiriya Rock Fortress' },
  { file: 'Ella_nine_arches.jpg', alt: 'Ella Nine Arches Bridge' },
  { file: 'Mirissa_beach.jpg', alt: 'Mirissa Beach' },
  { file: 'Yala_nationa_leopard.jpg', alt: 'Yala National Park Leopard' },
  { file: 'kandy_tooth_temple.jpg', alt: 'Kandy Temple of the Tooth' },
  { file: 'tea_plantation.jpg', alt: 'Sri Lanka Tea Plantation' },
  { file: 'galle_fort.jpg', alt: 'Galle Fort' },
  { file: 'Adams_Peak.jpg', alt: "Adam's Peak" },
  { file: 'colombo.jpg', alt: 'Colombo Skyline' },
  { file: 'IMG_20190329_121454.jpg', alt: 'Sri Lanka Hill Country' },
  { file: 'IMG_20190401_082016.jpg', alt: 'Sri Lanka Tour' },
  { file: 'IMG_20190402_125304.jpg', alt: 'Sri Lanka Family Tour' },
];

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1 className="gallery-title">Tour Gallery</h1>
        <p className="gallery-desc">Breathtaking moments from our curated Sri Lanka journeys. Click any image to explore.</p>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item" onClick={() => setSelectedImg(image)}>
            <img src={`/Images/${image.file}`} alt={image.alt} loading="lazy" />
            <div className="gallery-overlay">
              <span className="gallery-zoom">⊕</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="gallery-modal" onClick={() => setSelectedImg(null)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <img src={`/Images/${selectedImg.file}`} alt={selectedImg.alt} />
            <button className="gallery-modal-close" onClick={() => setSelectedImg(null)} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
