import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../config/api';
import './NavBar.css';

const COUNTRIES = [
  "Australia","Austria","Belgium","Canada","China","Denmark","Finland","France",
  "Germany","India","Italy","Japan","Maldives","Netherlands","New Zealand",
  "Norway","Russia","Singapore","South Korea","Spain","Sri Lanka","Sweden",
  "Switzerland","UAE","UK","USA","Other"
];

function InquiryModal({ onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    fullName:'', email:'', whatsapp:'', country:'',
    packageInterested:'', startDate:'', endDate:'', groupSize:'', message:''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/packages').then(r => setPackages(r.data)).catch(() => {});
  }, []);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const travelDates = form.startDate && form.endDate
        ? `${form.startDate} to ${form.endDate}`
        : form.startDate || '';
      await api.post('/api/inquiries', {
        fullName: form.fullName,
        email: form.email,
        whatsapp: form.whatsapp,
        country: form.country,
        packageInterested: form.packageInterested,
        travelDates,
        groupSize: form.groupSize ? parseInt(form.groupSize) : 1,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="nav-modal-overlay" onClick={onClose}>
      <div className="nav-modal-box" onClick={e => e.stopPropagation()}>
        <button className="nav-modal-close" onClick={onClose} aria-label="Close">×</button>

        {submitted ? (
          <div className="nav-modal-success">
            <div className="nav-modal-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11.5 14.5 15.5 9.5"/></svg>
            </div>
            <h3>Thank You!</h3>
            <p>We've received your inquiry and will contact you within <strong>24 hours</strong> via WhatsApp or Email.</p>
            <button className="nav-modal-done-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="nav-modal-header">
              <span className="section-label">Get in Touch</span>
              <h3>Plan Your Sri Lanka Journey</h3>
              <p>Fill in your details and we'll craft a personalised itinerary for you.</p>
            </div>

            <form onSubmit={submit} className="nav-modal-form">
              <div className="nav-modal-row">
                <div className="nav-modal-field">
                  <label>Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={handle} placeholder="Your name" required />
                </div>
                <div className="nav-modal-field">
                  <label>Country *</label>
                  <select name="country" value={form.country} onChange={handle} required>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="nav-modal-row">
                <div className="nav-modal-field">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
                </div>
                <div className="nav-modal-field">
                  <label>WhatsApp Number *</label>
                  <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handle} placeholder="+1 234 567 8900" required />
                </div>
              </div>

              <div className="nav-modal-field">
                <label>Package Interested In</label>
                <select name="packageInterested" value={form.packageInterested} onChange={handle}>
                  <option value="">General / Not Sure Yet</option>
                  {packages.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
                </select>
              </div>

              <div className="nav-modal-row">
                <div className="nav-modal-field">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handle} min={today} />
                </div>
                <div className="nav-modal-field">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handle} min={form.startDate || today} />
                </div>
              </div>

              <div className="nav-modal-field">
                <label>Group Size</label>
                <input type="number" name="groupSize" value={form.groupSize} onChange={handle} placeholder="e.g. 2" min="1" max="50" />
              </div>

              <div className="nav-modal-field">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handle} rows="3" placeholder="Tell us about your dream trip..." />
              </div>

              <div className="nav-modal-price-note">
                Prices confirmed after a free consultation — no commitment required.
              </div>

              {error && <div className="nav-modal-error">{error}</div>}

              <button type="submit" className="nav-modal-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === '/';
    const onScroll = () => setScrolled(!isHome || window.scrollY > 40);
    onScroll(); // set immediately on mount/route change
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const isActive = path => location.pathname === path;

  return (
    <>
      {showModal && <InquiryModal onClose={() => setShowModal(false)} />}

      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">

          {/* Logo */}
          <a href="/" className="navbar__logo">
            <span className="navbar__logo-mark">V</span>
            <span className="navbar__logo-text">
              <span className="navbar__logo-main">Vibe Ceylon</span>
              <span className="navbar__logo-sub">Tours</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="navbar__links">
            <a href="/" className={isActive('/') ? 'active' : ''}>Home</a>
            <a href="/ClientTours" className={isActive('/ClientTours') ? 'active' : ''}>Tours</a>
            <a href="/destinations" className={isActive('/destinations') ? 'active' : ''}>Destinations</a>
            <a href="/gallery" className={isActive('/gallery') ? 'active' : ''}>Gallery</a>
            <a href="/about" className={isActive('/about') ? 'active' : ''}>About</a>
            <a href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</a>
          </nav>

          {/* CTA */}
          <div className="navbar__actions">
            <button className="navbar__inquire" onClick={() => setShowModal(true)}>
              Inquire Now
            </button>
            <button
              className={`navbar__burger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <nav className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
          <a href="/">Home</a>
          <a href="/ClientTours">Tours</a>
          <a href="/destinations">Destinations</a>
          <a href="/gallery">Gallery</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <button className="navbar__mobile-inquire" onClick={() => { setShowModal(true); setIsMenuOpen(false); }}>
            Inquire Now
          </button>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
