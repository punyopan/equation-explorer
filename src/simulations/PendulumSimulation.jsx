import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * Simple pendulum simulation: T = 2π√(L/g).
 * Animated swinging bob with adjustable length and gravity.
 */
export default function PendulumSimulation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [length, setLength] = useState(2);
  const [gravity, setGravity] = useState(9.8);
  const angleRef = useRef(Math.PI / 4);
  const angVelRef = useRef(0);

  const period = 2 * Math.PI * Math.sqrt(length / gravity);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Physics — simple harmonic approximation
    const dt = 0.016;
    const angAcc = (-gravity / (length * 50)) * Math.sin(angleRef.current);
    angVelRef.current += angAcc * dt;
    angVelRef.current *= 0.999; // slight damping
    angleRef.current += angVelRef.current;

    ctx.clearRect(0, 0, W, H);

    const pivotX = W / 2;
    const pivotY = 30;
    const ropeLen = 40 + length * 40;
    const bobX = pivotX + Math.sin(angleRef.current) * ropeLen;
    const bobY = pivotY + Math.cos(angleRef.current) * ropeLen;

    // Pivot point
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Rope
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Bob
    const bobRad = 16;
    const grad = ctx.createRadialGradient(bobX - 3, bobY - 3, 0, bobX, bobY, bobRad);
    grad.addColorStop(0, '#f59e0b');
    grad.addColorStop(1, '#d97706');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRad, 0, Math.PI * 2);
    ctx.fill();

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(bobX, H - 15, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Equilibrium line
    ctx.strokeStyle = 'rgba(100,116,139,0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + ropeLen + bobRad + 10);
    ctx.stroke();
    ctx.setLineDash([]);

    animRef.current = requestAnimationFrame(draw);
  }, [length, gravity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 260;
    angleRef.current = Math.PI / 4;
    angVelRef.current = 0;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="sim">
      <canvas ref={canvasRef} className="sim__canvas" />
      <div className="sim__controls">
        <div className="sim__control">
          <label>Length: <strong>{length.toFixed(1)} m</strong></label>
          <input type="range" min="0.5" max="5" step="0.1" value={length} onChange={(e) => setLength(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Gravity: <strong>{gravity.toFixed(1)} m/s²</strong></label>
          <input type="range" min="1" max="25" step="0.1" value={gravity} onChange={(e) => setGravity(Number(e.target.value))} />
        </div>
        <div className="sim__readout">
          Period: <strong>{period.toFixed(2)} s</strong>
        </div>
      </div>
    </div>
  );
}
