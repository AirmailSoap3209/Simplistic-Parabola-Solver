function handleThemeChange() {
  const theme = document.getElementById('themeSelect').value;
  if (theme === 'dark') {
    enableDarkMode();
    saveThemePreference('dark');
  } else {
    enableLightMode();
    saveThemePreference('light');
  }
}

function handleFormatChange() {
  const format = document.getElementById('equationFormat').value;
  localStorage.setItem('preferred-format', format);

  if (format === 'standard') {
    document.getElementById('1stForm').style.display = 'block';
    document.getElementById('2ndForm').style.display = 'none';
  } else {
    document.getElementById('1stForm').style.display = 'none';
    document.getElementById('2ndForm').style.display = 'block';
  }
}

function applySettings() {
  const canvas = document.getElementById('parabolaCanvas');
  const widthInput = document.getElementById('canvasWidth');
  const heightInput = document.getElementById('canvasHeight');
  const decimalPlaces = document.getElementById('decimalPlaces').value;
  
  localStorage.setItem('decimal-places', decimalPlaces);
  
  const newWidth = parseInt(widthInput.value);
  const newHeight = parseInt(heightInput.value);

  if (newWidth < 300 || newWidth > 1200 || newHeight < 300 || newHeight > 1200) {
    displayMessage('Canvas dimensions must be between 300 and 1200 pixels.', true);
    widthInput.value = canvas.width;
    heightInput.value = canvas.height;
    return;
  }

  const dp = parseInt(decimalPlaces);
  if (isNaN(dp) || dp < 0 || dp > 10) {
    displayMessage('Decimal places must be between 0 and 10.', true);
    document.getElementById('decimalPlaces').value = 4;
    return;
  }

  canvas.width = newWidth;
  canvas.height = newHeight;
  
  if (typeof globA !== 'undefined' && typeof globB !== 'undefined' && typeof globC !== 'undefined') {
    plotThing(globA, globB, globC);
  }
}

function exportGraph(canvasId) {
  const canvas = document.getElementById(canvasId);
  
  // Get the actual equation from the equation display element and extract just the y= part
  const equationElement = document.getElementById('equation');
  let equationText = equationElement ? equationElement.textContent : '';
  if (equationText.includes("y = ")) {
    equationText = equationText.split("y = ")[1];
    equationText = "y = " + equationText;
  }
  
  // Create a temporary canvas with extra space for text
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height + 80;
  const tempCtx = tempCanvas.getContext('2d');

  // Fill background
  tempCtx.fillStyle = 'white';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the original canvas content
  tempCtx.drawImage(canvas, 0, 40);

  // Draw equation at the top
  tempCtx.font = 'bold 20px Arial';
  tempCtx.fillStyle = '#000000';
  tempCtx.textAlign = 'center';
  tempCtx.fillText(equationText, tempCanvas.width / 2, 25);

  // Get points based on active method
  const activeMethod = document.querySelector('.method:not([style*="display: none"])');
  const methodId = activeMethod.id;
  let points = [];
  let pointLabels = [];

  if (methodId === 'method3') {
    const fx = parseFloat(document.getElementById('xFocus').value);
    const fy = parseFloat(document.getElementById('yFocus').value);
    points = [{ x: fx, y: fy }];
    pointLabels = ["Focus Point"];
  } else if (methodId === 'method2') {
    points = [
      { 
        x: parseFloat(document.getElementById('vertX').value), 
        y: parseFloat(document.getElementById('vertY').value)
      },
      { 
        x: parseFloat(document.getElementById('vertX1').value), 
        y: parseFloat(document.getElementById('vertY1').value)
      }
    ];
    pointLabels = ["Vertex Point", "Second Point"];
  } else {
    points = [
      { 
        x: parseFloat(document.getElementById('x1').value), 
        y: parseFloat(document.getElementById('y1').value)
      },
      { 
        x: parseFloat(document.getElementById('x2').value), 
        y: parseFloat(document.getElementById('y2').value)
      },
      { 
        x: parseFloat(document.getElementById('x3').value), 
        y: parseFloat(document.getElementById('y3').value)
      }
    ];
    pointLabels = ["First Point", "Second Point", "Third Point"];
  }

  // Draw point coordinates at the bottom left, stacked
  if (points.length > 0) {
    const decimalPlaces = parseInt(localStorage.getItem('decimal-places')) || 2;
    tempCtx.textAlign = 'left';
    tempCtx.font = 'bold 16px Arial';
    
    points.forEach((point, index) => {
      const label = pointLabels[index];
      const coords = `(${point.x.toFixed(decimalPlaces - 2)}, ${point.y.toFixed(decimalPlaces - 2)})`;
      tempCtx.fillText(`${label}: ${coords}`, 20, tempCanvas.height - 20 - (points.length - 1 - index) * 25);
    });
  }

  // Create download link
  const link = document.createElement('a');
  const date = new Date();
  const timestamp = date.toISOString().slice(0,19).replace(/[:]/g, '-').replace('T', ', Time: ');
  
  link.download = `parabola-graph-${timestamp}.png`;
  link.href = tempCanvas.toDataURL('image/png');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function updateDecimalPlaces(value) {
  document.getElementById('decimalValue').textContent = value;
  localStorage.setItem('decimal-places', value);
  
  if (typeof globA !== 'undefined' && typeof globB !== 'undefined' && typeof globC !== 'undefined') {
    updateEquationDisplay(globA, globB, globC);
  }
}

function handleGridSnapToggle(enabled) {
  localStorage.setItem('grid-snap-enabled', enabled);
  if (window.toggleGridSnap) {
    window.toggleGridSnap(enabled);
  }
}

function handleGridSnapSize(value) {
  localStorage.setItem('grid-snap-size', value);
  if (window.updateGridSnapSize) {
    window.updateGridSnapSize(value);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
  document.getElementById('themeSelect').value = savedTheme;

  if (savedTheme === 'dark') {
    enableDarkMode();
  } else {
    enableLightMode();
  }

  const savedFormat = localStorage.getItem('preferred-format') || 'standard';
  document.getElementById('equationFormat').value = savedFormat;

  const savedDecimalPlaces = localStorage.getItem('decimal-places') || '4';
  document.getElementById('decimalPlaces').value = savedDecimalPlaces;
  document.getElementById('decimalValue').textContent = savedDecimalPlaces;

  if (savedFormat === 'vertex') {
    document.getElementById('1stForm').style.display = 'none';
    document.getElementById('2ndForm').style.display = 'block';
  }

  const widthInput = document.getElementById('canvasWidth');
  const heightInput = document.getElementById('canvasHeight');

  function validateInput(input) {
    const value = parseInt(input.value);
    if (value < 300 || value > 1200) {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  }

  widthInput.addEventListener('input', function() {
    validateInput(this);
  });

  heightInput.addEventListener('input', function() {
    validateInput(this);
  });

  document.getElementById('decimalPlaces').addEventListener('input', function() {
    updateDecimalPlaces(this.value);
  });

  const gridSnapEnabled = localStorage.getItem('grid-snap-enabled') === 'true';
  const gridSnapSize = localStorage.getItem('grid-snap-size') || '0.5';
  
  document.getElementById('gridSnapToggle').checked = gridSnapEnabled;
  document.getElementById('gridSnapSize').value = gridSnapSize;
  document.getElementById('gridSnapValue').textContent = gridSnapSize;
  
  if (window.toggleGridSnap) {
    window.toggleGridSnap(gridSnapEnabled);
  }
  if (window.updateGridSnapSize) {
    window.updateGridSnapSize(gridSnapSize);
  }
});