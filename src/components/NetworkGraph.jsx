import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import katex from 'katex';
import equations from '../data/equations.js';
import { topics, edges } from '../data/equationNetwork.js';
import './NetworkGraph.css';

/* ─── Layout Constants ───────────────────────────────────────── */
const CENTER = { x: 0, y: 0 };
const TOPIC_RING_R = 280;
const SUB_RING_OFFSET = 130;
const EQ_RING_OFFSET = 100;
const TOPIC_R = 34;
const SUB_R = 18;
const EQ_R = 18;
const MIN_EQ_GAP_ANGLE = 0.09; // minimum angular gap between eq nodes (~5°)

/* ─── Helpers ─────────────────────────────────────────────────── */

function renderFormula(formula) {
  try {
    return katex.renderToString(formula, { throwOnError: false, displayMode: false, output: 'html' });
  } catch { return formula; }
}

function buildEquationMap() {
  const map = {};
  for (const eq of equations) map[eq.id] = eq;
  return map;
}

const EQMAP = buildEquationMap();

/** Smooth quadratic Bézier curving perpendicular to the chord */
function curvePath(x1, y1, x2, y2, curvature = 0.25) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * len * curvature;
  const cy = my + ny * len * curvature;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/* ─── Subcategory label prettifier ────────────────────────────── */
const SUB_LABELS = {
  mechanics: 'Mechanics',
  waves: 'Waves',
  electricity: 'Electricity',
  modern: 'Modern',
  geometry: 'Geometry',
  algebra: 'Algebra',
  arithmetic: 'Arithmetic',
  statistics: 'Statistics',
  calculus: 'Calculus',
  'linear-algebra': 'Linear Algebra',
  thermodynamics: 'Thermo',
  optics: 'Optics',
  relativity: 'Relativity',
  quantum: 'Quantum',
  nuclear: 'Nuclear',
};

