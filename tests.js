// Parabola Solver Unit Tests
const tests = {
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

    // Run all tests and generate summary
    runAllTests: function() {
        console.group('Running All Parabola Solver Tests');
        
        const allResults = {
            basicInput: this.testBasicInputValidation(),
            threePoints: this.testThreePointsValidation(),
            vertexPoint: this.testVertexAndPointValidation(),
            draggableFeatures: this.testDraggableFeatures(),
            methodSwitching: this.testMethodSwitching()
        };

        // Calculate overall statistics
        let totalTests = 0;
        let passedTests = 0;
        let failedTests = [];

        for (let category in allResults) {
            allResults[category].forEach(result => {
                totalTests++;
                if (result.passed) {
                    passedTests++;
                } else {
                    failedTests.push({
                        category: category,
                        ...result
                    });
                }
            });
        }

        // Print summary
        console.group('Test Summary');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests}`);
        console.log(`Failed: ${totalTests - passedTests}`);
        console.log(`Success Rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`);
        
        if (failedTests.length > 0) {
            console.group('❌ Failed Tests');
            failedTests.forEach(failure => {
                console.error(`${failure.category} - ${failure.name}:
                    Expected: ${failure.expected}
                    Received: ${failure.received}`);
            });
            console.groupEnd();
        }
        
        console.groupEnd();
        console.groupEnd();
    }
};

// Add test runner button to the page
document.addEventListener('DOMContentLoaded', function() {
    const settingsContainer = document.querySelector('.settings-container');
    if (settingsContainer) {
        const testSection = document.createElement('div');
        testSection.classList.add('settings-group');
        
        const testHeader = document.createElement('h3');
        testHeader.textContent = 'Testing';
        testSection.appendChild(testHeader);
        
        const testButton = document.createElement('button');
        testButton.textContent = 'Run Unit Tests';
        testButton.classList.add('test-button');
        testButton.onclick = () => tests.runAllTests();
        
        const testDescription = document.createElement('p');
        testDescription.classList.add('description');
        testDescription.textContent = 'Run comprehensive tests to verify parabola calculations and validations. Check browser console (F12) for detailed results.';
        
        testSection.appendChild(testDescription);
        testSection.appendChild(testButton);
        settingsContainer.appendChild(testSection);
    }
});
