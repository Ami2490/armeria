"use client"
import { useEffect, useRef } from 'react';

export default function CursorHandler() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add('custom-cursor');
    
    const container = document.createElement('div');
    container.className = 'bullet-hole-container';
    document.body.appendChild(container);
    containerRef.current = container;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, input, textarea, [role="button"], select, [data-slot="carousel-previous"], [data-slot="carousel-next"]')) {
        return;
      }
      
      if (containerRef.current) {
        // Crear el agujero principal
        const crack = document.createElement('div');
        crack.className = 'glass-crack';
        crack.style.left = `${e.clientX}px`;
        crack.style.top = `${e.clientY}px`;
        const angle = Math.random() * 360;
        crack.style.setProperty('--angle', `${angle}deg`);
        containerRef.current.appendChild(crack);

        // Crear fragmentos de cristal
        const fragmentCount = Math.floor(Math.random() * 5) + 5; // Entre 5 y 10 fragmentos
        for (let i = 0; i < fragmentCount; i++) {
          const fragment = document.createElement('div');
          fragment.className = 'glass-fragment';
          fragment.style.left = `${e.clientX}px`;
          fragment.style.top = `${e.clientY}px`;

          const tx = (Math.random() - 0.5) * 150;
          const ty = (Math.random() - 0.5) * 150;
          const r = Math.random() * 720;
          
          fragment.style.setProperty('--tx', `${tx}px`);
          fragment.style.setProperty('--ty', `${ty}px`);
          fragment.style.setProperty('--r', `${r}deg`);

          containerRef.current.appendChild(fragment);

          setTimeout(() => {
            fragment.remove();
          }, 800); // Duración de la animación del fragmento
        }

        setTimeout(() => {
          crack.remove();
        }, 1500); // Duración de la animación del agujero
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.body.classList.remove('custom-cursor');
      document.removeEventListener('click', handleClick);
      if (containerRef.current) {
        containerRef.current.remove();
      }
    };
  }, []);

  return null;
}