# Parabola Solver

An intuitive web-based tool for working with quadratic equations and parabolas. This interactive application allows users to visualize, analyze, and solve quadratic equations using multiple methods.

## Features

- **Multiple Input Methods:**
  - Three Points Method: Enter any three points that lie on your parabola
  - Vertex Form: Input using vertex and additional point
  - Focus-Directrix Method: Define parabola using focus point and directrix

- **Interactive Interface:**
  - Real-time visualization of parabolas
  - Dynamic equation updates
  - Intuitive slider-based navigation between methods

- **Comprehensive Analysis:**
  - Automatically calculates and displays the quadratic equation
  - Visual representation of the parabola
  - Interactive plotting system

## Recent Updates

### Feature: Enhanced Graph Export, Testing, and UI Improvements

#### Graph Export and Visualization
- **Enhanced PNG Export**
  - Added timestamp-based naming for exported files
  - Included equation display at the top of exported images
  - Added point coordinates with descriptive labels
  - Implemented custom canvas creation for exports
  - Added decimal place precision based on settings

- **Point Visualization**
  - Added dynamic point labels (P1, P2, P3, Focus, Vertex)
  - Implemented method-specific point labeling
  - Enhanced coordinate display formatting
  - Added proper spacing in exported images

#### Testing Suite Enhancements
- **Draggable Features Tests**
  - Added comprehensive unit tests for interactive features
  - Implemented point detection tests
  - Added zoom level interaction tests
  - Created grid snap behavior tests
  - Added canvas edge detection tests

- **Method Switching Tests**
  - Added tests for method visibility
  - Implemented input field state preservation tests
  - Added error message display tests
  - Created canvas state preservation tests

#### UI Improvements
- **Visual Elements**
  - Added zoom level display in top-right corner
  - Enhanced equation display formatting
  - Improved point coordinate presentation
  - Added semi-transparent background for better readability

- **Cross-browser Compatibility**
  - Added standard CSS properties
  - Implemented vendor prefixes for better browser support
  - Enhanced input range styling

#### Technical Improvements
- **Code Organization**
  - Separated point drawing logic
  - Enhanced state management
  - Improved method detection
  - Implemented consistent decimal handling

- **Error Handling**
  - Added comprehensive error checks
  - Improved error message display
  - Enhanced state validation

## Interactive Features

### Draggable Points
- Enable/disable point dragging directly on the graph
- Points remain draggable even in invalid configurations
- Real-time visual feedback and error messages
- Smooth point movement with validation checks

### Grid Snap
- Optional grid snapping for precise point placement
- Adjustable snap size
- Makes it easier to place points at exact coordinates
- Toggle on/off in settings

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional installations required - runs entirely in the browser

### Usage
1. Open `index.html` in your web browser
2. Choose your preferred input method:
   - Three Points
   - Vertex Form
   - Focus-Directrix
3. Enter the required values
4. View the resulting equation and visual representation

## Features by Component

- **Plotter (`plotter.js`)**: Handles the visual representation of parabolas
- **Settings (`settings.js`)**: Manages user preferences and display options
- **Night Owl Mode (`nightowl.js`)**: Provides dark mode functionality
- **Tab System (`tabSwitcher.js`)**: Manages the navigation between different input methods
- **Slider System (`slider.js`)**: Controls the smooth transition between input methods

## Customization

The application includes various customization options:
- Dark/Light mode toggle
- Adjustable display settings
- Customizable visualization preferences

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under Creative Commons - see the footer of the application for more details.

## Version

Current Version: v0.21
