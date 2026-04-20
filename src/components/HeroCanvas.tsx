"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    let THREE: typeof import("three");

    const init = async () => {
      THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 6);

      // Ambient + directional light
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dirLight = new THREE.DirectionalLight(0xff6a00, 1.2);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
      fillLight.position.set(-5, -2, 3);
      scene.add(fillLight);

      // Suitcase group
      const group = new THREE.Group();
      scene.add(group);

      // Body
      const bodyGeo = new THREE.BoxGeometry(1.4, 1.8, 0.6, 1, 1, 1);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xff6a00,
        roughness: 0.3,
        metalness: 0.1,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Lid line
      const lidGeo = new THREE.BoxGeometry(1.42, 0.02, 0.62);
      const lidMat = new THREE.MeshStandardMaterial({ color: 0xcc5500 });
      const lid = new THREE.Mesh(lidGeo, lidMat);
      lid.position.y = 0.2;
      group.add(lid);

      // Handle
      const handleGeo = new THREE.TorusGeometry(0.22, 0.04, 8, 20, Math.PI);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.y = 1.0;
      handle.rotation.z = Math.PI;
      group.add(handle);

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
      [[-0.5, -0.95, 0.3], [0.5, -0.95, 0.3], [-0.5, -0.95, -0.3], [0.5, -0.95, -0.3]].forEach(([x, y, z]) => {
        const w = new THREE.Mesh(wheelGeo, wheelMat);
        w.position.set(x, y, z);
        w.rotation.z = Math.PI / 2;
        group.add(w);
      });

      // Straps
      const strapGeo = new THREE.BoxGeometry(0.06, 1.8, 0.62);
      const strapMat = new THREE.MeshStandardMaterial({ color: 0xcc5500 });
      [-0.4, 0.4].forEach((x) => {
        const s = new THREE.Mesh(strapGeo, strapMat);
        s.position.x = x;
        group.add(s);
      });

      // Floating particles
      const particleGeo = new THREE.BufferGeometry();
      const count = 60;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 10;
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({ color: 0xff6a00, size: 0.04, transparent: true, opacity: 0.5 });
      scene.add(new THREE.Points(particleGeo, particleMat));

      // Resize handler
      const onResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      // Animate
      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        group.rotation.y = t * 0.4;
        group.position.y = Math.sin(t * 0.8) * 0.15;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((fn) => fn?.());
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
