
import * as THREE from "three";

export const createAccessories = (workspaceGroup: THREE.Group): void => {
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
};
