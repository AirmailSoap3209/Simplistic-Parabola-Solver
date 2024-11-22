// Interactive mode functionality
function toggleInteractiveMode(enabled) {
    if (enabled) {
        enableInteractiveMode();
    } else {
        disableInteractiveMode();
    }
}

// Update the canvas cursor when hovering over points
document.getElementById('parabolaCanvas').addEventListener('mousemove', function(e) {
    if (!isInteractiveMode) return;
    
    const rect = this.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Only change cursor if we're not already dragging a point
    if (!selectedPoint) {
        const activeMethod = document.querySelector('.method:not([style*="display: none"])');
        const methodId = activeMethod.id;
        let points = [];
        
        switch (methodId) {
            case 'method1':
                points = [
                    { x: parseFloat(document.getElementById('x1').value), y: parseFloat(document.getElementById('y1').value) },
                    { x: parseFloat(document.getElementById('x2').value), y: parseFloat(document.getElementById('y2').value) },
                    { x: parseFloat(document.getElementById('x3').value), y: parseFloat(document.getElementById('y3').value) }
                ];
                break;
            case 'method2':
                points = [
                    { x: parseFloat(document.getElementById('vertX').value), y: parseFloat(document.getElementById('vertY').value) },
                    { x: parseFloat(document.getElementById('vertX1').value), y: parseFloat(document.getElementById('vertY1').value) }
                ];
                break;
        }
        
        let isOverPoint = points.some(point => isPointNearMouse(point, mouseX, mouseY, 'parabolaCanvas'));
        this.style.cursor = isOverPoint ? 'grab' : 'pointer';
    }
});
