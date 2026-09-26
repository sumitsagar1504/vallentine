import { useEffect, useRef } from 'react';

export default function FloatingHearts() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let hearts = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function createHeart() {
      const size = Math.random() * 18 + 8;
      return {
        x:     Math.random() * canvas.width,
        y:     canvas.height + size,
        size,
        speed: Math.random() * 0.6 + 0.3,
        opacity: Math.random() * 0.35 + 0.1,
        sway:   Math.random() * 60 - 30,
        swaySpeed: Math.random() * 0.02 + 0.005,
        t: Math.random() * Math.PI * 2,
        hue: Math.floor(Math.random() * 30) - 5, // slight hue variation
      };
    }

    function drawHeart(ctx, x, y, size, opacity, hue) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = `hsl(${350 + hue}, 90%, 65%)`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - size * 0.3, x - size * 0.5, y - size * 0.8, x - size * 0.5, y - size * 0.5);
      ctx.bezierCurveTo(x - size * 0.5, y - size * 1.1, x, y - size * 1.2, x, y - size * 0.8);
      ctx.bezierCurveTo(x, y - size * 1.2, x + size * 0.5, y - size * 1.1, x + size * 0.5, y - size * 0.5);
      ctx.bezierCurveTo(x + size * 0.5, y - size * 0.8, x, y - size * 0.3, x, y);
      ctx.fill();
      ctx.restore();
    }

    // seed initial hearts
    for (let i = 0; i < 18; i++) {
      const h = createHeart();
      h.y = Math.random() * canvas.height;
      hearts.push(h);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn occasionally
      if (Math.random() < 0.04) hearts.push(createHeart());

      hearts = hearts.filter(h => h.y + h.size > -10);

      for (const h of hearts) {
        h.t += h.swaySpeed;
        h.x += Math.sin(h.t) * 0.4;
        h.y -= h.speed;
        drawHeart(ctx, h.x, h.y, h.size, h.opacity, h.hue);
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hearts-canvas"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
