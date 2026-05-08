import React, { useState, useEffect, useRef } from "react";
import api from "../../config/api";
import { useParams, useNavigate } from "react-router-dom";
import SriLankaMap from "./SriLankaMap";
import "./PackageDetail.css";

// All available local images mapped to keywords found in itinerary/package text
const LOCAL_IMAGES = {
  sigiriya:    '/Images/Sigiriya_rock_fortress_aerialimages.jpg',
  'lion rock': '/Images/Sigiriya lion rock with water gardens foreground.jpg',
  mirissa:     '/Images/Mirissa_beach.jpg',
  beach:       '/Images/Mirissa_beach.jpg',
  yala:        '/Images/Yala_nationa_leopard.jpg',
  leopard:     '/Images/Yala_nationa_leopard.jpg',
  ella:        '/Images/ella.jpg',
  'nine arch': '/Images/Ella_nine_arches.jpg',
  'nine arches': '/Images/Ella_nine_arches.jpg',
  'adams peak': '/Images/Adams_Peak.jpg',
  "adam's peak": '/Images/Adams_Peak.jpg',
  colombo:     '/Images/colombo.jpg',
  kandy:       '/Images/IMG_20190330_172807.jpg',
  tea:         '/Images/IMG_20190329_121454.jpg',
  nuwara:      '/Images/IMG_20190329_121454.jpg',
  galle:       '/Images/IMG_20190401_082016.jpg',
  unawatuna:   '/Images/IMG_20190401_082016.jpg',
  dambulla:    '/Images/IMG_20190401_151001.jpg',
  safari:      '/Images/Yala_nationa_leopard.jpg',
  elephant:    '/Images/IMG_20190402_125304.jpg',
  pinnawala:   '/Images/IMG_20190402_125304.jpg',
  udawalawe:   '/Images/IMG_20190402_125304.jpg',
  whale:       '/Images/Mirissa_beach.jpg',
  train:       '/Images/Ella_nine_arches.jpg',
  cultural:    '/Images/Sigiriya_rock_fortress_aerialimages.jpg',
  anuradhapura: '/Images/IMG_20190401_151001.jpg',
  polonnaruwa: '/Images/IMG_20190401_151001.jpg',
  hill:        '/Images/IMG_20190329_121454.jpg',
  family:      '/Images/IMG_20190402_125304.jpg',
  adventure:   '/Images/Adams_Peak.jpg',
  default:     '/Images/home.jpg',
};

function getImageForText(text) {
  if (!text) return LOCAL_IMAGES.default;
  const lower = text.toLowerCase();
  for (const [key, img] of Object.entries(LOCAL_IMAGES)) {
    if (key !== 'default' && lower.includes(key)) return img;
  }
  return null;
}

function getPackageImages(pkg) {
  const imgs = [];
  const seen = new Set();
  // From DB images array first
  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  if (pkg.images?.length) {
    pkg.images.forEach(i => imgs.push(`${apiBase}${i}`));
  }
  if (pkg.image) {
    const url = `${apiBase}${pkg.image}`;
    if (!seen.has(url)) { imgs.push(url); seen.add(url); }
  }
  // Then derive from name + highlights
  const sources = [pkg.name, ...(pkg.highlights || []), pkg.description || ''];
  for (const src of sources) {
    const img = getImageForText(src);
    if (img && !seen.has(img)) { imgs.push(img); seen.add(img); }
    if (imgs.length >= 6) break;
  }
  if (imgs.length === 0) imgs.push(LOCAL_IMAGES.default);
  return imgs;
}

