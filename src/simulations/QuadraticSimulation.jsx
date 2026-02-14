import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * Quadratic function visualizer: y = ax² + bx + c.
 * Interactive graph with adjustable coefficients showing
 * roots, vertex, and axis of symmetry.
 */
export default function QuadraticSimulation() {
  const canvasRef = useRef(null);
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [cVal, setCVal] = useState(-3);

  const discriminant = b * b - 4 * a * cVal;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + cVal;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;
    const scaleX = 30;
    const scaleY = 20;

    // Grid
    ctx.strokeStyle = 'rgba(148,163,184,0.08)';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * scaleX, 0);
      ctx.lineTo(cx + i * scaleX, H);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, cy + i * scaleY);
      ctx.lineTo(W, cy + i * scaleY);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    for (let i = -8; i <= 8; i++) {
      if (i === 0) continue;
      ctx.fillText(i.toString(), cx + i * scaleX, cy + 14);
    }

    // Parabola
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px < W; px++) {
      const x = (px - cx) / scaleX;
      const y = a * x * x + b * x + cVal;
      const py = cy - y * scaleY;
      if (py < -100 || py > H + 100) { first = true; continue; }
      if (first) { ctx.moveTo(px, py); first = false; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Vertex
    const vx = cx + vertexX * scaleX;
    const vy = cy - vertexY * scaleY;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(vx, vy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`vertex (${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`, vx + 10, vy - 8);

    // Axis of symmetry
    ctx.strokeStyle = 'rgba(239,68,68,0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx, H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Roots
    if (discriminant >= 0) {
      const sqrtD = Math.sqrt(discriminant);
      const r1 = (-b + sqrtD) / (2 * a);
      const r2 = (-b - sqrtD) / (2 * a);
      ctx.fillStyle = '#22c55e';
      [r1, r2].forEach((r) => {
        const rx = cx + r * scaleX;
        ctx.beginPath();
        ctx.arc(rx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(r.toFixed(2), rx, cy + 22);
      });
    }

    // Info box
    ctx.fillStyle = 'rgba(15,23,42,0.8)';
    ctx.beginPath();
    ctx.roundRect(10, 10, 180, 70, 6);
    ctx.fill();
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`y = ${a}x² + (${b})x + (${cVal})`, 20, 32);
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Δ = ${discriminant.toFixed(1)}`, 20, 50);
    ctx.fillText(discriminant > 0 ? '2 real roots' : discriminant === 0 ? '1 repeated root' : 'No real roots', 20, 66);
  }, [a, b, cVal, discriminant, vertexX, vertexY]);

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
          <label>a: <strong>{a}</strong></label>
          <input type="range" min="-5" max="5" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>b: <strong>{b}</strong></label>
          <input type="range" min="-10" max="10" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>c: <strong>{cVal}</strong></label>
          <input type="range" min="-10" max="10" step="0.5" value={cVal} onChange={(e) => setCVal(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
