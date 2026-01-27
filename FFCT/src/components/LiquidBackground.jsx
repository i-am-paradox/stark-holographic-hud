import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei'

const Blob = ({ position, color, scale, speed, distort }) => {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        meshRef.current.rotation.x = t * 0.1
        meshRef.current.rotation.y = t * 0.15
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
                <MeshDistortMaterial
                    color={color}
                    envMapIntensity={0.4}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                    speed={speed} // Animation speed
                    distort={distort} // Strength of distortion
                />
            </Sphere>
        </Float>
    )
}

const LiquidBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Environment preset="studio" />

                {/* Main large blob */}
                <Blob
                    position={[1.5, 0, 0]}
                    scale={2.2}
                    color="#8b5cf6"
                    speed={2}
                    distort={0.4}
                />

                {/* Secondary blob */}
                <Blob
                    position={[-1.5, -1, 0]}
                    scale={1.5}
                    color="#ec4899"
                    speed={3}
                    distort={0.5}
                />

                {/* Third blob (smaller) */}
                <Blob
                    position={[0, 2, -2]}
                    scale={1.2}
                    color="#6366f1"
                    speed={1.5}
                    distort={0.3}
                />
            </Canvas>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
        </div>
    )
}

export default LiquidBackground
