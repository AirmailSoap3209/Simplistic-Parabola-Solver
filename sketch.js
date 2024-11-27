let isVertexForm = localStorage.getItem('preferred-format') === 'vertex';

function validateInputs(values, limit = 300) {
  return values.every(val => {
    const num = parseFloat(val);
    return !isNaN(num) && isFinite(num) && Math.abs(num) <= limit;
  });
}

function validateThreePoints(x1, y1, x2, y2, x3, y3) {
  const minDistance = 0.01;
  const dist12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const dist23 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
  const dist13 = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));

  if (dist12 < minDistance || dist23 < minDistance || dist13 < minDistance) {
    return {
      valid: false,
      error: "At least two points are too close together. Please space them further apart."
    };
  }

  return { valid: true };
}

function validateVertexAndPoint(vx, vy, px, py) {
  const minDistance = 0.01;
  const distance = Math.sqrt(Math.pow(px - vx, 2) + Math.pow(py - vy, 2));

  if (distance < minDistance) {
    return {
      valid: false,
      error: "The vertex and point are too close together. Please space them further apart."
    };
  }

  if (vx === px && vy === py) {
    return {
      valid: false,
      error: "The vertex and point cannot be the same."
    };
  }

  return { valid: true };
}

function validateFocusAndDirectrix(fx, fy, directrix) {
  if (fy === directrix) {
    return {
      valid: false,
      error: "The focus y-coordinate cannot be equal to the directrix y-value."
    };
  }

  return { valid: true };
}

function formatNumber(num) {
  const decimalPlaces = parseInt(localStorage.getItem('decimal-places') || '4');
  return Number(num.toFixed(decimalPlaces));
}

function formatEquation(a, b, c) {
  a = formatNumber(a);
  b = formatNumber(b);
  c = formatNumber(c);
  
  let equation = "";

  if (Math.abs(a) > 0.0001) {
    equation += (a === 1 ? "" : a === -1 ? "-" : a) + "x²";
  }

  if (Math.abs(b) > 0.0001) {
    if (b > 0 && equation) equation += " + ";
    if (b < 0) equation += " - ";
    equation += (Math.abs(b) === 1 ? "" : Math.abs(b)) + "x";
  }

  if (Math.abs(c) > 0.0001) {
    if (c > 0 && equation) equation += " + ";
    if (c < 0) equation += " - ";
    equation += Math.abs(c);
  }

  return equation || "0";
}

function formatVertexForm(a, h, k) {
  a = formatNumber(a);
  h = formatNumber(h);
  k = formatNumber(k);
  
  let equation = "";
  
  if (Math.abs(a - 1) < 0.0001) {
    equation += "";
  } else if (Math.abs(a + 1) < 0.0001) {
    equation = "-";
  } else {
    equation = a;
  }

  if (Math.abs(h) < 0.0001) {
    equation += "x²";
  } else {
    const sign = h > 0 ? "-" : "+";
    const absH = Math.abs(h);
    if (Math.abs(absH - 1) < 0.0001) {
      equation += `(x ${sign} 1)²`;
    } else {
      equation += `(x ${sign} ${absH})²`;
    }
  }

  if (Math.abs(k) > 0.0001) {
    const sign = k > 0 ? " + " : " - ";
    equation += sign + Math.abs(k);
  }

  return equation || "0";
}

function standardToVertex(a, b, c) {
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;
  return { a, h, k }
}

function vertexToStandard(a, h, k) {
  const b = -2 * a * h;
  const c = a * h * h + k;
  return { a, b, c };
}

function getEquationText(a, b, c) {
  if (Math.abs(a) < 1e-10 && Math.abs(b) < 1e-10) {
    return `The straight line with best fit is: y = ${formatEquation(a, b, c)}`;
  }

  if (Math.abs(a) < 1e-10) {
    return `The linear equation with best fit is: y = ${formatEquation(a, b, c)}`;
  }

  if (isVertexForm) {
    const vertex = standardToVertex(a, b, c);
    return `The quadratic equation with best fit is: y = ${formatVertexForm(vertex.a, vertex.h, vertex.k)}`;
  }

  return `The quadratic equation with best fit is: y = ${formatEquation(a, b, c)}`;
}

