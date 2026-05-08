import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { API_URL } from '../../config/api';
import './Home.css';

function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }, 80);
    return () => { clearTimeout(timer); observer.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function useCounter(target, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(timer); }
      else setVal(cur);
    }, 20);
    return () => clearInterval(timer);
  }, [target, start]);
  return val;
}

function TrustCounter({ value, suffix, label, icon }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const count = useCounter(value, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="trust-item" ref={ref}>
      <span className="trust-icon">{icon}</span>
      <span className="trust-number">{count}{suffix}</span>
      <span className="trust-label">{label}</span>
    </div>
  );
}

const POPULAR_DESTINATIONS = [
  { name: 'Sigiriya', tag: 'UNESCO Heritage', img: '/Images/Sigiriya_rock_fortress_aerialimages.jpg', desc: 'Ancient rock fortress' },
  { name: 'Ella', tag: 'Hill Country', img: '/Images/Ella_nine_arches.jpg', desc: 'Nine Arch Bridge & mist' },
  { name: 'Mirissa', tag: 'Beach Paradise', img: '/Images/Mirissa_beach.jpg', desc: 'Whale watching & surf' },
  { name: 'Yala', tag: 'Wildlife', img: '/Images/Yala_nationa_leopard.jpg', desc: 'Leopards & elephants' },
  { name: 'Kandy', tag: 'Cultural Capital', img: '/Images/kandy_tooth_temple.jpg', desc: 'Temple of the Tooth' },
  { name: 'Galle', tag: 'Colonial Heritage', img: '/Images/galle_fort.jpg', desc: '17th century Dutch fort' },
];

