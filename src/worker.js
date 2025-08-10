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
                        Time Step: <input type="range" id="timeStepSlider" min="0.001" max="0.1" step="0.001" value="0.01">
                        <span id="timeStepValue">0.01</span>
                    </label>
                    <label>
                        Softening: <input type="range" id="softeningSlider" min="0.1" max="5.0" step="0.1" value="1.0">
                        <span id="softeningValue">1.0</span>
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
                        <div>Kinetic Energy: <span id="kineticEnergy">0</span></div>
                        <div>Potential Energy: <span id="potentialEnergy">0</span></div>
                        <div>Total Energy: <span id="totalEnergy">0</span></div>
                        <div>Linear Momentum: <span id="linearMomentum">0</span></div>
                    </div>
                </div>
                
                <div class="control-group">
                    <h3>View Controls</h3>
                    <label>
                        Zoom: <input type="range" id="zoomSlider" min="0.1" max="5.0" step="0.1" value="1.0">
                        <span id="zoomValue">1.0</span>
                    </label>
                    <label>
                        <input type="checkbox" id="showTrailsCheckbox" checked> Show Trails
                    </label>
                </div>
            </div>
        </div>
        
        <footer>
            <p>Click on canvas to add particles. Hold Shift and click to add larger masses.</p>
        </footer>
    </div>
    
    <script src="/js/physics.js"></script>
    <script src="/js/renderer.js"></script>
    <script src="/js/ui.js"></script>
</body>
</html>`;

const stylesCSS = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
}

.main-content {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}

.canvas-container {
    flex: 1;
    background: radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%);
    border: 2px solid #333;
    border-radius: 10px;
    padding: 10px;
    position: relative;
}

#simulationCanvas {
    width: 100%;
    height: 600px;
    background: transparent;
    cursor: crosshair;
    border-radius: 8px;
}

.controls {
    width: 300px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
}

.control-group {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.control-group:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.control-group h3 {
    color: #4f46e5;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

button {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 4px;
    transition: all 0.3s ease;
}

button:hover {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

button:active {
    transform: translateY(0);
}

label {
    display: block;
    margin-bottom: 12px;
    font-size: 0.9rem;
    color: #e5e7eb;
}

input[type="range"] {
    width: 100%;
    margin: 8px 0;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 3px;
    background: #333;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
}

input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
}

input[type="checkbox"] {
    margin-right: 8px;
    transform: scale(1.2);
}

#energyDisplay {
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    line-height: 1.6;
}

#energyDisplay div {
    margin-bottom: 6px;
}

#energyDisplay span {
    color: #06b6d4;
    font-weight: bold;
}

footer {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #9ca3af;
    font-size: 0.9rem;
}

@media (max-width: 1024px) {
    .main-content {
        flex-direction: column;
    }
    
    .controls {
        width: 100%;
    }
    
    #simulationCanvas {
        height: 400px;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    header h1 {
        font-size: 2rem;
    }
    
    .controls {
        padding: 15px;
    }
    
    #simulationCanvas {
        height: 300px;
    }
}`;

const physicsJS = `class NBodyPhysics {
    constructor() {
        this.particles = [];
        this.timeStep = 0.01;
        this.softening = 1.0;
        this.G = 100.0; // Gravitational constant (scaled for simulation)
    }
    
    createParticle(x, y, vx = 0, vy = 0, mass = 1.0) {
        return {
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            ax: 0,
            ay: 0,
            mass: mass,
            trail: []
        };
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
        
        // Draw stars background
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 1.5;
            
            this.ctx.globalAlpha = Math.random() * 0.8 + 0.2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1.0;
    }
    
    render(particles) {
        this.clear();
        
        // Draw trails
        if (this.showTrails) {
            this.ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
            this.ctx.lineWidth = 1;
            
            for (const particle of particles) {
                if (particle.trail.length > 1) {
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
            const radius = Math.max(2, Math.sqrt(particle.mass) * this.zoom * 2);
            
            // Glow effect
            const gradient = this.ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius * 2);
            gradient.addColorStop(0, 'rgba(255, 200, 100, 0.8)');
            gradient.addColorStop(0.3, 'rgba(255, 150, 50, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, radius * 2, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Core particle
            this.ctx.fillStyle = particle.mass > 20 ? '#ffff00' : '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Mass indicator for larger bodies
            if (particle.mass > 10) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, radius + 2, 0, 2 * Math.PI);
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