function updateEquationDisplay(a, b, c) {
  document.getElementById('equation').innerHTML = getEquationText(a, b, c);
  plotThing(a, b, c, 'parabolaCanvas');
  
  plotThing(a, b, c, 'equParabolaCanvas');
}

function solveFromPoints(x1, y1, x2, y2, x3, y3) {
  let a1 = x1 * x1, b1 = x1, c1 = 1, r1 = y1;
  let a2 = x2 * x2, b2 = x2, c2 = 1, r2 = y2;
  let a3 = x3 * x3, b3 = x3, c3 = 1, r3 = y3;
  
  let det =  a1 * (b2 * c3 - b3 * c2) - b1 * (a2 * c3 - a3 * c2) + c1 * (a2 * b3 - a3 * b2);

  if (det === 0) {
    return { error: "Invalid Input: Please ensure all points are unique and try again." };
  }

  let eq1 = {a: a2 - a1, b: b2 - b1, c: c2 - c1, result: r2 - r1};
  let eq2 = {a: a3 - a1, b: b3 - b1, c: c3 - c1, result: r3 - r1};

  var a = (eq1.result * eq2.b - eq2.result * eq1.b) / (eq1.a * eq2.b -eq2.a * eq1.b);
  var b = (eq1.result - eq1.a * a) / eq1.b;
  var c = r1 - (a * a1 + b * b1);

  return { a, b, c };
}

function solveFromVertexAndPoint(vx, vy, px, py) {
  const a = (py - vy) / Math.pow((px - vx), 2);
  const {b, c} = vertexToStandard(a, vx, vy);

  return { a, b, c };
}

function solveFromFocusAndDirectrix(fx, fy, directrixY) {
  const h = fx;
  const k = (fy + directrixY) / 2;
  const p = fy - k;

  if (p === 0) {
    return { error: 'Invalid focus-directrix configuration. The parabola cannot be calculated.' };
  }

  const a = 1 / (4 * p);
  const {b, c} = vertexToStandard(a, h, k);

  return { a, b, c };
}

function solveSinusoidal(a, b, c, d) {
  // y = a * sin(b(x - c)) + d
  return { a, b, c, d, type: 'sin' };
}

function solveTangent(a, b, c, d) {
  // y = a * tan(b(x - c)) + d
  return { a, b, c, d, type: 'tan' };
}

document.addEventListener('DOMContentLoaded', function() {
  const format = localStorage.getItem('preferred-format') || 'standard';
  isVertexForm = format === 'vertex';
});

document.getElementById('equationFormat').addEventListener('change', function() {
  isVertexForm = this.value === 'vertex';
  if (globA !== undefined && globB !== undefined && globC !== undefined) {
    updateEquationDisplay(globA, globB, globC);
  }
});

document.getElementById('3ptForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const x1 = parseFloat(document.getElementById('x1').value);
  const y1 = parseFloat(document.getElementById('y1').value);
  const x2 = parseFloat(document.getElementById('x2').value);
  const y2 = parseFloat(document.getElementById('y2').value);
  const x3 = parseFloat(document.getElementById('x3').value);
  const y3 = parseFloat(document.getElementById('y3').value);

  // Always plot the points
  plotThing(globA || 0, globB || 0, globC || 0);

  // Check validation and update equation if valid
  if (!validateInputs([x1, y1, x2, y2, x3, y3])) {
    displayMessage("All values must be numbers between -300 and 300.", true);
    return;
  }

  const validation = validateThreePoints(x1, y1, x2, y2, x3, y3);
  if (!validation.valid) {
    displayMessage(validation.error, true);
    return;
  }

  // Only calculate equation if validation passes
  const result = solveFromPoints(x1, y1, x2, y2, x3, y3);
  if (result.error) {
    displayMessage(result.error, true);
    return;
  }

  updateEquationDisplay(result.a, result.b, result.c);
});

