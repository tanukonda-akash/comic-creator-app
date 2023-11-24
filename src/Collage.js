// Collage.js
import React from 'react';
import './Collage.css'; // Import the CSS file

const Collage = ({ images }) => {
  return (
    <div className="collage">
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Comic Preview ${index + 1}`} />
      ))}
    </div>
  );
};

export default Collage;
