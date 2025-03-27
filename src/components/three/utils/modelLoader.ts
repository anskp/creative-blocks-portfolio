
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Loads a GLTF model from a file
 * 
 * @param scene - The THREE.Scene to add the model to
 * @param path - Path to the GLTF file
 * @param position - Position of the model {x, y, z}
 * @param scale - Scale of the model (uniform scale)
 * @param rotation - Rotation of the model in radians {x, y, z}
 * @returns Promise resolving to the loaded model
 */
export const loadGLTFModel = (
  scene: THREE.Scene,
  path: string,
  position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
  scale: number = 1,
  rotation: THREE.Euler = new THREE.Euler(0, 0, 0)
): Promise<THREE.Group> => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        
        // Apply transformations
        model.position.copy(position);
        model.scale.set(scale, scale, scale);
        model.rotation.copy(rotation);
        
        // Add to scene
        scene.add(model);
        
        console.log(`GLTF model loaded: ${path}`);
        resolve(model);
      },
      (xhr) => {
        console.log(`${path} loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error(`Error loading GLTF model ${path}:`, error);
        reject(error);
      }
    );
  });
};
