import React, { useEffect, useRef, useState, useCallback } from "react";
import { IconLeft, IconRight } from "./SiteIcons";

// Carrossel simples: quantos itens por vez em desktop / tablet / celular
export default function SiteCarousel({ children, per = [3, 2, 1], autoplay = 5000, className = "" }) {
  const itens = React.Children.toArray(children);
  const [porTela, setPorTela] = useState(per[0]);
  const [i, setI] = useState(0);
  const pausado = useRef(false);

  const calc = useCallback(() => {
    const w = window.innerWidth;
    setPorTela(w <= 640 ? per[2] : w <= 1024 ? per[1] : per[0]);
  }, [per]);

  useEffect(() => {
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [calc]);

  const max = Math.max(0, itens.length - porTela);
  const ir = useCallback((n) => setI(n > max ? 0 : n < 0 ? max : n), [max]);

  useEffect(() => { if (i > max) setI(0); }, [i, max]);

  useEffect(() => {
    if (!autoplay || max === 0) return;
    const reduzir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir) return;
    const t = setInterval(() => { if (!pausado.current) setI((v) => (v >= max ? 0 : v + 1)); }, autoplay);
    return () => clearInterval(t);
  }, [autoplay, max]);

  const x0 = useRef(null);

  return (
    <div
      className={`ft-carousel ${className}`}
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX; pausado.current = true; }}
      onTouchEnd={(e) => {
        if (x0.current !== null) {
          const dx = e.changedTouches[0].clientX - x0.current;
          if (Math.abs(dx) > 40) ir(i + (dx < 0 ? 1 : -1));
        }
        x0.current = null;
        pausado.current = false;
      }}
    >
      <div className="ft-carousel-viewport">
        <div className="ft-carousel-track" style={{ transform: `translateX(-${(i * 100) / porTela}%)` }}>
          {itens.map((c, k) => (
            <div className="ft-carousel-item" key={k} style={{ flexBasis: `${100 / porTela}%` }}>{c}</div>
          ))}
        </div>
      </div>
      {max > 0 && (
        <>
          <button type="button" className="ft-arrow ft-arrow-prev" aria-label="Anterior" onClick={() => ir(i - 1)}><IconLeft /></button>
          <button type="button" className="ft-arrow ft-arrow-next" aria-label="Próximo" onClick={() => ir(i + 1)}><IconRight /></button>
        </>
      )}
    </div>
  );
}
