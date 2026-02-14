import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * v = d/t simulation: Moving object along a track with distance and time control.
 */
export default function VelocitySimulation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const [distance, setDistance] = useState(100);
  const [time, setTime] = useState(5);

  const speed = distance / time;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const dt = 0.016;
    const pixelSpeed = (speed / distance) * (W - 80) / time * time;
    posRef.current += pixelSpeed * dt;
    if (posRef.current > W - 40) {
      posRef.current = 40;
    }

    ctx.clearRect(0, 0, W, H);

    // Track
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(40, H / 2);
    ctx.lineTo(W - 40, H / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Distance markers
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('0', 40, H / 2 + 25);
    ctx.fillText(`${distance}m`, W - 40, H / 2 + 25);

    // Ball
    const radius = 14;
    const grad = ctx.createRadialGradient(posRef.current, H / 2, 0, posRef.current, H / 2, radius);
    grad.addColorStop(0, '#22c55e');
    grad.addColorStop(1, '#15803d');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(posRef.current, H / 2, radius, 0, Math.PI * 2);
    ctx.fill();

    // Speed trail
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(Math.max(40, posRef.current - speed * 3), H / 2);
    ctx.lineTo(posRef.current - radius, H / 2);
    ctx.stroke();

    animRef.current = requestAnimationFrame(draw);
  }, [speed, distance, time]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;
    posRef.current = 40;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="sim">
      <canvas ref={canvasRef} className="sim__canvas" />
      <div className="sim__controls">
        <div className="sim__control">
          <label>Distance: <strong>{distance} m</strong></label>
          <input type="range" min="10" max="500" step="10" value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Time: <strong>{time} s</strong></label>
          <input type="range" min="1" max="20" step="0.5" value={time} onChange={(e) => setTime(Number(e.target.value))} />
        </div>
        <div className="sim__readout">
          Speed: <strong>{speed.toFixed(1)} m/s</strong>
        </div>
      </div>
    </div>
  );
}
