import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';

const roles = ['Mobile Developer', 'Frontend Developer', 'Web Developer', 'Flutter Developer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { isDarkMode } = useTheme();
  
  const contentRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => setAnimationComplete(true) });

    gsap.set([greetingRef.current, nameRef.current, subtitleRef.current, descRef.current, buttonsRef.current], { opacity: 0 });

    tl.fromTo(greetingRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
    )
    .fromTo(nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo(buttonsRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
      '-=0.2'
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!animationComplete) return;
    
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 80 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, animationComplete]);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: isDarkMode ? '#030712' : '#f8fafc'
      }}
    >
      {/* Simple CSS Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Main Content */}
      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '2rem 1rem',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          <span 
            ref={greetingRef}
            style={{ 
              display: 'block',
              color: isDarkMode ? '#f8fafc' : '#0f172a',
              marginBottom: '0.5rem'
            }}
          >
            Hi, I&apos;m
          </span>
          <span 
            ref={nameRef}
            className="knockout-text" 
            style={{ display: 'block', lineHeight: 1.1 }}
          >
            M. Rifky Fadillah
          </span>
        </h1>

        <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
          <p 
            ref={subtitleRef}
            style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#94a3b8' }}
          >
            I&apos;m a{' '}
            <span style={{ color: '#6366f1', fontWeight: 600 }}>
              {displayText}
              <span className="cursor-blink">|</span>
            </span>
          </p>
          <p 
            ref={descRef}
            style={{ 
              marginTop: '1rem',
              maxWidth: '38rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: '#94a3b8',
              lineHeight: 1.6,
              fontSize: '0.95rem',
            }}
          >
            Building clean and modern web & mobile applications with care and curiosity.
          </p>
        </div>

        <div ref={buttonsRef} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          zIndex: 20
        }}
      >
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
      </div>

      <style>{`
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: ${isDarkMode ? '#6366f1' : '#818cf8'};
          border-radius: 50%;
          opacity: 0.4;
          animation: float linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 0.2; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s infinite;
        }
        .knockout-text {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.4s ease;
          cursor: default;
        }
        .knockout-text:hover {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .scroll-indicator {
          width: 24px;
          height: 40px;
          border-radius: 12px;
          border: 2px solid ${isDarkMode ? 'rgba(148, 163, 184, 0.4)' : 'rgba(100, 116, 139, 0.4)'};
          position: relative;
        }
        .scroll-dot {
          width: 4px;
          height: 8px;
          border-radius: 2px;
          background: #6366f1;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollBounce 1.5s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { top: 6px; opacity: 1; }
          50% { top: 22px; opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
