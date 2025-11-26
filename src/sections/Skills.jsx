import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactIcon, VueIcon, TypeScriptIcon, NodeIcon, PythonIcon, DatabaseIcon, GitIcon, FigmaIcon } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Frontend
  { id: 'react', name: 'React', Icon: ReactIcon, level: 90, category: 'frontend', x: 12, y: 20 },
  { id: 'nextjs', name: 'Next.js', Icon: ReactIcon, level: 85, category: 'frontend', x: 8, y: 45 },
  { id: 'javascript', name: 'JavaScript', Icon: TypeScriptIcon, level: 90, category: 'frontend', x: 18, y: 70 },
  
  // Mobile & Backend
  { id: 'flutter', name: 'Flutter', Icon: VueIcon, level: 88, category: 'backend', x: 45, y: 22 },
  { id: 'laravel', name: 'Laravel', Icon: PythonIcon, level: 85, category: 'backend', x: 52, y: 48 },
  { id: 'nodejs', name: 'Node.js', Icon: NodeIcon, level: 80, category: 'backend', x: 48, y: 75 },
  { id: 'mysql', name: 'MySQL', Icon: DatabaseIcon, level: 85, category: 'backend', x: 58, y: 90 },
  
  // Tools
  { id: 'git', name: 'Git', Icon: GitIcon, level: 90, category: 'tools', x: 82, y: 20 },
  { id: 'github', name: 'GitHub', Icon: GitIcon, level: 90, category: 'tools', x: 88, y: 45 },
  { id: 'figma', name: 'Figma', Icon: FigmaIcon, level: 80, category: 'tools', x: 85, y: 70 },
];

const connections = [
  { from: 'react', to: 'nextjs' },
  { from: 'nextjs', to: 'javascript' },
  { from: 'flutter', to: 'laravel' },
  { from: 'laravel', to: 'nodejs' },
  { from: 'nodejs', to: 'mysql' },
  { from: 'git', to: 'github' },
  { from: 'github', to: 'figma' },
  { from: 'react', to: 'flutter' },
  { from: 'laravel', to: 'git' },
];

const categoryColors = {
  frontend: { main: '#6366f1', glow: 'rgba(99, 102, 241, 0.5)' },
  backend: { main: '#10b981', glow: 'rgba(16, 185, 129, 0.5)' },
  tools: { main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' },
};

function SkillNode({ skill, isHovered, onHover, onLeave, isDarkMode }) {
  const color = categoryColors[skill.category];

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="skill-node-item"
      style={{
        position: 'absolute',
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
        zIndex: isHovered ? 20 : 10,
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        willChange: 'transform',
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Node */}
      <div
        style={{
          position: 'relative',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #111827, #030712)'
            : 'linear-gradient(135deg, #ffffff, #f1f5f9)',
          border: `3px solid ${color.main}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered 
            ? `0 0 25px ${color.glow}`
            : `0 0 12px ${color.glow}`,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <skill.Icon size={28} color={color.main} />
        
        {/* Top dot */}
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color.main,
        }} />
      </div>
      
      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '10px',
          padding: '8px 14px',
          background: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderRadius: '10px',
          border: `2px solid ${color.main}`,
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a', fontSize: '13px' }}>
          {skill.name}
        </div>
        <div style={{ color: color.main, fontSize: '12px', fontWeight: '600', marginTop: '2px' }}>
          {skill.level}%
        </div>
        {/* Mini progress */}
        <div style={{
          marginTop: '6px',
          width: '80px',
          height: '3px',
          backgroundColor: isDarkMode ? '#111827' : '#e2e8f0',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${skill.level}%`,
            height: '100%',
            backgroundColor: color.main,
          }} />
        </div>
      </div>
    </div>
  );
}

function CircuitLines({ hoveredSkill, isDarkMode }) {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {connections.map((conn, idx) => {
        const fromSkill = skills.find(s => s.id === conn.from);
        const toSkill = skills.find(s => s.id === conn.to);
        const isHighlighted = hoveredSkill === conn.from || hoveredSkill === conn.to;
        const color = categoryColors[fromSkill.category].main;
        
        const x1 = fromSkill.x;
        const y1 = fromSkill.y;
        const x2 = toSkill.x;
        const y2 = toSkill.y;
        const midX = (x1 + x2) / 2;
        const path = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;

        return (
          <path
            key={idx}
            d={path}
            fill="none"
            stroke={isHighlighted ? color : (isDarkMode ? 'rgba(100, 116, 139, 0.25)' : 'rgba(148, 163, 184, 0.35)')}
            strokeWidth={isHighlighted ? 2.5 : 1.5}
            style={{ 
              transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
              filter: isHighlighted ? `drop-shadow(0 0 4px ${color})` : 'none',
            }}
          />
        );
      })}
    </svg>
  );
}

export default function Skills() {
  const { isDarkMode } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const bgColor = isDarkMode ? '#030712' : '#f8fafc';
  const textColor = isDarkMode ? '#f8fafc' : '#030712';

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.skill-node-item');
    
    gsap.fromTo(nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      style={{ 
        backgroundColor: bgColor, 
        padding: '6rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradients */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDarkMode 
          ? 'radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)'
          : 'radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isDarkMode ? 0.08 : 0.06,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '90rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: textColor }}>
            Tech <span className="gradient-text">Circuit</span>
          </h2>
          <div style={{ width: '5rem', height: '4px', backgroundColor: '#6366f1', margin: '1rem auto' }} />
          <p style={{ color: '#94a3b8', maxWidth: '40rem', margin: '1rem auto' }}>
            My technology stack visualized as an interconnected circuit board.
          </p>
        </div>

        {/* Circuit Board */}
        <div 
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '550px',
            margin: '0 auto',
          }}
        >
          <CircuitLines hoveredSkill={hoveredSkill} isDarkMode={isDarkMode} />

          {skills.map((skill) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              isHovered={hoveredSkill === skill.id}
              onHover={() => setHoveredSkill(skill.id)}
              onLeave={() => setHoveredSkill(null)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Frontend', color: '#6366f1' },
            { name: 'Backend', color: '#10b981' },
            { name: 'Tools', color: '#f59e0b' },
          ].map((cat) => (
            <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: cat.color,
                boxShadow: `0 0 8px ${cat.color}`,
              }} />
              <span style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '14px', fontWeight: '500' }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
