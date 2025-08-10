# N-Body Gravity Simulator — Minimal Code Instructions

Purpose
- Interactive N-body gravity simulator with a web UI; deploy the static app as a Cloudflare Worker.

Language
- JavaScript (ES2020+) or TypeScript.

Deployment
- Deploy as a Cloudflare Worker. Include wrangler.toml (workers_dev = true) to get a workers.dev domain.

Project layout (minimal)
- wrangler.toml
- package.json (optional)
- src/
  - worker.js (or worker.ts)
  - index.html
  - css/styles.css
  - js/physics.js (or physics.ts)
  - js/renderer.js
  - js/ui.js
- README.md

Recommended minimal wrangler.toml
- name = "nbody-sim"
- compatibility_date = "2025-01-01"
- type = "javascript"
- workers_dev = true

Physics & numerics (concise)
- Use leap‑frog / velocity‑Verlet integrator (symplectic).
- Use softening (eps) in denominators: r^2 + eps^2.
- Diagnostics: kinetic energy, pairwise potential energy, total energy, linear momentum.

Rendering
- Canvas-based renderer; decouple physics stepping from rendering.

Notes
- workers_dev = true provides a workers.dev domain for development/testing.
