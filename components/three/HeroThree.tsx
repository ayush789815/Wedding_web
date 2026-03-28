'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroThree() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ── 1. Floating particle field ─────────────────────────────────────
    const particleCount = 1800
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 8

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 2
      sizes[i] = Math.random() * 2.5 + 0.5
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── 2. YK octagon wireframe (3D) ──────────────────────────────────
    // The 8 triangle shapes from the YK logo, extruded as wireframe
    const ykGroup = new THREE.Group()

    // Define the 8 points of the YK octagon symbol scaled to 3D
    const octPoints = [
      new THREE.Vector3(0.25, 0.92, 0),   // top
      new THREE.Vector3(0.66, 0.66, 0),   // top-right
      new THREE.Vector3(0.92, 0.25, 0),   // right
      new THREE.Vector3(0.92, -0.25, 0),  // right-bottom
      new THREE.Vector3(0.66, -0.66, 0),  // bottom-right
      new THREE.Vector3(0.25, -0.92, 0),  // bottom
      new THREE.Vector3(-0.25, -0.92, 0), // bottom-left
      new THREE.Vector3(-0.66, -0.66, 0), // left-bottom
      new THREE.Vector3(-0.92, -0.25, 0), // left
      new THREE.Vector3(-0.92, 0.25, 0),  // left-top
      new THREE.Vector3(-0.66, 0.66, 0),  // top-left
      new THREE.Vector3(-0.25, 0.92, 0),  // top back to start
    ]

    // Outer ring lines
    const ringGeo = new THREE.BufferGeometry().setFromPoints([...octPoints, octPoints[0]])
    const ringMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 })
    const ring = new THREE.Line(ringGeo, ringMat)
    ykGroup.add(ring)

    // Inner spoke lines to center
    const center = new THREE.Vector3(0, 0, 0)
    octPoints.forEach((pt, i) => {
      if (i % 2 === 0) {
        const spkGeo = new THREE.BufferGeometry().setFromPoints([center, pt.clone().multiplyScalar(1.0)])
        const spkMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 })
        ykGroup.add(new THREE.Line(spkGeo, spkMat))
      }
    })

    // Scale and position the 3D YK mark
    ykGroup.scale.set(1.6, 1.6, 1.6)
    ykGroup.rotation.z = Math.PI / 8
    scene.add(ykGroup)

    // ── 3. Inner glowing sphere ────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(0.18, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.06,
      wireframe: true,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // ── 4. Second outer particle ring ─────────────────────────────────
    const ringCount = 240
    const ringPos = new Float32Array(ringCount * 3)
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2
      const radius = 2.4 + Math.sin(i * 7.3) * 0.3
      ringPos[i * 3] = Math.cos(angle) * radius
      ringPos[i * 3 + 1] = Math.sin(angle) * radius
      ringPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4
    }
    const ring2Geo = new THREE.BufferGeometry()
    ring2Geo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3))
    const ring2Mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.012, transparent: true, opacity: 0.3 })
    scene.add(new THREE.Points(ring2Geo, ring2Mat))

    // ── Mouse parallax ────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const targetRot = { x: 0, y: 0 }

    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────
    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth mouse follow
      targetRot.x += (mouse.y * 0.18 - targetRot.x) * 0.04
      targetRot.y += (mouse.x * 0.18 - targetRot.y) * 0.04

      // Rotate the whole scene gently
      particles.rotation.y = t * 0.015
      particles.rotation.x = t * 0.008

      ykGroup.rotation.z = Math.PI / 8 + t * 0.04 + targetRot.x * 0.5
      ykGroup.rotation.x = targetRot.x * 0.6
      ykGroup.rotation.y = targetRot.y * 0.6

      sphere.rotation.y = t * 0.3
      sphere.rotation.x = t * 0.2

      // Subtle camera drift
      camera.position.x = targetRot.y * 0.4
      camera.position.y = targetRot.x * 0.4

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}
