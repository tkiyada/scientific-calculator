# Scientific Calculator

A modern, responsive scientific calculator built with React and Tailwind CSS.

## Features

### Basic Operations
- Addition, subtraction, multiplication, division
- Decimal point support
- Clear (C) and Clear Entry (CE) functions
- Plus/minus toggle for negative numbers
- Percentage calculations

### Scientific Functions
- Trigonometric functions (sin, cos, tan) and their inverses
- Logarithmic functions (log, ln)
- Exponential functions (exp, x^y)
- Root functions (√x, ∛x)
- Power functions (x², x³)
- Factorial (x!)
- Constants (π, e)
- Reciprocal (1/x)

### Memory Functions
- MC (Memory Clear)
- MR (Memory Recall)
- M+ (Memory Add)
- M- (Memory Subtract)
- MS (Memory Store)

### User Experience
- **Responsive Design**: 
  - Mobile: Vertical layout with toggleable scientific panel
  - Desktop: Horizontal layout with both panels visible
- **Angle Modes**: Switch between degrees and radians
- **Keyboard Support**: Full keyboard input support
- **Visual Feedback**: Button animations and hover effects
- **Modern UI**: Dark theme with gradient backgrounds

## Technology Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Build tool and development server
- **GitHub Pages** - Deployment platform

## Live Demo

[View Live Calculator](https://yourusername.github.io/scientific-calculator/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scientific-calculator.git
cd scientific-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Usage

### Desktop
- Both basic and scientific panels are visible side by side
- Use mouse clicks or keyboard input
- All functions are easily accessible

### Mobile
- Vertical layout optimized for mobile screens
- Toggle between basic and scientific modes using the button in the header
- Touch-friendly button sizes
- Responsive design adapts to different screen sizes

### Keyboard Shortcuts
- **Numbers 0-9**: Input numbers
- **+, -, *, /**: Basic operations
- **Enter or =**: Calculate result
- **Escape**: Clear all
- **Backspace**: Delete last digit
- **.**: Decimal point

## Responsive Behavior

The calculator automatically adapts to different screen sizes:

- **Mobile (< 768px)**: 
  - Single column layout
  - Scientific panel toggleable
  - Optimized button spacing
  
- **Desktop (≥ 768px)**:
  - Two-panel layout
  - Scientific functions always visible
  - Larger buttons and text

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.