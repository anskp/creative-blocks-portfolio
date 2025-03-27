
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
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
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 4, 5);
    scene.add(directionalLight);
    
    // Create a workspace setup
    const workspaceGroup = new THREE.Group();
    
    // Create a desk (table)
    const deskGeometry = new THREE.BoxGeometry(5, 0.2, 2.5);
    const deskMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x5c4033, // Wood brown color
      metalness: 0.1,
      roughness: 0.8,
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = -1.2;
    workspaceGroup.add(desk);
    
    // Create desk legs
    const createDeskLeg = (x: number, z: number) => {
      const legGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
      const leg = new THREE.Mesh(legGeometry, deskMaterial);
      leg.position.set(x, -1.7, z);
      workspaceGroup.add(leg);
    };
    
    createDeskLeg(2.3, 1.1);
    createDeskLeg(-2.3, 1.1);
    createDeskLeg(2.3, -1.1);
    createDeskLeg(-2.3, -1.1);
    
    // Chair
    const chairGroup = new THREE.Group();
    
    // Chair seat
    const chairSeatGeometry = new THREE.BoxGeometry(1.2, 0.1, 1.2);
    const chairMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      metalness: 0.2,
      roughness: 0.7
    });
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
    chairSeat.position.y = -1.5;
    chairSeat.position.z = 2;
    chairGroup.add(chairSeat);
    
    // Chair back
    const chairBackGeometry = new THREE.BoxGeometry(1.2, 1, 0.1);
    const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
    chairBack.position.y = -1;
    chairBack.position.z = 2.6;
    chairGroup.add(chairBack);
    
    // Chair legs
    const chairLegGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.7);
    const chairLegMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    
    const positions = [
      [0.5, 0.5], [0.5, -0.5], [-0.5, 0.5], [-0.5, -0.5]
    ];
    
    positions.forEach(([x, z]) => {
      const leg = new THREE.Mesh(chairLegGeometry, chairLegMaterial);
      leg.position.set(x, -1.85, z + 2);
      chairGroup.add(leg);
    });
    
    workspaceGroup.add(chairGroup);
    
    // Create an improved computer monitor
    const monitorGroup = new THREE.Group();
    
    // Screen
    const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111, 
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    monitorGroup.add(screen);
    
    // Screen bezels
    const bezelGeometry = new THREE.BoxGeometry(3.2, 2.2, 0.05);
    const bezelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.2
    });
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.position.z = -0.03;
    monitorGroup.add(bezel);
    
    // Monitor stand
    const standGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
    const standMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.y = -1.4;
    monitorGroup.add(stand);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.8;
    monitorGroup.add(base);
    
    // Screen content (your profile)
    const loader = new THREE.TextureLoader();
    
    // Create a canvas for dynamic text rendering
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Fill background
      context.fillStyle = '#9b87f5';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add gradient overlay
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(155, 135, 245, 0.9)');
      gradient.addColorStop(1, 'rgba(155, 135, 245, 0.6)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw profile info
      context.fillStyle = 'white';
      context.font = 'bold 36px Arial';
      context.textAlign = 'center';
      context.fillText('Muhammed Anas KP', canvas.width / 2, 120);
      
      context.font = '24px Arial';
      context.fillText('Blockchain Developer', canvas.width / 2, 170);
      
      context.font = '18px Arial';
      context.fillText('Ethereum | Solana | Wormhole', canvas.width / 2, 220);
      
      // Add a stylized avatar placeholder
      context.fillStyle = 'white';
      context.beginPath();
      context.arc(canvas.width / 2, 320, 80, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = '#9b87f5';
      context.font = 'bold 70px Arial';
      context.fillText('MA', canvas.width / 2, 345);
    }
    
    // Create texture from canvas
    const screenTexture = new THREE.CanvasTexture(canvas);
    
    // Apply the texture to the screen
    const screenContentGeometry = new THREE.PlaneGeometry(2.8, 1.8);
    const screenContentMaterial = new THREE.MeshBasicMaterial({ 
      map: screenTexture,
      transparent: true,
      opacity: 0.9
    });
    const screenContent = new THREE.Mesh(screenContentGeometry, screenContentMaterial);
    screenContent.position.z = 0.06;
    monitorGroup.add(screenContent);
    
    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(2, 0.1, 0.8);
    const keyboardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.5,
      roughness: 0.7
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, -1.1, 0.5);
    workspaceGroup.add(keyboard);
    
    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
    const mouse = new THREE.Mesh(mouseGeometry, keyboardMaterial);
    mouse.position.set(1.5, -1.1, 0.5);
    workspaceGroup.add(mouse);
    
    // Position the monitor on the desk
    monitorGroup.position.y = 0.3;
    workspaceGroup.add(monitorGroup);
    
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
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let isInteracting = false;
    
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse coordinates
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };
    
    const handleMouseDown = () => {
      isInteracting = true;
    };
    
    const handleMouseUp = () => {
      isInteracting = false;
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
      
      // Enhanced interaction: Rotate the entire workspace
      if (isInteracting) {
        // More pronounced rotation for interactive mode
        workspaceGroup.rotation.y = mouseX * 0.5;
        workspaceGroup.rotation.x = mouseY * 0.3;
      } else {
        // Gentle animation when not interacting
        workspaceGroup.rotation.y += 0.001;
        workspaceGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      // Animate particles
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
      screenGeometry.dispose();
      screenMaterial.dispose();
      bezelGeometry.dispose();
      bezelMaterial.dispose();
      standGeometry.dispose();
      standMaterial.dispose();
      baseGeometry.dispose();
      baseMaterial.dispose();
      keyboardGeometry.dispose();
      keyboardMaterial.dispose();
      mouseGeometry.dispose();
      deskGeometry.dispose();
      deskMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="w-full h-full"
      style={{ cursor: 'grab' }}
    />
  );
};

export default ThreeScene;
