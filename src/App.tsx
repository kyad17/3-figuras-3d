
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import type { Mesh } from 'three'
import './App.css'

// FIGURA 1: OCTAEDRO - CAMBIA DE COLOR
function Figura1() {
  const meshRef = useRef<Mesh>(null!)
  const [encima, setEncima] = useState(false)
  const [indice, setIndice] = useState(0)

  // Puedes cambiar estos colores
  const colores = [
    '#ff69b4', // Rosado
    '#9b59b6', // Morado
    '#00c9a7', // Verde
    '#ffd166', // Amarillo
    '#4dabf7', // Azul
  ]

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8
      meshRef.current.rotation.x += delta * 0.3
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[-2.8, 0, -1]}
      scale={encima ? 1.3 : 1}
      onPointerOver={() => {
        setEncima(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setEncima(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={() => setIndice((i) => (i + 1) % colores.length)}
    >
      <octahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial
        color={colores[indice]}
        metalness={0.4}
        roughness={0.25}
        emissive={colores[indice]}
        emissiveIntensity={encima ? 0.35 : 0.05}
      />
    </mesh>
  )
}

// FIGURA 2: CUBO - CONTADOR DE CLICS
function Figura2() {
  const meshRef = useRef<Mesh>(null!)
  const [encima, setEncima] = useState(false)
  const [contador, setContador] = useState(0)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0

    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, -5, -1]}
      scale={encima ? 1.25 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setContador((c) => c + 1)}
    >
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial
        color={encima ? '#d4a5ff' : '#8e44ad'}
        metalness={0.3}
        roughness={0.2}
      />

      <Html position={[0, 1.35, 0]} center distanceFactor={8}>
        <div className="contador">
          Clics: {contador}
        </div>
      </Html>
    </mesh>
  )
}

// FIGURA 3: CILINDRO - CAMBIA A MODO ALAMBRE
function Figura3() {
  const meshRef = useRef<Mesh>(null!)
  const [encima, setEncima] = useState(false)
  const [alambre, setAlambre] = useState(false)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.1
      meshRef.current.rotation.z += delta * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[2.8, 0, -1]}
      scale={encima ? 1.2 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setAlambre((v) => !v)}
    >
      <cylinderGeometry args={[0.7, 0.7, 1.5, 32]} />
      <meshStandardMaterial
        color={alambre ? '#ffdd59' : '#00d2a0'}
        wireframe={alambre}
        metalness={0.3}
        roughness={0.3}
      />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-4, 3, 2]} intensity={1} color="#ff69b4" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
      />

      <Environment files="/360.jpg" background />

      <Figura1 />
      <Figura2 />
      <Figura3 />
    </Canvas>
  )
}

export default App