document.getElementById('2ptForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const vx = parseFloat(document.getElementById('vertX').value);
  const vy = parseFloat(document.getElementById('vertY').value);
  const px = parseFloat(document.getElementById('vertX1').value);
  const py = parseFloat(document.getElementById('vertY1').value);

  // Always plot the points
  plotThing(globA || 0, globB || 0, globC || 0);

  // Check validation and update equation if valid
  if (!validateInputs([vx, vy, px, py])) {
    displayMessage("All values must be numbers between -300 and 300.", true);
    return;
  }

  const validation = validateVertexAndPoint(vx, vy, px, py);
  if (!validation.valid) {
    displayMessage(validation.error, true);
    return;
  }

  // Only calculate equation if validation passes
  const result = solveFromVertexAndPoint(vx, vy, px, py);
  if (result.error) {
    displayMessage(result.error, true);
    return;
  }

  updateEquationDisplay(result.a, result.b, result.c);
});

document.getElementById('focusForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const fx = parseFloat(document.getElementById('xFocus').value);
  const fy = parseFloat(document.getElementById('yFocus').value);
  const directrixY = parseFloat(document.getElementById('yDirectrix').value);

  // Always plot the points
  plotThing(globA || 0, globB || 0, globC || 0);

  // Check validation and update equation if valid
  if (!validateInputs([fx, fy, directrixY])) {
    displayMessage("All values must be numbers between -300 and 300.", true);
    return;
  }

  const validation = validateFocusAndDirectrix(fx, fy, directrixY);
  if (!validation.valid) {
    displayMessage(validation.error, true);
    return;
  }

  // Only calculate equation if validation passes
  const result = solveFromFocusAndDirectrix(fx, fy, directrixY);
  if (result.error) {
    displayMessage(result.error, true);
    return;
  }

  updateEquationDisplay(result.a, result.b, result.c);
});

document.getElementById('stdForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const a = parseFloat(document.getElementById('stdInputA').value);
  const b = parseFloat(document.getElementById('stdInputB').value);
  const c = parseFloat(document.getElementById('stdInputC').value);

  if (!validateInputs([a, b, c])) {
    displayMessage("Input values must be between -300 and 300.", true);
    return;
  }

  updateEquationDisplay(a, b, c);
});

document.getElementById('vertForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const a = parseFloat(document.getElementById('vertInputA').value);
  const h = parseFloat(document.getElementById('vertInputH').value);
  const k = parseFloat(document.getElementById('vertInputK').value);

  if (!validateInputs([a, h, k])) {
    displayMessage("Input values must be between -300 and 300.", true);
    return;
  }

  const {b, c} = vertexToStandard(a, h, k);
  updateEquationDisplay(a, b, c);
});

document.getElementById('sinForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const a = parseFloat(document.getElementById('sinInputA').value);
  const b = parseFloat(document.getElementById('sinInputB').value);
  const c = parseFloat(document.getElementById('sinInputC').value);
  const d = parseFloat(document.getElementById('sinInputD').value);

  if (!validateInputs([a, b, c, d])) {
    displayMessage("Input values must be between -300 and 300.", true);
    return;
  }

  const result = solveSinusoidal(a, b, c, d);
  plotThing(result.a, result.b, result.c, result.d, 'sin');
});

document.getElementById('tanForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const a = parseFloat(document.getElementById('tanInputA').value);
  const b = parseFloat(document.getElementById('tanInputB').value);
  const c = parseFloat(document.getElementById('tanInputC').value);
  const d = parseFloat(document.getElementById('tanInputD').value);

  if (!validateInputs([a, b, c, d])) {
    displayMessage("Input values must be between -300 and 300.", true);
    return;
  }

  const result = solveTangent(a, b, c, d);
  plotThing(result.a, result.b, result.c, result.d, 'tan');
});