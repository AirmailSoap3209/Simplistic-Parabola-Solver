let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX, startY;
let zoomLevel = 1;
let globA, globB, globC, globD;
let currentFunctionType = 'parabola';  

const maxZoomIn = 5;
const maxZoomOut = 0.125;
const zoomStep = 0.1;

// Add new variables for point dragging
let isInteractiveMode = false;
let selectedPoint = null;
let pointRadius = 5;

// Add new variables for grid snap
let gridSnapEnabled = false;
let gridSnapSize = 0.5;

let lastFrameTime = 0;
const minFrameInterval = 1000 / 60; // Limit to 60 FPS
let pendingUpdate = false;

function plotThing(a, b, c, d, type = 'parabola', canvasId = 'parabolaCanvas') {
  globA = a;
  globB = b;
  globC = c;
  globD = d;
  currentFunctionType = type;  
  const range = 12000;

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  previousPoints = [];

  ctx.save();
  ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
  ctx.scale(zoomLevel, zoomLevel);

  drawAxesAndGrid(ctx, range);

  if (type === 'parabola') {
    drawParabola(ctx, a, b, c, range);
  } else if (type === 'sin') {
    drawSinusoidal(ctx, a, b, c, d, range);
  } else if (type === 'tan') {
    drawTangent(ctx, a, b, c, d, range);
  }

  if (canvasId === 'parabolaCanvas') {
    drawPointsForActiveMethod(ctx);
    updateZoomDisplay();
  }

  ctx.restore();
}

function drawAxesAndGrid(ctx, range) {
  ctx.beginPath();
  ctx.moveTo(-range, 0);
  ctx.lineTo(range, 0);
  ctx.moveTo(0, -range);
  ctx.lineTo(0, range);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  const gridSpacing = 20;
  ctx.strokeStyle = '#e0e0e0';

  for (let x = -range; x<= range; x+= gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, -range);
    ctx.lineTo(x, range);
    ctx.stroke();
    if ( x !== 0) ctx.fillText((x / 20), x, 10);
  }

  for (let y = -range; y <= range; y+= gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(-range, y);
    ctx.lineTo(range, y);
    ctx.stroke();
    if (y !== 0) ctx.fillText((-y / 20), 10, y);
  }
}

