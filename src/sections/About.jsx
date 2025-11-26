import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useTheme } from '../hooks/useTheme';
import { useScroll, useTransform, motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger, Draggable);

const journey = [
  { year: '2022', title: 'Started Coding', desc: 'Began my journey learning web development fundamentals' },
  { year: '2023', title: 'First Projects', desc: 'Built real-world applications with Laravel & Flutter' },
  { year: '2024', title: 'Going Further', desc: 'Expanding skills in React, Next.js & modern tech stack' },
  { year: '2025', title: 'Level Up', desc: 'Building more complex apps and exploring new technologies' },
];

const expertise = [
  'Frontend Development',
  'Mobile Development', 
  'Backend Development',
  'UI/UX Design',
  'Database Management',
  'API Integration',
];

function ScrollHighlightItem({ children, index, scrollYProgress, totalItems }) {
  const start = index / totalItems;
  const end = (index + 1) / totalItems;
  
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.2, 1, 1, 0.2]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.95, 1, 1, 0.95]
  );

  const x = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [-20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, scale, x }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const { isDarkMode } = useTheme();
  const [tiltStyle, setTiltStyle] = useState({});
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const profileCardRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${(y - centerY) / 10}deg) rotateY(${(centerX - x) / 10}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let draggable;
    
    const timer = setTimeout(() => {
      if (!profileCardRef.current) return;
      
      draggable = Draggable.create(profileCardRef.current, {
        type: 'x,y',
        edgeResistance: 0.65,
        inertia: true,
        onPress: function() {
          gsap.to(profileCardRef.current, { 
            scale: 1.02, 
            boxShadow: '0 25px 50px rgba(6, 182, 212, 0.35)',
            zIndex: 100,
            duration: 0.4,
            ease: 'power2.out'
          });
        },
        onDrag: function() {
          const rotation = this.deltaX * 0.05;
          const tiltY = this.deltaY * 0.03;
          gsap.to(profileCardRef.current, { 
            rotation: rotation,
            skewX: tiltY,
            duration: 0.3,
            ease: 'power1.out'
          });
        },
        onRelease: function() {
          gsap.to(profileCardRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            skewX: 0,
            scale: 1,
            boxShadow: '0 4px 20px rgba(6, 182, 212, 0.2)',
            zIndex: 1,
            duration: 1.2,
            ease: 'elastic.out(0.8, 0.4)'
          });
        }
      })[0];
    }, 300);

    return () => {
      clearTimeout(timer);
      draggable?.kill();
    };
  }, []);

  const bgColor = isDarkMode ? '#030712' : '#f8fafc';
  const textColor = isDarkMode ? '#f8fafc' : '#0f172a';
  const grayColor = '#94a3b8';
  const cardBg = isDarkMode ? '#111827' : '#ffffff';

  return (
    <section id="about" ref={sectionRef} style={{ backgroundColor: bgColor, padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: textColor }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div style={{ width: '5rem', height: '4px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '1rem auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div ref={imageRef} style={{ position: 'relative', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
            <div 
              ref={profileCardRef}
              style={{ 
                borderRadius: '1rem', 
                overflow: 'hidden',
                cursor: 'grab',
                userSelect: 'none',
                boxShadow: '0 4px 20px rgba(6, 182, 212, 0.2)'
              }}
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseLeave}
            >
              <div style={{ 
                ...tiltStyle, 
                aspectRatio: '1', 
                borderRadius: '1rem', 
                overflow: 'hidden',
                transition: 'transform 0.2s'
              }}>
                <img 
                  src="/assets/profile.jpg" 
                  alt="Rifky Fadillah"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>

          <div ref={contentRef}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: textColor }}>
              Frontend & Mobile Developer
            </h3>
            <p style={{ color: grayColor, marginBottom: '1rem', lineHeight: 1.7 }}>
              I&apos;m a Frontend Developer with 2+ years of experience building modern, responsive web applications. 
              I focus on creating clean, maintainable code and delivering exceptional user experiences.
            </p>
            <p style={{ color: grayColor, marginBottom: '1.5rem', lineHeight: 1.7 }}>
              My passion lies in transforming ideas into functional, beautiful interfaces while ensuring 
              optimal performance. I specialize in React, Next.js, Flutter, and Laravel.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary">Hire Me</a>
              <a href="/resume.pdf" className="btn-outline" target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
          </div>
        </div>

        {/* Scroll Highlight Expertise */}
        <div ref={scrollContainerRef} style={{ marginBottom: '5rem' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: textColor, marginBottom: '2rem' }}>
            My <span className="gradient-text">Expertise</span>
          </h3>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '1rem',
            padding: '2rem 0'
          }}>
            {expertise.map((item, index) => (
              <ScrollHighlightItem 
                key={item} 
                index={index} 
                scrollYProgress={scrollYProgress}
                totalItems={expertise.length}
              >
                <div style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: textColor,
                  padding: '0.5rem 2rem',
                  borderRadius: '0.5rem',
                  background: isDarkMode 
                    ? 'linear-gradient(90deg, rgba(6,182,212,0.1), rgba(59,130,246,0.1))'
                    : 'linear-gradient(90deg, rgba(6,182,212,0.08), rgba(59,130,246,0.08))',
                  borderLeft: '4px solid',
                  borderImage: 'linear-gradient(to bottom, #06b6d4, #3b82f6) 1',
                  transition: 'all 0.3s ease',
                }}>
                  {item}
                </div>
              </ScrollHighlightItem>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: textColor, marginBottom: '3rem' }}>
            My <span className="gradient-text">Journey</span>
          </h3>
          
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '100%',
              background: 'linear-gradient(to bottom, #06b6d4, #3b82f6)',
              opacity: 0.3,
            }} />

            {journey.map((item, index) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginBottom: index < journey.length - 1 ? '3rem' : 0,
                  position: 'relative',
                }}
              >
                {/* Content Card */}
                <div style={{
                  width: '45%',
                  padding: '1.5rem',
                  backgroundColor: cardBg,
                  borderRadius: '1rem',
                  border: `1px solid ${isDarkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)'}`,
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1)',
                  order: index % 2 === 0 ? 1 : 2,
                  marginLeft: index % 2 === 0 ? 0 : 'auto',
                  marginRight: index % 2 === 0 ? 'auto' : 0,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.1)';
                }}
                >
                  <div style={{ 
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem', 
                    backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                    borderRadius: '9999px',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#06b6d4' }}>{item.year}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: textColor, marginBottom: '0.5rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: grayColor, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>

                {/* Center Dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  border: `3px solid ${cardBg}`,
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
                  zIndex: 1,
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
