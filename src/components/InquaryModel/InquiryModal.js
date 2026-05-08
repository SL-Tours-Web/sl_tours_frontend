import React, { useState } from 'react';
import './InquiryModal.css';

const InquiryModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send form data to an API)
    alert('Inquiry Submitted');
    closeModal();  // Close the modal after submission
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Inquire Now</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Your Country</label>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Please select</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="India">India</option>
            <option value="Maldives">Maldives</option>
            {/* Add more countries as needed */}
          </select>

          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

          <label>
            <input type="checkbox" required />
            I agree to the <a href="/privacy-policy">Privacy Policy</a>
          </label>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div className="whatsapp-btn">
          <a href="https://wa.me/94706423059" target="_blank" rel="noopener noreferrer">
            <img src="whatsapp-icon.png" alt="WhatsApp" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
