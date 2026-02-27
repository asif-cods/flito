import React, { useState, useEffect } from 'react';
import './index.css';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const PlayIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5V19L19 12L8 5Z" />
  </svg>
);



const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const LightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /><path d="M9 10l3 3 6-6" opacity="0.5" /></svg>
);

const BillIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="7" y1="15" x2="7.01" y2="15" /><line x1="12" y1="15" x2="12.01" y2="15" /></svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

const StepArrow = () => (
  <div className="step-arrow">
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 10H39M39 10L30 1M39 10L30 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  </div>
);

const PromiseCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l2.5 2.5L16 9" />
  </svg>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h3>{question}</h3>
        <span className="faq-icon">{isOpen ? '-' : '+'}</span>
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const WheelIcon = () => (
  <svg className="wheel-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="m4.93 4.93 14.14 14.14" />
    <path d="m19.07 4.93-14.14 14.14" />
  </svg>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate preloading for 1.5 seconds

    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="preloader">
          <WheelIcon />
          <h3 className='loading-text'>Loading FLITO...</h3>
        </div>
      )}

      <div className="page-background"></div>

      {/* Navigation Bar */}
      <header className="site-header">
        <div className="container">
          <nav className="navbar">
            <div className="nav-left">
              <button
                className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className="logo-container">
                <img src="/flito.png" alt="Flito Logo" style={{ height: '40px', width: 'auto' }} />
              </div>
            </div>

            <div className={`nav-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <div className="nav-links">
                <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="#why" onClick={() => setIsMobileMenuOpen(false)}>Why Flito?</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.flito.app"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download App
              </a>
            </div>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* Hero Section */}
        <section className="hero" id="home">
          {/* <img src="/flito.png" alt="Flito Logo" className="hero-logo" style={{ height: '160px', width: 'auto', objectFit: 'contain' }} /> */}

          <h1 className="hero-title reveal-left">
            Repair smart with <span className="highlight">flito</span>
          </h1>

          <p className="hero-subtitle reveal-right">
            Flito saves your time with 4-hour general service and 30-minute repairs during working hours. Predefined pricing and guaranteed OEM spare parts ensure transparent, reliable servicing at your doorstep.
          </p>

          <div className="cta-group">
            <a href="#play-store" className="play-store-badge-link">
              <img src="/google_play_badge.png" alt="Get it on Google Play" className="play-store-badge" />
            </a>

            <button className="btn-outline">
              <PlayIcon className="play-icon" />
              Watch Demo
            </button>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <h3 className="stat-number"><CountUp end={12} suffix="k" /></h3>
              <p className="stat-label">Customers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number"><CountUp end={20} suffix="k+" /></h3>
              <p className="stat-label">Mechanics</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number"><CountUp end={10} suffix="k" /></h3>
              <p className="stat-label">Brand Dealers</p>
            </div>
          </div>
        </section>
      </div>

      {/* Why Flito Section */}
      <section className="why-section" id="why">
        <div className="container">
          <div className="section-header reveal">
            <h2>Why <span className="highlight">Flito</span>?</h2>
            <div className="title-underline"></div>
          </div>

          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="icon-box">
                <ClockIcon />
              </div>
              <h3>4-Hour Service</h3>
              <p>Full general service completed rapidly.</p>
            </div>

            <div className="feature-card reveal">
              <div className="icon-box">
                <LightningIcon />
              </div>
              <h3>30-Min Repair</h3>
              <p>Quick fixes at your convenience.</p>
            </div>

            <div className="feature-card reveal">
              <div className="icon-box">
                <MapPinIcon />
              </div>
              <h3>At Your Door</h3>
              <p>We come to you, wherever you are.</p>
            </div>

            <div className="feature-card reveal">
              <div className="icon-box">
                <BillIcon />
              </div>
              <h3>Fixed Pricing</h3>
              <p>No hidden costs or surprises.</p>
            </div>

            <div className="feature-card reveal">
              <div className="icon-box">
                <AwardIcon />
              </div>
              <h3>OEM Parts</h3>
              <p>Genuine components guaranteed.</p>
            </div>

            <div className="feature-card reveal">
              <div className="icon-box">
                <UsersIcon />
              </div>
              <h3>Expert Pros</h3>
              <p>Highly skilled bike mechanics.</p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header reveal">
            <h2>About <span className="highlight">Flito</span></h2>
          </div>

          <p className="about-description">
            Flito is a modern platform dedicated to bringing professional bike maintenance
            directly to you. Our mission is to simplify bike care through transparency, speed,
            and uncompromising quality. We believe your time is valuable, and your ride
            deserves the best care possible without the hassle of traditional workshops.
          </p>

          <div className="how-it-works-card reveal">
            <h2>How It Works</h2>

            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <h3>Book</h3>
                <p>Choose your service and schedule a time on our app or website.</p>
              </div>

              <StepArrow />

              <div className="step-item">
                <div className="step-number">2</div>
                <h3>Service</h3>
                <p>Our expert mechanic arrives at your doorstep with everything needed.</p>
              </div>

              <StepArrow />

              <div className="step-item">
                <div className="step-number">3</div>
                <h3>Done</h3>
                <p>Your bike is ready! Pay securely and get back on the road.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="promise-section" id="promise">
        <div className="container">
          <div className="section-header reveal">
            <h2>Our Service <span className="highlight">Promise</span></h2>
            <p className="section-subtitle">
              We're committed to delivering exceptional service that exceeds your expectations. Here's our promise to you.
            </p>
          </div>

          <div className="promise-grid">
            <div className="promise-card reveal">
              <div className="promise-icon-box">
                <PromiseCheckIcon />
              </div>
              <div className="promise-content">
                <h3>Lightning Fast Turnaround</h3>
                <p>Minimized downtime for your commute.</p>
              </div>
            </div>

            <div className="promise-card reveal">
              <div className="promise-icon-box">
                <PromiseCheckIcon />
              </div>
              <div className="promise-content">
                <h3>Transparent Pricing</h3>
                <p>No hidden costs, ever. Pay what you see.</p>
              </div>
            </div>

            <div className="promise-card reveal">
              <div className="promise-icon-box">
                <PromiseCheckIcon />
              </div>
              <div className="promise-content">
                <h3>Genuine Spare Parts</h3>
                <p>Only 100% authentic OEM parts used.</p>
              </div>
            </div>

            <div className="promise-card reveal">
              <div className="promise-icon-box">
                <PromiseCheckIcon />
              </div>
              <div className="promise-content">
                <h3>Unmatched Reliability</h3>
                <p>Certified mechanics you can trust.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="app-preview-section" id="app-preview">
        <div className="container">
          <div className="section-header reveal">
            <h2>App <span className="highlight">Preview</span></h2>
            <p className="section-subtitle">
              Get a glimpse of our seamless and user-friendly mobile experience.
            </p>
          </div>

          <div className="app-slider-container reveal-right">
            <div className="app-slider">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="app-slide">
                  <img
                    src={`/app-img/ap-${num}.png`}
                    alt={`App Screen ${num}`}
                    className="app-screenshot"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header reveal">
            <h2>Frequently Asked <span className="highlight">Questions</span></h2>
            <div className="title-underline"></div>
          </div>

          <div className="faq-container reveal">
            <FAQItem
              question="What is Flito's 4-Hour Service?"
              answer="Our 4-Hour Service means that once our mechanic starts working on your bike, a general service will be completed within 4 hours at your location, ensuring minimal downtime."
            />
            <FAQItem
              question="Are there any hidden costs?"
              answer="No, Flito guarantees 100% transparent pricing. You will be able to see exactly what you are paying for via the app before confirming the booking."
            />
            <FAQItem
              question="Do you use genuine spare parts?"
              answer="Yes, we strictly use authentic OEM (Original Equipment Manufacturer) parts directly sourced from certified suppliers."
            />
            <FAQItem
              question="How do I book a service?"
              answer="You can book a service directly through the Flito app or website by choosing your required service, selecting a convenient time slot, and providing your location."
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer" id="contact">
        <div className="container footer-container">
          <div className="footer-brand">
            <img src="/flito.png" alt="Flito Logo" className="footer-logo" />
            <p className="footer-desc">
              Your ultimate companion for bike rides. Professional maintenance delivered directly to you.
            </p>
            <a href="#" className="play-store-badge-link footer-badge" aria-label="Get it on Google Play">
              <img src="/google_play_badge.png" alt="Get it on Google Play" className="play-store-badge" />
            </a>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#why">Why Flito?</a>
              <a href="#about">About Us</a>
              <a href="#promise">Our Promise</a>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <a href="#contact">Contact Us</a>
              <a href="#">FAQ</a>
              <a href="#">Terms of Service</a>
            </div>

            <div className="footer-col">
              <h4>Contact Info</h4>
              <p className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>No.12, Bike Street, Automotive City</span>
              </p>
              <p className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+91 63821 04561</span>
              </p>
              <p className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>support@flito.in</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Flito. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/916382104561"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}

export default App;
