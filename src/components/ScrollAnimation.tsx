import React, { useEffect } from 'react'
import * as THREE from 'three'
import * as dat from 'lil-gui'

const ScrollAnimation = () => {
  useEffect(() => {
    /**
     * Debug
     */
    const gui = new dat.GUI()

    const parameters = {
      materialColor: '#ffeded',
    }

    gui.addColor(parameters, 'materialColor')

    /**
     * Base
     */
    // Canvas
    const canvas: HTMLElement = document.querySelector(
      'canvas.webgl'
    ) as HTMLElement

    // Scene
    const scene = new THREE.Scene()

    /**
     * Objects
     */
    const mesh1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 60),
      new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    const mesh2 = new THREE.Mesh(
      new THREE.ConeGeometry(1, 2, 32),
      new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    const mesh3 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
      new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )

    scene.add(mesh1, mesh2, mesh3)

    /**
     * Test cube
     */
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    scene.add(cube)

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.z = 6
    scene.add(camera)

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }, [])
  return (
    <>
      <canvas className='webgl'></canvas>
      <section className='section'>
        <h1>My Portfolio</h1>
      </section>
      <section className='section'>
        <h2>My projects</h2>
      </section>
      <section className='section'>
        <h2>Contact me</h2>
      </section>
    </>
  )
}

export default ScrollAnimation
