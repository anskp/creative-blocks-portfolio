
import * as THREE from "three";

export const setupLights = (scene: THREE.Scene): void => {
  // Ambient light - increased intensity for better model visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  
  // Main directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 4, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);
  
  // Additional directional light from another angle for better coverage
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);
  
  // Optional: Add a soft light underneath for better visibility of model details
  const bottomLight = new THREE.DirectionalLight(0xffffff, 0.3);
  bottomLight.position.set(0, -3, 0);
  scene.add(bottomLight);
};
