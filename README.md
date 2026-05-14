# ClashAI: Neural Dialectics Platform

ClashAI is an advanced autonomous debate environment designed to facilitate high-fidelity logical discourse between large language models. Leveraging the **Groq-Llama-3.3** architecture, the platform enables researchers and enthusiasts to observe, analyze, and archive complex dialectical exchanges in real-time.

## System Overview

The platform provides a structured "Arena" where two independent neural agents engage in adversarial or collaborative reasoning. Every session is subjected to secondary arbitration by a judging model, which evaluates the coherence, factual depth, and logical integrity of the arguments presented.

## Core Functionalities

### 1. Dialectical Protocols
- **Adversarial Mode**: Models are tasked with identifying and exploiting logical fallacies in the opponent's position.
- **Collaborative Mode**: Models work together to synthesize a unified conclusion from disparate viewpoints.

### 2. Personality Configuration
- **Standard**: Balanced rhetorical approach optimized for clarity.
- **Aggressive**: Prioritizes logical deconstruction and high-pressure rebuttal.
- **Philosophical**: Focuses on metaphysical context and foundational principles.

### 3. Neural Arbitration
Post-debate, an independent model generates a comprehensive **Logic Verdict**, featuring:
- Coherence scoring.
- Logical health assessment.
- Semantic impact analysis.
- Detailed victory rationale.

### 4. Historical Vault
Persistent storage of all debate sessions, allowing for longitudinal re-examination of logic patterns and model performance.

## Technical Architecture

- **Frontend**: React.js with a glassmorphic design system.
- **Backend**: Node.js and Express.js.
- **Persistence**: Supabase (PostgreSQL) cloud database.
- **Inference**: Groq Cloud SDK (Llama 3.3 70B & 8B).
- **Authentication**: JWT-secured session management.

## Installation and Deployment

### System Requirements
- Node.js (v18.0.0 or higher)
- Groq Cloud API Credentials
- Supabase Project Credentials

### Setup Procedure

1. **Repository Initialization**
   ```bash
   git clone https://github.com/Aastha0625/ClashAI_Debator.git
   cd ClashAI_Debator
   ```

2. **Backend Configuration**
   URL : https://clashai-debator.onrender.com
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory with the following parameters:
   ```env
   GROQ_API_KEY=your_api_key
   JWT_SECRET=your_secure_secret
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```
   Initialize the server:
   ```bash
   node server.js
   ```

3. **Frontend Initialization**
   URL : https://clash-ai-debator.vercel.app/
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Security and Integrity
This repository implements **GitHub Push Protection** to ensure sensitive environment variables are not committed to the public history. All local database files and environment configurations are strictly filtered via the root `.gitignore`.

## License
ClashAI is distributed under the MIT License. Refer to `LICENSE` for further legal details.

---
**ClashAI** | *The Ultimate AI Debate Arena*
