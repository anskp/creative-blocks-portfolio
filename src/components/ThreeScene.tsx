import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

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
    const mouse = new THREE.Vector2();
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 4, 5);
    scene.add(directionalLight);
    
    // Create a workspace setup
    const workspaceGroup = new THREE.Group();
    
    // Create a desk (table) with better materials
    const deskGeometry = new THREE.BoxGeometry(5, 0.2, 2.5);
    const deskMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3a2618, // Richer wood color
      metalness: 0.1,
      roughness: 0.7,
      clearcoat: 0.2,
      clearcoatRoughness: 0.2
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = -1.2;
    workspaceGroup.add(desk);
    
    // Add desk texture/details
    const deskTopGeometry = new THREE.PlaneGeometry(4.9, 2.4);
    const deskTopMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2a1a0a,
      metalness: 0.1,
      roughness: 0.8,
      clearcoat: 0.3,
      opacity: 0.3,
      transparent: true
    });
    const deskTop = new THREE.Mesh(deskTopGeometry, deskTopMaterial);
    deskTop.rotation.x = -Math.PI / 2;
    deskTop.position.y = -1.09;
    workspaceGroup.add(deskTop);
    
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
    
    // Chair with improved materials
    const chairGroup = new THREE.Group();
    
    // Chair seat
    const chairSeatGeometry = new THREE.BoxGeometry(1.2, 0.1, 1.2);
    const chairMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.3,
      roughness: 0.7,
      clearcoat: 0.1
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
    
    // Chair cushion
    const chairCushionGeometry = new THREE.BoxGeometry(1.1, 0.05, 1.1);
    const chairCushionMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      metalness: 0.1,
      roughness: 0.9
    });
    const chairCushion = new THREE.Mesh(chairCushionGeometry, chairCushionMaterial);
    chairCushion.position.y = -1.43;
    chairCushion.position.z = 2;
    chairGroup.add(chairCushion);
    
    // Chair legs
    const chairLegGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.7);
    const chairLegMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      metalness: 0.8,
      roughness: 0.2
    });
    
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
    screen.userData = { isScreen: true }; // For raycaster identification
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
    
    // Create a canvas for dynamic text rendering
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
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
      context.font = 'bold 48px Arial';
      context.textAlign = 'center';
      context.fillText('Muhammed Anas KP', canvas.width / 2, 150);
      
      context.font = '32px Arial';
      context.fillText('Blockchain Developer', canvas.width / 2, 210);
      
      context.font = '24px Arial';
      context.fillText('Ethereum | Solana | Wormhole', canvas.width / 2, 280);
      
      // Add email
      context.font = '20px Arial';
      context.fillText('anaskoyakkara@gmail.com', canvas.width / 2, 340);
      
      // Add GitHub
      context.fillText('github.com/anskp', canvas.width / 2, 380);
      
      // Add a stylized avatar placeholder
      context.fillStyle = 'white';
      context.beginPath();
      context.arc(canvas.width / 2, 550, 100, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = '#9b87f5';
      context.font = 'bold 100px Arial';
      context.fillText('MA', canvas.width / 2, 580);
      
      // Skills section
      context.fillStyle = 'white';
      context.font = 'bold 28px Arial';
      context.fillText('Skills & Technologies', canvas.width / 2, 720);
      
      const skills = [
        'Smart Contract Development',
        'Cross-Chain Solutions (Wormhole)',
        'Solidity & Rust',
        'Web3 Integration',
        'DeFi Protocols'
      ];
      
      context.font = '20px Arial';
      skills.forEach((skill, index) => {
        context.fillText(skill, canvas.width / 2, 760 + index * 40);
      });
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
    screenContent.userData = { isScreen: true }; // For raycaster identification
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
    
    // Add keyboard details
    const keysGeometry = new THREE.PlaneGeometry(1.9, 0.7);
    const keysTexture = new THREE.CanvasTexture(createKeyboardTexture());
    const keysMaterial = new THREE.MeshBasicMaterial({
      map: keysTexture,
      transparent: true
    });
    const keys = new THREE.Mesh(keysGeometry, keysMaterial);
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(0, -1.04, 0.5);
    workspaceGroup.add(keys);
    
    function createKeyboardTexture() {
      const keyCanvas = document.createElement('canvas');
      keyCanvas.width = 512;
      keyCanvas.height = 256;
      const keyCtx = keyCanvas.getContext('2d');
      
      if (keyCtx) {
        keyCtx.fillStyle = 'rgba(0, 0, 0, 0)';
        keyCtx.fillRect(0, 0, keyCanvas.width, keyCanvas.height);
        
        const rows = 4;
        const keysPerRow = 12;
        const keyWidth = keyCanvas.width / keysPerRow;
        const keyHeight = keyCanvas.height / rows;
        const padding = 2;
        
        keyCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < keysPerRow; col++) {
            keyCtx.fillRect(
              col * keyWidth + padding,
              row * keyHeight + padding,
              keyWidth - padding * 2,
              keyHeight - padding * 2
            );
          }
        }
      }
      
      return keyCanvas;
    }
    
    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
    const mouse = new THREE.Mesh(mouseGeometry, keyboardMaterial);
    mouse.position.set(1.5, -1.1, 0.5);
    workspaceGroup.add(mouse);
    
    // Add mouse details
    const mouseDetailsGeometry = new THREE.PlaneGeometry(0.28, 0.48);
    const mouseDetailsMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.5
    });
    const mouseDetails = new THREE.Mesh(mouseDetailsGeometry, mouseDetailsMaterial);
    mouseDetails.rotation.x = -Math.PI / 2;
    mouseDetails.position.set(1.5, -1.04, 0.5);
    workspaceGroup.add(mouseDetails);
    
    // Coffee mug
    const mugGroup = new THREE.Group();
    
    const mugGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.35, 32);
    const mugMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.5
    });
    const mug = new THREE.Mesh(mugGeometry, mugMaterial);
    
    const handleGeometry = new THREE.TorusGeometry(0.1, 0.03, 16, 32, Math.PI);
    const handle = new THREE.Mesh(handleGeometry, mugMaterial);
    handle.rotation.y = Math.PI / 2;
    handle.position.x = 0.2;
    
    const coffeeGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 32);
    const coffeeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3a1a00,
      metalness: 0.1,
      roughness: 0.5
    });
    const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
    coffee.position.y = 0.16;
    
    mugGroup.add(mug);
    mugGroup.add(handle);
    mugGroup.add(coffee);
    mugGroup.position.set(-1.7, -1.02, 0.5);
    
    workspaceGroup.add(mugGroup);
    
    // Notepad
    const notepadGeometry = new THREE.BoxGeometry(0.8, 0.05, 1);
    const notepadMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.9
    });
    const notepad = new THREE.Mesh(notepadGeometry, notepadMaterial);
    notepad.position.set(-1.3, -1.15, -0.5);
    notepad.rotation.z = 0.1;
    workspaceGroup.add(notepad);
    
    // Pen
    const penGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 32);
    const penMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.1
    });
    const pen = new THREE.Mesh(penGeometry, penMaterial);
    pen.position.set(-1.1, -1.1, -0.5);
    pen.rotation.z = 0.5;
    pen.rotation.x = 0.3;
    workspaceGroup.add(pen);
    
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
    
    // Camera position for normal and zoomed views
    const normalCameraPosition = new THREE.Vector3(0, 1, 5);
    const zoomedCameraPosition = new THREE.Vector3(0, 0, 2);
    
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
        mouse.x = mouseX;
        mouse.y = mouseY;
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
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
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
    <div>
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ cursor: screenActive ? 'default' : 'grab' }}
      />
      {screenActive && (
        <div className="absolute inset-0 bg-lavender text-white p-8 flex flex-col items-center justify-center bg-opacity-90 z-10 overflow-auto">
          <div className="max-w-3xl w-full space-y-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Muhammed Anas KP
            </h1>
            <p className="text-xl">Blockchain Developer</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                <ul className="space-y-2">
                  <li>• Smart Contract Development</li>
                  <li>• Cross-Chain Solutions (Wormhole)</li>
                  <li>• Solidity & Rust Programming</li>
                  <li>• Web3 Integration</li>
                  <li>• DeFi Protocols</li>
                </ul>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="mb-2">
                  <strong>Email:</strong> anaskoyakkara@gmail.com
                </p>
                <p className="mb-2">
                  <strong>GitHub:</strong> github.com/anskp
                </p>
                <p>
                  <strong>Education:</strong> Computer Science Engineering
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setScreenActive(false)}
              className="mt-8 bg-white text-lavender font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Return to 3D View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
