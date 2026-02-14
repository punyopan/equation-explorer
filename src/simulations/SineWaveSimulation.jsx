import { useState, useRef, useEffect, useCallback } from 'react';
import './Simulation.css';

/**
 * Sine wave visualizer: y = A sin(ωt + φ).
 * Animated wave with adjustable amplitude, frequency, and phase.
 */
export default function SineWaveSimulation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(2);
  const [phase, setPhase] = useState(0);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    timeRef.current += 0.02;

    ctx.clearRect(0, 0, W, H);

    const cy = H / 2;

    // Horizontal axis
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();

    // Wave
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px < W; px++) {
      const x = (px / W) * Math.PI * 4;
      const y = amplitude * Math.sin(frequency * x + phase + timeRef.current);
      if (px === 0) ctx.moveTo(px, cy - y);
      else ctx.lineTo(px, cy - y);
    }
    ctx.stroke();

    // Filled area under curve with gradient
    const grad = ctx.createLinearGradient(0, cy - amplitude, 0, cy + amplitude);
    grad.addColorStop(0, 'rgba(59,130,246,0.15)');
    grad.addColorStop(0.5, 'rgba(59,130,246,0.02)');
    grad.addColorStop(1, 'rgba(59,130,246,0.15)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    for (let px = 0; px < W; px++) {
      const x = (px / W) * Math.PI * 4;
      const y = amplitude * Math.sin(frequency * x + phase + timeRef.current);
      if (px === 0) ctx.moveTo(px, cy - y);
      else ctx.lineTo(px, cy - y);
    }
    ctx.lineTo(W, cy);
    ctx.lineTo(0, cy);
    ctx.closePath();
    ctx.fill();

    // Amplitude markers
    ctx.strokeStyle = 'rgba(239,68,68,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, cy - amplitude);
    ctx.lineTo(W, cy - amplitude);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, cy + amplitude);
    ctx.lineTo(W, cy + amplitude);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = '#ef4444';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`+A = ${amplitude}`, 5, cy - amplitude - 5);
    ctx.fillText(`−A = ${amplitude}`, 5, cy + amplitude + 14);

    // Wavelength indicator
    const wavelength = W / (frequency * 2);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    const wlY = cy + amplitude + 30;
    ctx.beginPath();
    ctx.moveTo(20, wlY);
    ctx.lineTo(20 + wavelength, wlY);
    ctx.stroke();
    // Arrowheads
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(20, wlY - 4);
    ctx.lineTo(20, wlY + 4);
    ctx.lineTo(14, wlY);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(20 + wavelength, wlY - 4);
    ctx.lineTo(20 + wavelength, wlY + 4);
    ctx.lineTo(20 + wavelength + 6, wlY);
    ctx.closePath();
    ctx.fill();
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('λ (wavelength)', 20 + wavelength / 2, wlY - 8);

    animRef.current = requestAnimationFrame(draw);
  }, [amplitude, frequency, phase]);

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
          <label>Amplitude: <strong>{amplitude}</strong></label>
          <input type="range" min="10" max="100" step="1" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Frequency: <strong>{frequency}</strong></label>
          <input type="range" min="0.5" max="8" step="0.5" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
        </div>
        <div className="sim__control">
          <label>Phase: <strong>{phase.toFixed(1)} rad</strong></label>
          <input type="range" min="0" max={2 * Math.PI} step="0.1" value={phase} onChange={(e) => setPhase(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
