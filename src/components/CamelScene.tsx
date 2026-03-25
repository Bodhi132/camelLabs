import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

const CAMEL_MODEL_PATH = "/models/camel%20(2).glb";

function CamelModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Load the GLTF and animations
  const { scene, animations } = useGLTF(CAMEL_MODEL_PATH);

  // Bind animations directly to the 'scene' so the skeleton doesn't break
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    if (!scene) return;

    // Apply centering and scaling directly to the original scene
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4 / maxDim;

    scene.position.sub(center);
    scene.scale.setScalar(scale);

    // Play the very first animation found in the GLB file
    if (names.length > 0) {
      console.log("Successfully playing animation:", names[0]);
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [scene, actions, names]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Add your downward offset here!
      // Change -1.5 to whatever number looks best (e.g., -1, -2, -0.5)
      const baseHeight = -1;

      groupRef.current.position.y =
        baseHeight + Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    // Adjust rotation here if it's still facing the wrong way
    // e.g., Math.PI (180 deg) or -Math.PI / 2 (-90 deg)
    <group ref={groupRef} rotation={[0, Math.PI / 2, 0]} position={[2, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(CAMEL_MODEL_PATH);

interface FlowerPlacement {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

function Flowers() {
  const [flowerTemplate, setFlowerTemplate] = useState<THREE.Group | null>(
    null,
  );
  const flowersRef = useRef<THREE.Group>(null);

  const placements = useMemo<FlowerPlacement[]>(
    () => [
      // Front arc
      { position: [-2.2, -1.5, 1.0], rotation: [0, 0.3, 0.1], scale: 0.6 },
      { position: [-1.4, -1.5, 1.8], rotation: [0, 1.2, -0.05], scale: 0.5 },
      { position: [0, -1.5, 2.2], rotation: [0, 0.8, 0], scale: 0.55 },
      { position: [1.4, -1.5, 1.8], rotation: [0, -0.5, 0.08], scale: 0.5 },
      { position: [2.2, -1.5, 1.0], rotation: [0, -1.0, -0.1], scale: 0.6 },
      // Side clusters
      { position: [-2.6, -1.5, -0.3], rotation: [0, 2.0, 0.05], scale: 0.45 },
      { position: [2.6, -1.5, -0.3], rotation: [0, -2.0, -0.05], scale: 0.45 },
      // Back accent
      { position: [-1.0, -1.5, -1.6], rotation: [0, 3.0, 0], scale: 0.4 },
      { position: [1.0, -1.5, -1.6], rotation: [0, -3.0, 0], scale: 0.4 },
      // Small fillers
      { position: [-0.8, -1.5, 2.0], rotation: [0, 0.5, 0.15], scale: 0.35 },
      { position: [0.8, -1.5, 2.0], rotation: [0, -0.3, -0.15], scale: 0.35 },
    ],
    [],
  );

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("/models/");
    mtlLoader.load("flower.mtl", (materials) => {
      materials.preload();

      // Apply a nice pink fallback since flower_material_1.png wasn't provided
      Object.values(materials.materials).forEach((mat: any) => {
        if (mat.map) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
        }
      });

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("/models/");
      objLoader.load("flower.obj", (obj) => {
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const oldMat = mesh.material as THREE.MeshPhongMaterial;
            mesh.material = new THREE.MeshStandardMaterial({
              map: oldMat.map || null,
              color: oldMat.map ? undefined : new THREE.Color("#e8a0bf"),
              roughness: 0.5,
              metalness: 0.05,
              side: THREE.DoubleSide,
            });
          }
        });

        // Normalize flower size
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const normalizeScale = 1.5 / maxDim;

        const pivot = new THREE.Group();
        obj.position.sub(center);
        const inner = new THREE.Group();
        inner.add(obj);
        inner.rotation.x = -Math.PI / 2;
        pivot.add(inner);
        pivot.scale.setScalar(normalizeScale);

        setFlowerTemplate(pivot);
      });
    });
  }, []);

  // Gentle sway animation
  useFrame(({ clock }) => {
    if (flowersRef.current) {
      flowersRef.current.children.forEach((flower, i) => {
        const t = clock.getElapsedTime();
        flower.rotation.z = Math.sin(t * 0.6 + i * 1.2) * 0.05;
        flower.position.y =
          placements[i].position[1] + Math.sin(t * 0.4 + i * 0.8) * 0.03;
      });
    }
  });

  if (!flowerTemplate) return null;

  return (
    <group ref={flowersRef}>
      {placements.map((p, i) => (
        <group
          key={i}
          position={p.position}
          rotation={p.rotation}
          scale={p.scale}
        >
          <primitive object={flowerTemplate.clone()} />
        </group>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -1.5 + Math.random() * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      spd[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    const geo = particlesRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.002;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#f0c8a0"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function RotatingScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <CamelModel />
      {/* <Flowers /> */}
      <FloatingParticles />
    </group>
  );
}

export default function CamelScene({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  return (
    <div
      className="fixed inset-0 z-0 flex items-center justify-center"
      style={{ opacity: Math.max(0, 1 - scrollProgress * 1.5) }}
    >
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight
          position={[-3, 3, -2]}
          intensity={0.3}
          color="#ffd4e8"
        />
        <Environment preset="studio" />
        <RotatingScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
