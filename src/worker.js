export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Handle different file types
    if (pathname === '/' || pathname === '/index.html') {
      return new Response(indexHTML, {
        headers: { 'Content-Type': 'text/html' },
      });
    }
    
    if (pathname === '/css/styles.css') {
      return new Response(stylesCSS, {
        headers: { 'Content-Type': 'text/css' },
      });
    }
    
    if (pathname === '/js/physics.js') {
      return new Response(physicsJS, {
        headers: { 'Content-Type': 'application/javascript' },
      });
    }
    
    if (pathname === '/js/renderer.js') {
      return new Response(rendererJS, {
        headers: { 'Content-Type': 'application/javascript' },
      });
    }
    
    if (pathname === '/js/ui.js') {
      return new Response(uiJS, {
        headers: { 'Content-Type': 'application/javascript' },
      });
    }
    
    // 404 for other paths
    return new Response('Not Found', { status: 404 });
  },
};

// Embedded static files
const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>N-Body Gravity Simulator</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>N-Body Gravity Simulator</h1>
            <p>Interactive physics simulation with real-time particle dynamics</p>
        </header>
        
        <div class="main-content">
            <div class="canvas-container">
                <canvas id="simulationCanvas"></canvas>
            </div>
            
            <div class="controls">
                <div class="control-group">
                    <h3>Simulation Controls</h3>
                    <button id="playPauseBtn">Pause</button>
                    <button id="resetBtn">Reset</button>
                    <button id="clearBtn">Clear</button>
                </div>
                
                <div class="control-group">
                    <h3>Physics Parameters</h3>
                    <label>
                        Time Step
                        <div class="slider-container">
                            <input type="range" id="timeStepSlider" min="0.001" max="0.1" step="0.001" value="0.01">
                            <span class="slider-value" id="timeStepValue">0.01</span>
                        </div>
                    </label>
                    <label>
                        Softening
                        <div class="slider-container">
                            <input type="range" id="softeningSlider" min="0.1" max="5.0" step="0.1" value="1.0">
                            <span class="slider-value" id="softeningValue">1.0</span>
                        </div>
                    </label>
                </div>
                
                <div class="control-group">
                    <h3>Presets</h3>
                    <button id="solarSystemBtn">Solar System</button>
                    <button id="binaryStarsBtn">Binary Stars</button>
                    <button id="threeBodyBtn">Three Body</button>
                    <button id="randomBtn">Random</button>
                </div>
                
                <div class="control-group">
                    <h3>Diagnostics</h3>
                    <div id="energyDisplay">
                        <div><span class="energy-label">Kinetic Energy</span><span id="kineticEnergy">0.00</span></div>
                        <div><span class="energy-label">Potential Energy</span><span id="potentialEnergy">0.00</span></div>
                        <div><span class="energy-label">Total Energy</span><span id="totalEnergy">0.00</span></div>
                        <div><span class="energy-label">Linear Momentum</span><span id="linearMomentum">0.00</span></div>
                    </div>
                </div>
                
                <div class="control-group">
                    <h3>View Controls</h3>
                    <label>
                        Zoom
                        <div class="slider-container">
                            <input type="range" id="zoomSlider" min="0.1" max="5.0" step="0.1" value="1.0">
                            <span class="slider-value" id="zoomValue">1.0</span>
                        </div>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="showTrailsCheckbox" checked> Show Trails
                    </label>
                </div>
            </div>
        </div>
        
        <footer>
            <p class="instruction">Click on canvas to add particles • Hold Shift for larger masses • Drag to pan • Scroll to zoom</p>
        </footer>
    </div>
    
    <script src="/js/physics.js"></script>
    <script src="/js/renderer.js"></script>
    <script src="/js/ui.js"></script>
