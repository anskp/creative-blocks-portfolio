
import * as THREE from "three";
import { createKeyboardTexture } from "../utils/createKeyboardTexture";

export const createDesktop = (workspaceGroup: THREE.Group): void => {
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
};
