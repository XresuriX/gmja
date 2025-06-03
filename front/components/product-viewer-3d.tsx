"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, useGLTF } from "@react-three/drei"

interface ProductViewerProps {
  productId: string
}

function HeadphonesModel() {
  // Using a placeholder duck model for demonstration
  const { scene } = useGLTF("/assets/3d/duck.glb")

  return <primitive object={scene} scale={2} position={[0, 0, 0]} />
}

export function ProductViewer3D({ productId }: ProductViewerProps) {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <HeadphonesModel />
          </PresentationControls>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  )
}