</body>
</html>`;

const stylesCSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
    font-feature-settings: 'cv01', 'cv02', 'cv03', 'cv04';
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 24px;
    min-height: 100vh;
}

header {
    text-align: center;
    margin-bottom: 40px;
}

header h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    color: #ffffff;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-bottom: 8px;
}

header p {
    color: #888888;
    font-size: 1rem;
    font-weight: 400;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 32px;
    align-items: start;
    min-height: calc(100vh - 200px);
}

.canvas-container {
    background: #111111;
    border: 1px solid #222222;
    border-radius: 12px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

#simulationCanvas {
    width: 100%;
    height: 600px;
    background: transparent;
    cursor: crosshair;
    border-radius: 8px;
    transition: opacity 0.2s ease;
}

#simulationCanvas:hover {
    opacity: 0.95;
}

.controls {
    background: #111111;
    border: 1px solid #222222;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    height: fit-content;
    position: sticky;
    top: 24px;
}

.control-group {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.control-group:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.control-group h3 {
    color: #ffffff;
    margin-bottom: 16px;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.9;
}

button {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    color: #ffffff;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    margin: 4px 4px 4px 0;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.01em;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

button:hover {
    background: #2a2a2a;
    border-color: #3a3a3a;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

button:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

label {
    display: block;
    margin-bottom: 16px;
    font-size: 0.85rem;
    color: #cccccc;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease;
}

label:hover {
    color: #ffffff;
}

.slider-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
}

.slider-value {
    min-width: 48px;
    text-align: right;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.8rem;
    color: #888888;
    background: #1a1a1a;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #2a2a2a;
}

input[type="range"] {
    flex: 1;
    margin: 0;
    -webkit-appearance: none;
    height: 4px;
    border-radius: 2px;
    background: #2a2a2a;
    outline: none;
    cursor: pointer;
    transition: background 0.15s ease;
}

input[type="range"]:hover {
    background: #333333;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid #1a1a1a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
}

input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid #1a1a1a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

input[type="checkbox"] {
    margin-right: 12px;
    width: 16px;
    height: 16px;
    accent-color: #ffffff;
    cursor: pointer;
}

.checkbox-label {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
}

#energyDisplay {
    background: #0a0a0a;
    border: 1px solid #2a2a2a;
    padding: 16px;
    border-radius: 8px;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.8rem;
    line-height: 1.7;
    font-feature-settings: 'tnum';
}

#energyDisplay div {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#energyDisplay div:last-child {
    margin-bottom: 0;
}

.energy-label {
    color: #888888;
    font-weight: 500;
}

#energyDisplay span {
    color: #ffffff;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

footer {
    text-align: center;
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    color: #666666;
    font-size: 0.85rem;
    font-weight: 400;
}

.instruction {
    opacity: 0.8;
    transition: opacity 0.2s ease;
}

.instruction:hover {
    opacity: 1;
}

@media (max-width: 1024px) {
    .main-content {
        grid-template-columns: 1fr;
        gap: 24px;
    }
    
    .controls {
        position: static;
        order: -1;
    }
    
    #simulationCanvas {
        height: 400px;
    }
    
    .control-group {
        margin-bottom: 24px;
        padding-bottom: 20px;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 16px;
    }
    
    header {
        margin-bottom: 32px;
    }
    
    header h1 {
        font-size: 2rem;
    }
    
    header p {
        font-size: 0.9rem;
    }
    
    .controls {
        padding: 20px;
    }
    
    .control-group {
        margin-bottom: 20px;
        padding-bottom: 16px;
    }
    
    button {
        padding: 12px 16px;
        font-size: 0.9rem;
    }
    
    #simulationCanvas {
        height: 300px;
    }
    
    .canvas-container {
        padding: 12px;
    }
}

/* Smooth transitions for interactive elements */
* {
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
}

/* Focus styles for accessibility */
*:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
}

/* Subtle animation on load */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.container > * {
    animation: fadeInUp 0.6s ease-out;
}

header {
    animation-delay: 0.1s;
}

.main-content {
    animation-delay: 0.2s;
}

footer {
    animation-delay: 0.3s;
}

/* Button group styling */
.control-group button:first-of-type {
    margin-left: 0;
}

/* Improved button states */
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #1a1a1a;
    border-color: #2a2a2a;
}

button:disabled:hover {
    background: #1a1a1a;
    border-color: #2a2a2a;
    transform: none;
    box-shadow: none;
}`;