// Slideshow component for the About section
function ImageSlideshow({ images }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 3200);
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="pkg-slideshow">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt={`Package view ${i + 1}`}
          className={`pkg-slide ${i === current ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
      {images.length > 1 && (
        <div className="pkg-slide-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`pkg-slide-dot ${i === current ? 'active' : ''}`}
              onClick={() => { setCurrent(i); clearInterval(timerRef.current); }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const COUNTRIES = [
  "Australia","Austria","Belgium","Canada","China","Denmark","Finland","France",
  "Germany","India","Italy","Japan","Maldives","Netherlands","New Zealand","Norway",
  "Russia","Singapore","South Korea","Spain","Sri Lanka","Sweden","Switzerland",
  "UAE","UK","USA","Other"
];

function InquiryModal({ packageName, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    fullName: "", email: "", whatsapp: "", country: "",
    startDate: "", endDate: "", groupSize: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const travelDates = form.startDate && form.endDate
        ? `${form.startDate} to ${form.endDate}`
        : form.startDate || "";
      await api.post("/api/inquiries", {
        fullName: form.fullName,
        email: form.email,
        whatsapp: form.whatsapp,
        country: form.country,
        packageInterested: packageName,
        travelDates,
        groupSize: form.groupSize ? parseInt(form.groupSize) : 1,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">🌴</div>
            <h3>Thank You!</h3>
            <p>We've received your inquiry for <strong>{packageName}</strong>.</p>
            <p>Our team will contact you within <strong>24 hours</strong> via WhatsApp or Email.</p>
            <button className="btn-inquire-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <span className="modal-eyebrow">Inquiry Form</span>
              <h3 className="modal-title">Plan Your Journey</h3>
              <p className="modal-package-name">{packageName}</p>
              <p className="modal-price-note">Prices confirmed after a free consultation — no commitment required.</p>
            </div>

            <form onSubmit={submit} className="modal-form">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={handle} placeholder="Your name" required />
                </div>
                <div className="modal-form-group">
                  <label>Country *</label>
                  <select name="country" value={form.country} onChange={handle} required>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
                </div>
                <div className="modal-form-group">
                  <label>WhatsApp Number *</label>
                  <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handle} placeholder="+1 234 567 8900" required />
                </div>
              </div>
              <div className="modal-form-row modal-date-row">
                <div className="modal-form-group">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handle} min={today} />
                </div>
                <div className="modal-form-group">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handle} min={form.startDate || today} />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Group Size</label>
                <input type="number" name="groupSize" value={form.groupSize} onChange={handle} placeholder="e.g. 2" min="1" max="50" />
              </div>
              <div className="modal-form-group">
                <label>Message / Special Requests</label>
                <textarea name="message" value={form.message} onChange={handle} rows="3" placeholder="Any special requirements or questions?" />
              </div>

              {error && <div className="modal-error">{error}</div>}

              <button type="submit" className="btn-inquire-primary full-width" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function PackageDetail() {
  const { packageId } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/packages/${packageId}`)
      .then(res => { setPkg(res.data); setLoading(false); })
      .catch(() => { setError("Failed to load package details"); setLoading(false); });
  }, [packageId]);

  if (loading) return (
    <div className="pd-loading">
      <div className="pd-spinner" />
      <p>Loading package details...</p>
    </div>
  );

  if (error || !pkg) return (
    <div className="pd-error">
      <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>
      <p>{error || "Package not found"}</p>
    </div>
  );

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const waMessage = encodeURIComponent(`Hi, I'm interested in the "${pkg.name}" package. Could you provide more details?`);
  const waLink = `https://wa.me/94768511264?text=${waMessage}`;
  const slideshowImages = getPackageImages(pkg);

  // Hero image: from DB or local fallback
  const heroImage = pkg.image
    ? `${apiBase}${pkg.image}`
    : getImageForText(pkg.name) || LOCAL_IMAGES.default;

  return (
    <div className="pd-page">
      {showModal && <InquiryModal packageName={pkg.name} onClose={() => setShowModal(false)} />}

      {/* ── HERO ── */}
      <div className="pd-hero">
        <img src={heroImage} alt={pkg.name} className="pd-hero__img" />
        <div className="pd-hero__overlay" />
        <div className="pd-hero__content">
          <button className="pd-back-hero" onClick={() => navigate(-1)}>← Back to Tours</button>
          {pkg.category?.name && (
            <span className="pd-hero__cat">{pkg.category.name}</span>
          )}
          <h1 className="pd-hero__title">{pkg.name}</h1>
          <div className="pd-hero__meta">
            <span className="pd-meta-pill">📅 {pkg.duration}</span>
            {pkg.transport && <span className="pd-meta-pill">🚌 {pkg.transport}</span>}
            {pkg.accommodation && <span className="pd-meta-pill">🏨 {pkg.accommodation}</span>}
          </div>
        </div>
      </div>

      <div className="pd-body">
        <div className="pd-main">

          {/* ── ABOUT ── */}
          {pkg.description && (
            <div className="pd-card pd-about">
              <h2 className="pd-section-title">About This Journey</h2>
              <div className="pd-about-inner">
                <p className="pd-desc">{pkg.description}</p>
                <ImageSlideshow images={slideshowImages} />
              </div>
            </div>
          )}

          {/* ── HIGHLIGHTS ── */}
          {pkg.highlights?.length > 0 && (
            <div className="pd-card pd-highlights">
              <h2 className="pd-section-title">Trip Highlights</h2>
              <div className="pd-highlights-grid">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="pd-highlight-item">
                    <span className="pd-highlight-check">✦</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── INCLUDES / EXCLUDES ── */}
          {(pkg.includes?.length > 0 || pkg.excludes?.length > 0) && (
            <div className="pd-inc-exc-row">
              {pkg.includes?.length > 0 && (
                <div className="pd-card pd-includes">
                  <h3 className="pd-inc-title pd-inc-title--green">
                    <span className="pd-inc-icon">✓</span> What's Included
                  </h3>
                  <ul className="pd-list">
                    {pkg.includes.map((item, i) => (
                      <li key={i}><span className="pd-tick green">✓</span>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.excludes?.length > 0 && (
                <div className="pd-card pd-excludes">
                  <h3 className="pd-inc-title pd-inc-title--red">
                    <span className="pd-inc-icon">✗</span> What's Excluded
                  </h3>
                  <ul className="pd-list">
                    {pkg.excludes.map((item, i) => (
                      <li key={i}><span className="pd-tick red">✗</span>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ── SRI LANKA MAP ── */}
          <SriLankaMap itinerary={pkg.itinerary} />

          {/* ── ITINERARY ── */}
          {pkg.itinerary?.length > 0 && (
            <div className="pd-card pd-itinerary">
              <h2 className="pd-section-title">Day-by-Day Itinerary</h2>

              {/* Day selector tabs */}
              <div className="pd-day-tabs">
                {pkg.itinerary.map((day, i) => (
                  <button
                    key={i}
                    className={`pd-day-tab ${activeDay === i ? 'active' : ''}`}
                    onClick={() => setActiveDay(i)}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              {/* Active day content */}
              {(() => {
                const day = pkg.itinerary[activeDay];
                const dayImg = getImageForText(`${day.title || ''} ${day.activities || ''}`);
                return (
                  <div className="pd-day-panel">
                    {dayImg && (
                      <div className="pd-day-img-wrap">
                        <img src={dayImg} alt={day.title || `Day ${day.day}`} className="pd-day-img" loading="lazy" />
                      </div>
                    )}
                    <div className="pd-day-header">
                      <span className="pd-day-num">Day {day.day}</span>
                      {day.title && <h3 className="pd-day-title">{day.title}</h3>}
                    </div>
                    <p className="pd-day-activities">{day.activities}</p>
                  </div>
                );
              })()}

              {/* Timeline view (collapsed) */}
              <details className="pd-timeline-toggle">
                <summary>View full itinerary timeline</summary>
                <div className="pd-timeline">
                  {pkg.itinerary.map((day, i) => (
                    <div key={i} className="pd-timeline-item">
                      <div className="pd-tl-dot" />
                      <div className="pd-tl-content">
                        <div className="pd-tl-day">Day {day.day}{day.title ? ` — ${day.title}` : ''}</div>
                        <p className="pd-tl-activities">{day.activities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}

          {/* ── PRICE NOTE ── */}
          <div className="pd-price-banner">
            <div className="pd-price-banner__icon">💬</div>
            <div className="pd-price-banner__text">
              <h3>Pricing & Customisation</h3>
              <p>Prices are tailored to your group size, travel dates, and selected accommodation. All packages are fully adjustable — <strong>confirmed after a free consultation</strong> with our team.</p>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="pd-cta-row">
            <button className="pd-btn-inquire" onClick={() => setShowModal(true)}>
              Inquire About This Package
            </button>
            <a href={waLink} target="_blank" rel="noreferrer" className="pd-btn-wa">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
