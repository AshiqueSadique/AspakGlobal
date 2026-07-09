"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

interface ImportExportExtraProps {
  heading: string;
  body: string;
  regions: string[];
}

export default function ImportExportExtra({ heading, body, regions }: ImportExportExtraProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const dot3Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !svgRef.current) return;

    const dots = [dot1Ref.current, dot2Ref.current, dot3Ref.current].filter(Boolean);

    ScrollTrigger.create({
      trigger: svgRef.current,
      start: "top 80%",
      onEnter: () => {
        dots.forEach((dot, i) => {
          if (!dot) return;
          const pathId = `route-path-${i + 1}`;
          const path = svgRef.current?.querySelector(`#${pathId}`);
          if (!path) return;

          gsap.to(dot, {
            motionPath: {
              path: path as SVGPathElement,
              align: path as SVGPathElement,
              alignOrigin: [0.5, 0.5],
            },
            duration: 3 + i * 0.5,
            ease: "power1.inOut",
            repeat: -1,
            delay: i * 1,
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="py-20 bg-[--ivory]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map animation */}
          <div className="order-2 lg:order-1">
            <svg
              ref={svgRef}
              viewBox="0 0 500 300"
              className="w-full h-auto"
              aria-hidden="true"
              style={{ background: "linear-gradient(135deg, #091E3A, #0D2B52)", borderRadius: "1rem" }}
            >
              {/* Dotted world map (simplified) */}
              {Array.from({ length: 30 }).map((_, i) =>
                Array.from({ length: 20 }).map((_, j) => (
                  <circle
                    key={`${i}-${j}`}
                    cx={10 + i * 16}
                    cy={10 + j * 14}
                    r="1"
                    fill="#245FA8"
                    opacity="0.3"
                  />
                ))
              )}

              {/* Bangkok marker */}
              <circle cx="340" cy="145" r="5" fill="#C9A227" />
              <circle cx="340" cy="145" r="10" fill="none" stroke="#C9A227" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="5;15;5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>

              {/* Trade routes */}
              <path id="route-path-1" d="M340,145 Q250,80 160,120" stroke="#C9A227" strokeWidth="1" strokeDasharray="4,4" fill="none" opacity="0.5"/>
              <path id="route-path-2" d="M340,145 Q280,60 200,60" stroke="#E8C766" strokeWidth="1" strokeDasharray="4,4" fill="none" opacity="0.4"/>
              <path id="route-path-3" d="M340,145 Q380,100 420,80" stroke="#C9A227" strokeWidth="1" strokeDasharray="4,4" fill="none" opacity="0.4"/>

              {/* Moving dots */}
              <circle ref={dot1Ref} cx="340" cy="145" r="3" fill="#C9A227"/>
              <circle ref={dot2Ref} cx="340" cy="145" r="3" fill="#E8C766"/>
              <circle ref={dot3Ref} cx="340" cy="145" r="3" fill="#C9A227"/>

              {/* Labels */}
              <text x="340" y="165" textAnchor="middle" fill="#C9A227" fontSize="9" fontFamily="Prompt, sans-serif" fontWeight="700">Bangkok</text>
            </svg>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display font-bold text-[--navy-900] mb-4">{heading}</h2>
            <p className="text-[--color-text-muted] leading-relaxed mb-8 max-w-none">{body}</p>
            <div className="flex flex-wrap gap-3">
              {regions.map((region, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-[--navy-50] text-[--navy-800] text-sm font-semibold border border-[--navy-100] hover:bg-[--gold-100] hover:border-[--gold-400] hover:text-[--gold-700] transition-colors cursor-default"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