const physicsJS = `class NBodyPhysics {
    constructor() {
        this.particles = [];
        this.timeStep = 0.01;
        this.softening = 1.0;
        this.G = 100.0; // Gravitational constant (scaled for simulation)
    }
    
    createParticle(x, y, vx = 0, vy = 0, mass = 1.0, color = null) {
        return {
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            ax: 0,
            ay: 0,
            mass: mass,
            color: color || this.generateRandomColor(),
            trail: []
        };
    }
    
    generateRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
            '#dda0dd', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3',
            '#ff9f43', '#ee5a52', '#0abde3', '#10ac84', '#f368e0',
            '#3742fa', '#2f3542', '#ff3838', '#2ed573', '#ffa502'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    addParticle(particle) {
        this.particles.push(particle);
    }
    
    removeAllParticles() {
        this.particles = [];
    }
    
    // Velocity-Verlet integration (symplectic)
    integrate() {
        // Update positions using current velocities and half-step acceleration
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.vx * this.timeStep + 0.5 * p.ax * this.timeStep * this.timeStep;
            p.y += p.vy * this.timeStep + 0.5 * p.ay * this.timeStep * this.timeStep;
            
            // Store trail points
            if (p.trail.length > 100) {
                p.trail.shift();
            }
            p.trail.push({ x: p.x, y: p.y });
        }
        
        // Calculate new accelerations
        this.calculateForces();
        
        // Update velocities using average of old and new accelerations
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.vx += p.ax * this.timeStep;
            p.vy += p.ay * this.timeStep;
        }
    }
    
    calculateForces() {
        // Reset accelerations
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].ax = 0;
            this.particles[i].ay = 0;
        }
        
        // Calculate pairwise forces
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const r2 = dx * dx + dy * dy + this.softening * this.softening;
                const r = Math.sqrt(r2);
                const r3 = r2 * r;
                
                const force = this.G * p1.mass * p2.mass / r3;
                const fx = force * dx;
                const fy = force * dy;
                
                p1.ax += fx / p1.mass;
                p1.ay += fy / p1.mass;
                p2.ax -= fx / p2.mass;
                p2.ay -= fy / p2.mass;
            }
        }
    }
    
    calculateKineticEnergy() {
        let ke = 0;
        for (const p of this.particles) {
            ke += 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy);
        }
        return ke;
    }
    
    calculatePotentialEnergy() {
        let pe = 0;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const r = Math.sqrt(dx * dx + dy * dy + this.softening * this.softening);
                pe -= this.G * p1.mass * p2.mass / r;
            }
        }
        return pe;
    }
    
    calculateTotalEnergy() {
        return this.calculateKineticEnergy() + this.calculatePotentialEnergy();
    }
    
    calculateLinearMomentum() {
        let px = 0, py = 0;
        for (const p of this.particles) {
            px += p.mass * p.vx;
            py += p.mass * p.vy;
        }
        return Math.sqrt(px * px + py * py);
    }
    
    // Preset configurations
    setupSolarSystem(centerX, centerY) {
        this.removeAllParticles();
        
        // Sun
        this.addParticle(this.createParticle(centerX, centerY, 0, 0, 50));
        
        // Planets with orbital velocities
        const planets = [
            { distance: 80, mass: 2, name: 'Mercury' },
            { distance: 120, mass: 3, name: 'Venus' },
            { distance: 160, mass: 3, name: 'Earth' },
            { distance: 200, mass: 2, name: 'Mars' },
            { distance: 280, mass: 15, name: 'Jupiter' },
            { distance: 360, mass: 12, name: 'Saturn' }
        ];
        
        for (const planet of planets) {
            const angle = Math.random() * 2 * Math.PI;
            const x = centerX + planet.distance * Math.cos(angle);
            const y = centerY + planet.distance * Math.sin(angle);
            
            // Circular orbit velocity
            const v = Math.sqrt(this.G * 50 / planet.distance);
            const vx = -v * Math.sin(angle);
            const vy = v * Math.cos(angle);
            
            this.addParticle(this.createParticle(x, y, vx, vy, planet.mass));
        }
    }
    
    setupBinaryStars(centerX, centerY) {
        this.removeAllParticles();
        
        const separation = 200;
        const mass = 25;
        const v = Math.sqrt(this.G * mass / separation) * 0.5;
        
        this.addParticle(this.createParticle(centerX - separation/2, centerY, 0, v, mass));
        this.addParticle(this.createParticle(centerX + separation/2, centerY, 0, -v, mass));
    }
    
    setupThreeBody(centerX, centerY) {
        this.removeAllParticles();
        
        const radius = 100;
        const mass = 20;
        
        for (let i = 0; i < 3; i++) {
            const angle = (i * 2 * Math.PI) / 3;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            const v = Math.sqrt(this.G * mass / (radius * Math.sqrt(3))) * 0.5;
            const vx = -v * Math.sin(angle + Math.PI/6);
            const vy = v * Math.cos(angle + Math.PI/6);
            
            this.addParticle(this.createParticle(x, y, vx, vy, mass));
        }
    }
    
    setupRandom(centerX, centerY, count = 10) {
        this.removeAllParticles();
        
        for (let i = 0; i < count; i++) {
            const x = centerX + (Math.random() - 0.5) * 400;
            const y = centerY + (Math.random() - 0.5) * 400;
            const vx = (Math.random() - 0.5) * 20;
            const vy = (Math.random() - 0.5) * 20;
            const mass = Math.random() * 10 + 1;
            
            this.addParticle(this.createParticle(x, y, vx, vy, mass));
        }
    }
}`;

