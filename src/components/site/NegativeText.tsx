"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  return "";
}

// Muestra `children` con un efecto de "negativo": invierte y desatura lo que
// hay detrás, pero SOLO donde están las letras — no un rectángulo. La forma
// exacta se define con un <text> real dentro de una máscara SVG (mismo
// tamaño en px que el texto visible, medido con ResizeObserver). Se probó
// antes con un <foreignObject> dentro de la máscara, pero Chrome no lo
// rasteriza de forma confiable cuando la máscara se referencia desde
// `mask-image` en CSS — el resultado era una máscara vacía (texto invisible).
// Un <text> de SVG no tiene ese problema y usa el mismo renderizador de
// fuentes, así que el recorte sigue siendo exacto.
export function NegativeText({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const rawId = useId();
  const maskId = `negtext-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    const el = sizerRef.current;
    if (!el) return;
    const update = () => {
      // offsetWidth/Height son el tamaño de layout, sin el `scale` animado
      // del header — getBoundingClientRect() devuelve el tamaño ya
      // transformado y desalinea la máscara con el texto real.
      setBox({ width: el.offsetWidth, height: el.offsetHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    document.fonts?.ready.then(update);
    return () => ro.disconnect();
  }, [children, className]);

  let label = textContent(children);
  if (className.includes("uppercase")) label = label.toUpperCase();

  return (
    <span className="relative inline-block">
      <span ref={sizerRef} className={`invisible ${className}`}>
        {children}
      </span>
      {box.width > 0 && box.height > 0 && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 backdrop-invert backdrop-grayscale"
            style={{
              WebkitMaskImage: `url(#${maskId})`,
              maskImage: `url(#${maskId})`,
            }}
          />
          <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={box.width} height={box.height}>
                <text
                  x={0}
                  y={box.height / 2}
                  dominantBaseline="central"
                  textAnchor="start"
                  fill="white"
                  className={className}
                >
                  {label}
                </text>
              </mask>
            </defs>
          </svg>
        </>
      )}
    </span>
  );
}
