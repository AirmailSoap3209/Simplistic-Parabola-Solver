let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX, startY;
let zoomLevel = 1;
let globA, globB, globC;

const maxZoomIn = 5;
const maxZoomOut = 0.125;
const zoomStep = 0.1;

// Add new variables for point dragging
let isInteractiveMode = false;
let selectedPoint = null;
let pointRadius = 5;

let lastFrameTime = 0;
const minFrameInterval = 1000 / 60; // Limit to 60 FPS
let pendingUpdate = false;

function plotThing(a, b, c, canvasId = 'parabolaCanvas') {
  globA = a;
  globB = b;
  globC = c;
  const range = 12000;

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  // Clear the canvas and reset points array
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  previousPoints = [];

  ctx.save();
  ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
  ctx.scale(zoomLevel, zoomLevel);

  drawAxesAndGrid(ctx, range);

  drawParabola(ctx, a, b, c, range);

  if (canvasId === 'parabolaCanvas') {
    drawPointsForActiveMethod(ctx);
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

let previousPoints = [];

function drawPointsForActiveMethod(ctx) {
  const activeMethod = document.querySelector('.method:not([style*="display: none"])');
  const methodId = activeMethod.id;
  ctx.fillStyle = 'black';

  let currentPoints = [];

  switch (methodId) {
    case 'method1':
      currentPoints = [
        { x: parseFloat(document.getElementById('x1').value), y: parseFloat(document.getElementById('y1').value) },
        { x: parseFloat(document.getElementById('x2').value), y: parseFloat(document.getElementById('y2').value) },
        { x: parseFloat(document.getElementById('x3').value), y: parseFloat(document.getElementById('y3').value) },
      ];
      break;

    case 'method2':
      currentPoints = [
        { x: parseFloat(document.getElementById('vertX').value), y: parseFloat(document.getElementById('vertY').value) },
        { x: parseFloat(document.getElementById('vertX1').value), y: parseFloat(document.getElementById('vertY1').value) }
      ];
      break;
    
    case 'method3':
      const fx = parseFloat(document.getElementById('xFocus').value);
      const fy = parseFloat(document.getElementById('yFocus').value);
      const directrixY = parseFloat(document.getElementById('yDirectrix').value);
      
      currentPoints = [
        { x: fx, y: fy, type: 'focus' }
      ];
      
      // Draw focus point in a different color
      ctx.fillStyle = '#ff4444';
      drawPoints(ctx, currentPoints);
      
      // Draw directrix line
      drawDirectrix(ctx, directrixY);
      return;
  }

  drawPoints(ctx, currentPoints);
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
      ctx.beginPath();
      ctx.arc(plottedX, plottedY, 5, 0, Math.PI * 2);
      ctx.fill();
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
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isInteractiveMode && selectedPoint) {
      // Convert mouse coordinates to graph coordinates
      const graphX = ((mouseX - canvas.width/2 - offsetX) / (20 * zoomLevel)).toFixed(2);
      const graphY = (-(mouseY - canvas.height/2 - offsetY) / (20 * zoomLevel)).toFixed(2);

      if (selectedPoint.type === 'directrix') {
        // Only update y-coordinate for directrix
        document.getElementById(selectedPoint.inputs[0]).value = graphY;
      } else {
        // Update both coordinates for points
        document.getElementById(selectedPoint.inputs[0]).value = graphX;
        document.getElementById(selectedPoint.inputs[1]).value = graphY;
      }

      // Use the optimized update function
      updateParabola();
    } else if (isDragging) {
      // Normal canvas dragging
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      requestAnimationFrame(() => {
        plotThing(globA, globB, globC, canvasId);
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

  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    
    const zoomIn = event.deltaY < 0;
    const newZoom = zoomIn ? zoomLevel * (1 + zoomStep) : zoomLevel * (1 - zoomStep);
    
    if (newZoom >= maxZoomOut && newZoom <= maxZoomIn) {
        zoomLevel = newZoom;
        displayMessage(`Zoom level: ${Math.round(zoomLevel * 100)}%`);
    } else {
        displayMessage('Maximum zoom limit reached', true);
    }
    
    plotThing(globA, globB, globC, canvasId);
  });
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

        const form = document.querySelector('.method:not([style*="display: none"]) form');
        const submitEvent = new Event('submit');
        form.dispatchEvent(submitEvent);
        
        lastFrameTime = currentTime;
        pendingUpdate = false;
    });
}

// Setup both canvases
setupCanvas('parabolaCanvas');
setupCanvas('equParabolaCanvas');
