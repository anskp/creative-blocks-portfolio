
import * as THREE from "three";
import { createDesktop } from "./createDesktop";
import { createMonitor } from "./createMonitor";
import { createChair } from "./createChair";
import { createAccessories } from "./createAccessories";

export const createWorkspace = (): { 
  workspaceGroup: THREE.Group, 
  monitorGroup: THREE.Group,
  screenContent: THREE.Mesh
} => {
  // Create a workspace setup
  const workspaceGroup = new THREE.Group();
  
  // Create desktop components
  createDesktop(workspaceGroup);
  
  // Create monitor and screen
  const { monitorGroup, screenContent } = createMonitor();
  monitorGroup.position.y = 0.3;
  workspaceGroup.add(monitorGroup);
  
  // Create chair
  const chairGroup = createChair();
  workspaceGroup.add(chairGroup);
  
  // Create desk accessories
  createAccessories(workspaceGroup);
  
  return { workspaceGroup, monitorGroup, screenContent };
};
