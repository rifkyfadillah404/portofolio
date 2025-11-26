import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setHiding(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="loading-screen"
      style={{
        transform: hiding ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.5s ease-in-out'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2
          className="font-display gradient-text"
          style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold',
            opacity: hiding ? 0 : 1,
            transition: 'opacity 0.3s'
          }}
        >
          Portfolio
        </h2>
        <div 
          style={{ 
            marginTop: '2rem', 
            width: '16rem', 
            height: '4px', 
            backgroundColor: '#111827',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <div
            style={{ 
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(to right, #6366f1, #ec4899, #06b6d4)',
              transition: 'width 0.1s ease-out'
            }}
          />
        </div>
      </div>
    </div>
  );
}
