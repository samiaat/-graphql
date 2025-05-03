function updateFailPassRatio(passCount, failCount) {
  // Get the SVG element and clear it
  const svg = document.getElementById('pass-fail-ratio-svg');
  svg.innerHTML = '';
  svg.setAttribute('viewBox', '0 0 300 300');
  
  // Background
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('x', '0');
  background.setAttribute('y', '0');
  background.setAttribute('width', '300');
  background.setAttribute('height', '300');
  background.setAttribute('fill', '#2c3338');
  background.setAttribute('rx', '10');
  background.setAttribute('ry', '10');
  svg.appendChild(background);
  
  // Calculate pie chart data
  const total = passCount + failCount;
  const passPercentage = passCount / total;
  
  // Base circle (fail) - Larger size
  const baseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  baseCircle.setAttribute('cx', '150');
  baseCircle.setAttribute('cy', '140');
  baseCircle.setAttribute('r', '120'); // Increased radius
  baseCircle.setAttribute('fill', '#808080'); // Grey for fail
  svg.appendChild(baseCircle);
  
  // Pass portion
  let passPath;
  if (passPercentage > 0) {
    passPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const passAngle = passPercentage * 2 * Math.PI;
    const arcSweep = passAngle > Math.PI ? 1 : 0;
    const endX = 150 + 120 * Math.sin(passAngle);
    const endY = 140 - 120 * Math.cos(passAngle);
    
    let d = `M 150 140 L 150 20 A 120 120 0 ${arcSweep} 1 ${endX} ${endY} Z`;
    passPath.setAttribute('d', d);
    passPath.setAttribute('fill', '#FFD700'); // Gold for pass
    svg.appendChild(passPath);
  }
  
  // Legend at bottom
  const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  legend.setAttribute('transform', 'translate(100, 270)');
  
  // Pass legend
  const passRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  passRect.setAttribute('x', '0');
  passRect.setAttribute('y', '0');
  passRect.setAttribute('width', '12');
  passRect.setAttribute('height', '12');
  passRect.setAttribute('fill', '#FFD700');
  legend.appendChild(passRect);
  
  const passText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  passText.setAttribute('x', '18');
  passText.setAttribute('y', '10');
  passText.setAttribute('font-family', 'Arial');
  passText.setAttribute('font-size', '12');
  passText.setAttribute('fill', '#ffffff');
  passText.textContent = 'Pass';
  legend.appendChild(passText);
  
  // Fail legend
  const failRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  failRect.setAttribute('x', '70');
  failRect.setAttribute('y', '0');
  failRect.setAttribute('width', '12');
  failRect.setAttribute('height', '12');
  failRect.setAttribute('fill', '#808080');
  legend.appendChild(failRect);
  
  const failText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  failText.setAttribute('x', '88');
  failText.setAttribute('y', '10');
  failText.setAttribute('font-family', 'Arial');
  failText.setAttribute('font-size', '12');
  failText.setAttribute('fill', '#ffffff');
  failText.textContent = 'Fail';
  legend.appendChild(failText);
  
  svg.appendChild(legend);
  
  // Add tooltip
  const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  tooltip.setAttribute('id', 'tooltip');
  tooltip.style.visibility = 'hidden';
  
  const tooltipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  tooltipRect.setAttribute('x', '0');
  tooltipRect.setAttribute('y', '0');
  tooltipRect.setAttribute('width', '100');
  tooltipRect.setAttribute('height', '30');
  tooltipRect.setAttribute('fill', 'white');
  tooltipRect.setAttribute('opacity', '0.8');
  tooltipRect.setAttribute('rx', '5');
  tooltipRect.setAttribute('ry', '5');
  tooltip.appendChild(tooltipRect);
  
  const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  tooltipText.setAttribute('x', '10');
  tooltipText.setAttribute('y', '20');
  tooltipText.setAttribute('font-family', 'Arial');
  tooltipText.setAttribute('font-size', '12');
  tooltipText.setAttribute('fill', '#333');
  tooltip.appendChild(tooltipText);
  
  svg.appendChild(tooltip);
  
  // Event handlers for tooltip
  baseCircle.addEventListener('mousemove', function(e) {
    const failPercent = Math.round((failCount / total) * 100);
    showTooltip(e, `Fail: ${failCount} (${failPercent}%)`);
  });
  
  baseCircle.addEventListener('mouseout', function() {
    hideTooltip();
  });
  
  if (passPath) {
    passPath.addEventListener('mousemove', function(e) {
      const passPercent = Math.round((passCount / total) * 100);
      showTooltip(e, `Pass: ${passCount} (${passPercent}%)`);
    });
    
    passPath.addEventListener('mouseout', function() {
      hideTooltip();
    });
  }
  
  function showTooltip(event, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.visibility = 'visible';
    
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    
    const CTM = svg.getScreenCTM();
    if (CTM) {
      const transformed = svgPoint.matrixTransform(CTM.inverse());
      
      tooltip.setAttribute('transform', `translate(${transformed.x + 10}, ${transformed.y - 30})`);
      tooltipText.textContent = text;
      
      // Adjust tooltip rectangle width based on text length
      const textWidth = tooltipText.getComputedTextLength();
      tooltipRect.setAttribute('width', textWidth + 20);
    }
  }
  
  function hideTooltip() {
    document.getElementById('tooltip').style.visibility = 'hidden';
  }
}