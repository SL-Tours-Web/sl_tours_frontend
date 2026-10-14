import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import './Contact.css';

const COUNTRIES = [
  "Australia", "Austria", "Belgium", "Canada", "China", "Denmark", "Finland",
  "France", "Germany", "India", "Italy", "Japan", "Maldives", "Netherlands",
  "New Zealand", "Norway", "Russia", "Singapore", "South Korea", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "UAE", "UK", "USA", "Other"
];

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', whatsapp: '', country: '',
    packageInterested: '', travelStartDate: '', travelEndDate: '', groupSize: '', message: '',
  });
  const [consent, setConsent] = useState(false);
  const [packages, setPackages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/packages').then(res => setPackages(res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) { setError('Please accept the privacy policy to continue.'); return; }
    setError(''); setLoading(true);
    try {
      await api.post('/api/inquiries', {
        ...formData,
        groupSize: formData.groupSize ? parseInt(formData.groupSize) : 1,
      });
      setSubmitted(true);
      setFormData({ fullName: '', email: '', whatsapp: '', country: '', packageInterested: '', travelStartDate: '', travelEndDate: '', groupSize: '', message: '' });
      setConsent(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="contact-container modern-contact">
        <div className="contact-success-screen">
          <div className="success-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11.5 14.5 15.5 9.5"/></svg>
          </div>
          <h2>Thank You!</h2>
          <p>We've received your inquiry and our team will contact you within <strong>24 hours</strong> via WhatsApp or Email.</p>
          <p className="success-sub">While you wait, feel free to explore more of our packages.</p>
          <div className="success-actions">
            <a href="/ClientTours" className="modern-btn">Explore More Tours</a>
            <button className="modern-btn modern-btn-outline" onClick={() => setSubmitted(false)}>Send Another Inquiry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container modern-contact">
      <section className="contact-header">
        <h2>Plan Your Sri Lanka Journey</h2>
        <p>Fill in your details and we'll reach out within 24 hours to craft your perfect itinerary.</p>
      </section>

      <div className="contact-main">
        <section className="contact-card">
          <h3>Send Us an Inquiry</h3>
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                  <option value="">Select your country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp Number *</label>
                <input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="packageInterested">Package Interested In</label>
                <select id="packageInterested" name="packageInterested" value={formData.packageInterested} onChange={handleChange}>
                  <option value="">General Inquiry / Not Sure Yet</option>
                  {packages.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="groupSize">Group Size</label>
                <input type="number" id="groupSize" name="groupSize" value={formData.groupSize} onChange={handleChange} placeholder="e.g. 2" min="1" max="50" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="travelStartDate">Start Date</label>
                <input type="date" id="travelStartDate" name="travelStartDate" value={formData.travelStartDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="travelEndDate">End Date</label>
                <input type="date" id="travelEndDate" name="travelEndDate" value={formData.travelEndDate} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message / Special Requests</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your travel interests, any special requirements, or questions you have..." rows="4" />
            </div>

            <div className="price-notice">
              <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span>
              <p>Prices are tailored to your group size, dates, and preferred accommodation — <strong>confirmed after a free consultation</strong> with our team.</p>
            </div>

            <div className="form-group consent-group">
              <label className="consent-label">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required />
                I agree to the privacy policy and consent to being contacted via WhatsApp and Email.
              </label>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="modern-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </section>

        <section className="contact-info-card">
          <h3>Contact Information</h3>
          <div className="info-list">
            <div className="info-item"><span className="info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></span><strong>Sere Lanka Tours</strong></div>
            <div className="info-item"><span className="info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>236, Agalawatta</div>
            <div className="info-item"><span className="info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 15.1a19.79 19.79 0 01-3.07-8.67A2 2 0 013.62 4.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 11a16 16 0 006 6l.92-.92a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.9 18.3z"/></svg></span><a href="tel:+94706423059">+94 70 642 3059</a></div>
            <div className="info-item"><span className="info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span><a href="mailto:info@serelankatours.com">info@serelankatours.com</a></div>
            <div className="info-item">
              <span className="info-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span>
              <a href="https://wa.me/94706423059" target="_blank" rel="noreferrer" className="wa-link">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="response-promise">
            <h4>Our Promise</h4>
            <ul>
              <li>We reply within 24 hours</li>
              <li>Free consultation via WhatsApp or Google Meet</li>
              <li>Fully customisable itineraries</li>
              <li>Prices confirmed after hotel selection</li>
            </ul>
          </div>

          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.234!2d79.841!3d6.927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sColombo!5e0!3m2!1sen!2slk!4v1660000000000!5m2!1sen!2slk"
              width="100%" height="200" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Sere Lanka Tours Location"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
