import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '1rem 2rem',
      transition: 'all 0.3s',
      backgroundColor: scrolled 
        ? (isDarkMode ? 'rgba(3, 7, 18, 0.95)' : 'rgba(255, 255, 255, 0.9)')
        : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a
          href="#home"
          className="gradient-text"
          onClick={(e) => handleNavClick(e, '#home')}
          style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', textDecoration: 'none' }}
        >
          Portfolio
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: isActive ? '#6366f1' : (isDarkMode ? '#f8fafc' : '#0f172a'),
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.3s',
                    position: 'relative',
                    paddingBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.target.style.color = '#6366f1';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.target.style.color = isDarkMode ? '#f8fafc' : '#0f172a';
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#6366f1',
                      borderRadius: '1px'
                    }} />
                  )}
                </a>
              );
            })}
            
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.5rem',
                borderRadius: '50%',
                backgroundColor: isDarkMode ? '#111827' : 'rgba(148, 163, 184, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? (
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#facc15' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#0f172a' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Mobile Menu Button (Hamburger) */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.5rem',
                borderRadius: '50%',
                backgroundColor: isDarkMode ? '#111827' : 'rgba(148, 163, 184, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? (
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#facc15' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#0f172a' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ 
                width: '24px', 
                height: '18px', 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  backgroundColor: isDarkMode ? '#f8fafc' : '#0f172a',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  transformOrigin: 'center',
                  transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                }} />
                <span style={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  backgroundColor: isDarkMode ? '#f8fafc' : '#0f172a',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  opacity: isOpen ? 0 : 1
                }} />
                <span style={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  backgroundColor: isDarkMode ? '#f8fafc' : '#0f172a',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  transformOrigin: 'center',
                  transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
                }} />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          backgroundColor: isDarkMode ? 'rgba(3, 7, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  color: isActive ? '#6366f1' : (isDarkMode ? '#f8fafc' : '#0f172a'),
                  textDecoration: 'none',
                  fontWeight: isActive ? 600 : 500,
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: isActive 
                    ? (isDarkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)')
                    : 'transparent',
                  borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                  transition: 'all 0.3s'
                }}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
