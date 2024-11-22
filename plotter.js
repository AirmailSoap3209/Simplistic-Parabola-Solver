let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX, startY;
let zoomLevel = 1;
let globA, globB, globC;

const maxZoomIn = 5;
const maxZoomOut = 0.125;
const zoomStep = 0.1;

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
      const focus = {
        x: parseFloat(document.getElementById('xFocus').value),
        y: parseFloat(document.getElementById('yFocus').value)
      }
      const directrixY = parseFloat(document.getElementById('yDirectrix').value);

      currentPoints = [focus];

      // Draw directrix line after points are cleared
      ctx.beginPath();
      ctx.moveTo(-12000, -directrixY * 20);
      ctx.lineTo(12000, -directrixY * 20);
      ctx.strokeStyle = 'blue';
      ctx.stroke();
      break;
  }

  // Clear previous points
  if (previousPoints.length > 0) {
    clearPreviousPoints(ctx);
  }
  
  // Update previousPoints and draw new points
  previousPoints = currentPoints;
  drawPoints(ctx, currentPoints);
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

function setupCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.offsetX - offsetX;
    startY = e.offsetY - offsetY;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      offsetX = e.offsetX - startX;
      offsetY = e.offsetY - startY;
      plotThing(globA, globB, globC, canvasId);
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    
    const mouseX = event.offsetX - canvas.width / 2 - offsetX;
    const mouseY = event.offsetY - canvas.height / 2 - offsetY;
    
    const oldZoom = zoomLevel;
    
    if (event.deltaY < 0 && zoomLevel < maxZoomIn) {
      zoomLevel = Math.min(maxZoomIn, zoomLevel * 1.1);
    } else if (event.deltaY > 0 && zoomLevel > maxZoomOut) {
      zoomLevel = Math.max(maxZoomOut, zoomLevel / 1.1);
    }
    
    const zoomRatio = zoomLevel / oldZoom;
    offsetX += mouseX * (1 - zoomRatio);
    offsetY += mouseY * (1 - zoomRatio);
    
    plotThing(globA, globB, globC, canvasId);
  });
}

// Setup both canvases
setupCanvas('parabolaCanvas');
setupCanvas('equParabolaCanvas');
