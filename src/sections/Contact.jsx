import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rifkyfadillah404', Icon: GithubIcon, command: 'github --profile' },
  { name: 'LinkedIn', url: 'https://linkedin.com', Icon: LinkedinIcon, command: 'linkedin --connect' },
  { name: 'Email', url: 'mailto:rifkyfadillah404@gmail.com', Icon: MailIcon, command: 'mail --compose' },
];

function TerminalLine({ children, type = 'output', delay = 0, onComplete }) {
  const [visible, setVisible] = useState(delay === 0);
  const [displayText, setDisplayText] = useState('');
  const fullText = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  useEffect(() => {
    if (visible && type === 'typing' && fullText) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          onComplete?.();
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [visible, type, fullText, onComplete]);

  if (!visible) return null;

  const colors = {
    command: '#10b981',
    output: '#94a3b8',
    success: '#22c55e',
    error: '#ef4444',
    info: '#6366f1',
    typing: '#10b981',
  };

  return (
    <div style={{ 
      fontFamily: '"Fira Code", "Consolas", monospace',
      fontSize: '14px',
      lineHeight: '1.6',
      color: colors[type] || colors.output,
      marginBottom: '4px',
    }}>
      {type === 'command' && <span style={{ color: '#6366f1' }}>❯ </span>}
      {type === 'typing' ? displayText : children}
      {type === 'typing' && displayText.length < fullText.length && (
        <span style={{ 
          display: 'inline-block',
          width: '8px',
          height: '16px',
          backgroundColor: '#10b981',
          marginLeft: '2px',
          animation: 'blink 1s infinite',
        }} />
      )}
    </div>
  );
}

function TerminalInput({ label, value, onChange, type = 'text', placeholder }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ 
        fontFamily: '"Fira Code", monospace',
        fontSize: '13px',
        color: '#6366f1',
        marginBottom: '4px',
      }}>
        {`// ${label}`}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '6px',
        border: `1px solid ${focused ? '#6366f1' : 'rgba(99, 102, 241, 0.3)'}`,
        padding: '10px 12px',
        transition: 'border-color 0.2s ease',
      }}>
        <span style={{ color: '#10b981', marginRight: '8px', fontFamily: '"Fira Code", monospace' }}>❯</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e2e8f0',
            fontFamily: '"Fira Code", monospace',
            fontSize: '14px',
          }}
        />
      </div>
    </div>
  );
}

