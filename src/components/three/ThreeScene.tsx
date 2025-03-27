import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { setupLights } from "./utils/setupLights";
import { createWorkspace } from "./objects/createWorkspace";
import { createScreenContent } from "./utils/createScreenContent";
import { ProfileDetail } from "./ProfileDetail";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [screenActive, setScreenActive] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    
    // Raycaster for object interaction
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();
    
    // Add lights to the scene
    setupLights(scene);
    
    // Create a workspace setup with all objects
    const { workspaceGroup, monitorGroup, screenContent } = createWorkspace();
    
    // Add decorative particles (stars/floating points)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x9b87f5,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add workspace to scene
    scene.add(workspaceGroup);
    
    // Camera position for normal and zoomed views
    const normalCameraPosition = new THREE.Vector3(0, 1, 5);
    const zoomedCameraPosition = new THREE.Vector3(0, 2, 2);
    
    // Handle mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isInteracting = false;
    let targetCameraPosition = normalCameraPosition.clone();
    let isZoomed = false;
    
    // Mouse event handling
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse coordinates
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update raycaster
        mousePos.x = mouseX;
        mousePos.y = mouseY;
      }
    };
    
    const handleMouseDown = () => {
      isInteracting = true;
    };
    
    const handleMouseUp = (event: MouseEvent) => {
      isInteracting = false;
      
      // Check for screen click
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mousePos.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mousePos.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mousePos, camera);
        const intersects = raycaster.intersectObjects(monitorGroup.children);
        
        // If clicked on screen
        if (intersects.length > 0 && intersects.some(i => i.object.userData?.isScreen)) {
          // Toggle between normal and zoomed view
          isZoomed = !isZoomed;
          
          // Update camera target position
          if (isZoomed) {
            targetCameraPosition = zoomedCameraPosition.clone();
            setScreenActive(true);
          } else {
            targetCameraPosition = normalCameraPosition.clone();
            setScreenActive(false);
          }
        }
      }
    };
    
    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('mousedown', handleMouseDown);
    mountRef.current.addEventListener('mouseup', handleMouseUp);
    mountRef.current.addEventListener('mouseleave', handleMouseUp);
    
    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth camera movement between normal and zoomed views
      camera.position.lerp(targetCameraPosition, 0.05);
      
      // Only rotate when not zoomed
      if (!isZoomed) {
        if (isInteracting) {
          // More pronounced rotation for interactive mode
          workspaceGroup.rotation.y = mouseX * 0.5;
          workspaceGroup.rotation.x = mouseY * 0.3;
        } else {
          // Keep still when not interacting (no automatic rotation)
          workspaceGroup.rotation.y = THREE.MathUtils.lerp(workspaceGroup.rotation.y, 0, 0.02);
          workspaceGroup.rotation.x = THREE.MathUtils.lerp(workspaceGroup.rotation.x, 0, 0.02);
        }
      } else {
        // When zoomed in, reset rotation to face the screen directly
        workspaceGroup.rotation.y = THREE.MathUtils.lerp(workspaceGroup.rotation.y, 0, 0.05);
        workspaceGroup.rotation.x = THREE.MathUtils.lerp(workspaceGroup.rotation.x, 0, 0.05);
      }
      
      // Update particles
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeEventListener('mousedown', handleMouseDown);
      mountRef.current?.removeEventListener('mouseup', handleMouseUp);
      mountRef.current?.removeEventListener('mouseleave', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return (
    <div>
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ cursor: screenActive ? 'default' : 'grab' }}
      />
      {screenActive && <ProfileDetail onClose={() => setScreenActive(false)} />}
    </div>
  );
};

export default ThreeScene;