const TRAVEL_STYLES = [
  {
    id: 'cultural',
    icon: '🏛️',
    title: 'Cultural Explorer',
    desc: 'Ancient temples, UNESCO sites & rich history',
    color: '#0D4F5C',
    path: '/categories',
  },
  {
    id: 'adventure',
    icon: '🧗',
    title: 'Adventure Seeker',
    desc: 'Hikes, waterfalls, train rides & wild landscapes',
    color: '#1A7080',
    path: '/categories',
  },
  {
    id: 'beach',
    icon: '🏖️',
    title: 'Beach Lover',
    desc: 'Pristine beaches, surf & whale watching',
    color: '#C8965A',
    path: '/categories',
  },
  {
    id: 'wildlife',
    icon: '🐆',
    title: 'Wildlife Enthusiast',
    desc: 'Safaris, leopards, elephants & birdwatching',
    color: '#2E5A2E',
    path: '/categories',
  },
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useReveal([categories, featuredPackages]);

  const CAT_IMAGES = {
    'cultural':  '/Images/Sigiriya_rock_fortress_aerialimages.jpg',
    'beach':     '/Images/Mirissa_beach.jpg',
    'wildlife':  '/Images/Yala_nationa_leopard.jpg',
    'hill':      '/Images/IMG_20190329_121454.jpg',
    'adventure': '/Images/Adams_Peak.jpg',
    'city':      '/Images/colombo.jpg',
    'family':    '/Images/Ella_nine_arches.jpg',
  };

  const PKG_IMAGES = {
    'classic':   '/Images/Sigiriya lion rock with water gardens foreground.jpg',
    'wild':      '/Images/Yala_nationa_leopard.jpg',
    'hill':      '/Images/Ella_nine_arches.jpg',
    'south':     '/Images/Mirissa_beach.jpg',
    'adventure': '/Images/Adams_Peak.jpg',
    'ancient':   '/Images/Sigiriya_rock_fortress_aerialimages.jpg',
    'colombo':   '/Images/colombo.jpg',
    'complete':  '/Images/IMG_20190401_082016.jpg',
    'family':    '/Images/IMG_20190402_125304.jpg',
  };

  const getCatImage = (cat) => {
    if (cat.image) return `${API_URL}${cat.image}`;
    const name = cat.name.toLowerCase();
    for (const [key, img] of Object.entries(CAT_IMAGES)) {
      if (name.includes(key)) return img;
    }
    return '/Images/home.jpg';
  };

  const getPkgImage = (pkg) => {
    if (pkg.image) return `${API_URL}${pkg.image}`;
    const name = pkg.name.toLowerCase();
    for (const [key, img] of Object.entries(PKG_IMAGES)) {
      if (name.includes(key)) return img;
    }
    return '/Images/home.jpg';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, pkgRes] = await Promise.all([
          api.get('/api/categories'),
          api.get('/api/packages'),
        ]);
        setCategories(catRes.data);
        const featured = pkgRes.data.filter(p => p.isFeatured);
        setFeaturedPackages(featured.length > 0 ? featured : pkgRes.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__video-wrap">
          <video autoPlay loop muted playsInline>
            <source src="/Images/video.mp4" type="video/mp4" />
          </video>
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <span className="hero__eyebrow">Sri Lanka's Premier Travel Company</span>
          <h1 className="hero__title">
            Discover the<br />
            <em>Magic of Ceylon</em>
          </h1>
          <p className="hero__sub">
            Curated journeys through paradise — ancient temples, lush jungles,
            pristine beaches and beyond. Crafted personally for you.
          </p>
          <div className="hero__ctas">
            <a href="/ClientTours" className="btn-accent hero__btn">Explore Tours</a>
            <a href="/contact" className="btn-ghost hero__btn">Plan My Trip</a>
          </div>
          <div className="hero__trust-row">
            <span>⭐⭐⭐⭐⭐</span>
            <span>500+ Happy Travellers</span>
            <span className="hero__trust-divider">·</span>
            <span>Free Consultation</span>
            <span className="hero__trust-divider">·</span>
            <span>Personalised Itineraries</span>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="stats-strip">
        <div className="section-wrapper stats-strip__inner">
          <TrustCounter value={500} suffix="+" label="Happy Travellers" icon="🧳" />
          <div className="stats-divider" />
          <TrustCounter value={50} suffix="+" label="Destinations Covered" icon="📍" />
          <div className="stats-divider" />
          <TrustCounter value={10} suffix="+" label="Years of Excellence" icon="🏆" />
          <div className="stats-divider" />
          <div className="trust-item">
            <span className="trust-icon">⭐</span>
            <span className="trust-number">5.0</span>
            <span className="trust-label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ── */}
      <section className="destinations-section">
        <div className="section-wrapper">
          <div className="destinations-section__header reveal">
            <span className="section-label">Iconic Places</span>
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-sub">From mist-shrouded peaks to golden shores — Sri Lanka's most beloved places await.</p>
          </div>
          <div className="destinations-grid">
            {POPULAR_DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                className="dest-card reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
                onClick={() => navigate('/destinations')}
              >
                <div className="dest-card__img-wrap">
                  <img src={dest.img} alt={dest.name} loading="lazy" />
                  <div className="dest-card__overlay" />
                </div>
                <div className="dest-card__content">
                  <span className="dest-card__tag">{dest.tag}</span>
                  <h3 className="dest-card__name">{dest.name}</h3>
                  <p className="dest-card__desc">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="destinations-section__footer reveal">
            <a href="/destinations" className="text-link">View All Destinations →</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="about-strip">
        <div className="section-wrapper about-strip__inner reveal">
          <div className="about-strip__image">
            <img src="/Images/home.jpg" alt="Sri Lanka landscape" />
            <div className="about-strip__badge">
              <span className="badge-num">10+</span>
              <span className="badge-txt">Years of Excellence</span>
            </div>
          </div>
          <div className="about-strip__text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Sri Lanka's Most<br />Trusted Travel Partner</h2>
            <p className="about-strip__desc">
              Vibe Ceylon Tours is a destination management company built on one promise —
              to show you Sri Lanka as it truly is. Every itinerary is hand-crafted, every
              hotel selected with care, and every journey guided by our passionate local team.
            </p>
            <p className="about-strip__note">
              We don't do generic tours. We craft <em>your</em> unique journey.
            </p>
            <div className="about-strip__features">
              <div className="about-feature">
                <span className="about-feature__icon">✦</span>
                <span>Fully personalised itineraries</span>
              </div>
              <div className="about-feature">
                <span className="about-feature__icon">✦</span>
                <span>Deep local knowledge & expert guides</span>
              </div>
              <div className="about-feature">
                <span className="about-feature__icon">✦</span>
                <span>24/7 on-trip support via WhatsApp</span>
              </div>
            </div>
            <a href="/about" className="text-link about-strip__link">Learn More About Us →</a>
          </div>
        </div>
      </section>

      {/* ── TRAVEL STYLE QUIZ ── */}
      <section className="quiz-section">
        <div className="section-wrapper">
          <div className="quiz-section__header reveal">
            <span className="section-label">Find Your Journey</span>
            <h2 className="section-title">What Kind of Traveller Are You?</h2>
            <p className="section-sub">Choose your travel style and we'll match you with the perfect Sri Lanka experience.</p>
          </div>
          <div className="quiz-grid">
            {TRAVEL_STYLES.map((style, i) => (
              <div
                key={style.id}
                className="quiz-card reveal"
                style={{ transitionDelay: `${i * 80}ms`, '--card-color': style.color }}
                onClick={() => navigate(style.path)}
              >
                <div className="quiz-card__icon">{style.icon}</div>
                <h3 className="quiz-card__title">{style.title}</h3>
                <p className="quiz-card__desc">{style.desc}</p>
                <span className="quiz-card__cta">
                  Explore <span>→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="categories-section">
        <div className="section-wrapper">
          <div className="categories-section__header reveal">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Explore by Tour Type</h2>
            <p className="section-sub">From ancient ruins to untouched beaches — find the journey that calls to you.</p>
          </div>

          <div className="categories-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="category-card skeleton" />
              ))
            ) : categories.length > 0 ? (
              categories.map((cat, i) => {
                const GRADIENTS = [
                  'linear-gradient(135deg, #0D4F5C 0%, #1A7080 60%, #2E9FB5 100%)',
                  'linear-gradient(135deg, #1A5C3A 0%, #2A8A57 60%, #3EB373 100%)',
                  'linear-gradient(135deg, #3D2B1F 0%, #7A4F2E 60%, #C8965A 100%)',
                  'linear-gradient(135deg, #1F3060 0%, #2E4A99 60%, #4A6ED6 100%)',
                  'linear-gradient(135deg, #4A1F50 0%, #7A3085 60%, #B055C0 100%)',
                  'linear-gradient(135deg, #5C1A1A 0%, #8A2E2E 60%, #B55050 100%)',
                  'linear-gradient(135deg, #3D3500 0%, #8A7520 60%, #C8A84C 100%)',
                ];
                const ICONS = ['🏛️','🏖️','🐘','🍃','🧗','🌆','👨‍👩‍👧‍👦'];
                const gradient = GRADIENTS[i % GRADIENTS.length];
                const icon = ICONS[i % ICONS.length];
                return (
                  <div
                    key={cat._id}
                    className="category-card reveal"
                    style={{ transitionDelay: `${i * 75}ms` }}
                    onClick={() => navigate(`/category/${cat._id}`)}
                  >
                    <div className="category-card__img-wrap">
                      <img
                        src={getCatImage(cat)}
                        alt={cat.name}
                        loading="lazy"
                        onError={e => {
                          e.currentTarget.style.display = 'none';
                          const sib = e.currentTarget.nextSibling;
                          if (sib) sib.style.display = 'flex';
                        }}
                      />
                      <div className="category-card__fallback" style={{ background: gradient }}>
                        <span>{icon}</span>
                      </div>
                    </div>
                    <div className="category-card__overlay">
                      <div className="category-card__content">
                        <h3 className="category-card__name">{cat.name}</h3>
                        {cat.description && (
                          <p className="category-card__desc">{cat.description}</p>
                        )}
                        <span className="category-card__cta">
                          Explore
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: 'var(--text-light)', gridColumn: '1/-1', textAlign: 'center' }}>No categories yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURED PACKAGES ── */}
      {featuredPackages.length > 0 && (
        <section className="featured-section">
          <div className="section-wrapper">
            <div className="featured-section__header reveal">
              <span className="section-label">Handpicked For You</span>
              <h2 className="section-title">Featured Packages</h2>
              <p className="section-sub">Each package is fully customisable — prices confirmed after your free consultation.</p>
            </div>

            <div className="featured-grid">
              {featuredPackages.slice(0, 3).map((pkg, i) => (
                <div
                  key={pkg._id}
                  className="featured-card reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                  onClick={() => navigate(`/package/${pkg._id}`)}
                >
                  <div className="featured-card__img">
                    <img src={getPkgImage(pkg)} alt={pkg.name} loading="lazy" />
                    {pkg.category?.name && (
                      <span className="featured-card__cat">{pkg.category.name}</span>
                    )}
                    <div className="featured-card__img-overlay" />
                  </div>
                  <div className="featured-card__body">
                    <h3 className="featured-card__name">{pkg.name}</h3>
                    <div className="featured-card__meta">
                      {pkg.duration && (
                        <span className="featured-card__meta-pill">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {pkg.duration}
                        </span>
                      )}
                      {pkg.transport && (
                        <span className="featured-card__meta-pill">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                          {pkg.transport}
                        </span>
                      )}
                    </div>
                    {pkg.highlights?.length > 0 && (
                      <ul className="featured-card__highlights">
                        {pkg.highlights.slice(0, 3).map((h, j) => (
                          <li key={j}>
                            <span className="featured-card__check">✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="featured-card__footer">
                      <span className="featured-card__price-note">Price on consultation</span>
                      <button className="featured-card__btn">View Package</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="featured-section__footer reveal">
              <a href="/ClientTours" className="text-link">View All Tour Packages →</a>
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-wrapper">
          <div className="how-section__header reveal">
            <span className="section-label" style={{ color: 'var(--sand)' }}>Simple Process</span>
            <h2 className="section-title" style={{ color: 'white' }}>How It Works</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.65)' }}>Planning your dream Sri Lanka trip has never been easier.</p>
          </div>
          <div className="how-steps">
            {[
              { n: '01', icon: '🔍', title: 'Browse & Inquire', desc: 'Explore our curated packages and send a free inquiry with your dates and preferences.' },
              { n: '02', icon: '💬', title: 'Free Consultation', desc: 'We contact you within 24 hours via WhatsApp or Google Meet to discuss your perfect trip.' },
              { n: '03', icon: '🗺️', title: 'Custom Itinerary', desc: 'We craft a personalised day-by-day plan and confirm pricing based on your choices.' },
              { n: '04', icon: '✈️', title: 'Journey Begins', desc: 'Arrive in Sri Lanka and let us take care of everything. Your adventure starts here.' },
            ].map((step, i) => (
              <div key={i} className="how-step reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="how-step__num">{step.n}</div>
                <div className="how-step__icon-wrap">
                  <span className="how-step__icon">{step.icon}</span>
                </div>
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__desc">{step.desc}</p>
                {i < 3 && <div className="how-step__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SRI LANKA ── */}
      <section className="why-section">
        <div className="section-wrapper">
          <div className="why-section__header reveal">
            <span className="section-label">The Island</span>
            <h2 className="section-title">Why Sri Lanka?</h2>
            <p className="section-sub">One island. Infinite experiences. Less than 6 hours from most of Asia, Europe and the Middle East.</p>
          </div>
          <div className="why-grid">
            {[
              { icon: '🏛️', title: 'Ancient Heritage', desc: '8 UNESCO World Heritage Sites. Ancient kingdoms dating back 2,500 years.', img: '/Images/Sigiriya_rock_fortress_aerialimages.jpg' },
              { icon: '🐆', title: 'Wildlife Paradise', desc: 'Highest leopard density on Earth. Wild elephants, blue whales & 400+ bird species.', img: '/Images/Yala_nationa_leopard.jpg' },
              { icon: '🏖️', title: 'Pristine Beaches', desc: '1,340km of coastline — golden sand, turquoise water and world-class surf.', img: '/Images/Mirissa_beach.jpg' },
              { icon: '🍃', title: 'Hill Country', desc: 'Mist-covered mountains, scenic train rides, emerald tea estates and waterfalls.', img: '/Images/tea_plantation.jpg' },
            ].map((item, i) => (
              <div key={i} className="why-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="why-card__img">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="why-card__img-overlay" />
                  <span className="why-card__icon">{item.icon}</span>
                </div>
                <div className="why-card__body">
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-wrapper">
          <div className="testimonials-section__header reveal">
            <span className="section-label">Real Stories</span>
            <h2 className="section-title">What Our Travellers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { name: 'Sarah & James', country: '🇬🇧 United Kingdom', stars: 5, text: 'Absolutely unforgettable. The team arranged everything perfectly — from the Sigiriya sunrise to whale watching at Mirissa. We\'ve already recommended Vibe Ceylon to all our friends.' },
              { name: 'Thomas Müller', country: '🇩🇪 Germany', stars: 5, text: 'The 8-day cultural tour exceeded every expectation. Our guide was exceptional — knowledgeable, warm, and always going the extra mile. Sri Lanka is breathtaking and Vibe Ceylon made it magical.' },
              { name: 'Akiko Tanaka', country: '🇯🇵 Japan', stars: 5, text: 'We were nervous about planning a trip to Sri Lanka, but the team made everything seamless. The hill country train ride and Ella Rock hike were the highlights of our year.' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card reveal" style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="testimonial-card__quote">"</div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__stars">{'★'.repeat(t.stars)}</div>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__country">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner__bg" />
        <div className="cta-banner__inner reveal">
          <span className="section-label" style={{ color: 'var(--sand-light)' }}>Start Your Journey</span>
          <h2 className="cta-banner__title">Ready to Explore Sri Lanka?</h2>
          <p className="cta-banner__sub">Tell us your dream — we'll make it real. Free consultation, no commitment required.</p>
          <div className="cta-banner__btns">
            <a href="/contact" className="btn-accent cta-banner__btn">Start Planning</a>
            <a
              href="https://wa.me/94768511264?text=Hi%2C%20I%27m%20interested%20in%20a%20Sri%20Lanka%20tour%20from%20Vibe%20Ceylon%20Tours!"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost cta-banner__btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__top section-wrapper">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-mark">V</div>
              <span className="footer__logo-name">Vibe Ceylon Tours</span>
            </div>
            <p className="footer__tagline">Experience Sri Lanka like never before — with expert care, personal touch and authentic adventures.</p>
            <div className="footer__socials">
              <a href="#" aria-label="Facebook" className="footer__social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer__social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/94768511264" aria-label="WhatsApp" className="footer__social" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/ClientTours">Tours</a></li>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Contact</h5>
            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                No 117, Sir Chittampalam A Gardiner Mawatha, Colombo 02
              </div>
              <div className="footer__contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 15.1a19.79 19.79 0 01-3.07-8.67A2 2 0 013.62 4.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 11a16 16 0 006 6l.92-.92a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.9 18.3z"/></svg>
                <a href="tel:+94768511264">+94 76 851 1264</a>
              </div>
              <div className="footer__contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a>
              </div>
            </div>
          </div>

          <div className="footer__col">
            <h5>Pricing Note</h5>
            <p className="footer__price-note">
              All package prices are indicative and will be confirmed after a free consultation with our team, based on your selected hotels, travel dates, and group size.
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 Vibe Ceylon Tours. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <a
        href="https://wa.me/94768511264?text=Hi%2C%20I%27m%20interested%20in%20a%20Sri%20Lanka%20tour!"
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
