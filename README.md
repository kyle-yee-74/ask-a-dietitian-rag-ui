# Ask‑a‑Dietitian RAG UI

An **edge‑friendly, full‑stack web app** that pairs a React‑Router/Remix front‑end with a FastAPI micro‑service for vector search and embeddings.  This repository is the **UI & BFF layer**—it handles routing, server‑side rendering, auth, and proxies all `/api/*` traffic to the private FastAPI backend.

---

## 🚀 Tech Stack

| Layer       | Tech                                          | Notes                                                                  |
| ----------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| Runtime     | **Node 22.15.0**                              | Target LTS for 2025; includes built‑in Web Crypto & stable fetch.      |
| Package Mgr | **Yarn 4.9.1 (Berry)**                        | Plug’n’Play enabled; `node_modules` linker retained for compatibility. |
| Framework   | **React Router 7 – framework mode**           | Formerly Remix v2; file‑based routes, loaders/actions, streaming SSR.  |
| Server      | **Express 5** (`node-custom-server` template) | Compression, Helmet, Morgan, and a built‑in proxy stub to FastAPI.     |
| Bundler     | **Vite 6**                                    | Instant HMR, first‑class ESM, Tailwind plugin.                         |
| Styling     | **Tailwind CSS 4**                            | JIT + Oxide engine.                                                    |

---

## 📂 Project Structure

```
.
├── public/                # Static assets served as-is
├── app/                   # React components & route modules
│   └── routes/*           # File‑based routing
├── server/                # Express router & middleware
│   └── app.ts             # createRequestHandler bridge to RR
├── server.ts              # Boots Express, handles Vite & static files
├── vite.config.ts         # Vite + Tailwind plugin
├── tailwind.config.ts     # Tailwind config
└── Dockerfile             # Multi‑stage prod image
```

---

## 🛠️ Prerequisites

* **Node ≥ 22.15.0**   `nvm install 22 && nvm use 22`
* **Yarn 4.9.1**         `corepack prepare yarn@4.9.1 --activate`
* (Optional) **Docker 24+** for container builds.

---

## ⚡ Quick Start

```bash
# 1. Install deps (PnP with node_modules linker)
yarn install --inline-builds

# 2. Start dev server (Express + Vite HMR on port 5173)
yarn dev

# 3. Open http://localhost:5173
```

### Environment Variables

Create a `.env` file (or set in your orchestrator):

```ini
FASTAPI_URL=http://localhost:8000        # Internal FastAPI service
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=yyy
SESSION_SECRET=change-me
```

---

## 📜 Package Scripts

| Script           | What it does                                                    |
| ---------------- | --------------------------------------------------------------- |
| `yarn dev`       | Runs Express in dev mode + Vite middleware (HMR).               |
| `yarn build`     | Compiles server & client bundles into `build/`.                 |
| `yarn start`     | Runs the **production** Express server (`NODE_ENV=production`). |
| `yarn typecheck` | Generates route types then runs `tsc -b`.                       |

---

## 🧩 VS Code setup

VS Code needs to know where Yarn Berry stores its type definitions when Plug’n’Play (PnP) is enabled.

| Scenario | One-time setup |
|----------|----------------|
| **Keep PnP (recommended)** | ```bash\nyarn dlx @yarnpkg/sdks vscode   # generates .vscode/pnpify* helpers\n```<br>Then reload the TypeScript server (<kbd>⇧⌘P</kbd> → **TypeScript: Restart TS Server**). |
| **Switch to classic `node_modules`** | 1 Add to **`.yarnrc.yml`**:<br>```yaml\nnodeLinker: node-modules\n```<br>2 Re-install:<br>```bash\nyarn install --inline-builds\n``` |

---

## 🐳 Docker (Prod)

```bash
docker build -t ask-a-dietitian-ui:latest .
docker run -p 3000:3000 --env-file .env ask-a-dietitian-ui:latest
```

The multi‑stage Dockerfile uses `node:22-alpine` for runtime and captures the PnP zipfs cache for quick start‑up.

---

## ☸️ Kubernetes / EKS Deployment

1. Push image to ECR: `docker push <account>.dkr.ecr.<region>.amazonaws.com/ask-ui:tag`
2. Apply `k8s/deployment.yaml` (sample provided).  It sets `FASTAPI_URL=http://fastapi:8000` so UI traffic stays inside the cluster.
3. Add Istio sidecar or AWS App Mesh for observability—no code changes needed.

---

## 🔐 Authentication

This template is ready for **remix-auth**.  Check `app/routes/auth.google.tsx` for a working Google OAuth flow.  Future providers (GitHub, Email‑OTP, etc.) are one‑liner strategy additions.

---

## 📝 License

MIT © 2025 Kyle Yee (kyle-yee-74) & Filbert Shi (Sporego)
