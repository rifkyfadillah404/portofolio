import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    const moveCursor = (e) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      cursorOutline.classList.add('hover');
    };

    const handleMouseLeave = () => {
      cursorOutline.classList.remove('hover');
    };

    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />
    </>
  );
}
