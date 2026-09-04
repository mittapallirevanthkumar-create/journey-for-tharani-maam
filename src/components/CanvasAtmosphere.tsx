import React, { useEffect, useRef } from 'react';
import type { StepId } from '../types';

interface CanvasAtmosphereProps {
  currentStep: StepId;
  isLampOn: boolean;
}

export const CanvasAtmosphere: React.FC<CanvasAtmosphereProps> = ({ currentStep, isLampOn }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dust particles
    const dustCount = 45;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2
    }));

    // Rain particles (Active on step >= 6)
    const rainCount = 80;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 12 + 15,
      opacity: Math.random() * 0.35 + 0.15
    }));

    // Rose petals (Active on step === 9)
    const petalCount = 35;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * -height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.5 + 1.2,
      speedX: Math.sin(Math.random() * Math.PI) * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      color: ['#e63946', '#ff4d6d', '#ff758f', '#c9184a'][Math.floor(Math.random() * 4)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Dust Particles Render
      dustParticles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const glow = isLampOn ? 'rgba(255, 220, 140, ' : 'rgba(212, 175, 55, ';
        ctx.fillStyle = `${glow}${p.opacity})`;
        ctx.fill();
      });

      // 2. Rain drops (Step >= 6)
      if (currentStep >= 6) {
        ctx.strokeStyle = 'rgba(180, 210, 240, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        rainDrops.forEach((r) => {
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x - 2, r.y + r.length);

          r.y += r.speed;
          r.x -= 0.5;

          if (r.y > height) {
            r.y = -20;
            r.x = Math.random() * width;
          }
        });
        ctx.stroke();
      }

      // 3. Rose Petals (Step === 9)
      if (currentStep === 9) {
        petals.forEach((pt) => {
          pt.y += pt.speedY;
          pt.x += Math.sin(pt.y * 0.01) * 0.8;
          pt.rotation += pt.rotSpeed;

          if (pt.y > height + 20) {
            pt.y = -20;
            pt.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(pt.rotation);
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.size, pt.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentStep, isLampOn]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
