# Changelog

All notable changes to OpenClaw are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [v2026.Q1.2] — 2026-03

### Added
- 🌍 **Bilingual UI** — full Chinese / English toggle, zero page reload
- 📊 **Ops Data Scraping** task — daily reports, dashboards, KPI summaries
- 💓 **Heartbeat / Cron Job** task — scheduled polling, monitoring, auto-alerts
- 🏷 Task category badges (Dev / Ops) with distinct color coding
- Smart recommendation logic extended for new ops task types
- Kimi 2.5 context tip now bilingual

### Changed
- Section labels and all UI strings now driven by i18n system
- Scale tab labels localized per language
- Model descriptions localized per language
- Slider hint labels localized per language

---

## [v2026.Q1.1] — 2026-03

### Added
- 7 cross-provider models: Claude Opus 4.6, Claude 3.5 Sonnet, Claude Haiku 4.5, GPT-5.2 Preview, Gemini 2.5 Flash, Kimi 2.5, MiniMax M2.5
- Provider color coding and badges per model row
- Kimi 2.5 special callout for 2M token long-context tasks
- Human-friendly parameter sliders (no token knowledge required)
  - "How much content?" → auto-converts to tokens
  - "How detailed?" → auto-converts to output tokens
  - "How much does AI look up?" → tool call estimation
- Token breakdown translation box (shows exact token math)
- Scale calculator: single call → 100K/month

### Changed
- Replaced raw token number inputs with plain-language sliders
- Summary card now shows min/max cost across all providers

---

## [v2026.Q1.0] — 2026-03

### Added
- Initial release
- 10 preset development task types
- 4 Claude models (Opus 4.6, Sonnet 4.6, Haiku 4.5, Opus 4.5)
- Real-time cost comparison with bar chart visualization
- Scale multiplier tabs
- Smart model recommendation engine
- IBM Plex Mono / Sans design system
- Dark industrial UI with grid texture
