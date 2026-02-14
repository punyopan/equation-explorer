import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * F = ma simulation: Animated block on a surface.
 * Sliders control mass and applied force; the resulting acceleration is shown
 * live with the block animating across the canvas.
 */
export default function ForceSimulation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(20);
  const posRef = useRef(50);
  const velRef = useRef(0);

  const acceleration = force / mass;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Physics update
    const dt = 0.016;
    velRef.current += (force / mass) * dt * 20;
    posRef.current += velRef.current * dt;

    // Reset when block goes off screen
    if (posRef.current > W + 40) {
      posRef.current = -40;
      velRef.current = 0;
    }

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, H - 40, W, 40);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, H - 40);
      ctx.lineTo(x - 10, H);
      ctx.stroke();
    }

    // Block
    const blockSize = 20 + mass * 3;
    const bx = posRef.current;
    const by = H - 40 - blockSize;

    const grad = ctx.createLinearGradient(bx, by, bx, by + blockSize);
    grad.addColorStop(0, '#3b82f6');
    grad.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(bx, by, blockSize, blockSize, 4);
    ctx.fill();

    // Mass label on block
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${mass}kg`, bx + blockSize / 2, by + blockSize / 2 + 4);

    // Force arrow
    const arrowLen = force * 2;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx + blockSize, by + blockSize / 2);
    ctx.lineTo(bx + blockSize + arrowLen, by + blockSize / 2);
    ctx.stroke();
    // Arrowhead
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(bx + blockSize + arrowLen + 10, by + blockSize / 2);
    ctx.lineTo(bx + blockSize + arrowLen, by + blockSize / 2 - 6);
    ctx.lineTo(bx + blockSize + arrowLen, by + blockSize / 2 + 6);
    ctx.closePath();
    ctx.fill();

    // F label
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`F = ${force}N`, bx + blockSize + arrowLen / 2, by + blockSize / 2 - 12);

    animRef.current = requestAnimationFrame(draw);
  }, [mass, force]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    posRef.current = 50;
    velRef.current = 0;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="sim">
      <canvas ref={canvasRef} className="sim__canvas" />
      <div className="sim__controls">
        <div className="sim__control">
          <label>Mass: <strong>{mass} kg</strong></label>
          <input type="range" min="1" max="20" step="1" value={mass} onChange={(e) => setMass(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Force: <strong>{force} N</strong></label>
          <input type="range" min="1" max="100" step="1" value={force} onChange={(e) => setForce(Number(e.target.value))} />
        </div>
        <div className="sim__readout">
          Acceleration: <strong>{acceleration.toFixed(2)} m/s²</strong>
        </div>
      </div>
    </div>
  );
}
