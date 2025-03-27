
import * as THREE from "three";

export const createChair = (): THREE.Group => {
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
  
  return chairGroup;
};
