import { useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered animations
export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, triggerOnce = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

// Hook for mouse parallax
export function useMouseParallax(intensity = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / intensity;
      const y = (e.clientY - window.innerHeight / 2) / intensity;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return position;
}

// Hook for smooth reveal
export function useSmoothReveal(delay = 0) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translateY(0) scale(1)' 
      : 'translateY(30px) scale(0.95)',
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  return { ref, style, isVisible };
}

// Hook for staggered children animations
export function useStaggerAnimation(itemCount, baseDelay = 100) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const getItemStyle = (index) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translateY(0) rotateX(0)' 
      : 'translateY(40px) rotateX(-10deg)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * baseDelay}ms`,
  });

  return { ref, getItemStyle, isVisible };
}

// Hook for count up animation
export function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { ref, count };
}

// Hook for text scramble effect
export function useTextScramble(finalText, duration = 1500) {
  const [displayText, setDisplayText] = useState(finalText);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const maxIterations = finalText.length * 3;
    
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
        setIsScrambling(false);
      }
    }, duration / maxIterations);
  };

  return { displayText, scramble, isScrambling };
}

// Hook for magnetic button effect
export function useMagneticButton(strength = 0.3) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return { ref, style };
}

// Animated component wrapper
export function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.1
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animations = {
    fadeUp: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    },
    fadeIn: {
      opacity: isVisible ? 1 : 0,
    },
    scaleIn: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    },
    slideLeft: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
    },
    slideRight: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
    },
    rotateIn: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'rotateX(0)' : 'rotateX(-15deg)',
    },
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...animations[animation],
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// Staggered grid animation
export function AnimatedGrid({ 
  children, 
  className = '',
  baseDelay = 100,
  threshold = 0.1
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) && children.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible 
              ? 'translateY(0) scale(1)' 
              : 'translateY(30px) scale(0.95)',
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * baseDelay}ms`,
            willChange: 'transform, opacity',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Floating animation component
export function FloatingElement({ 
  children, 
  className = '',
  amplitude = 10,
  duration = 3,
  delay = 0
}) {
  return (
    <div
      className={className}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Glow pulse component
export function GlowPulse({ 
  children, 
  className = '',
  color = '#f97316'
}) {
  return (
    <div
      className={className}
      style={{
        animation: 'pulse-glow 3s ease-in-out infinite',
        filter: `drop-shadow(0 0 20px ${color}40)`,
      }}
    >
      {children}
    </div>
  );
}

// Shimmer text effect
export function ShimmerText({ children, className = '' }) {
  return (
    <span 
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: 'shimmer 2s infinite',
      }}
    >
      {children}
    </span>
  );
}
