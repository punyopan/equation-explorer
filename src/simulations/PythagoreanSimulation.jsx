import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * Pythagorean theorem: a² + b² = c² visual proof.
 * Shows a right triangle with adjustable sides and the squares on each side.
 */
export default function PythagoreanSimulation() {
  const canvasRef = useRef(null);
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a * a + b * b);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const scale = Math.min((W - 40) / (a + b + c + 2), (H - 40) / (Math.max(a, b) + 2)) * 0.6;
    const ox = 60;
    const oy = H - 40;

    // Triangle
    const ax = ox;
    const ay = oy;
    const bx = ox + a * scale;
    const by = oy;
    const cx2 = ox;
    const cy2 = oy - b * scale;

    // Square on side a (bottom)
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.fillRect(ax, ay, a * scale, a * scale);
    ctx.strokeRect(ax, ay, a * scale, a * scale);
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`a² = ${(a * a).toFixed(1)}`, ax + (a * scale) / 2, ay + (a * scale) / 2 + 5);

    // Square on side b (left)
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.strokeStyle = '#22c55e';
    ctx.fillRect(ax - b * scale, cy2, b * scale, b * scale);
    ctx.strokeRect(ax - b * scale, cy2, b * scale, b * scale);
    ctx.fillStyle = '#22c55e';
    ctx.fillText(`b² = ${(b * b).toFixed(1)}`, ax - (b * scale) / 2, cy2 + (b * scale) / 2 + 5);

    // Triangle fill
    ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx2, cy2);
    ctx.closePath();
    ctx.fill();

    // Triangle stroke
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx2, cy2);
    ctx.closePath();
    ctx.stroke();

    // Right angle marker
    const markerSize = 10;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ax + markerSize, ay);
    ctx.lineTo(ax + markerSize, ay - markerSize);
    ctx.lineTo(ax, ay - markerSize);
    ctx.stroke();

    // Side labels
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    // a
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`a = ${a}`, (ax + bx) / 2, ay - 8);
    // b
    ctx.fillStyle = '#22c55e';
    ctx.fillText(`b = ${b}`, ax - 14, (ay + cy2) / 2);
    // c (hypotenuse)
    ctx.fillStyle = '#a855f7';
    const midHx = (bx + cx2) / 2;
    const midHy = (by + cy2) / 2;
    ctx.fillText(`c = ${c.toFixed(2)}`, midHx + 15, midHy);

    // Equation proof
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${(a * a).toFixed(1)} + ${(b * b).toFixed(1)} = ${(c * c).toFixed(1)}`, W - 20, 30);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText('a² + b² = c²', W - 20, 50);
  }, [a, b, c]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    draw();
  }, [draw]);

  return (
    <div className="sim">
      <canvas ref={canvasRef} className="sim__canvas" />
      <div className="sim__controls">
        <div className="sim__control">
          <label>Side a: <strong>{a}</strong></label>
          <input type="range" min="1" max="10" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Side b: <strong>{b}</strong></label>
          <input type="range" min="1" max="10" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} />
        </div>
        <div className="sim__readout">
          Hypotenuse c: <strong>{c.toFixed(3)}</strong>
        </div>
      </div>
    </div>
  );
}
