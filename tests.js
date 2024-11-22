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
        
        // Test collinear points
        const x1 = 0, y1 = 0, x2 = 1, y2 = 1, x3 = 2, y3 = 2;
        testResults.push({
            name: 'Collinear points rejection',
            passed: validateThreePoints(x1, y1, x2, y2, x3, y3).valid === false,
            expected: false,
            received: validateThreePoints(x1, y1, x2, y2, x3, y3).valid
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

    // Run all tests and generate summary
    runAllTests: function() {
        console.group('🧪 Running All Parabola Solver Tests');
        
        const allResults = {
            basicInput: this.testBasicInputValidation(),
            threePoints: this.testThreePointsValidation(),
            vertexPoint: this.testVertexAndPointValidation()
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
        console.group('📊 Test Summary');
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
