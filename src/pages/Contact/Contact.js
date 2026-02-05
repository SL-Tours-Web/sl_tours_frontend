import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    message: '',
  });

  const [consent, setConsent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to API or email service)
    alert('Form submitted successfully');
  };

  return (
    <div className="contact-container">
      <section className="contact-header">
        <h2>Connect with Us, Start Your Sri Lanka Journey</h2>
        <p>Reach out to Vibe Ceylon Tours for personalized assistance, inquiries, or bookings.</p>
      </section>

      <section className="contact-form">
        <h3>Make an Inquiry</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Your Country Origin *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Please select</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Maldives">Maldives</option>
              <option value="India">India</option>
              {/* Add more options here */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              I confirm I have read and given consent for the above.
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="general-contact">
        <h3>General Contacts</h3>
        <div className="contact-info">
          <div className="address">
            <p><strong>Vibe Ceylon Tours</strong></p>
            <p>No 117, Sir Chittampalam A Gardiner Mawatha, Colombo 02, Sri Lanka.</p>
            <p>Phone: +94 76 8511 264</p>
            <p>Email: <a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a></p>
          </div>

          <div className="map">
            <h4>Location</h4>
            {/* You can embed Google Map iframe here */}
            <iframe
              src="https://www.google.com/maps/embed?pb=...your-map-embed-link..."
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
