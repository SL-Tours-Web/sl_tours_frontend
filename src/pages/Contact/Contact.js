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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Add API/email logic here
  };

  return (
    <div className="contact-container modern-contact">
      <section className="contact-header">
        <h2><span role="img" aria-label="wave">👋</span> Contact Us</h2>
        <p>We'd love to hear from you! Fill out the form or reach us directly.</p>
      </section>

      <div className="contact-main">
        <section className="contact-card">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Maldives">Maldives</option>
                  <option value="India">India</option>
                  <option value="UK">UK</option>
                  <option value="USA">USA</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group consent-group">
              <label className="consent-label">
                <input type="checkbox" name="consent" checked={consent} onChange={e => setConsent(e.target.checked)} required />
                I agree to the privacy policy.
              </label>
            </div>
            <button type="submit" className="modern-btn">Send Message</button>
            {submitted && <div className="form-success">Thank you! We'll get back to you soon.</div>}
          </form>
        </section>

        <section className="contact-info-card">
          <h3>Contact Information</h3>
          <div className="info-list">
            <div className="info-item"><span className="info-icon">🏢</span> <strong>Vibe Ceylon Tours</strong></div>
            <div className="info-item"><span className="info-icon">📍</span> No 117, Sir Chittampalam A Gardiner Mawatha, Colombo 02, Sri Lanka.</div>
            <div className="info-item"><span className="info-icon">📞</span> <a href="tel:+94768511264">+94 76 8511 264</a></div>
            <div className="info-item"><span className="info-icon">✉️</span> <a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a></div>
          </div>
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.234!2d79.841!3d6.927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sColombo!5e0!3m2!1sen!2slk!4v1660000000000!5m2!1sen!2slk"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Vibe Ceylon Tours Location"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
