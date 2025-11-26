import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { gsap } from 'gsap';
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from './Icons';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rifkyfadillah404', Icon: GithubIcon, color: '#6366f1' },
  { name: 'LinkedIn', url: 'https://linkedin.com', Icon: LinkedinIcon, color: '#0077b5' },
  { name: 'Email', url: 'mailto:rifkyfadillah404@gmail.com', Icon: MailIcon, color: '#ea4335' },
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

function SocialIcon({ link, isDarkMode }) {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef(null);

  const handleHover = (hovering) => {
    setIsHovered(hovering);
    gsap.to(iconRef.current, {
      y: hovering ? -5 : 0,
      scale: hovering ? 1.1 : 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  };

  return (
    <a
      ref={iconRef}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: isHovered 
          ? 'rgba(99, 102, 241, 0.2)' 
          : (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'),
        border: `1px solid ${isHovered ? 'rgba(99, 102, 241, 0.5)' : (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        transition: 'all 0.3s',
      }}
    >
      <link.Icon size={20} color={isHovered ? link.color : '#94a3b8'} />
    </a>
  );
}

function NavLink({ link, isDarkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? (isDarkMode ? '#fff' : '#0f172a') : '#64748b',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: 500,
        transition: 'color 0.3s',
        position: 'relative',
        padding: '4px 0',
      }}
    >
      {link.name}
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: isHovered ? '100%' : '0%',
        height: '2px',
        background: 'linear-gradient(90deg, #6366f1, #ec4899)',
        transition: 'width 0.3s ease',
      }} />
    </a>
  );
}

export default function Footer() {
  const { isDarkMode } = useTheme();
  const year = new Date().getFullYear();

  const bgColor = isDarkMode ? '#030712' : '#f8fafc';
  const textColor = isDarkMode ? '#f8fafc' : '#0f172a';
  const mutedColor = isDarkMode ? '#64748b' : '#64748b';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';

  return (
    <>
      {/* CTA Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 1rem',
        backgroundColor: bgColor,
        overflow: 'hidden',
      }}>
        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          filter: 'blur(80px)',
          opacity: isDarkMode ? 0.15 : 0.1,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
          filter: 'blur(80px)',
          opacity: isDarkMode ? 0.15 : 0.1,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '60rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#6366f1',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Ready to start?
          </p>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            <span style={{ color: textColor }}>Let's build </span>
            <span className="gradient-text">something amazing</span>
            <span style={{ color: textColor }}> together</span>
          </h2>

          <p style={{
            fontSize: '1rem',
            color: mutedColor,
            maxWidth: '32rem',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}>
            Have a project in mind? I'm always open to discussing new opportunities.
          </p>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s',
              boxShadow: '0 8px 30px -10px rgba(99, 102, 241, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start a Conversation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Gradient Separator */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #6366f1, #ec4899, #6366f1, transparent)',
        opacity: 0.4,
      }} />

      {/* Main Footer */}
      <footer style={{
        backgroundColor: bgColor,
        padding: '3rem 1rem 2rem',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Top Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}>
            {/* Brand */}
            <div>
              <h3 className="gradient-text" style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                marginBottom: '0.75rem',
                fontFamily: 'Poppins, sans-serif',
              }}>
                Rifky Fadillah
              </h3>
              <p style={{
                color: mutedColor,
                fontSize: '0.875rem',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}>
                Mobile & Frontend Developer building clean web & mobile apps.
              </p>
              
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {socialLinks.map((link) => (
                  <SocialIcon key={link.name} link={link} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {navLinks.map((link) => (
                  <NavLink key={link.name} link={link} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href="mailto:rifkyfadillah404@gmail.com"
                  style={{
                    color: mutedColor,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = isDarkMode ? '#fff' : '#0f172a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = mutedColor}
                >
                  rifkyfadillah404@gmail.com
                </a>
                <span style={{ color: mutedColor, fontSize: '0.875rem' }}>
                  Jakarta, Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: isDarkMode 
              ? 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.2), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
            marginBottom: '1.5rem',
          }} />

          {/* Bottom Section */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <p style={{
              color: mutedColor,
              fontSize: '0.8rem',
            }}>
              © {year} Muhammad Rifky Fadillah. All rights reserved.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy', 'Terms'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: mutedColor,
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = isDarkMode ? '#fff' : '#0f172a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = mutedColor}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