function TerminalTextarea({ label, value, onChange, placeholder, rows = 4 }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ 
        fontFamily: '"Fira Code", monospace',
        fontSize: '13px',
        color: '#6366f1',
        marginBottom: '4px',
      }}>
        {`// ${label}`}
      </div>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '6px',
        border: `1px solid ${focused ? '#6366f1' : 'rgba(99, 102, 241, 0.3)'}`,
        padding: '10px 12px',
        transition: 'border-color 0.2s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ color: '#10b981', marginRight: '8px', fontFamily: '"Fira Code", monospace' }}>❯</span>
          <textarea
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            rows={rows}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e2e8f0',
              fontFamily: '"Fira Code", monospace',
              fontSize: '14px',
              resize: 'none',
              lineHeight: '1.5',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [terminalHistory, setTerminalHistory] = useState([]);
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);

  const bgColor = isDarkMode ? '#030712' : '#f1f5f9';
  const textColor = isDarkMode ? '#f8fafc' : '#030712';

  useEffect(() => {
    gsap.fromTo(terminalRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTerminalHistory([
      { type: 'command', text: `send_message --to "developer"` },
      { type: 'output', text: `Initializing secure connection...` },
    ]);

    await new Promise(r => setTimeout(r, 500));
    setTerminalHistory(prev => [...prev, { type: 'output', text: `Packaging data from: ${formData.name}` }]);

    await new Promise(r => setTimeout(r, 500));
    setTerminalHistory(prev => [...prev, { type: 'output', text: `Validating email: ${formData.email}` }]);

    await new Promise(r => setTimeout(r, 500));
    setTerminalHistory(prev => [...prev, { type: 'output', text: `Subject: "${formData.subject || 'No subject'}"` }]);

    await new Promise(r => setTimeout(r, 500));
    setTerminalHistory(prev => [...prev, { type: 'output', text: `Encrypting message... Done.` }]);

    await new Promise(r => setTimeout(r, 500));
    setTerminalHistory(prev => [...prev, { type: 'success', text: `✓ Message sent successfully!` }]);

    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setStatus('idle');
      setTerminalHistory([]);
    }, 4000);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      style={{ 
        backgroundColor: bgColor, 
        padding: '6rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isDarkMode ? 0.05 : 0.03,
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '70rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: textColor }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div style={{ width: '5rem', height: '4px', backgroundColor: '#6366f1', margin: '1rem auto' }} />
          <p style={{ color: '#94a3b8', maxWidth: '40rem', margin: '1rem auto' }}>
            Open a new terminal session and send me a message.
          </p>
        </div>

        {/* Terminal Window */}
        <div 
          ref={terminalRef}
          style={{
            backgroundColor: '#0d1117',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.2)',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Terminal Header */}
          <div style={{
            backgroundColor: '#161b22',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28c840' }} />
            <span style={{ 
              marginLeft: 'auto', 
              marginRight: 'auto',
              color: '#8b949e', 
              fontSize: '13px',
              fontFamily: '"Fira Code", monospace',
            }}>
              contact@terminal ~ send_message
            </span>
          </div>

          {/* Terminal Body */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : '450px' }}>
            {/* Left - Form */}
            <div style={{ 
              padding: '24px',
              borderRight: isMobile ? 'none' : '1px solid rgba(99, 102, 241, 0.15)',
              borderBottom: isMobile ? '1px solid rgba(99, 102, 241, 0.15)' : 'none',
            }}>
              <TerminalLine type="info">// Initialize contact form</TerminalLine>
              <TerminalLine type="command">npm run send-message</TerminalLine>
              <div style={{ marginTop: '16px' }} />
              
              <form onSubmit={handleSubmit}>
                <TerminalInput
                  label="your_name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
                <TerminalInput
                  label="your_email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
                <TerminalInput
                  label="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry"
                />
                <TerminalTextarea
                  label="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hey! I'd love to work together..."
                  rows={3}
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '8px',
                    backgroundColor: status === 'sending' ? 'rgba(99, 102, 241, 0.5)' : '#6366f1',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '14px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'sending') e.currentTarget.style.backgroundColor = '#4f46e5';
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'sending') e.currentTarget.style.backgroundColor = '#6366f1';
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                      Executing...
                    </>
                  ) : (
                    <>❯ ./send_message.sh</>
                  )}
                </button>
              </form>
            </div>

            {/* Right - Output */}
            <div style={{ 
              padding: '24px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <TerminalLine type="info">// Terminal output</TerminalLine>
              <TerminalLine type="output">Ready to receive message...</TerminalLine>
              <div style={{ marginTop: '16px', flex: 1 }}>
                {status === 'idle' && terminalHistory.length === 0 && (
                  <div style={{ color: '#4b5563', fontFamily: '"Fira Code", monospace', fontSize: '13px' }}>
                    <p style={{ marginBottom: '12px' }}>$ Awaiting input...</p>
                    <p style={{ marginBottom: '8px' }}>Available commands:</p>
                    <p style={{ color: '#10b981' }}>  --name     Your full name</p>
                    <p style={{ color: '#10b981' }}>  --email    Contact email</p>
                    <p style={{ color: '#10b981' }}>  --subject  Message subject</p>
                    <p style={{ color: '#10b981' }}>  --message  Your message</p>
                  </div>
                )}
                
                {terminalHistory.map((line, idx) => (
                  <TerminalLine key={idx} type={line.type}>{line.text}</TerminalLine>
                ))}

                {status === 'success' && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '6px',
                      fontFamily: '"Fira Code", monospace',
                      fontSize: '13px',
                      color: '#22c55e',
                    }}>
                      Process completed with exit code 0
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div style={{ 
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid rgba(99, 102, 241, 0.15)',
              }}>
                <TerminalLine type="info">// Quick links</TerminalLine>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '6px',
                        color: '#a5b4fc',
                        textDecoration: 'none',
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '12px',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                        e.currentTarget.style.borderColor = '#6366f1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                      }}
                    >
                      <link.Icon size={14} color="#a5b4fc" />
                      {link.command}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ASCII Art Footer */}
        {!isMobile && (
          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            fontFamily: '"Fira Code", monospace',
            fontSize: '12px',
            color: '#4b5563',
          }}>
            <pre style={{ margin: 0 }}>{`
  ╔══════════════════════════════════════╗
  ║  Thanks for visiting my portfolio!   ║
  ║     Let's build something great.     ║
  ╚══════════════════════════════════════╝
            `}</pre>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
