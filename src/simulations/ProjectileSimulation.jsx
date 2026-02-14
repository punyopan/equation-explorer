import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * Projectile motion simulation: Ball launched at an angle.
 * Shows parabolic trajectory, max height, and range.
 */
export default function ProjectileSimulation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [velocity, setVelocity] = useState(30);
  const [angle, setAngle] = useState(45);
  const timeRef = useRef(0);
  const trailRef = useRef([]);
  const [playing, setPlaying] = useState(false);

  const g = 9.8;
  const rad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(rad);
  const vy = velocity * Math.sin(rad);
  const totalTime = (2 * vy) / g;
  const maxHeight = (vy * vy) / (2 * g);
  const range = vx * totalTime;

  const reset = useCallback(() => {
    timeRef.current = 0;
    trailRef.current = [];
    setPlaying(true);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, H - 30, W, 30);

    // Scale to fit
    const scale = Math.min((W - 80) / Math.max(range, 1), (H - 80) / Math.max(maxHeight, 1));
    const ox = 40;
    const oy = H - 30;

    // Trail
    if (trailRef.current.length > 1) {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trailRef.current.forEach(([tx, ty], i) => {
        const px = ox + tx * scale;
        const py = oy - ty * scale;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    if (playing) {
      timeRef.current += 0.03;
    }

    const t = Math.min(timeRef.current, totalTime);
    const x = vx * t;
    const y = vy * t - 0.5 * g * t * t;

    if (playing && t <= totalTime) {
      trailRef.current.push([x, Math.max(0, y)]);
    }

    if (t >= totalTime && playing) {
      setPlaying(false);
    }

    // Ball
    const px = ox + x * scale;
    const py = oy - Math.max(0, y) * scale;
    const ballGrad = ctx.createRadialGradient(px, py, 0, px, py, 10);
    ballGrad.addColorStop(0, '#a855f7');
    ballGrad.addColorStop(1, '#7c3aed');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fill();

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(px, oy, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Stats
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Max Height: ${maxHeight.toFixed(1)}m`, 10, 20);
    ctx.fillText(`Range: ${range.toFixed(1)}m`, 10, 36);
    ctx.fillText(`Time: ${t.toFixed(2)}s / ${totalTime.toFixed(2)}s`, 10, 52);

    animRef.current = requestAnimationFrame(draw);
  }, [velocity, angle, vx, vy, totalTime, maxHeight, range, playing, g]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="sim">
      <canvas ref={canvasRef} className="sim__canvas" />
      <div className="sim__controls">
        <div className="sim__control">
          <label>Velocity: <strong>{velocity} m/s</strong></label>
          <input type="range" min="5" max="60" step="1" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Angle: <strong>{angle}°</strong></label>
          <input type="range" min="5" max="85" step="1" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
        </div>
        <button className="btn btn--secondary sim__btn" onClick={reset}>Launch 🚀</button>
      </div>
    </div>
  );
}
