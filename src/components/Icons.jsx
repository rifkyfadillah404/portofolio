export const CodeIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

export const ReactIcon = ({ size = 24, color = '#61DAFB' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(120 12 12)" />
  </svg>
);

export const NodeIcon = ({ size = 24, color = '#339933' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
  </svg>
);

export const TypeScriptIcon = ({ size = 24, color = '#3178C6' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <rect width="24" height="24" rx="2" />
    <path fill="#fff" d="M14.5 12v1.5h-2v6h-1.5v-6h-2V12h5.5zm2.5 0h4v1.3h-2.5v1.7h2v1.3h-2v2.2h2.5V20h-4v-8z"/>
  </svg>
);

export const TailwindIcon = ({ size = 24, color = '#06B6D4' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.48 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.48 12 7 12z"/>
  </svg>
);

export const PythonIcon = ({ size = 24, color = '#3776AB' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2c-1.5 0-2.9.1-4 .4C5.5 3 5 4.5 5 6v2h6v1H4c-1.5 0-2.8 1-3 2.5-.3 1.7-.3 2.8 0 4.5.2 1.3 1 2.5 2.5 2.5h2v-2.3c0-1.5 1.3-2.7 3-2.7h6c1.2 0 2-1 2-2V6c0-1.3-1-2.4-2.5-2.6-1-.3-2-.4-3-.4zm-3.5 2c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1z"/>
    <path d="M19 8v2.3c0 1.5-1.3 2.7-3 2.7H10c-1.2 0-2 1-2 2v4c0 1.3 1 2.2 2.5 2.5 1.7.3 3.5.4 5 0 1-.3 2-1 2-2.5v-2h-6v-1h9c1.5 0 2-1 2.5-2.5.3-1.7.3-2.8 0-4.5C22.8 8 22 7 20 7h-1zm-3.5 10c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1z"/>
  </svg>
);

export const DatabaseIcon = ({ size = 24, color = '#336791' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 5v6c0 1.66-4 3-9 3s-9-1.34-9-3V5" />
    <path d="M21 11v6c0 1.66-4 3-9 3s-9-1.34-9-3v-6" />
  </svg>
);

export const MongoIcon = ({ size = 24, color = '#47A248' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C9.5 5 8.5 7.5 8.5 10c0 3 1.5 5.5 3.5 7.5V22l.5-1c1.5-1.5 3-4 3-7.5 0-3-1.5-6-3.5-9.5l-.5-1-.5 1z"/>
  </svg>
);

export const GitIcon = ({ size = 24, color = '#F05032' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M23.5 11.5l-9-9c-.7-.7-1.8-.7-2.5 0l-2 2 2.5 2.5c.6-.2 1.3 0 1.7.5.5.5.6 1.2.4 1.8l2.4 2.4c.6-.2 1.3 0 1.8.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.6-1.2-.4-1.8l-2.2-2.2v6c.2.1.3.2.5.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0-1.5-1.8-.8-2.5c.2-.2.4-.4.7-.5v-6c-.3-.1-.5-.3-.7-.5-.5-.5-.6-1.3-.4-1.9L8 6.5 1 13c-.7.7-.7 1.8 0 2.5l9 9c.7.7 1.8.7 2.5 0l11-11c.7-.7.7-1.8 0-2.5z"/>
  </svg>
);

export const DockerIcon = ({ size = 24, color = '#2496ED' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13 4h2v2h-2V4zm-3 0h2v2h-2V4zm-3 0h2v2H7V4zM4 7h2v2H4V7zm3 0h2v2H7V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm-9 3h2v2h-2v-2zm-3 0h2v2H7v-2zm-3 0h2v2H4v-2zm9-6h2v2h-2V4z"/>
    <path d="M23.5 11c-.3-.2-.8-.3-1.3-.3-.2 0-.4 0-.6.1-.1-.8-.6-1.5-1.5-2.1l-.3-.2-.2.3c-.3.4-.4.9-.4 1.3 0 .5.1.9.3 1.3-.4.2-1 .4-1.6.4H.5l-.1.5c-.1 1.2 0 2.4.4 3.5.5 1.4 1.4 2.4 2.6 3 1.4.7 3 1 4.6 1 1.2 0 2.4-.2 3.5-.5 1.5-.5 2.8-1.3 3.8-2.4.9-.9 1.5-2 1.9-3.2h.2c.9 0 1.5-.4 1.9-.8.2-.2.4-.5.5-.7l.1-.2-.4-.3z"/>
  </svg>
);

export const AWSIcon = ({ size = 24, color = '#FF9900' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6.8 18.2c2 1.4 4.4 2 7 1.7 1.8-.2 3.5-.8 5-1.8.2-.1.4-.1.5 0 .2.2.1.4-.1.5-1.6 1.1-3.5 1.8-5.5 2-2.8.3-5.5-.4-7.7-2-.2-.2-.2-.4 0-.5.2-.1.4-.1.6.1h.2z"/>
    <path d="M19.3 16.5c.3.3.2.9-.2 1.2-.2.1-.3.1-.4 0-.1-.1-.1-.3 0-.4.3-.3.3-.6.1-.8-.1-.1-.1-.3 0-.4.2-.1.4 0 .5.1v.3z"/>
    <path d="M7.4 8l-1.6 5.2L4.2 8H2.6l2.2 7h1.3l1.6-5 1.6 5h1.3l2.2-7h-1.6L9.6 13.2 8 8H7.4zm7.3 0l-2.4 7h1.5l.5-1.5h2.5l.5 1.5h1.5l-2.4-7h-1.7zm.9 1.5l.9 2.8h-1.8l.9-2.8z"/>
  </svg>
);

export const FigmaIcon = ({ size = 24, color = '#F24E1E' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8.5 2A3.5 3.5 0 005 5.5a3.5 3.5 0 001.2 2.6A3.5 3.5 0 005 10.5 3.5 3.5 0 008.5 14a3.5 3.5 0 003.5-3.5V2H8.5z"/>
    <path d="M12 2h3.5A3.5 3.5 0 0119 5.5a3.5 3.5 0 01-3.5 3.5H12V2z" fill="#FF7262"/>
    <path d="M12 9h3.5a3.5 3.5 0 110 7H12V9z" fill="#A259FF"/>
    <circle cx="12" cy="17.5" r="3.5" fill="#1ABCFE"/>
  </svg>
);

export const ShoppingCartIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

export const ClipboardIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);

export const DumbbellIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7v10M18 7v10M3 7h3M18 7h3M3 17h3M18 17h3M6 12h12"/>
    <rect x="3" y="9" width="3" height="6" rx="1"/>
    <rect x="18" y="9" width="3" height="6" rx="1"/>
  </svg>
);

export const CreditCardIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

export const LockIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const SmartphoneIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

export const GithubIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export const LinkedinIcon = ({ size = 24, color = '#0A66C2' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const TwitterIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const MailIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export const MapPinIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export const UserIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export const VueIcon = ({ size = 24, color = '#4FC08D' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M24 1.61h-4.22L12 13.4 4.22 1.61H0L12 22.39 24 1.61zM12 14.31L5.16 3.14h2.76L12 9.98l4.08-6.84h2.76L12 14.31z"/>
  </svg>
);
