"use client"

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0.1 → 1.0
  baseX: number;
  baseY: number;
}

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let mouseX = 0;
        let mouseY = 0;
        const STAR_COUNT = 200;
        const stars: Star[] = [];

        // ① size the canvas to the window
        const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // ② generate stars once
        const generateStars = () => {
        stars.length = 0;
        for (let i = 0; i < STAR_COUNT; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const z = Math.random() * 0.9 + 0.1; // 0.1 → 1.0
            stars.push({ x, y, z, baseX: x, baseY: y });
        }
        };
        generateStars();

        // ③ regenerate on resize so stars fill the new dimensions
        window.addEventListener("resize", generateStars);

        // ④ track mouse
        const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // ⑤ draw loop
        const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const strength = 0.1; // how much stars shift on mouse move

        stars.forEach((star) => {
            // parallax offset — closer stars (z near 1) move more
            const offsetX = mouseX * star.z * strength;
            const offsetY = mouseY * star.z * strength;

            const renderX = star.baseX + offsetX;
            const renderY = star.baseY + offsetY;

            const radius = star.z * 1.5;         // closer = bigger
            const opacity = 0.3 + star.z * 0.7;  // closer = brighter

            ctx.beginPath();
            ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 200, 255, ${opacity})`;
            ctx.fill();
        });

        animationId = requestAnimationFrame(draw);
        };
        draw();

        // ⑥ cleanup — critical, prevents memory leaks
        return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", generateStars);
        window.removeEventListener("mousemove", handleMouseMove);
        };
  }, [])

  return (
          <canvas ref={canvasRef} className="fixed pointer-events-none inset-0 w-full h-full" />
  )
}

export default Canvas