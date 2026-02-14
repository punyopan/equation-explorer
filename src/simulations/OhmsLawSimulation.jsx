import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * V = IR simulation: Simple circuit with voltage, current, and resistance.
 * Animated electrons flow through the circuit at a rate proportional to current.
 */
export default function OhmsLawSimulation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(4);
  const timeRef = useRef(0);

  const current = voltage / resistance;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    timeRef.current += 0.016 * current * 2;

    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;
    const rw = 200;
    const rh = 100;

    // Circuit wires
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx - rw / 2, cy - rh / 2, rw, rh, 20);
    ctx.stroke();

    // Battery (left side)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(cx - rw / 2 - 8, cy - 18, 16, 36, 4);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('+', cx - rw / 2, cy - 6);
    ctx.fillText('−', cx - rw / 2, cy + 12);

    // Label battery voltage
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText(`${voltage}V`, cx - rw / 2 - 30, cy + 4);

    // Resistor (right side) — zigzag
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    const rx = cx + rw / 2;
    ctx.beginPath();
    ctx.moveTo(rx, cy - 20);
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(rx + (i % 2 === 0 ? 8 : -8), cy - 20 + (i + 1) * (40 / 6));
    }
    ctx.lineTo(rx, cy + 20);
    ctx.stroke();

    // Label resistance
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText(`${resistance}Ω`, rx + 30, cy + 4);

    // Animated electrons
    const numElectrons = Math.max(3, Math.round(current * 2));
    ctx.fillStyle = '#3b82f6';
    const pathLength = 2 * (rw + rh);
    for (let i = 0; i < numElectrons; i++) {
      const t = ((timeRef.current + (i / numElectrons) * pathLength) % pathLength) / pathLength;
      let ex, ey;
      const perim = t * (2 * rw + 2 * rh);
      if (perim < rw) {
        ex = cx - rw / 2 + perim;
        ey = cy - rh / 2;
      } else if (perim < rw + rh) {
        ex = cx + rw / 2;
        ey = cy - rh / 2 + (perim - rw);
      } else if (perim < 2 * rw + rh) {
        ex = cx + rw / 2 - (perim - rw - rh);
        ey = cy + rh / 2;
      } else {
        ex = cx - rw / 2;
        ey = cy + rh / 2 - (perim - 2 * rw - rh);
      }
      ctx.beginPath();
      ctx.arc(ex, ey, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Current readout on canvas
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`I = ${current.toFixed(2)} A`, cx, cy + rh / 2 + 30);

    animRef.current = requestAnimationFrame(draw);
  }, [voltage, resistance, current]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 220;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="sim">
      <canvas ref={canvasRef} className="sim__canvas" />
      <div className="sim__controls">
        <div className="sim__control">
          <label>Voltage: <strong>{voltage} V</strong></label>
          <input type="range" min="1" max="48" step="1" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Resistance: <strong>{resistance} Ω</strong></label>
          <input type="range" min="1" max="20" step="0.5" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} />
        </div>
        <div className="sim__readout">
          Current: <strong>{current.toFixed(2)} A</strong>
        </div>
      </div>
    </div>
  );
}
