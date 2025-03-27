
export const createScreenContent = (): HTMLCanvasElement => {
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
  
  return canvas;
};