const rendererJS = `class SimulationRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.zoom = 1.0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.showTrails = true;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Mouse interaction
        this.setupMouseEvents();
    }
    
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    setupMouseEvents() {
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            if (e.button === 0) { // Left click
                isDragging = true;
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const rect = this.canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                this.offsetX += (mouseX - lastMouseX) / this.zoom;
                this.offsetY += (mouseY - lastMouseY) / this.zoom;
                
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        });
        
        this.canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom *= zoomFactor;
            this.zoom = Math.max(0.1, Math.min(5.0, this.zoom));
        });
    }
    
    worldToScreen(worldX, worldY) {
        const screenX = (worldX + this.offsetX) * this.zoom + this.canvas.width / 2;
        const screenY = (worldY + this.offsetY) * this.zoom + this.canvas.height / 2;
        return { x: screenX, y: screenY };
    }
    
    screenToWorld(screenX, screenY) {
        const worldX = (screenX - this.canvas.width / 2) / this.zoom - this.offsetX;
        const worldY = (screenY - this.canvas.height / 2) / this.zoom - this.offsetY;
        return { x: worldX, y: worldY };
    }
    
    clear() {
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    render(particles) {
        this.clear();
        
        // Draw trails
        if (this.showTrails) {
            this.ctx.lineWidth = 1;
            
            for (const particle of particles) {
                if (particle.trail.length > 1) {
                    // Use particle's color for trail with transparency
                    const rgb = this.hexToRgb(particle.color);
                    this.ctx.strokeStyle = \`rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, 0.4)\`;
                    
                    this.ctx.beginPath();
                    for (let i = 0; i < particle.trail.length; i++) {
                        const point = this.worldToScreen(particle.trail[i].x, particle.trail[i].y);
                        if (i === 0) {
                            this.ctx.moveTo(point.x, point.y);
                        } else {
                            this.ctx.lineTo(point.x, point.y);
                        }
                    }
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        for (const particle of particles) {
            const pos = this.worldToScreen(particle.x, particle.y);
            const radius = Math.max(2, Math.sqrt(particle.mass) * this.zoom * 1.5);
            
            // Core particle with random color
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Subtle outline for larger bodies
            if (particle.mass > 10) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        }
        
        // Draw center crosshair
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 10, centerY);
        this.ctx.lineTo(centerX + 10, centerY);
        this.ctx.moveTo(centerX, centerY - 10);
        this.ctx.lineTo(centerX, centerY + 10);
        this.ctx.stroke();
    }
    
    setZoom(zoom) {
        this.zoom = zoom;
    }
    
    setShowTrails(show) {
        this.showTrails = show;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }
}`;

