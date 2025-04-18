
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PillAnimationProps {
  color?: string;
  size?: number;
  speed?: number;
}

const PillAnimation = ({ 
  color = '#0078C8', 
  size = 1, 
  speed = 1 
}: PillAnimationProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pillRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create pill shape
    const radiusTop = 0.5 * size;
    const radiusBottom = 0.5 * size;
    const height = 1.6 * size;
    const radialSegments = 32;
    const geometry = new THREE.CapsuleGeometry(radiusTop, height, radialSegments, 1);
    
    // Material with basic color and shine
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      shininess: 100,
      specular: new THREE.Color(0xffffff),
    });

    // Create pill mesh
    const pill = new THREE.Mesh(geometry, material);
    scene.add(pill);
    pillRef.current = pill;

    // Animate
    const animate = () => {
      const rotationSpeed = 0.005 * speed;
      if (pillRef.current) {
        pillRef.current.rotation.x += rotationSpeed;
        pillRef.current.rotation.y += rotationSpeed * 1.5;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (
        mountRef.current &&
        cameraRef.current &&
        rendererRef.current
      ) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (pillRef.current) {
        if (pillRef.current.geometry) pillRef.current.geometry.dispose();
        if (pillRef.current.material instanceof THREE.Material) {
          pillRef.current.material.dispose();
        } else if (Array.isArray(pillRef.current.material)) {
          pillRef.current.material.forEach(material => material.dispose());
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color, size, speed]);

  return <div ref={mountRef} className="w-full h-full min-h-[200px]" />;
};

export default PillAnimation;
