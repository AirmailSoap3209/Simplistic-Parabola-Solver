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
  let equation = document.getElementById('equation').innerText;

  if (equation.includes("y = ")) {
    equation = "y = " + equation.split("y = ")[1];
  }

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.fillStyle = 'white';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  tempCtx.drawImage(canvas, 0, 0);

  tempCtx.font = 'bold 32px Arial';
  tempCtx.fillStyle = '#e76c3c';
  tempCtx.textAlign = 'left';

  tempCtx.fillText(equation, 20, 30)

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
  
  // Update equation display if it exists
  if (typeof globA !== 'undefined' && typeof globB !== 'undefined' && typeof globC !== 'undefined') {
    updateEquationDisplay(globA, globB, globC);
  }
}

// Add grid snap settings
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

  // Load saved decimal places
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

  // Load grid snap settings
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