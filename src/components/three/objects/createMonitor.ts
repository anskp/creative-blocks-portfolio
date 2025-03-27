
import * as THREE from "three";
import { createScreenContent } from "../utils/createScreenContent";

export const createMonitor = (): { 
  monitorGroup: THREE.Group, 
  screenContent: THREE.Mesh 
} => {
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
  
  // Create texture from canvas
  const canvas = createScreenContent();
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
  
  return { monitorGroup, screenContent };
};
