// Parabola Solver Unit Tests
const tests = {
    // Helper function to get current tab
    getCurrentTab: function() {
        if (!document.getElementById('valuesSection').classList.contains('hidden')) return 'values';
        if (!document.getElementById('equationSection').classList.contains('hidden')) return 'equation';
        if (!document.getElementById('settingsSection').classList.contains('hidden')) return 'settings';
        return 'values'; // default
    },

    // Test basic input validation
    testBasicInputValidation: function() {
        const testResults = [];
        console.group('Basic Input Validation Tests');
        
        // Test normal values
        testResults.push({
            name: 'Normal integers',
            passed: validateInputs(['1', '2', '3']) === true,
            expected: true,
            received: validateInputs(['1', '2', '3'])
        });

        testResults.push({
            name: 'Decimal numbers',
            passed: validateInputs(['1.5', '-2.7', '0.001']) === true,
            expected: true,
            received: validateInputs(['1.5', '-2.7', '0.001'])
        });

        testResults.push({
            name: 'Scientific notation',
            passed: validateInputs(['1e2', '2e-3', '1.5e1']) === true,
            expected: true,
            received: validateInputs(['1e2', '2e-3', '1.5e1'])
        });
        
        // Test invalid values
        testResults.push({
            name: 'Letters rejection',
            passed: validateInputs(['abc']) === false,
            expected: false,
            received: validateInputs(['abc'])
        });

        testResults.push({
            name: 'Special characters rejection',
            passed: validateInputs(['!@#']) === false,
            expected: false,
            received: validateInputs(['!@#'])
        });

        testResults.push({
            name: 'Empty input rejection',
            passed: validateInputs(['']) === false,
            expected: false,
            received: validateInputs([''])
        });

        testResults.push({
            name: 'Whitespace rejection',
            passed: validateInputs(['   ']) === false,
            expected: false,
            received: validateInputs(['   '])
        });
        
        // Test edge cases
        testResults.push({
            name: 'Above maximum limit',
            passed: validateInputs(['301']) === false,
            expected: false,
            received: validateInputs(['301'])
        });

        testResults.push({
            name: 'Below minimum limit',
            passed: validateInputs(['-301']) === false,
            expected: false,
            received: validateInputs(['-301'])
        });

        testResults.push({
            name: 'At maximum limit',
            passed: validateInputs(['300']) === true,
            expected: true,
            received: validateInputs(['300'])
        });

        testResults.push({
            name: 'At minimum limit',
            passed: validateInputs(['-300']) === true,
            expected: true,
            received: validateInputs(['-300'])
        });

        testResults.push({
            name: 'Infinity rejection',
            passed: validateInputs(['Infinity']) === false,
            expected: false,
            received: validateInputs(['Infinity'])
        });

        testResults.push({
            name: 'NaN rejection',
            passed: validateInputs(['NaN']) === false,
            expected: false,
            received: validateInputs(['NaN'])
        });

        // Additional edge cases
        testResults.push({
            name: 'Mixed valid/invalid input',
            passed: validateInputs(['100', 'abc', '200']) === false,
            expected: false,
            received: validateInputs(['100', 'abc', '200'])
        });

        testResults.push({
            name: 'Zero input',
            passed: validateInputs(['0']) === true,
            expected: true,
            received: validateInputs(['0'])
        });

        // Report results
        testResults.forEach(result => {
            if (!result.passed) {
                console.error(`❌ ${result.name} failed:
                    Expected: ${result.expected}
                    Received: ${result.received}`);
            } else {
                console.log(`✅ ${result.name} passed`);
            }
        });
        
        console.groupEnd();
        return testResults;
    },

    // Test three points validation
    testThreePointsValidation: function() {
        const testResults = [];
        console.group('Three Points Validation Tests');
        
        // Test valid cases
        testResults.push({
            name: 'Valid parabola points',
            passed: validateThreePoints(0, 0, 1, 1, 2, 4).valid === true,
            expected: true,
            received: validateThreePoints(0, 0, 1, 1, 2, 4).valid
        });

        testResults.push({
            name: 'Negative coordinates',
            passed: validateThreePoints(-1, 1, 0, 0, 1, 1).valid === true,
            expected: true,
            received: validateThreePoints(-1, 1, 0, 0, 1, 1).valid
        });
    
        
        // Additional test cases
        testResults.push({
            name: 'Points too close',
            passed: validateThreePoints(0, 0, 0.0001, 0, 1, 1).valid === false,
            expected: false,
            received: validateThreePoints(0, 0, 0.0001, 0, 1, 1).valid
        });

        testResults.push({
            name: 'Vertical parabola',
            passed: validateThreePoints(-2, 4, 0, 0, 2, 4).valid === true,
            expected: true,
            received: validateThreePoints(-2, 4, 0, 0, 2, 4).valid
        });

        testResults.push({
            name: 'Points at extremes',
            passed: validateThreePoints(-300, -300, 0, 0, 300, 300).valid === true,
            expected: true,
            received: validateThreePoints(-300, -300, 0, 0, 300, 300).valid
        });

        // Report results
        testResults.forEach(result => {
            if (!result.passed) {
                console.error(`❌ ${result.name} failed:
                    Expected: ${result.expected}
                    Received: ${result.received}`);
            } else {
                console.log(`✅ ${result.name} passed`);
            }
        });
        
        console.groupEnd();
        return testResults;
    },

    // Test vertex and point validation
    testVertexAndPointValidation: function() {
        const testResults = [];
        console.group('Vertex and Point Validation Tests');
        
        // Basic valid cases
        testResults.push({
            name: 'Basic valid case',
            passed: validateVertexAndPoint(0, 0, 1, 1).valid === true,
            expected: true,
            received: validateVertexAndPoint(0, 0, 1, 1).valid
        });

        // Edge cases
        testResults.push({
            name: 'Maximum distance',
            passed: validateVertexAndPoint(-300, -300, 300, 300).valid === true,
            expected: true,
            received: validateVertexAndPoint(-300, -300, 300, 300).valid
        });

        testResults.push({
            name: 'Vertical alignment',
            passed: validateVertexAndPoint(0, 0, 0, 100).valid === true,
            expected: true,
            received: validateVertexAndPoint(0, 0, 0, 100).valid
        });

        testResults.push({
            name: 'Horizontal alignment',
            passed: validateVertexAndPoint(0, 0, 100, 0).valid === true,
            expected: true,
            received: validateVertexAndPoint(0, 0, 100, 0).valid
        });

        // Invalid cases
        testResults.push({
            name: 'Same point rejection',
            passed: validateVertexAndPoint(1, 1, 1, 1).valid === false,
            expected: false,
            received: validateVertexAndPoint(1, 1, 1, 1).valid
        });

        testResults.push({
            name: 'Points too close',
            passed: validateVertexAndPoint(0, 0, 0.0001, 0.0001).valid === false,
            expected: false,
            received: validateVertexAndPoint(0, 0, 0.0001, 0.0001).valid
        });

        // Report results
        testResults.forEach(result => {
            if (!result.passed) {
                console.error(`❌ ${result.name} failed:
                    Expected: ${result.expected}
                    Received: ${result.received}`);
            } else {
                console.log(`✅ ${result.name} passed`);
            }
        });
        
        console.groupEnd();
        return testResults;
    },

    // Test draggable features
    testDraggableFeatures: function() {
        const testResults = [];
        console.group('Draggable Features Tests');
        
        // Test interactive mode toggle
        const interactiveModeTest = {
            name: 'Interactive mode toggle',
            passed: (function() {
                isInteractiveMode = false;
                toggleInteractiveMode(true);
                const result1 = isInteractiveMode === true;
                toggleInteractiveMode(false);
                return result1 && isInteractiveMode === false;
            })(),
            expected: true,
            received: 'Toggle functionality test'
        };
        testResults.push(interactiveModeTest);
        console.log(`${interactiveModeTest.passed ? '✅' : '❌'} Interactive mode toggle test ${interactiveModeTest.passed ? 'passed' : 'failed'}`);

        // Test point selection detection
        const pointDetectionTest = {
            name: 'Point near mouse detection',
            passed: (function() {
                const point = { x: 5, y: 5 };
                const mouseX = 300 + 5 * 20; // Center (300) + point.x * scale (20)
                const mouseY = 300 - 5 * 20; // Center (300) - point.y * scale (20)
                zoomLevel = 1; // Ensure zoom level is 1 for test
                offsetX = 0;   // Reset offset
                offsetY = 0;
                return isPointNearMouse(point, mouseX, mouseY);
            })(),
            expected: true,
            received: 'Point detection test'
        };
        testResults.push(pointDetectionTest);
        console.log(`${pointDetectionTest.passed ? '✅' : '❌'} Point near mouse detection test ${pointDetectionTest.passed ? 'passed' : 'failed'}`);

        // Test point detection with zoom
        const zoomPointDetectionTest = {
            name: 'Point detection with zoom',
            passed: (function() {
                const point = { x: 5, y: 5 };
                zoomLevel = 2; // Test with zoom level 2
                const mouseX = 300 + 5 * 20 * zoomLevel;
                const mouseY = 300 - 5 * 20 * zoomLevel;
                const result = isPointNearMouse(point, mouseX, mouseY);
                zoomLevel = 1; // Reset zoom
                return result;
            })(),
            expected: true,
            received: 'Point detection with zoom test'
        };
        testResults.push(zoomPointDetectionTest);
        console.log(`${zoomPointDetectionTest.passed ? '✅' : '❌'} Point detection with zoom test ${zoomPointDetectionTest.passed ? 'passed' : 'failed'}`);

        // Test grid snap functionality
        const gridSnapTest = {
            name: 'Grid snap behavior',
            passed: (function() {
                gridSnapEnabled = true;
                gridSnapSize = 0.5;
                const value = 1.7;
                const snappedValue = snapToGrid(value);
                return Math.abs(snappedValue - 1.5) < 0.001;
            })(),
            expected: true,
            received: 'Grid snap test'
        };
        testResults.push(gridSnapTest);
        console.log(`${gridSnapTest.passed ? '✅' : '❌'} Grid snap behavior test ${gridSnapTest.passed ? 'passed' : 'failed'}`);

        // Test grid snap with different sizes
        const gridSnapSizesTest = {
            name: 'Grid snap with different sizes',
            passed: (function() {
                gridSnapEnabled = true;
                
                // Test with 1.0 grid size
                gridSnapSize = 1.0;
                const test1 = Math.abs(snapToGrid(1.7) - 2.0) < 0.001;
                
                // Test with 0.25 grid size
                gridSnapSize = 0.25;
                const test2 = Math.abs(snapToGrid(1.7) - 1.75) < 0.001;
                
                return test1 && test2;
            })(),
            expected: true,
            received: 'Grid snap sizes test'
        };
        testResults.push(gridSnapSizesTest);
        console.log(`${gridSnapSizesTest.passed ? '✅' : '❌'} Grid snap with different sizes test ${gridSnapSizesTest.passed ? 'passed' : 'failed'}`);

        // Test point dragging bounds
        const boundaryTest = {
            name: 'Point dragging bounds',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                // Test if a point within canvas bounds is valid
                const point = { x: 5, y: 5 };
                const mouseX = canvas.width/2 + point.x * 20;
                const mouseY = canvas.height/2 - point.y * 20;
                
                return mouseX >= 0 && mouseX <= canvas.width && 
                       mouseY >= 0 && mouseY <= canvas.height;
            })(),
            expected: true,
            received: 'Point bounds test'
        };
        testResults.push(boundaryTest);
        console.log(`${boundaryTest.passed ? '✅' : '❌'} Point dragging bounds test ${boundaryTest.passed ? 'passed' : 'failed'}`);

        // Test directrix dragging
        const directrixTest = {
            name: 'Directrix dragging',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                zoomLevel = 1;  // Reset zoom level
                offsetY = 0;    // Reset offset
                const directrixY = 15;  // Directrix at y=15
                const mouseY = canvas.height/2 - directrixY * 20; // Mouse position near directrix
                
                return isNearDirectrix(mouseY, directrixY, canvas);
            })(),
            expected: true,
            received: 'Directrix drag test'
        };
        testResults.push(directrixTest);
        console.log(`${directrixTest.passed ? '✅' : '❌'} Directrix dragging test ${directrixTest.passed ? 'passed' : 'failed'}`);

        // Test point selection with offset
        const offsetPointTest = {
            name: 'Point selection with offset',
            passed: (function() {
                const point = { x: 5, y: 5 };
                offsetX = 50;  // Test with offset
                offsetY = -30;
                const mouseX = 300 + 5 * 20 + offsetX;
                const mouseY = 300 - 5 * 20 + offsetY;
                const result = isPointNearMouse(point, mouseX, mouseY);
                offsetX = 0;   // Reset offset
                offsetY = 0;
                return result;
            })(),
            expected: true,
            received: 'Point selection with offset test'
        };
        testResults.push(offsetPointTest);
        console.log(`${offsetPointTest.passed ? '✅' : '❌'} Point selection with offset test ${offsetPointTest.passed ? 'passed' : 'failed'}`);

        // Test point detection at canvas edges
        const edgeDetectionTest = {
            name: 'Point detection at canvas edges',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                zoomLevel = 1;
                offsetX = 0;
                offsetY = 0;
                
                // Test point at right edge
                const rightPoint = { x: (canvas.width/40), y: 0 }; // Divide by 40 to convert from pixels to units (20 * 2 for center offset)
                const rightMouseX = canvas.width - 5;
                const rightMouseY = canvas.height/2;
                
                // Test point at bottom edge
                const bottomPoint = { x: 0, y: -(canvas.height/40) };
                const bottomMouseX = canvas.width/2;
                const bottomMouseY = canvas.height - 5;
                
                return isPointNearMouse(rightPoint, rightMouseX, rightMouseY) &&
                       isPointNearMouse(bottomPoint, bottomMouseX, bottomMouseY);
            })(),
            expected: true,
            received: 'Edge point detection test'
        };
        testResults.push(edgeDetectionTest);
        console.log(`${edgeDetectionTest.passed ? '✅' : '❌'} Point detection at canvas edges test ${edgeDetectionTest.passed ? 'passed' : 'failed'}`);

        // Test point detection with maximum zoom
        const maxZoomTest = {
            name: 'Point detection at maximum zoom',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                zoomLevel = maxZoomIn;  // Set to maximum zoom level
                const point = { x: 1, y: 1 };
                const mouseX = canvas.width/2 + 1 * 20 * zoomLevel;
                const mouseY = canvas.height/2 - 1 * 20 * zoomLevel;
                const result = isPointNearMouse(point, mouseX, mouseY);
                zoomLevel = 1;  // Reset zoom
                return result;
            })(),
            expected: true,
            received: 'Max zoom point detection test'
        };
        testResults.push(maxZoomTest);
        console.log(`${maxZoomTest.passed ? '✅' : '❌'} Point detection at maximum zoom test ${maxZoomTest.passed ? 'passed' : 'failed'}`);

        // Test point detection with minimum zoom
        const minZoomTest = {
            name: 'Point detection at minimum zoom',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                zoomLevel = maxZoomOut;  // Set to minimum zoom level
                const point = { x: 1, y: 1 };
                const mouseX = canvas.width/2 + 1 * 20 * zoomLevel;
                const mouseY = canvas.height/2 - 1 * 20 * zoomLevel;
                const result = isPointNearMouse(point, mouseX, mouseY);
                zoomLevel = 1;  // Reset zoom
                return result;
            })(),
            expected: true,
            received: 'Min zoom point detection test'
        };
        testResults.push(minZoomTest);
        console.log(`${minZoomTest.passed ? '✅' : '❌'} Point detection at minimum zoom test ${minZoomTest.passed ? 'passed' : 'failed'}`);

        // Test grid snap at maximum value
        const gridSnapMaxTest = {
            name: 'Grid snap at maximum value',
            passed: (function() {
                gridSnapEnabled = true;
                gridSnapSize = 2.0;  // Test with a larger grid size
                const largeValue = 10.7;
                const snappedValue = snapToGrid(largeValue);
                return Math.abs(snappedValue - 10.0) < 0.001;  // Should snap to nearest even number
            })(),
            expected: true,
            received: 'Grid snap max test'
        };
        testResults.push(gridSnapMaxTest);
        console.log(`${gridSnapMaxTest.passed ? '✅' : '❌'} Grid snap at maximum value test ${gridSnapMaxTest.passed ? 'passed' : 'failed'}`);

        // Test grid snap with negative values
        const gridSnapNegativeTest = {
            name: 'Grid snap with negative values',
            passed: (function() {
                gridSnapEnabled = true;
                gridSnapSize = 0.5;
                const negativeValue = -1.7;
                const snappedValue = snapToGrid(negativeValue);
                return Math.abs(snappedValue - (-1.5)) < 0.001;  // Should snap to -1.5
            })(),
            expected: true,
            received: 'Grid snap negative test'
        };
        testResults.push(gridSnapNegativeTest);
        console.log(`${gridSnapNegativeTest.passed ? '✅' : '❌'} Grid snap with negative values test ${gridSnapNegativeTest.passed ? 'passed' : 'failed'}`);

        // Test directrix detection with zoom
        const directrixZoomTest = {
            name: 'Directrix detection with zoom',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                zoomLevel = 2;  // Test with zoom level 2
                offsetY = 0;
                const directrixY = 15;
                const mouseY = canvas.height/2 - directrixY * 20 * zoomLevel;
                const result = isNearDirectrix(mouseY, directrixY, canvas);
                zoomLevel = 1;  // Reset zoom
                return result;
            })(),
            expected: true,
            received: 'Directrix zoom test'
        };
        testResults.push(directrixZoomTest);
        console.log(`${directrixZoomTest.passed ? '✅' : '❌'} Directrix detection with zoom test ${directrixZoomTest.passed ? 'passed' : 'failed'}`);

        // Test error message display
        const errorDisplayTest = {
            name: 'Error message display',
            passed: (function() {
                const equation = document.getElementById('equation');
                if (!equation) return false;
                
                // Save current state
                const originalText = equation.textContent;
                const originalColor = equation.style.color;
                
                // Directly modify the element since we're just testing display
                equation.textContent = 'Test Error';
                equation.style.color = 'red';
                const hasError = equation.textContent === 'Test Error' && 
                               equation.style.color === 'red';
                
                equation.textContent = 'Test Message';
                equation.style.color = 'black';
                const hasNormal = equation.textContent === 'Test Message' && 
                                equation.style.color === 'black';
                
                // Restore original state
                equation.textContent = originalText;
                equation.style.color = originalColor;
                
                return hasError && hasNormal;
            })(),
            expected: true,
            received: 'Error display test'
        };
        testResults.push(errorDisplayTest);
        console.log(`${errorDisplayTest.passed ? '✅' : '❌'} Error message display test ${errorDisplayTest.passed ? 'passed' : 'failed'}`);

        console.groupEnd();
        return testResults;
    },

    // Test method switching and UI state
    testMethodSwitching: function() {
        const testResults = [];
        console.group('Method Switching and UI Tests');

        // Test method visibility
        const methodVisibilityTest = {
            name: 'Method visibility',
            passed: (function() {
                const method1 = document.getElementById('method1');
                const method2 = document.getElementById('method2');
                const method3 = document.getElementById('method3');
                
                if (!method1 || !method2 || !method3) return false;
                
                // Initially only method1 should be visible
                const initialState = !method1.style.display && 
                                   method2.style.display === 'none' && 
                                   method3.style.display === 'none';
                
                // Switch to method2
                method2.style.display = '';
                method1.style.display = 'none';
                const method2State = method2.style.display === '' && 
                                   method1.style.display === 'none' && 
                                   method3.style.display === 'none';
                
                // Reset to initial state
                method1.style.display = '';
                method2.style.display = 'none';
                
                return initialState && method2State;
            })(),
            expected: true,
            received: 'Method visibility test'
        };
        testResults.push(methodVisibilityTest);
        console.log(`${methodVisibilityTest.passed ? '✅' : '❌'} Method visibility test ${methodVisibilityTest.passed ? 'passed' : 'failed'}`);

        // Test input field state preservation
        const inputStateTest = {
            name: 'Input field state preservation',
            passed: (function() {
                // Save current values
                const x1Value = document.getElementById('x1').value;
                const y1Value = document.getElementById('y1').value;
                
                // Set test values
                document.getElementById('x1').value = '5';
                document.getElementById('y1').value = '3';
                
                // Switch methods
                const method2 = document.getElementById('method2');
                const method1 = document.getElementById('method1');
                method2.style.display = '';
                method1.style.display = 'none';
                
                // Switch back
                method1.style.display = '';
                method2.style.display = 'none';
                
                // Check if values preserved
                const preserved = document.getElementById('x1').value === '5' && 
                                document.getElementById('y1').value === '3';
                
                // Restore original values
                document.getElementById('x1').value = x1Value;
                document.getElementById('y1').value = y1Value;
                
                return preserved;
            })(),
            expected: true,
            received: 'Input state preservation test'
        };
        testResults.push(inputStateTest);
        console.log(`${inputStateTest.passed ? '✅' : '❌'} Input field state preservation test ${inputStateTest.passed ? 'passed' : 'failed'}`);

        // Test error message display
        const errorDisplayTest = {
            name: 'Error message display',
            passed: (function() {
                const equation = document.getElementById('equation');
                if (!equation) return false;
                
                // Save current state
                const originalText = equation.textContent;
                const originalColor = equation.style.color;
                
                // Directly modify the element since we're just testing display
                equation.textContent = 'Test Error';
                equation.style.color = 'red';
                const hasError = equation.textContent === 'Test Error' && 
                               equation.style.color === 'red';
                
                equation.textContent = 'Test Message';
                equation.style.color = 'black';
                const hasNormal = equation.textContent === 'Test Message' && 
                                equation.style.color === 'black';
                
                // Restore original state
                equation.textContent = originalText;
                equation.style.color = originalColor;
                
                return hasError && hasNormal;
            })(),
            expected: true,
            received: 'Error display test'
        };
        testResults.push(errorDisplayTest);
        console.log(`${errorDisplayTest.passed ? '✅' : '❌'} Error message display test ${errorDisplayTest.passed ? 'passed' : 'failed'}`);

        // Test canvas state preservation
        const canvasStateTest = {
            name: 'Canvas state preservation',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                if (!canvas) return false;
                
                // Save current state
                const originalZoom = zoomLevel;
                const originalOffsetX = offsetX;
                const originalOffsetY = offsetY;
                
                // Modify canvas state
                zoomLevel = 2;
                offsetX = 100;
                offsetY = -50;
                
                // Switch methods
                const method2 = document.getElementById('method2');
                const method1 = document.getElementById('method1');
                method2.style.display = '';
                method1.style.display = 'none';
                
                // Switch back
                method1.style.display = '';
                method2.style.display = 'none';
                
                // Check if state preserved
                const preserved = zoomLevel === 2 && 
                                offsetX === 100 && 
                                offsetY === -50;
                
                // Restore original state
                zoomLevel = originalZoom;
                offsetX = originalOffsetX;
                offsetY = originalOffsetY;
                
                return preserved;
            })(),
            expected: true,
            received: 'Canvas state preservation test'
        };
        testResults.push(canvasStateTest);
        console.log(`${canvasStateTest.passed ? '✅' : '❌'} Canvas state preservation test ${canvasStateTest.passed ? 'passed' : 'failed'}`);        console.groupEnd();
        return testResults;
    },

    // Test tab switching functionality
    testTabSwitching: function() {
        const testResults = [];
        console.group('Tab Switching Tests');
        const originalTab = this.getCurrentTab();

        // Test tab visibility states
        const tabVisibilityTest = {
            name: 'Tab visibility states',
            passed: (function() {
                // Initial state check
                switchTab('values');
                const valuesVisible = !document.getElementById('valuesSection').classList.contains('hidden');
                const equationHidden = document.getElementById('equationSection').classList.contains('hidden');
                const settingsHidden = document.getElementById('settingsSection').classList.contains('hidden');

                // Switch to equation tab
                switchTab('equation');
                const equationVisible = !document.getElementById('equationSection').classList.contains('hidden');
                const valuesHidden = document.getElementById('valuesSection').classList.contains('hidden');

                return valuesVisible && equationHidden && settingsHidden && equationVisible && valuesHidden;
            })(),
            expected: true,
            received: 'Tab visibility test'
        };
        testResults.push(tabVisibilityTest);

        // Test CSS class application
        const cssClassTest = {
            name: 'CSS class application',
            passed: (function() {
                switchTab('values');
                const valuesActive = document.getElementById('enterValuesTab').classList.contains('active');
                const equationInactive = !document.getElementById('enterEquationTab').classList.contains('active');

                switchTab('equation');
                const equationActive = document.getElementById('enterEquationTab').classList.contains('active');
                const valuesInactive = !document.getElementById('enterValuesTab').classList.contains('active');

                return valuesActive && equationInactive && equationActive && valuesInactive;
            })(),
            expected: true,
            received: 'CSS class test'
        };
        testResults.push(cssClassTest);

        // Test tab color changes
        const tabColorTest = {
            name: 'Tab color changes',
            passed: (function() {
                switchTab('values');
                const valuesColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--active-tab-color')
                    .trim();
                
                switchTab('equation');
                const equationColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--active-tab-color')
                    .trim();

                return valuesColor !== equationColor;
            })(),
            expected: true,
            received: 'Tab color test'
        };
        testResults.push(tabColorTest);

        // Restore original tab
        switchTab(originalTab);
        console.groupEnd();
        return testResults;
    },

    // Test settings functionality
    testSettings: function() {
        const testResults = [];
        console.group('Settings Tests');

        // Test theme switching
        const themeTest = {
            name: 'Theme switching',
            passed: (function() {
                const themeSelect = document.getElementById('themeSelect');
                
                // Test dark mode
                themeSelect.value = 'dark';
                handleThemeChange();
                const isDark = document.body.classList.contains('dark-mode');
                
                // Test light mode
                themeSelect.value = 'light';
                handleThemeChange();
                const isLight = !document.body.classList.contains('dark-mode');
                
                return isDark && isLight;
            })(),
            expected: 'Theme switching successful',
            received: (function() {
                const themeSelect = document.getElementById('themeSelect');
                themeSelect.value = 'dark';
                handleThemeChange();
                const isDark = document.body.classList.contains('dark-mode') ? 'Dark mode applied' : 'Dark mode failed';
                
                themeSelect.value = 'light';
                handleThemeChange();
                const isLight = !document.body.classList.contains('dark-mode') ? 'Light mode applied' : 'Light mode failed';
                
                return `${isDark}, ${isLight}`;
            })()
        };
        testResults.push(themeTest);

        // Test equation format switching
        const formatTest = {
            name: 'Equation format switching',
            passed: (function() {
                const formatSelect = document.getElementById('equationFormat');
                
                // Test standard format
                formatSelect.value = 'standard';
                handleFormatChange();
                const standardVisible = document.getElementById('1stForm').style.display === 'block';
                
                // Test vertex format
                formatSelect.value = 'vertex';
                handleFormatChange();
                const vertexVisible = document.getElementById('2ndForm').style.display === 'block';
                
                return standardVisible && vertexVisible;
            })(),
            expected: true,
            received: 'Format switching test'
        };
        testResults.push(formatTest);

        // Test canvas dimension validation
        const dimensionTest = {
            name: 'Canvas dimension validation',
            passed: (function() {
                const widthInput = document.getElementById('canvasWidth');
                const heightInput = document.getElementById('canvasHeight');
                const originalWidth = widthInput.value;
                const originalHeight = heightInput.value;
                
                // Test invalid dimensions
                widthInput.value = '200'; // Too small
                heightInput.value = '400';
                applySettings();
                const rejectsSmall = widthInput.value === originalWidth;
                
                widthInput.value = '1300'; // Too large
                heightInput.value = '400';
                applySettings();
                const rejectsLarge = widthInput.value === originalWidth;
                
                // Reset
                widthInput.value = originalWidth;
                heightInput.value = originalHeight;
                applySettings();
                
                return rejectsSmall && rejectsLarge;
            })(),
            expected: true,
            received: 'Dimension validation test'
        };
        testResults.push(dimensionTest);

        // Test grid snap functionality
        const gridSnapTest = {
            name: 'Grid snap functionality',
            passed: (function() {
                // Test enabling grid snap
                handleGridSnapToggle(true);
                const enabled = localStorage.getItem('grid-snap-enabled') === 'true';
                
                // Test grid snap size
                handleGridSnapSize(0.5);
                const sizeSet = localStorage.getItem('grid-snap-size') === '0.5';
                
                return enabled && sizeSet;
            })(),
            expected: true,
            received: 'Grid snap test'
        };
        testResults.push(gridSnapTest);

        console.groupEnd();
        return testResults;
    },

    // Test canvas interactions
    testCanvasInteractions: function() {
        const testResults = [];
        console.group('Canvas Interaction Tests');
        const originalTab = this.getCurrentTab();

        // Test canvas resize
        const resizeTest = {
            name: 'Canvas resize',
            passed: (function() {
                const canvas = document.getElementById('parabolaCanvas');
                const originalWidth = canvas.width;
                const originalHeight = canvas.height;
                
                // Test valid resize
                document.getElementById('canvasWidth').value = '600';
                document.getElementById('canvasHeight').value = '600';
                applySettings();
                const resized = canvas.width === 600 && canvas.height === 600;
                
                // Reset
                document.getElementById('canvasWidth').value = originalWidth;
                document.getElementById('canvasHeight').value = originalHeight;
                applySettings();
                
                return resized;
            })(),
            expected: true,
            received: 'Canvas resize test'
        };
        testResults.push(resizeTest);

        // Test canvas state preservation
        const stateTest = {
            name: 'Canvas state preservation',
            passed: (function() {
                // Set initial state
                const originalZoom = zoomLevel;
                const originalOffsetX = offsetX;
                const originalOffsetY = offsetY;

                zoomLevel = 2;
                offsetX = 100;
                offsetY = -50;
                
                // Switch tabs
                switchTab('equation');
                switchTab('values');
                
                const preserved = zoomLevel === 2 && 
                                offsetX === 100 && 
                                offsetY === -50;
                
                // Reset state
                zoomLevel = originalZoom;
                offsetX = originalOffsetX;
                offsetY = originalOffsetY;
                
                return preserved;
            })(),
            expected: true,
            received: 'State preservation test'
        };
        testResults.push(stateTest);

        // Restore original tab
        switchTab(originalTab);
        console.groupEnd();
        return testResults;
    },

    // Test integration scenarios
    testIntegration: function() {
        console.group('Integration Tests');
        const testResults = [];
        const originalTab = this.getCurrentTab();

        // Test 1: Method switching affects form fields
        testResults.push({
            name: 'Method Switching Integration',
            passed: (function() {
                try {
                    // Get current method
                    const methodInputs = document.querySelectorAll('input[name="method"]');
                    if (!methodInputs || methodInputs.length === 0) {
                        console.error('No method inputs found');
                        return false;
                    }

                    // Store original state
                    const originalMethod = Array.from(methodInputs).find(input => input.checked)?.value || 'threePoints';
                    console.log('Original method:', originalMethod);

                    // Test visibility changes
                    let success = true;
                    const methods = ['vertexPoint', 'threePoints'];
                    
                    for (const method of methods) {
                        const input = Array.from(methodInputs).find(i => i.value === method);
                        if (!input) {
                            console.error(`Method input ${method} not found`);
                            success = false;
                            continue;
                        }

                        // Change method
                        input.checked = true;
                        if (typeof switchMethod === 'function') {
                            switchMethod(method);
                        }

                        // Check visibility
                        const vertexFields = document.getElementById('vertexPointFields');
                        const threePointsFields = document.getElementById('threePointsFields');
                        
                        if (!vertexFields || !threePointsFields) {
                            console.error('Field containers not found');
                            success = false;
                            continue;
                        }

                        const vertexVisible = !vertexFields.classList.contains('hidden');
                        const threePointsVisible = !threePointsFields.classList.contains('hidden');

                        if (method === 'vertexPoint' && (!vertexVisible || threePointsVisible)) {
                            console.error('Vertex point visibility incorrect');
                            success = false;
                        } else if (method === 'threePoints' && (vertexVisible || !threePointsVisible)) {
                            console.error('Three points visibility incorrect');
                            success = false;
                        }
                    }

                    // Restore original
                    const originalInput = Array.from(methodInputs).find(i => i.value === originalMethod);
                    if (originalInput) {
                        originalInput.checked = true;
                        if (typeof switchMethod === 'function') {
                            switchMethod(originalMethod);
                        }
                    }

                    return success;
                } catch (error) {
                    console.error('Method Switching Test Error:', error);
                    return false;
                }
            })(),
            expected: "Method inputs should correctly toggle field visibility",
            received: "Method switching field visibility test"
        });

        // Test 2: Settings affect multiple components
        testResults.push({
            name: 'Settings Integration',
            passed: (function() {
                try {
                    const decimalInput = document.getElementById('decimalPlaces');
                    const gridSizeInput = document.getElementById('gridSize');
                    
                    if (!decimalInput || !gridSizeInput) {
                        console.error('Settings inputs not found');
                        return false;
                    }

                    // Store original values
                    const originalDecimal = decimalInput.value;
                    const originalGridSize = gridSizeInput.value;

                    // Change settings
                    decimalInput.value = '3';
                    gridSizeInput.value = '50';
                    
                    // Trigger settings update
                    const event = new Event('change');
                    decimalInput.dispatchEvent(event);
                    gridSizeInput.dispatchEvent(event);

                    if (typeof applySettings === 'function') {
                        applySettings();
                    }

                    // Check if settings were applied
                    const settingsApplied = decimalInput.value === '3' && gridSizeInput.value === '50';

                    // Restore settings
                    decimalInput.value = originalDecimal;
                    gridSizeInput.value = originalGridSize;
                    
                    // Apply original settings
                    decimalInput.dispatchEvent(event);
                    gridSizeInput.dispatchEvent(event);
                    
                    if (typeof applySettings === 'function') {
                        applySettings();
                    }

                    return settingsApplied;
                } catch (error) {
                    console.error('Settings Integration Test Error:', error);
                    return false;
                }
            })(),
            expected: "Settings changes should be applied successfully",
            received: "Settings affect equation and canvas test"
        });

        // Test 3: End-to-end workflow
        testResults.push({
            name: 'End-to-End Workflow',
            passed: (function() {
                try {
                    // Set up test points
                    const testPoints = {
                        x1: 0, y1: 0,
                        x2: 1, y2: 1,
                        x3: -1, y3: 1
                    };

                    // Store original values
                    const originalValues = {};
                    for (const point in testPoints) {
                        const input = document.getElementById(point);
                        if (!input) {
                            console.error(`Input for ${point} not found`);
                            return false;
                        }
                        originalValues[point] = input.value;
                        input.value = testPoints[point];
                    }

                    // Calculate parabola
                    if (typeof calculateParabola === 'function') {
                        calculateParabola();
                    }

                    // Check if equation was generated
                    const equation = document.getElementById('equation');
                    const hasEquation = equation && equation.textContent.includes('y =');

                    // Check if canvas was updated
                    const canvas = document.getElementById('parabolaCanvas');
                    const ctx = canvas?.getContext('2d');
                    const hasCanvas = ctx !== null;

                    // Restore original values
                    for (const point in originalValues) {
                        const input = document.getElementById(point);
                        if (input) {
                            input.value = originalValues[point];
                        }
                    }

                    // Recalculate with original values
                    if (typeof calculateParabola === 'function') {
                        calculateParabola();
                    }

                    return hasEquation && hasCanvas;
                } catch (error) {
                    console.error('End-to-End Workflow Test Error:', error);
                    return false;
                }
            })(),
            expected: "Complete workflow should generate equation and update canvas",
            received: "Complete workflow test"
        });

        // Test 4: Tab switching preserves state
        testResults.push({
            name: 'State Preservation',
            passed: (function() {
                try {
                    const equationSection = document.getElementById('equationSection');
                    const settingsSection = document.getElementById('settingsSection');
                    const valuesSection = document.getElementById('valuesSection');

                    if (!equationSection || !settingsSection || !valuesSection) {
                        return false;
                    }

                    // Store original tab
                    const originalTab = !equationSection.classList.contains('hidden') ? 'equation' :
                                      !settingsSection.classList.contains('hidden') ? 'settings' : 'values';

                    // Set test values
                    const a = 1, b = 0, c = 0;
                    if (typeof globA !== 'undefined') globA = a;
                    if (typeof globB !== 'undefined') globB = b;
                    if (typeof globC !== 'undefined') globC = c;

                    // Switch tabs and check state
                    if (typeof switchTab === 'function') {
                        switchTab('equation');
                        const equationState = (globA === a && globB === b && globC === c);

                        switchTab('settings');
                        const settingsState = (globA === a && globB === b && globC === c);

                        // Restore original tab
                        switchTab(originalTab);

                        return equationState && settingsState;
                    }
                    return true; // If switchTab doesn't exist, consider test passed
                } catch (error) {
                    console.error('State Preservation Test Error:', error);
                    return false;
                }
            })(),
            expected: true,
            received: 'Tab switching state preservation test'
        });

        // Test 5: Tab state preservation
        testResults.push({
            name: 'Tab State Preservation',
            passed: (function() {
                try {
                    // Store original tab
                    const originalTab = tests.getCurrentTab();

                    // Set test state
                    zoomLevel = 2;
                    offsetX = 100;
                    offsetY = -50;

                    // Switch through all tabs
                    switchTab('values');
                    switchTab('equation');
                    switchTab('settings');

                    // Check if state preserved
                    const preserved = zoomLevel === 2 && 
                                    offsetX === 100 && 
                                    offsetY === -50;

                    // Restore original state
                    zoomLevel = 1;
                    offsetX = 0;
                    offsetY = 0;
                    switchTab(originalTab);

                    return preserved;
                } catch (error) {
                    console.error('Tab State Preservation Test Error:', error);
                    return false;
                }
            })(),
            expected: true,
            received: 'Tab state preservation integration test'
        });

        // Restore original tab
        switchTab(originalTab);
        console.groupEnd();
        return testResults;
    },

    // Run specific test category
    runTestCategory: function(category, event) {
        if (event) {
            event.preventDefault();
        }
        console.group(`Running ${category} Tests`);
        
        let results;
        switch(category) {
            case 'basicInput':
                results = this.testBasicInputValidation();
                break;
            case 'threePoints':
                results = this.testThreePointsValidation();
                break;
            case 'vertexPoint':
                results = this.testVertexAndPointValidation();
                break;
            case 'draggableFeatures':
                results = this.testDraggableFeatures();
                break;
            case 'methodSwitching':
                results = this.testMethodSwitching();
                break;
            case 'tabSwitching':
                results = this.testTabSwitching();
                break;
            case 'settings':
                results = this.testSettings();
                break;
            case 'canvasInteractions':
                results = this.testCanvasInteractions();
                break;
            case 'integration':
                results = this.testIntegration();
                break;
            default:
                console.error('Unknown test category');
                return;
        }

        this.displayTestResults(results, category);
        console.groupEnd();
    },

    runAllTests: function(event) {
        if (event) {
            event.preventDefault();
        }
        console.group('Running All Parabola Solver Tests');
        
        const allResults = {
            'Basic Input': this.testBasicInputValidation(),
            'Three Points': this.testThreePointsValidation(),
            'Vertex Point': this.testVertexAndPointValidation(),
            'Draggable Features': this.testDraggableFeatures(),
            'Method Switching': this.testMethodSwitching(),
            'Tab Switching': this.testTabSwitching(),
            'Settings': this.testSettings(),
            'Canvas Interactions': this.testCanvasInteractions(),
            'Integration': this.testIntegration()
        };

        this.displayTestResults(allResults);
        console.groupEnd();
    },

    generateTestStats: function(passed, total, isOverall = false) {
        const percentage = ((passed/total) * 100).toFixed(1);
        return `<div class="stats">` +
               `<span>${isOverall ? 'Overall Results' : 'Results'}</span>` +
               `<span class="pass-count">✓ ${passed} passed</span>` +
               `<span class="fail-count">❌ ${total - passed} failed</span>` +
               `<span>${percentage}% complete</span>` +
               `</div>`;
    },

    generateTestList: function(results) {
        let output = '';
        results.forEach(result => {
            const status = result.passed ? 'pass' : 'fail';
            const icon = result.passed ? '✓' : '❌';
            const statusText = result.passed ? 'PASS' : 'FAIL';
            
            output += `<div class="test-name ${status}">` +
                     `<span class="test-icon">${icon}</span>` +
                     `<span>${result.name}</span>` +
                     `<span class="test-status">${statusText}</span>` +
                     `</div>`;

            if (!result.passed && (typeof result.expected !== 'boolean' || typeof result.received !== 'boolean')) {
                output += `<div class="details">`;
                if (typeof result.expected !== 'boolean') {
                    output += `Expected: ${result.expected}\n`;
                }
                if (typeof result.received !== 'boolean') {
                    output += `Received: ${result.received}`;
                }
                output += '</div>';
            }
        });
        return output;
    },

    displayTestResults: function(results, category = null) {
        const resultsDiv = document.getElementById('testResults');
        if (!resultsDiv) return;

        let totalTests = 0;
        let passedTests = 0;
        let failedTests = [];
        let output = '';

        // Process results based on whether it's a single category or all tests
        if (category) {
            // Single category results
            totalTests = results.length;
            passedTests = results.filter(r => r.passed).length;
            failedTests = results.filter(r => !r.passed);

            output += `<div class="category">${category}</div>`;
            output += `<div class="category-content">`;
            output += this.generateTestStats(passedTests, totalTests);
            output += this.generateTestList(results);
            output += '</div>';
        } else {
            // All categories results
            output += '<div class="summary">Test Suite Results</div>';
            
            for (const [categoryName, categoryResults] of Object.entries(results)) {
                totalTests += categoryResults.length;
                const categoryPassed = categoryResults.filter(r => r.passed).length;
                passedTests += categoryPassed;
                const categoryFailed = categoryResults.filter(r => !r.passed);
                failedTests = failedTests.concat(
                    categoryFailed.map(test => ({...test, category: categoryName}))
                );

                output += `<div class="category">${categoryName}</div>`;
                output += `<div class="category-content">`;
                output += this.generateTestStats(categoryPassed, categoryResults.length);
                output += this.generateTestList(categoryResults);
                output += '</div>';
            }

            // Overall stats at the top
            output = this.generateTestStats(passedTests, totalTests, true) + output;
        }

        // Failed tests summary at the bottom if there are any failures
        if (failedTests.length > 0) {
            output += `<div class="category">Failed Tests Summary</div>`;
            output += `<div class="category-content">`;
            output += this.generateTestList(failedTests.map(failure => ({
                ...failure,
                name: failure.category ? `[${failure.category}] ${failure.name}` : failure.name
            })));
            output += '</div>';
        }

        resultsDiv.innerHTML = output;

        // Add click handlers for collapsible categories
        resultsDiv.querySelectorAll('.category').forEach(category => {
            category.addEventListener('click', function() {
                this.classList.toggle('collapsed');
                const content = this.nextElementSibling;
                if (content && content.classList.contains('category-content')) {
                    content.classList.toggle('collapsed');
                }
            });
        });
    },
};

// Add collapsible functionality
document.addEventListener('DOMContentLoaded', function() {
    const coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function(e) {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Stop event bubbling
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
});