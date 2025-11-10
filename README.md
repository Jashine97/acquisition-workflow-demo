# 🏗 Acquisition Workflow Demo

A lightweight **property acquisition workflow dashboard** built with **JavaScript**, **BPMN**, and **SDLC principles**.  
This demo showcases how a Business Analyst can model acquisition pipelines, calculate SDLT/CIL, and visualize metrics in a browser-based environment.

---

## 🧩 Overview

This interactive app demonstrates:
- A **Business Process Management (BPMN)** flow for property acquisition stages.
- A **configurable SDLT and CIL calculator** (residential vs. non-residential logic).
- **Agile metrics** — average cycle time, throughput, and workflow health.
- A responsive dashboard inspired by real-world acquisition analysis tools used in UK development workflows.


---

## 📂 Project Structure
assets/
├── bpmn/ # BPMN workflow definitions
│ └── acquisition.bpmn
├── css/ # Stylesheets
│ └── styles.css
├── img/ # Icons and UI visuals
│ ├── favicon.svg
│ └── mark.svg
└── js/ # Application logic
├── router.js # Navigation controller
├── store.js # Local data handling
└── views/ # Main UI modules
├── agile.js
├── bpmn.js
├── docs.js
├── home.js
├── metrics.js
└── sdlt.js
index.html # App entry point
package.json # Dependencies and scripts




⚙️ Installation

```bash
git clone https://github.com/Jashine97/acquisition-workflow-demo.git
cd acquisition-workflow-demo
npm install
npm start
Then open your browser at:
👉 http://localhost:8080

