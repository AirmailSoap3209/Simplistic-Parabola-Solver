document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('slider');
  const methods = document.getElementsByClassName('method');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  
  let currentMethodIndex = 0;

  for (let i = 1; i < methods.length; i++) {
    methods[i].style.display = 'none';
  }

  function showMethod(index) {
    for (let i = 0; i < methods.length; i++) {
      methods[i].style.display = 'none';
    }
    methods[index].style.display = 'block';
  }

  leftArrow.addEventListener('click', () => {
    currentMethodIndex--;
    if (currentMethodIndex < 0) {
      currentMethodIndex = methods.length - 1;
    }
    showMethod(currentMethodIndex);
  });

  rightArrow.addEventListener('click', () => {
    currentMethodIndex++;
    if (currentMethodIndex >= methods.length) {
      currentMethodIndex = 0;
    }
    showMethod(currentMethodIndex);
  });

});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('equSlider');
  const methods = document.getElementsByClassName('equInput');
  const leftArrow = document.getElementById('left-equArrow');
  const rightArrow = document.getElementById('right-equArrow');
  
  let currentMethodIndex = 0;

  for (let i = 1; i < methods.length; i++) {
    methods[i].style.display = 'none';
  }

  function showMethod(index) {
    for (let i = 0; i < methods.length; i++) {
      methods[i].style.display = 'none';
    }
    methods[index].style.display = 'block';
  }

  leftArrow.addEventListener('click', () => {
    currentMethodIndex--;
    if (currentMethodIndex < 0) {
      currentMethodIndex = methods.length - 1;
    }
    showMethod(currentMethodIndex);
  });

  rightArrow.addEventListener('click', () => {
    currentMethodIndex++;
    if (currentMethodIndex >= methods.length) {
      currentMethodIndex = 0;
    }
    showMethod(currentMethodIndex);
  });

});
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('slider');
  const methods = document.getElementsByClassName('method');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  
  let currentMethodIndex = 0;

  for (let i = 1; i < methods.length; i++) {
    methods[i].style.display = 'none';
  }

  function showMethod(index) {
    for (let i = 0; i < methods.length; i++) {
      methods[i].style.display = 'none';
    }
    methods[index].style.display = 'block';
  }

  leftArrow.addEventListener('click', () => {
    currentMethodIndex--;
    if (currentMethodIndex < 0) {
      currentMethodIndex = methods.length - 1;
    }
    showMethod(currentMethodIndex);
  });

  rightArrow.addEventListener('click', () => {
    currentMethodIndex++;
    if (currentMethodIndex >= methods.length) {
      currentMethodIndex = 0;
    }
    showMethod(currentMethodIndex);
  });

});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('equSlider');
  const methods = document.getElementsByClassName('equInput');
  const leftArrow = document.getElementById('left-equArrow');
  const rightArrow = document.getElementById('right-equArrow');
  
  let currentMethodIndex = 0;

  for (let i = 1; i < methods.length; i++) {
    methods[i].style.display = 'none';
  }

  function showMethod(index) {
    for (let i = 0; i < methods.length; i++) {
      methods[i].style.display = 'none';
    }
    methods[index].style.display = 'block';
  }

  leftArrow.addEventListener('click', () => {
    currentMethodIndex--;
    if (currentMethodIndex < 0) {
      currentMethodIndex = methods.length - 1;
    }
    showMethod(currentMethodIndex);
  });

  rightArrow.addEventListener('click', () => {
    currentMethodIndex++;
    if (currentMethodIndex >= methods.length) {
      currentMethodIndex = 0;
    }
    showMethod(currentMethodIndex);
  });

});
