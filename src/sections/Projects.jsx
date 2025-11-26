import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { GithubIcon } from '../components/Icons';

const categories = ['All', 'Web App', 'Mobile'];

const projects = [
  { 
    id: 1, 
    title: 'Sisfo-Sarpas', 
    description: 'Web-based application for managing school asset borrowing and returns with tracking features.', 
    category: 'Web App', 
    tech: ['Laravel', 'Flutter', 'MySQL'], 
    color: '#6366f1',
    github: 'https://github.com/rifkyfadillah404/sisfo-sarpas-be' 
  },
  { 
    id: 2, 
    title: 'Starbhak-Mart', 
    description: 'Mobile food ordering app with real-time order tracking and Supabase backend.', 
    category: 'Mobile', 
    tech: ['Flutter', 'Supabase'], 
    color: '#ec4899',
    github: 'https://github.com/rifkyfadillah404/GoodFood' 
  },
  { 
    id: 3, 
    title: 'Vestiya', 
    description: 'Modern e-commerce landing page with REST API integration for product display.', 
    category: 'Web App', 
    tech: ['React', 'REST API'], 
    color: '#14b8a6',
    github: 'https://github.com/rifkyfadillah404/Vestiya', 
    demo: 'https://vestiya.vercel.app/' 
  },
  { 
    id: 4, 
    title: 'QuickShop', 
    description: 'E-commerce platform with Filament admin panel and Xendit payment gateway.', 
    category: 'Web App', 
    tech: ['Laravel', 'MySQL', 'Filament'], 
    color: '#f59e0b',
    github: 'https://github.com/rifkyfadillah404/quick-shop' 
  },
  { 
    id: 5, 
    title: 'NextSite', 
    description: 'Modern company profile landing page with Next.js and responsive design.', 
    category: 'Web App', 
    tech: ['Next.js', 'Tailwind'], 
    color: '#8b5cf6',
    github: 'https://github.com/rifkyfadillah404/NextSite', 
    demo: 'https://next-site-pearl-phi.vercel.app/' 
  },
  { 
    id: 6, 
    title: 'Monefy', 
    description: 'Finance tracking app for recording income, expenses and viewing summaries.', 
    category: 'Mobile', 
    tech: ['Flutter'], 
    color: '#06b6d4',
    github: 'https://github.com/rifkyfadillah404/monefy' 
  },
];

function ProjectCard({ project, isDarkMode }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardBg = isDarkMode ? '#111827' : '#ffffff';
  const textColor = isDarkMode ? '#f8fafc' : '#0f172a';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: cardBg,
        borderRadius: '1rem',
        overflow: 'hidden',
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 20px 40px ${project.color}20`
          : '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Color Bar */}
      <div style={{
        height: '4px',
        background: project.color,
      }} />

      <div style={{ padding: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              fontSize: '0.7rem',
              fontWeight: 600,
              borderRadius: '9999px',
              backgroundColor: `${project.color}15`,
              color: project.color,
              marginBottom: '0.5rem'
            }}>
              {project.category}
            </span>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: textColor,
            }}>
              {project.title}
            </h3>
          </div>
          
          {/* GitHub Link */}
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '0.5rem',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${project.color}20`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          >
            <GithubIcon size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} />
          </a>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem',
          color: '#94a3b8',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
        }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              borderRadius: '0.5rem',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: isDarkMode ? '#e2e8f0' : '#475569',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Demo Link */}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: project.color,
              textDecoration: 'none',
            }}
          >
            Live Demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  const bgColor = isDarkMode ? '#030712' : '#f8fafc';
  const textColor = isDarkMode ? '#f8fafc' : '#0f172a';

  return (
    <section id="projects" style={{ backgroundColor: bgColor, padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: textColor }}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <div style={{ width: '5rem', height: '4px', backgroundColor: '#6366f1', margin: '1rem auto', borderRadius: '2px' }} />
          <p style={{ color: '#94a3b8', maxWidth: '40rem', margin: '1rem auto' }}>
            Here are some of my recent projects built with attention to detail.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 500,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeCategory === cat 
                  ? '#6366f1' 
                  : (isDarkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)'),
                color: activeCategory === cat ? '#ffffff' : '#94a3b8',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