function subLabel(key) {
  return SUB_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

/* ─── Radial Layout with Sub-branches ─────────────────────────── */

/**
 * Layout strategy:
 *   Hub (centre)
 *   └─ Topic nodes — evenly spaced in a ring
 *       └─ If ≤5 eqs: equations fan directly from topic
 *       └─ If >5 eqs: subcategory sub-branches, then equations fan from those
 */
/**
 * Layout strategy (Dynamic Weighted):
 *   1. Calculate weights: Collapsed = 2, Expanded = 2 + (eqCount * 0.8)
 *   2. Distribute 2*PI angle proportional to weights.
 *   3. If deeply expanded, increase radius to reduce crowding.
 *   Hub (centre)
 *   └─ Topic nodes — positioned at center of their angular sector
 *       └─ Sub-branches / Equations fan out within that sector width
 */
function computeLayout(expandedTopics) {
  const nodes = [];
  const links = [];

  // Hub
  nodes.push({ id: '__hub__', type: 'hub', x: 0, y: 0, topicId: null });

  // 1. Calculate sector angles based on weights
  const topicWeights = topics.map(t => {
    const validEqs = t.equationIds.filter(id => EQMAP[id]);
    // Give base weight of 3 so collapsed topics don't disappear
    // Add weight for equations if expanded
    return {
      id: t.id,
      topic: t,
      validEqs,
      weight: expandedTopics.has(t.id) ? 3 + validEqs.length * 1.1 : 3
    };
  });

  const totalWeight = topicWeights.reduce((sum, t) => sum + t.weight, 0);
  let currentAngle = -Math.PI / 2; // Start at top

  // Auto-scale radius based on total overlapping demands
  // If many things are expanded, push rings out
  const expansionRatio = totalWeight / (topics.length * 3); // 1.0 = all collapsed, higher = expanded
  const DYNAMIC_TOPIC_R = TOPIC_RING_R + Math.max(0, (expansionRatio - 1.5) * 60);
  const DYNAMIC_EQ_R_OFFSET = EQ_RING_OFFSET + Math.max(0, (expansionRatio - 1.5) * 40);

  topicWeights.forEach((item) => {
    const { topic, validEqs, weight } = item;
    const sectorAngle = (weight / totalWeight) * 2 * Math.PI;
    const centerAngle = currentAngle + sectorAngle / 2;
    
    // Position Topic Node
    const tx = DYNAMIC_TOPIC_R * Math.cos(centerAngle);
    const ty = DYNAMIC_TOPIC_R * Math.sin(centerAngle);

    nodes.push({
      id: topic.id, type: 'topic', topicId: topic.id,
      x: tx, y: ty, angle: centerAngle, color: topic.color,
      icon: topic.icon, label: topic.label,
      eqCount: validEqs.length,
    });

    links.push({
      id: `hub-${topic.id}`, type: 'hub-topic',
      x1: 0, y1: 0, x2: tx, y2: ty, color: topic.color,
    });

    if (expandedTopics.has(topic.id)) {
      // Group equations by subcategory
      const groups = {};
      for (const eqId of validEqs) {
        const eq = EQMAP[eqId];
        const sc = eq.subcategory || 'other';
        if (!groups[sc]) groups[sc] = [];
        groups[sc].push(eqId);
      }
      const groupKeys = Object.keys(groups);
      const useSubBranches = validEqs.length > 5 && groupKeys.length > 1;

      // Available spread for children (keep some padding at edges of sector)
      // If sector is huge, limit max spread to avoid looking disconnected
      const maxSpread = Math.PI * 0.8; 
      const spread = Math.min(sectorAngle * 0.9, maxSpread);
      
      if (useSubBranches) {
        const groupStep = spread / groupKeys.length;
        const groupStart = centerAngle - spread / 2 + groupStep / 2;

        groupKeys.forEach((sc, gi) => {
          const subAngle = groupStart + groupStep * gi;
          const sx = CENTER.x + (DYNAMIC_TOPIC_R + SUB_RING_OFFSET) * Math.cos(subAngle);
          const sy = CENTER.y + (DYNAMIC_TOPIC_R + SUB_RING_OFFSET) * Math.sin(subAngle);
          const subId = `${topic.id}__${sc}`;

          nodes.push({
            id: subId, type: 'sub', topicId: topic.id,
            x: sx, y: sy, color: topic.color,
            label: subLabel(sc), subcat: sc,
          });

          links.push({
            id: `${topic.id}-${subId}`, type: 'topic-sub',
            x1: tx, y1: ty, x2: sx, y2: sy, color: topic.color,
          });

          // Fan equations from sub-branch
          const eqIds = groups[sc];
          // Determine spread for these equations
          // Ensure they don't overlap neighbors: limit spread to groupStep * 0.9
          const eqSpreadCapped = Math.min(groupStep * 0.9, Math.max(eqIds.length * MIN_EQ_GAP_ANGLE, 0.2));
          const eqStep = eqIds.length > 1 ? eqSpreadCapped / (eqIds.length - 1) : 0;
          const eqStart = subAngle - eqSpreadCapped / 2;

          eqIds.forEach((eqId, ei) => {
            const eqAngle = eqIds.length === 1 ? subAngle : eqStart + eqStep * ei;
            // Stagger radius slightly to avoid label collision
            const stagger = (ei % 2 === 0 ? 0 : 22) + (gi % 2 === 0 ? 0 : 12);
            const r = DYNAMIC_TOPIC_R + SUB_RING_OFFSET + DYNAMIC_EQ_R_OFFSET + stagger;
            const ex = CENTER.x + r * Math.cos(eqAngle);
            const ey = CENTER.y + r * Math.sin(eqAngle);

            nodes.push({
              id: eqId, type: 'equation', topicId: topic.id,
              x: ex, y: ey, color: topic.color,
            });
            links.push({
              id: `${subId}-${eqId}`, type: 'sub-eq',
              x1: sx, y1: sy, x2: ex, y2: ey, color: topic.color,
            });
          });
        });
      } else {
        // Direct Fan
        const eqStep = validEqs.length > 1 ? spread / (validEqs.length - 1) : 0;
        const eqStart = centerAngle - spread / 2;

        validEqs.forEach((eqId, ei) => {
          const eqAngle = validEqs.length === 1 ? centerAngle : eqStart + eqStep * ei;
          const stagger = ei % 2 === 0 ? 0 : 25;
          const r = DYNAMIC_TOPIC_R + DYNAMIC_EQ_R_OFFSET + 30 + stagger;
          const ex = CENTER.x + r * Math.cos(eqAngle);
          const ey = CENTER.y + r * Math.sin(eqAngle);

          nodes.push({
            id: eqId, type: 'equation', topicId: topic.id,
            x: ex, y: ey, color: topic.color,
          });
          links.push({
            id: `${topic.id}-${eqId}`, type: 'topic-eq',
            x1: tx, y1: ty, x2: ex, y2: ey, color: topic.color,
          });
        });
      }
    }

    currentAngle += sectorAngle;
  });

  // Cross-links
  const nodeById = {};
  for (const n of nodes) nodeById[n.id] = n;
  const crossLinks = [];
  for (const edge of edges) {
    const a = nodeById[edge.source];
    const b = nodeById[edge.target];
    if (a && b) {
      crossLinks.push({
        id: `x-${edge.source}-${edge.target}`, type: 'cross',
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        relationship: edge.relationship,
        sourceId: edge.source, targetId: edge.target,
        color: a.topicId === b.topicId ? a.color : '#818cf8',
      });
    }
  }

  return { nodes, links, crossLinks, nodeById };
}

/* ─── Animated node wrapper ───────────────────────────────────── */

/**
 * Wraps a <g> with spring-in animation.
 * Uses CSS transition on transform for a liquid feel.
 */
function AnimatedNode({ x, y, delay, children, ...props }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <g
      {...props}
      style={{
        ...props.style,
        transform: `translate(${x}px, ${y}px) scale(${mounted ? 1 : 0})`,
        opacity: mounted ? 1 : 0,
        transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 0.35s ease ${delay}ms`,
        transformOrigin: '0 0',
      }}
    >
      {children}
    </g>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export default function NetworkGraph() {
  const navigate = useNavigate();
  const svgRef = useRef(null);

  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 0.65 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const layout = useMemo(() => computeLayout(expandedTopics), [expandedTopics]);

  /* ─── Expand / Collapse ─────────────────────────────────────── */
  const toggleExpand = useCallback((topicId) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
        const t = topics.find((t_) => t_.id === topicId);
        if (t && t.equationIds.includes(selectedNode)) setSelectedNode(null);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, [selectedNode]);

  const expandAll = useCallback(() => setExpandedTopics(new Set(topics.map((t) => t.id))), []);
  const collapseAll = useCallback(() => { setExpandedTopics(new Set()); setSelectedNode(null); }, []);

  /* ─── Pan & Zoom ──────────────────────────────────────────────── */
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    setTransform((prev) => {
      const newK = Math.max(0.1, Math.min(3, prev.k * factor));
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return { ...prev, k: newK };
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const ratio = 1 - newK / prev.k;
      return { x: prev.x + (cx - prev.x) * ratio, y: prev.y + (cy - prev.y) * ratio, k: newK };
    });
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (e.target.closest('.ng-node')) return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
  }, [transform]);

  const handlePointerMove = useCallback((e) => {
    if (!isPanning) return;
    setTransform((prev) => ({
      ...prev,
      x: panStartRef.current.tx + (e.clientX - panStartRef.current.x),
      y: panStartRef.current.ty + (e.clientY - panStartRef.current.y),
    }));
  }, [isPanning]);

  const handlePointerUp = useCallback(() => setIsPanning(false), []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.addEventListener('wheel', handleWheel, { passive: false });
    return () => svg.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  /* ─── Node interactions ──────────────────────────────────────── */
  const handleNodeClick = useCallback((id, type) => {
    if (type === 'topic') toggleExpand(id);
    else if (type === 'equation') setSelectedNode((p) => (p === id ? null : id));
  }, [toggleExpand]);

  const handleNodeDblClick = useCallback((id, type) => {
    if (type === 'equation') navigate(`/equation/${id}`);
  }, [navigate]);

  /* ─── Highlight ──────────────────────────────────────────────── */
  const activeNode = selectedNode || hoveredNode;
  const connectedSet = useMemo(() => {
    if (!activeNode) return new Set();
    const s = new Set([activeNode]);
    for (const l of layout.crossLinks) {
      if (l.sourceId === activeNode) s.add(l.targetId);
      if (l.targetId === activeNode) s.add(l.sourceId);
    }
    return s;
  }, [activeNode, layout.crossLinks]);
  const hasHL = connectedSet.size > 0;

  /* ─── Reset ──────────────────────────────────────────────────── */
  const resetView = useCallback(() => {
    setTransform({ x: 0, y: 0, k: 0.65 });
    setSelectedNode(null);
    setExpandedTopics(new Set());
  }, []);

  /* ─── Viewbox ────────────────────────────────────────────────── */
  const vb = useMemo(() => {
    if (layout.nodes.length === 0) return '-600 -600 1200 1200';
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const n of layout.nodes) {
      const r = n.type === 'hub' ? 50 : n.type === 'topic' ? TOPIC_R + 30 : 30;
      if (n.x - r < minX) minX = n.x - r;
      if (n.x + r > maxX) maxX = n.x + r;
      if (n.y - r < minY) minY = n.y - r;
      if (n.y + r > maxY) maxY = n.y + r;
    }
    const pad = 140;
    return `${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
  }, [layout]);

  /* =================================================================== */
  /*  R E N D E R                                                        */
  /* =================================================================== */
  return (
    <div className="network-graph">
      {/* Controls */}
      <div className="ng-controls">
        <button className="ng-ctrl-btn" onClick={expandAll}>⊞ Expand All</button>
        <button className="ng-ctrl-btn" onClick={collapseAll}>⊟ Collapse All</button>
        <button className="ng-ctrl-btn" onClick={resetView}>↻ Reset</button>
      </div>

      <svg
        ref={svgRef}
        className="ng-svg"
        viewBox={vb}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="r" />
            <feMerge><feMergeNode in="r" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="r" />
            <feMerge><feMergeNode in="r" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="hg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.04" />
          </radialGradient>
        </defs>

        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}>

          {/* ── Links: hub → topic ────────────────────────────── */}
          {layout.links.filter((l) => l.type === 'hub-topic').map((l) => (
            <line key={l.id} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={l.color} strokeOpacity={0.15} strokeWidth={2.5} />
          ))}

          {/* ── Links: topic → sub / topic → eq ──────────────── */}
          {layout.links.filter((l) => l.type !== 'hub-topic').map((l) => {
            const eqId = l.id.split('-').pop();
            const isDim = hasHL && !connectedSet.has(eqId);
            return (
              <path key={l.id}
                d={curvePath(l.x1, l.y1, l.x2, l.y2, 0.12)}
                stroke={l.color} strokeOpacity={isDim ? 0.03 : 0.18}
                strokeWidth={l.type === 'topic-sub' ? 2 : 1.3}
                fill="none" className="ng-link-anim"
              />
            );
          })}

          {/* ── Cross-links ──────────────────────────────────── */}
          {layout.crossLinks.map((l) => {
            const hot = hasHL && connectedSet.has(l.sourceId) && connectedSet.has(l.targetId);
            const dim = hasHL && !hot;
            return (
              <g key={l.id}>
                <path d={curvePath(l.x1, l.y1, l.x2, l.y2, 0.3)}
                  stroke={hot ? l.color : 'rgba(255,255,255,0.05)'}
                  strokeOpacity={dim ? 0.02 : hot ? 0.65 : 0.05}
                  strokeWidth={hot ? 2 : 0.8}
                  strokeDasharray={hot ? 'none' : '4 4'}
                  fill="none" filter={hot ? 'url(#glow)' : undefined}
                  className="ng-link-anim"
                />
                {hot && (
                  <text x={(l.x1 + l.x2) / 2} y={(l.y1 + l.y2) / 2 - 7}
                    className="ng-cross-label" textAnchor="middle">{l.relationship}</text>
                )}
              </g>
            );
          })}

          {/* ── Hub ──────────────────────────────────────────── */}
          <g className="ng-node ng-hub">
            <circle cx={0} cy={0} r={48} fill="url(#hg)" stroke="#818cf8" strokeWidth={2} filter="url(#glow-lg)" />
            <circle cx={0} cy={0} r={48} fill="none" stroke="#818cf8" strokeWidth={0.5} strokeDasharray="4 6" opacity={0.3}>
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
            </circle>
            <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fill="#c7d2fe" fontSize="28" fontWeight="800">∑</text>
            <text x={0} y={22} textAnchor="middle" fill="rgba(199,210,254,0.5)" fontSize="7" fontWeight="600" letterSpacing="1">EQUATIONS</text>
          </g>

          {/* ── Topic nodes ──────────────────────────────────── */}
          {layout.nodes.filter((n) => n.type === 'topic').map((n) => {
            const expanded = expandedTopics.has(n.id);
            return (
              <g key={n.id} className="ng-node ng-topic"
                transform={`translate(${n.x}, ${n.y})`}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(n.id, 'topic'); }}
                style={{ cursor: 'pointer' }}
              >
                {expanded && <circle r={TOPIC_R + 6} fill="none" stroke={n.color} strokeWidth={1} opacity={0.2} className="ng-pulse" />}
                <circle r={TOPIC_R} fill={`${n.color}18`} stroke={n.color}
                  strokeWidth={expanded ? 2.5 : 1.5} filter="url(#glow)" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="18">{n.icon}</text>
                <text textAnchor="middle" y={TOPIC_R + 14} fill={n.color}
                  fontSize="8" fontWeight="700" letterSpacing="0.3" className="ng-topic-label">{n.label}</text>
                <text textAnchor="middle" y={TOPIC_R + 24} fill="rgba(255,255,255,0.3)" fontSize="6">
                  {n.eqCount} equations {expanded ? '▾' : '▸'}
                </text>
              </g>
            );
          })}

          {/* ── Sub-branch nodes ──────────────────────────────── */}
          {layout.nodes.filter((n) => n.type === 'sub').map((n, i) => (
            <AnimatedNode key={n.id} x={n.x} y={n.y} delay={i * 30}
              className="ng-node ng-sub"
            >
              <circle r={SUB_R} fill={`${n.color}15`} stroke={n.color}
                strokeWidth={1} strokeDasharray="3 3" />
              <text textAnchor="middle" dominantBaseline="central" fill={n.color}
                fontSize="5.5" fontWeight="600" className="ng-sub-text">{n.label}</text>
            </AnimatedNode>
          ))}

          {/* ── Equation nodes ───────────────────────────────── */}
          {layout.nodes.filter((n) => n.type === 'equation').map((n, i) => {
            const eq = EQMAP[n.id];
            if (!eq) return null;
            const isSel = selectedNode === n.id;
            const isHov = hoveredNode === n.id;
            const hot = isSel || isHov;
            const dim = hasHL && !connectedSet.has(n.id);

            return (
              <AnimatedNode key={n.id} x={n.x} y={n.y} delay={40 + i * 18}
                className={`ng-node ng-eq ${dim ? 'dimmed' : ''} ${isSel ? 'selected' : ''}`}
                onPointerEnter={() => setHoveredNode(n.id)}
                onPointerLeave={() => setHoveredNode(null)}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(n.id, 'equation'); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleNodeDblClick(n.id, 'equation'); }}
                style={{ cursor: 'pointer' }}
              >
                <circle r={hot ? EQ_R + 4 : EQ_R}
                  fill={hot ? `${n.color}35` : `${n.color}12`}
                  stroke={n.color} strokeWidth={isSel ? 2.5 : 1.2}
                  filter={hot ? 'url(#glow)' : undefined}
                  className="ng-eq-circle"
                />
                <text textAnchor="middle" dominantBaseline="central"
                  fill="#e2e8f0" fontSize="5" fontWeight="600" className="ng-eq-text">
                  {eq.title.length > 18 ? eq.title.slice(0, 16) + '…' : eq.title}
                </text>
              </AnimatedNode>
            );
          })}

        </g>
      </svg>

      {/* ── Info Panel ───────────────────────────────────────── */}
      {selectedNode && EQMAP[selectedNode] && (
        <div className="ng-panel">
          <div className="ng-panel-head">
            <h3>{EQMAP[selectedNode].title}</h3>
            <button className="ng-panel-close" onClick={() => setSelectedNode(null)}>×</button>
          </div>
          <div className="ng-panel-formula"
            dangerouslySetInnerHTML={{ __html: renderFormula(EQMAP[selectedNode].formula) }} />
          <p className="ng-panel-desc">{EQMAP[selectedNode].description}</p>
          <div className="ng-panel-badges">
            <span className="ng-badge">{EQMAP[selectedNode].level}</span>
            <span className="ng-badge">{EQMAP[selectedNode].category}</span>
            <span className="ng-badge">{EQMAP[selectedNode].subcategory}</span>
          </div>
          {(() => {
            const rel = [];
            for (const edge of edges) {
              if (edge.source === selectedNode && EQMAP[edge.target])
                rel.push({ id: edge.target, r: edge.relationship, eq: EQMAP[edge.target] });
              if (edge.target === selectedNode && EQMAP[edge.source])
                rel.push({ id: edge.source, r: edge.relationship, eq: EQMAP[edge.source] });
            }
            if (!rel.length) return null;
            return (
              <div className="ng-panel-related">
                <h4>Connections</h4>
                {rel.map((r, i) => (
                  <button key={i} className="ng-panel-rel-btn" onClick={() => {
                    const tp = topics.find((t) => t.equationIds.includes(r.id));
                    if (tp && !expandedTopics.has(tp.id))
                      setExpandedTopics((prev) => new Set([...prev, tp.id]));
                    setSelectedNode(r.id);
                  }}>
                    <span className="ng-rel-name">{r.eq.title}</span>
                    <span className="ng-rel-type">{r.r}</span>
                  </button>
                ))}
              </div>
            );
          })()}
          <button className="ng-panel-go" onClick={() => navigate(`/equation/${selectedNode}`)}>
            Open Equation →
          </button>
        </div>
      )}

      <div className="ng-hint">
        Click topic to expand · Click equation to inspect · Double-click to open · Scroll to zoom · Drag to pan
      </div>
    </div>
  );
}
