
export const createKeyboardTexture = (): HTMLCanvasElement => {
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
};
