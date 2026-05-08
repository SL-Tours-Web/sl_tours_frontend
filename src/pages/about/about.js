import React from 'react';
import './About.css';

const VALUE_ICONS = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6.5L12 2l11 4.5V12c0 5.5-4.5 10-11 12C5.5 22 1 17.5 1 12V6.5z"/><polyline points="9 12 11 14 15 10"/></svg>,
];

const VALUES = [
  { title: 'Authentic Experiences', desc: 'We go beyond the guidebook — connecting you with real Sri Lanka through local communities, hidden gems and genuine encounters.' },
  { title: 'Personalised Service', desc: 'Every itinerary is hand-crafted for you. We listen carefully to your interests, pace, and budget before building your perfect journey.' },
  { title: 'Trust & Transparency', desc: 'No hidden fees, no pressure. Prices are confirmed after a free consultation and every decision is yours to make.' },
  { title: 'Responsible Travel', desc: 'We choose eco-conscious partners, support local businesses, and travel in ways that protect Sri Lanka\'s natural and cultural heritage.' },
];

const About = () => {
  return (
    <div className="about-page">

      {/* ── PAGE HERO ── */}
      <section className="about-hero">
        <div
          className="about-hero__bg"
          style={{ backgroundImage: "url('/Images/Sigiriya_rock_fortress_aerialimages.jpg')" }}
        />
        <div className="about-hero__overlay" />
        <div className="about-hero__content section-wrapper">
          <span className="about-hero__label">About Us</span>
          <h1 className="about-hero__title">Sri Lanka's Most<br />Trusted Travel Partner</h1>
          <p className="about-hero__sub">A passionate team of local experts dedicated to crafting unforgettable journeys through the Pearl of the Indian Ocean.</p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="about-stats-strip">
        <div className="section-wrapper about-stats-strip__inner">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '500+', label: 'Happy Travellers' },
            { num: '50+', label: 'Destinations' },
            { num: '5.0', label: 'Average Rating' },
          ].map((s, i) => (
            <div key={i} className="about-stat">
              <span className="about-stat__num">{s.num}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="about-who">
        <div className="section-wrapper about-who__inner">
          <div className="about-who__image">
            <img src="/Images/home.jpg" alt="Vibe Ceylon Tours team in Sri Lanka" />
            <div className="about-who__badge">
              <span className="badge-num">10+</span>
              <span className="badge-txt">Years of Excellence</span>
            </div>
          </div>
          <div className="about-who__text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Built on a Passion<br />for Sri Lanka</h2>
            <p className="about-who__desc">
              Vibe Ceylon Tours is Sri Lanka's leading destination management company,
              born from a deep love for this extraordinary island. Our team of experienced
              local guides and travel specialists have spent years exploring every corner of
              Sri Lanka — from the ancient fortresses of the Cultural Triangle to the wild
              leopards of Yala and the pristine shores of the South Coast.
            </p>
            <p className="about-who__desc">
              We offer personalised tours, adventure travel, and tailor-made packages for
              every type of traveller. With deep local knowledge, trusted partnerships, and
              a genuine passion for excellence, we ensure your journey is seamless,
              authentic and unforgettable.
            </p>
            <a href="/contact" className="btn-primary about-who__cta">Plan Your Journey</a>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="about-values">
        <div className="section-wrapper">
          <div className="about-values__header">
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="value-card__icon">{VALUE_ICONS[i]}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="about-cta">
        <div className="section-wrapper about-cta__inner">
          <div className="about-cta__text">
            <span className="section-label" style={{ color: 'var(--sand-light)' }}>Get In Touch</span>
            <h2 className="about-cta__title">Ready to Start<br />Your Adventure?</h2>
            <p className="about-cta__sub">Reach out to our team — we'll craft your perfect Sri Lanka itinerary, completely free of charge.</p>
          </div>
          <div className="about-cta__info">
            <div className="about-contact-item">
              <div className="about-contact-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <strong>Address</strong>
                <p>236, Agalawatta</p>
              </div>
            </div>
            <div className="about-contact-item">
              <div className="about-contact-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 15.1a19.79 19.79 0 01-3.07-8.67A2 2 0 013.62 4.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 11a16 16 0 006 6l.92-.92a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.9 18.3z"/></svg>
              </div>
              <div>
                <strong>Phone</strong>
                <p><a href="tel:+94706423059">+94706423059</a></p>
              </div>
            </div>
            <div className="about-contact-item">
              <div className="about-contact-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <strong>Email</strong>
                <p><a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a></p>
              </div>
            </div>
            <div className="about-cta__buttons">
              <a href="/contact" className="btn-accent">Send Inquiry</a>
              <a href="https://wa.me/94768511264" target="_blank" rel="noreferrer" className="btn-ghost about-wa-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
