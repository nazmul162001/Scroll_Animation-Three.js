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
    gui.addColor(parameters, 'materialColor').onChange(() => {
      material.color.set(parameters.materialColor)
    })

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
    // Texture
    const textureLoader = new THREE.TextureLoader()
    const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
    gradientTexture.magFilter = THREE.NearestFilter

    // Material
    const material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture,
    })

    // Meshes
    const objectsDistance = 4
    const mesh1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 60),
      material
    )
    const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material)
    const mesh3 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
      material
    )

    mesh1.position.y = -objectsDistance * 0
    mesh2.position.y = -objectsDistance * 1
    mesh3.position.y = -objectsDistance * 2

    mesh1.position.x = 2
    mesh2.position.x = -2
    mesh3.position.x = 2

    scene.add(mesh1, mesh2, mesh3)

    const sectionMeshes = [mesh1, mesh2, mesh3]

    /**
     * Lights
     */
    const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
    directionalLight.position.set(1, 1, 0)
    scene.add(directionalLight)

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
     * Scroll
     */
    let scrollY = window.scrollY
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY
    })

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      // Animate camera
      camera.position.y = (-scrollY / sizes.height) * objectsDistance

      // Animate meshes
      for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
      }

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
