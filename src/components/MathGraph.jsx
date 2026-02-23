import { useRef, useEffect, useState } from 'react';
import './MathGraph.css';

/**
 * MathGraph — Interactive Canvas Grapher
 * 
 * Features:
 * - Plots mathematical functions y = f(x)
 * - Pan (drag) and Zoom (scroll/pinch)
 * - Dynamic grid lines and axes
 * - Responsive canvas
 * 
 * @param {Array} functions - List of objects { fn, color, params }
 */
export default function MathGraph({ functions = [] }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Viewport state (math coordinates)
  const [view, setView] = useState({
    x: 0,      // center x
    y: 0,      // center y
    scale: 40, // pixels per unit
  });

  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const crosshairRef = useRef(null);

  // --- Rendering Loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear
    ctx.fillStyle = '#1e293b'; // dark slate
    ctx.fillRect(0, 0, width, height);

    // Helpers to convert coordinates
    const toScreenX = (mathX) => width / 2 + (mathX - view.x) * view.scale;
    const toScreenY = (mathY) => height / 2 - (mathY - view.y) * view.scale;
    const toMathX = (screenX) => view.x + (screenX - width / 2) / view.scale;
    const toMathY = (screenY) => view.y - (screenY - height / 2) / view.scale;

    // --- Draw Grid ---
    ctx.lineWidth = 1;
    
    // Determine grid spacing based on scale
    // We want grid lines roughly every 100px
    const roughStep = 100 / view.scale;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const step = roughStep / magnitude < 2 ? magnitude : roughStep / magnitude < 5 ? 2 * magnitude : 5 * magnitude;

    // Vertical lines
    const startX = Math.floor(toMathX(0) / step) * step;
    const endX = Math.ceil(toMathX(width) / step) * step;
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '12px Inter, sans-serif';

    for (let x = startX; x <= endX; x += step) {
      const sx = toScreenX(x);
      // Main axes vs grid lines
      const isAxis = Math.abs(x) < step / 100;
      ctx.strokeStyle = isAxis ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();

      // Label x-axis
      if (!isAxis) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(parseFloat(x.toFixed(10)), sx, toScreenY(0) + 6);
      }
    }

    // Horizontal lines
    const startY = Math.floor(toMathY(height) / step) * step;
    const endY = Math.ceil(toMathY(0) / step) * step;

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let y = startY; y <= endY; y += step) {
      const sy = toScreenY(y);
      const isAxis = Math.abs(y) < step / 100;
      ctx.strokeStyle = isAxis ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();

      // Label y-axis
      if (!isAxis) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(parseFloat(y.toFixed(10)), toScreenX(0) - 8, sy);
      }
    }

    // --- Draw Functions ---
    functions.forEach(func => {
      if (!func || !func.fn) return;
      ctx.strokeStyle = func.color || '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();

      let started = false;
      // Plot with pixel-level precision
      for (let px = 0; px <= width; px += 2) {
        const mx = toMathX(px);
        try {
          const my = func.fn(mx, func.params);
          if (my === null || isNaN(my) || !isFinite(my)) {
            started = false;
            continue;
          }
          
          const py = toScreenY(my);
          
          // Prevent drawing crazy lines for asymptotes
          if (py < -height || py > height * 2) {
             started = false; 
             continue;
          }

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        } catch (e) {
          started = false;
        }
      }
      ctx.stroke();
    });

  }, [view, functions]); // removed mouseMath

  // --- Interactivity Handlers ---

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const newScale = view.scale * Math.exp(-e.deltaY * zoomSensitivity);
    setView(v => ({ ...v, scale: Math.max(1, Math.min(newScale, 10000)) }));
  };

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Update mouse math pos for crosshair
    const x = view.x + (mx - rect.width / 2) / view.scale;
    const y = view.y - (my - rect.height / 2) / view.scale;
    
    if (crosshairRef.current) {
      crosshairRef.current.style.display = 'block';
      crosshairRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      crosshairRef.current.querySelector('.math-graph-crosshair-text').textContent = `(${x.toFixed(2)}, ${y.toFixed(2)})`;
    }

    if (isDragging) {
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      setLastPos({ x: e.clientX, y: e.clientY });
      
      setView(v => ({
        ...v,
        x: v.x - dx / v.scale,
        y: v.y + dy / v.scale
      }));
    }
  };

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
    if (crosshairRef.current) {
      crosshairRef.current.style.display = 'none';
    }
  };

  return (
    <div className="math-graph-container" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="math-graph-canvas"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      />
      <div 
        ref={crosshairRef} 
        className="math-graph-crosshair" 
        style={{ display: 'none', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <div className="math-graph-crosshair-dot" style={{ width: 8, height: 8, background: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
        <div className="math-graph-crosshair-text" style={{ position: 'absolute', left: 10, top: -30, background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 8px', color: 'white', font: '10px monospace', whiteSpace: 'nowrap' }} />
      </div>
      <div className="math-graph-controls">
        <button className="graph-btn" onClick={() => setView({ x: 0, y: 0, scale: 40 })}>
          ⟲ Reset View
        </button>
      </div>
    </div>
  );
}
