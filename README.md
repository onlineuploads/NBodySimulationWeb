# N-Body Gravity Simulator

An interactive N-body gravity simulator deployed as a Cloudflare Worker, featuring real-time physics simulation with a web-based interface.

## Features

- **Real-time N-body simulation** using velocity-Verlet integration
- **Interactive canvas** with zoom, pan, and particle placement
- **Multiple presets** including Solar System, Binary Stars, and Three-Body systems
- **Energy diagnostics** tracking kinetic, potential, and total energy
- **Responsive design** optimized for desktop and mobile devices
- **Cloudflare Worker deployment** for global edge distribution

## Physics Implementation

- **Velocity-Verlet integrator**: Symplectic integration for stable orbital mechanics
- **Gravitational softening**: Prevents numerical singularities in close encounters
- **Energy conservation**: Real-time monitoring of system energy and momentum
- **Trail rendering**: Visual representation of orbital paths

## Controls

- **Click** to add small particles
- **Shift+Click** to add larger masses
- **Mouse wheel** to zoom in/out
- **Drag** to pan the view
- **Presets** for common scenarios
- **Physics parameters** adjustable in real-time

## Deployment

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run deploy
```

The application will be available at your assigned `*.workers.dev` domain.

## Technical Details

- **Language**: Pure JavaScript (ES2020+)
- **Deployment**: Cloudflare Workers
- **Rendering**: HTML5 Canvas with requestAnimationFrame
- **Physics**: Custom N-body gravitational simulation
- **UI**: Vanilla JavaScript with CSS3 styling

## Configuration

Physics parameters can be adjusted through the web interface:
- Time step (integration accuracy vs. speed)
- Gravitational softening (numerical stability)
- Zoom and view controls
- Trail visibility

## Browser Compatibility

Compatible with all modern browsers supporting ES2020+ and HTML5 Canvas.