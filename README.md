# 🦞 OpenClaw · Token Cost Estimator

> Estimate AI token costs across multiple providers — in plain language, no technical knowledge required.
> 用普通人能看懂的方式，估算不同 AI 模型的 Token 费用。

**[🚀 Try it out!](https://clawcount.top)** 

---

## What is this?

OpenClaw helps developers and operators answer one simple question:

> **"How much will this AI task actually cost me?"**

Instead of asking you to input raw token counts, OpenClaw translates real-world task descriptions into token estimates and calculates costs across 7 models from 5 providers — side by side.

---

## Features

- 🗂 **12 preset task types** — from writing code to ops data scraping to heartbeat/cron jobs
- 🌍 **Bilingual UI** — switch between Chinese (中文) and English instantly
- 🧠 **Human-friendly parameters** — no token knowledge needed ("one file" → auto-converts to tokens)
- 💰 **9 models, 6 providers** — Anthropic, OpenAI, Google, Moonshot AI, MiniMax, Zhipu AI
- 📊 **Real-time cost comparison** with visual bar charts
- ⚡ **Smart recommendations** based on task type and scale
- 📈 **Scale calculator** — from single call to 100K/month

---

## Supported Models (2026.Q1)

| Provider | Model | Input $/1M | Output $/1M | Best For |
|---|---|---|---|---|
| Anthropic | Claude Opus 4.6 | $5.00 | $25.00 | Complex reasoning |
| Anthropic | Claude 3.5 Sonnet | $3.00 | $15.00 | Coding & agents |
| Anthropic | Claude Haiku 4.5 | $1.00 | $5.00 | High throughput |
| OpenAI | GPT-5.2 Preview | $1.75 | $14.00 | General intelligence |
| Google | Gemini 2.5 Flash | $0.30 | $2.50 | Scraping & cron jobs |
| Moonshot AI | Kimi 2.5 | $1.40 | $4.00 | Long-context (2M tokens) |
| MiniMax | MiniMax M2.5 | $0.15 | $0.90 | Budget routine tasks |
| Zhipu AI | GLM-4.7 | $0.60 | $2.20 | Open-source coding #1 (SWE-bench 73.8%) |
| Zhipu AI | GLM-4.5 | $0.60 | $2.20 | Balanced, strong Chinese reasoning |

---

## Task Types

### 🛠 Development
`Write Code` · `Debug` · `Refactor` · `Code Review` · `Explain Code` · `Write Tests` · `Write Docs` · `Multi-step Agent` · `Code Migration` · `Code Search`

### 📊 Operations
`Ops Data Scraping` — scrape daily reports, dashboards, KPI summaries  
`Heartbeat / Cron Job` — scheduled polling, service monitoring, auto-alerts

---

## Roadmap

- [ ] Prompt Caching discount toggle (up to 90% savings)
- [ ] Batch API mode (50% discount)
- [ ] Export cost report as CSV / PDF
- [ ] Custom model entry (add your own pricing)
- [ ] Monthly budget alert threshold
- [ ] Dark/light theme toggle

---

## Pricing Disclaimer

Prices sourced from official provider documentation as of 2026 Q1. Actual billing may differ — always verify with your provider's console. Estimates assume standard (non-cached, non-batch) API usage.

---

## License

MIT

---