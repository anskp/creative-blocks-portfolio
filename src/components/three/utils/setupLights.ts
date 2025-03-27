
import * as THREE from "three";

export const setupLights = (scene: THREE.Scene): void => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 4, 5);
  scene.add(directionalLight);
};