function drawParabola(ctx, a, b, c, range) {
  ctx.beginPath();
  for (let x = -range; x<= range; x++) {
    const y = -(a * (x / 20) ** 2 + b * (x / 20) + c);
    ctx.lineTo(x, y * 20);
  }
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawSinusoidal(ctx, a, b, c, d, range) {
  ctx.beginPath();
  for (let x = -range; x<= range; x++) {
    const y = -(a * Math.sin(b * (x / 20) + c) + d);
    ctx.lineTo(x, y * 20);
  }
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawTangent(ctx, a, b, c, d, range) {
  ctx.beginPath();
  for (let x = -range; x<= range; x++) {
    const y = -(a * Math.tan(b * (x / 20) + c) + d);
    ctx.lineTo(x, y * 20);
  }
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 2;
  ctx.stroke();
}

let previousPoints = [];

function drawPointsForActiveMethod(ctx) {
  const activeMethod = document.querySelector('.method:not([style*="display: none"])');
  const methodId = activeMethod.id;

  if (methodId === 'method3') {
    const fx = parseFloat(document.getElementById('xFocus').value);
    const fy = parseFloat(document.getElementById('yFocus').value);
    const directrixY = parseFloat(document.getElementById('yDirectrix').value);
    
    drawPoints(ctx, [
      { x: fx, y: fy, type: 'focus' }
    ]);
    drawDirectrix(ctx, directrixY);
  } else {
    let points = [];
    switch (methodId) {
      case 'method1':
        points = [
          { x: parseFloat(document.getElementById('x1').value), y: parseFloat(document.getElementById('y1').value), inputs: ['x1', 'y1'] },
          { x: parseFloat(document.getElementById('x2').value), y: parseFloat(document.getElementById('y2').value), inputs: ['x2', 'y2'] },
          { x: parseFloat(document.getElementById('x3').value), y: parseFloat(document.getElementById('y3').value), inputs: ['x3', 'y3'] }
        ];
        break;
      case 'method2':
        points = [
          { x: parseFloat(document.getElementById('vertX').value), y: parseFloat(document.getElementById('vertY').value), inputs: ['vertX', 'vertY'], type: 'vertex' },
          { x: parseFloat(document.getElementById('vertX1').value), y: parseFloat(document.getElementById('vertY1').value), inputs: ['vertX1', 'vertY1'] }
        ];
        break;
    }
    drawPoints(ctx, points);
  }
}

function drawDirectrix(ctx, yValue) {
  const range = 12000;
  ctx.beginPath();
  ctx.moveTo(-range, -yValue * 20);
  ctx.lineTo(range, -yValue * 20);
  ctx.strokeStyle = 'blue';
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
}

function clearPreviousPoints(ctx) {
  // No need to redraw points in black, they will be cleared by the canvas clear
  previousPoints = [];
}

function drawPoints(ctx, points) {
  points.forEach(point => {
    if (!isNaN(point.x) && !isNaN(point.y)) {
      const plottedX = point.x * 20;
      const plottedY = -point.y * 20;
      
      // Draw the point
      ctx.beginPath();
      ctx.arc(plottedX, plottedY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Add label
      ctx.save();
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.font = 'bold 14px Arial';
      
      // Get label based on point type
      let label = point.type === 'focus' ? 'Focus' : 
                  point.inputs ? `P${point.inputs[0].replace(/[^0-9]/g, '')}` : '';
      
      // Position label slightly offset from point
      ctx.fillText(label, plottedX + 10, plottedY - 5);
      ctx.restore();
    }
  });
}

function enableInteractiveMode() {
    isInteractiveMode = true;
    const canvas = document.getElementById('parabolaCanvas');
    canvas.style.cursor = 'pointer';
}

function disableInteractiveMode() {
    isInteractiveMode = false;
    selectedPoint = null;
    const canvas = document.getElementById('parabolaCanvas');
    canvas.style.cursor = 'default';
}

function isPointNearMouse(point, mouseX, mouseY, canvasId = 'parabolaCanvas') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return false;
    
    const canvasX = point.x * 20 * zoomLevel;
    const canvasY = -point.y * 20 * zoomLevel;
    const distance = Math.sqrt(
        Math.pow(mouseX - (canvas.width/2 + offsetX + canvasX), 2) +
        Math.pow(mouseY - (canvas.height/2 + offsetY + canvasY), 2)
    );
    return distance < pointRadius * 2;
}

function isNearDirectrix(mouseY, directrixY, canvas) {
  const canvasY = -directrixY * 20 * zoomLevel;
  const distance = Math.abs(mouseY - (canvas.height/2 + offsetY + canvasY));
  return distance < 10; // 10 pixels tolerance for directrix
}

function displayMessage(message, isError = false) {
    const equationElement = document.getElementById('equation');
    if (equationElement) {
        equationElement.textContent = message;
        equationElement.style.color = isError ? '#ff4444' : '#2ecc71';
        
        if (isError) {
            // Reset to green after 3 seconds if it was an error
            setTimeout(() => {
                equationElement.style.color = '#2ecc71';
                equationElement.textContent = equationElement.textContent.replace('Error: ', '');
            }, 3000);
        }
    }
}

function setupCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isInteractiveMode) {
      // Check if we clicked near any point
      const activeMethod = document.querySelector('.method:not([style*="display: none"])');
      const methodId = activeMethod.id;
      let points = [];

      if (methodId === 'method3') {
        const fx = parseFloat(document.getElementById('xFocus').value);
        const fy = parseFloat(document.getElementById('yFocus').value);
        const directrixY = parseFloat(document.getElementById('yDirectrix').value);
        
        // Check if we're clicking the directrix line
        if (isNearDirectrix(mouseY, directrixY, canvas)) {
          selectedPoint = { type: 'directrix', inputs: ['yDirectrix'] };
          canvas.style.cursor = 'ns-resize';
          return;
        }
        
        // Check if we're clicking the focus point
        points = [
          { x: fx, y: fy, inputs: ['xFocus', 'yFocus'], type: 'focus' }
        ];
      } else {
        switch (methodId) {
          case 'method1':
            points = [
              { x: parseFloat(document.getElementById('x1').value), y: parseFloat(document.getElementById('y1').value), inputs: ['x1', 'y1'] },
              { x: parseFloat(document.getElementById('x2').value), y: parseFloat(document.getElementById('y2').value), inputs: ['x2', 'y2'] },
              { x: parseFloat(document.getElementById('x3').value), y: parseFloat(document.getElementById('y3').value), inputs: ['x3', 'y3'] }
            ];
            break;
          case 'method2':
            points = [
              { x: parseFloat(document.getElementById('vertX').value), y: parseFloat(document.getElementById('vertY').value), inputs: ['vertX', 'vertY'] },
              { x: parseFloat(document.getElementById('vertX1').value), y: parseFloat(document.getElementById('vertY1').value), inputs: ['vertX1', 'vertY1'] }
            ];
            break;
        }
      }

      for (let point of points) {
        if (isPointNearMouse(point, mouseX, mouseY, canvasId)) {
          selectedPoint = point;
          canvas.style.cursor = 'grabbing';
          return;
        }
      }
    }
    
    // If we're not in interactive mode or didn't click a point/directrix, enable canvas dragging
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
  });

  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - canvas.width / 2 - offsetX) / zoomLevel;
    const mouseY = -(e.clientY - rect.top - canvas.height / 2 - offsetY) / zoomLevel;

    if (isInteractiveMode && selectedPoint) {
      const methodId = document.querySelector('.method:not([style*="display: none"])').id;
      
      // Convert screen coordinates to graph coordinates (1 unit = 20 pixels)
      let graphX = mouseX / 20;
      let graphY = mouseY / 20;

      // Apply grid snap if enabled
      if (gridSnapEnabled) {
        graphX = snapToGrid(graphX);
        graphY = snapToGrid(graphY);
      }

      // Always update the input fields based on the method
      switch(methodId) {
        case 'method1':
          if (selectedPoint.inputs[0] === 'x1') {
            document.getElementById('x1').value = graphX.toFixed(2);
            document.getElementById('y1').value = graphY.toFixed(2);
          } else if (selectedPoint.inputs[0] === 'x2') {
            document.getElementById('x2').value = graphX.toFixed(2);
            document.getElementById('y2').value = graphY.toFixed(2);
          } else if (selectedPoint.inputs[0] === 'x3') {
            document.getElementById('x3').value = graphX.toFixed(2);
            document.getElementById('y3').value = graphY.toFixed(2);
          }
          break;
        case 'method2':
          if (selectedPoint.inputs[0] === 'vertX') {
            document.getElementById('vertX').value = graphX.toFixed(2);
            document.getElementById('vertY').value = graphY.toFixed(2);
          } else if (selectedPoint.inputs[0] === 'vertX1') {
            document.getElementById('vertX1').value = graphX.toFixed(2);
            document.getElementById('vertY1').value = graphY.toFixed(2);
          }
          break;
        case 'method3':
          if (selectedPoint.type === 'focus') {
            document.getElementById('xFocus').value = graphX.toFixed(2);
            document.getElementById('yFocus').value = graphY.toFixed(2);
          } else if (selectedPoint.type === 'directrix') {
            document.getElementById('yDirectrix').value = graphY.toFixed(2);
          }
          break;
      }
      // Always update the display, even if validation will fail
      updateParabola();
    } else if (isDragging) {
      // Normal canvas dragging
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      requestAnimationFrame(() => {
        plotThing(globA, globB, globC, globD, currentFunctionType, canvasId);
      });
    } else if (isInteractiveMode) {
      // Update cursor based on what we're hovering over
      const activeMethod = document.querySelector('.method:not([style*="display: none"])');
      if (activeMethod.id === 'method3') {
        const directrixY = parseFloat(document.getElementById('yDirectrix').value);
        if (isNearDirectrix(mouseY, directrixY, canvas)) {
          canvas.style.cursor = 'ns-resize';
          return;
        }
      }
      canvas.style.cursor = 'default';
    }
  });

  canvas.addEventListener('mouseup', function() {
    if (isInteractiveMode && selectedPoint) {
      selectedPoint = null;
      canvas.style.cursor = 'pointer';
    }
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', function() {
    isDragging = false;
    if (selectedPoint) {
      selectedPoint = null;
      canvas.style.cursor = 'pointer';
    }
  });

  canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    const zoomAmount = e.deltaY > 0 ? -zoomStep : zoomStep;
    const newZoom = zoomLevel + zoomAmount;

    if (newZoom >= maxZoomOut && newZoom <= maxZoomIn) {
      zoomLevel = newZoom;
      if (typeof globA !== 'undefined' && typeof globB !== 'undefined' && typeof globC !== 'undefined' && typeof globD !== 'undefined') {
        plotThing(globA, globB, globC, globD, currentFunctionType, canvasId);
      }
    }
  });
}

