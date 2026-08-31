import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei'

/* WebGL feature-detect — if the browser doesn't have it, render the
   CSS-only fallback instead of throwing and breaking the whole hero */
function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch { return false }
}

/* Pure-CSS / pure-DOM scene — visible even if Three.js fails to load */
function SceneFallback() {
  return (
    <div className="hero-3d-fallback" aria-hidden="true">
      <div className="hero-3d-orbit" />
      <div className="hero-3d-orbit hero-3d-orbit--mid" />
      <div className="hero-3d-orbit hero-3d-orbit--inner" />
    </div>
  )
}

function WireShape() {
  const ref = useRef()
  const { mouse, viewport } = useThree()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.12
    ref.current.rotation.y = t * 0.18
    const tx = (mouse.x * viewport.width)  / 12
    const ty = (mouse.y * viewport.height) / 12
    ref.current.position.x += (tx - ref.current.position.x) * 0.05
    ref.current.position.y += (-ty - ref.current.position.y) * 0.05
  })
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.6, 1]}>
        <meshBasicMaterial color="#f5f5f5" wireframe transparent opacity={0.35} />
      </Icosahedron>
    </Float>
  )
}

function DistortShape() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * -0.08
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={2}>
      <mesh ref={ref} scale={0.6}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#f5f5f5"
          wireframe
          transparent
          opacity={0.12}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  return (
    <Sparkles
      count={120}
      scale={[10, 6, 4]}
      size={2}
      speed={0.4}
      opacity={0.6}
      color="#f5f5f5"
    />
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
    </>
  )
}

function DynamicScene({ onError }) {
  useEffect(() => {
    const onErr = (e) => { console.warn('[3d]', e); onError() }
    window.addEventListener('error', onErr, { once: true })
    return () => window.removeEventListener('error', onErr)
  }, [onError])

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Lights />
      <WireShape />
      <DistortShape />
      <ParticleField />
    </Canvas>
  )
}

export default function Hero3D() {
  const [Failed, setFailed] = useState(false)
  const [NoWebGL, setNoWebGL] = useState(false)

  useEffect(() => { if (!hasWebGL()) setNoWebGL(true) }, [])

  if (NoWebGL || Failed) return <SceneFallback />

  return (
    <div className="hero-3d" aria-hidden="true">
      <DynamicScene onError={() => setFailed(true)} />
    </div>
  )
}