const uiJS = `// Global simulation objects
let physics;
let renderer;
let isRunning = true;
let animationId;

// Initialize the simulation
function initSimulation() {
    physics = new NBodyPhysics();
    renderer = new SimulationRenderer('simulationCanvas');
    
    // Setup initial solar system
    const canvas = document.getElementById('simulationCanvas');
    physics.setupSolarSystem(0, 0);
    
    setupEventListeners();
    animate();
}

function setupEventListeners() {
    const canvas = document.getElementById('simulationCanvas');
    
    // Simulation controls
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('resetBtn').addEventListener('click', resetSimulation);
    document.getElementById('clearBtn').addEventListener('click', clearSimulation);
    
    // Physics parameters
    const timeStepSlider = document.getElementById('timeStepSlider');
    const timeStepValue = document.getElementById('timeStepValue');
    timeStepSlider.addEventListener('input', (e) => {
        physics.timeStep = parseFloat(e.target.value);
        timeStepValue.textContent = e.target.value;
    });
    
    const softeningSlider = document.getElementById('softeningSlider');
    const softeningValue = document.getElementById('softeningValue');
    softeningSlider.addEventListener('input', (e) => {
        physics.softening = parseFloat(e.target.value);
        softeningValue.textContent = e.target.value;
    });
    
    // Presets
    document.getElementById('solarSystemBtn').addEventListener('click', () => {
        physics.setupSolarSystem(0, 0);
    });
    
    document.getElementById('binaryStarsBtn').addEventListener('click', () => {
        physics.setupBinaryStars(0, 0);
    });
    
    document.getElementById('threeBodyBtn').addEventListener('click', () => {
        physics.setupThreeBody(0, 0);
    });
    
    document.getElementById('randomBtn').addEventListener('click', () => {
        physics.setupRandom(0, 0, 8);
    });
    
    // View controls
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomValue = document.getElementById('zoomValue');
    zoomSlider.addEventListener('input', (e) => {
        const zoom = parseFloat(e.target.value);
        renderer.setZoom(zoom);
        zoomValue.textContent = e.target.value;
    });
    
    const showTrailsCheckbox = document.getElementById('showTrailsCheckbox');
    showTrailsCheckbox.addEventListener('change', (e) => {
        renderer.setShowTrails(e.target.checked);
    });
    
    // Mouse interactions for adding particles
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const worldPos = renderer.screenToWorld(mouseX, mouseY);
        
        const mass = e.shiftKey ? 20 : 5; // Larger mass with shift
        const particle = physics.createParticle(worldPos.x, worldPos.y, 0, 0, mass);
        physics.addParticle(particle);
    });
}

function togglePlayPause() {
    isRunning = !isRunning;
    const btn = document.getElementById('playPauseBtn');
    btn.textContent = isRunning ? 'Pause' : 'Play';
    
    if (isRunning) {
        animate();
    } else if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function resetSimulation() {
    physics.setupSolarSystem(0, 0);
    renderer.offsetX = 0;
    renderer.offsetY = 0;
    renderer.setZoom(1.0);
    document.getElementById('zoomSlider').value = 1.0;
    document.getElementById('zoomValue').textContent = '1.0';
}

function clearSimulation() {
    physics.removeAllParticles();
}

function animate() {
    if (isRunning) {
        // Physics simulation
        physics.integrate();
        
        // Rendering
        renderer.render(physics.particles);
        
        // Update diagnostics
        updateDiagnostics();
        
        animationId = requestAnimationFrame(animate);
    }
}

function updateDiagnostics() {
    const ke = physics.calculateKineticEnergy();
    const pe = physics.calculatePotentialEnergy();
    const te = physics.calculateTotalEnergy();
    const lm = physics.calculateLinearMomentum();
    
    document.getElementById('kineticEnergy').textContent = ke.toFixed(2);
    document.getElementById('potentialEnergy').textContent = pe.toFixed(2);
    document.getElementById('totalEnergy').textContent = te.toFixed(2);
    document.getElementById('linearMomentum').textContent = lm.toFixed(2);
}

// Start the simulation when the page loads
window.addEventListener('load', initSimulation)`;