function toggleGridSnap(enabled) {
  gridSnapEnabled = enabled;
  updateParabola();
}

function updateGridSnapSize(size) {
  gridSnapSize = parseFloat(size);
  document.getElementById('gridSnapValue').textContent = size;
  updateParabola();
}

function snapToGrid(value) {
  if (!gridSnapEnabled) return value;
  return Math.round(value / gridSnapSize) * gridSnapSize;
}

function updateParabola() {
    if (pendingUpdate) return;
    pendingUpdate = true;

    requestAnimationFrame(() => {
        const currentTime = performance.now();
        if (currentTime - lastFrameTime < minFrameInterval) {
            pendingUpdate = false;
            return;
        }

        // Always redraw points even if validation fails
        plotThing(globA || 0, globB || 0, globC || 0, globD || 0, currentFunctionType);

        // Try to update equation
        const form = document.querySelector('.method:not([style*="display: none"]) form');
        if (form) {
            const submitEvent = new Event('submit');
            form.dispatchEvent(submitEvent);
        }
        
        lastFrameTime = currentTime;
        pendingUpdate = false;
    });
}

function updateZoomDisplay() {
  const zoomDisplay = document.getElementById('zoomDisplay');
  if (zoomDisplay) {
    zoomDisplay.textContent = `Zoom: ${(zoomLevel * 100).toFixed(0)}%`;
  }
}

// Setup both canvases
setupCanvas('parabolaCanvas');
setupCanvas('equParabolaCanvas');
