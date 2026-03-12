// ─── ClawCount · data.js ───────────────────────────────────────────────────
// Single source of truth for all models, tasks, and level mappings.
// To add a model: append to MODELS. To add a task: append to TASKS.

// ── Models ─────────────────────────────────────────────────────────────────
const MODELS = [
  {
    id: 'opus46',
    name: 'Claude Opus 4.6',
    tier: 'Flagship',
    color: '#c084fc',
    provider: 'Anthropic',
    providerColor: '#c084fc',
    inputPer1M: 5,
    outputPer1M: 25,
    desc: { zh: '最强推理，复杂任务首选', en: 'Top reasoning, complex tasks' },
  },
  {
    id: 'sonnet35',
    name: 'Claude 3.5 Sonnet',
    tier: 'Workhorse',
    color: '#60a5fa',
    provider: 'Anthropic',
    providerColor: '#c084fc',
    inputPer1M: 3,
    outputPer1M: 15,
    desc: { zh: '编程 & 复杂 Agent 首选', en: 'Coding & complex agents' },
  },
  {
    id: 'haiku45',
    name: 'Claude Haiku 4.5',
    tier: 'Fast',
    color: '#34d399',
    provider: 'Anthropic',
    providerColor: '#c084fc',
    inputPer1M: 1,
    outputPer1M: 5,
    desc: { zh: '高吞吐、低延迟', en: 'High throughput, low latency' },
  },
  {
    id: 'gpt52',
    name: 'GPT-5.2 Preview',
    tier: 'Reasoning',
    color: '#f0c040',
    provider: 'OpenAI',
    providerColor: '#10a37f',
    inputPer1M: 1.75,
    outputPer1M: 14,
    desc: { zh: '通用推理，均衡之选', en: 'General intelligence' },
  },
  {
    id: 'gemini25f',
    name: 'Gemini 2.5 Flash',
    tier: 'Fast',
    color: '#4fc3f7',
    provider: 'Google',
    providerColor: '#4285f4',
    inputPer1M: 0.30,
    outputPer1M: 2.50,
    desc: { zh: '快速轻量，爬虫心跳首选', en: 'Fast & cheap, great for scraping/cron' },
  },
  {
    id: 'kimi25',
    name: 'Kimi 2.5',
    tier: 'Context',
    color: '#ff8a65',
    provider: 'Moonshot AI',
    providerColor: '#ff6b6b',
    inputPer1M: 1.40,
    outputPer1M: 4.00,
    desc: { zh: '超长上下文，中文推理 (2M tokens)', en: 'Long-context & Chinese reasoning (2M)' },
  },
  {
    id: 'minimax25',
    name: 'MiniMax M2.5',
    tier: 'Budget',
    color: '#81c784',
    provider: 'MiniMax',
    providerColor: '#ab47bc',
    inputPer1M: 0.15,
    outputPer1M: 0.90,
    desc: { zh: '低复杂度常规任务，最省钱', en: 'Budget pick for routine tasks' },
  },
  // ── Zhipu AI (Z.AI) ──────────────────────────────────────────────────────
  // Pricing via Z.AI platform (docs.z.ai) · Updated 2026.Q1
  {
    id: 'glm47',
    name: 'GLM-4.7',
    tier: 'Flagship',
    color: '#38bdf8',
    provider: 'Zhipu AI',
    providerColor: '#0ea5e9',
    inputPer1M: 0.60,
    outputPer1M: 2.20,
    desc: { zh: '开源旗舰，编程 #1，200K 上下文', en: 'Open-source flagship, #1 Code Arena, 200K ctx' },
  },
  {
    id: 'glm45',
    name: 'GLM-4.5',
    tier: 'Balanced',
    color: '#7dd3fc',
    provider: 'Zhipu AI',
    providerColor: '#0ea5e9',
    inputPer1M: 0.60,
    outputPer1M: 2.20,
    desc: { zh: '均衡性能，中文推理强', en: 'Balanced, strong Chinese reasoning' },
  },
];

// ── Tasks ──────────────────────────────────────────────────────────────────
// category: 'dev' | 'ops'
// sysTokens: baseline system prompt size for this task type
// toolCalls: typical number of tool invocations
const TASKS = [
  {
    id: 'codewrite', icon: '💻', category: 'dev',
    zh: { name: '写代码',          desc: '生成新功能、组件、模块' },
    en: { name: 'Write Code',       desc: 'Generate new features, components, modules' },
    sysTokens: 300, toolCalls: 2,
  },
  {
    id: 'codefix', icon: '🐛', category: 'dev',
    zh: { name: 'Debug / 修 Bug',  desc: '分析错误、定位问题、提出修复' },
    en: { name: 'Debug / Fix Bugs', desc: 'Analyze errors, locate issues, propose fixes' },
    sysTokens: 200, toolCalls: 5,
  },
  {
    id: 'refactor', icon: '♻️', category: 'dev',
    zh: { name: '重构代码',         desc: '改善结构、提升可读性' },
    en: { name: 'Refactor Code',    desc: 'Improve structure and readability' },
    sysTokens: 250, toolCalls: 4,
  },
  {
    id: 'review', icon: '🔍', category: 'dev',
    zh: { name: 'Code Review',      desc: '审查代码质量与安全' },
    en: { name: 'Code Review',      desc: 'Review code quality and security' },
    sysTokens: 200, toolCalls: 1,
  },
  {
    id: 'explain', icon: '📖', category: 'dev',
    zh: { name: '解释代码',         desc: '解读逻辑、生成注释' },
    en: { name: 'Explain Code',     desc: 'Interpret logic, generate comments' },
    sysTokens: 150, toolCalls: 1,
  },
  {
    id: 'test', icon: '🧪', category: 'dev',
    zh: { name: '写测试',           desc: '单元测试、集成测试、E2E' },
    en: { name: 'Write Tests',      desc: 'Unit, integration, and E2E tests' },
    sysTokens: 200, toolCalls: 3,
  },
  {
    id: 'docs', icon: '📝', category: 'dev',
    zh: { name: '写文档',           desc: 'README、API 文档、注释' },
    en: { name: 'Write Docs',       desc: 'README, API docs, inline comments' },
    sysTokens: 150, toolCalls: 1,
  },
  {
    id: 'agent', icon: '🤖', category: 'dev',
    zh: { name: '多步 Agent',       desc: '自主规划、多工具链式调用' },
    en: { name: 'Multi-step Agent', desc: 'Autonomous planning and chained tool calls' },
    sysTokens: 800, toolCalls: 15,
  },
  {
    id: 'migrate', icon: '🚀', category: 'dev',
    zh: { name: '代码迁移',         desc: '框架/语言迁移、升级改造' },
    en: { name: 'Code Migration',   desc: 'Framework or language migration and upgrades' },
    sysTokens: 300, toolCalls: 6,
  },
  {
    id: 'search', icon: '🔎', category: 'dev',
    zh: { name: '代码搜索',         desc: '在仓库中查找相关代码' },
    en: { name: 'Code Search',      desc: 'Find relevant code across the repo' },
    sysTokens: 200, toolCalls: 8,
  },
  {
    id: 'ops_scrape', icon: '📊', category: 'ops',
    zh: { name: '运营数据抓取',      desc: '抓取日报、看板数据、运营指标汇总' },
    en: { name: 'Ops Data Scraping', desc: 'Scrape daily reports, dashboards, KPI summaries' },
    sysTokens: 400, toolCalls: 12,
  },
  {
    id: 'heartbeat', icon: '💓', category: 'ops',
    zh: { name: '心跳 / 定时任务',   desc: '定时轮询、服务监控、自动告警通知' },
    en: { name: 'Heartbeat / Cron',  desc: 'Scheduled polling, service monitoring, auto-alerts' },
    sysTokens: 150, toolCalls: 2,
  },
];

// ── Token Level Mappings ────────────────────────────────────────────────────
const INPUT_LEVELS = [
  { tokens: 50,     words: '~50字',   hint: { zh: '约 20 个字的简单问题',          en: 'A simple one-liner question' } },
  { tokens: 400,    words: '~300字',  hint: { zh: '一个函数，约 50 行',            en: 'One function, ~50 lines' } },
  { tokens: 1500,   words: '~1000字', hint: { zh: '一个完整文件，约 200 行',        en: 'A full file, ~200 lines' } },
  { tokens: 5000,   words: '~3500字', hint: { zh: '3-5 个相关文件',               en: '3–5 related files' } },
  { tokens: 15000,  words: '~1万字',  hint: { zh: '10+ 个文件，一个功能模块',       en: '10+ files, one feature module' } },
  { tokens: 40000,  words: '~3万字',  hint: { zh: '核心代码库，约 500 个文件',      en: 'Core codebase, ~500 files' } },
  { tokens: 100000, words: '~7万字',  hint: { zh: '完整代码库 + 文档',             en: 'Full repo + documentation' } },
  { tokens: 500000, words: '~35万字', hint: { zh: '百万行代码级别（需 Kimi 2.5）',  en: 'Million-line codebase (use Kimi 2.5)' } },
];

const OUTPUT_LEVELS = [
  { tokens: 50,   hint: { zh: '直接回答，不展开',           en: 'Direct answer, no elaboration' } },
  { tokens: 400,  hint: { zh: '解释 + 简单示例',            en: 'Explanation + simple example' } },
  { tokens: 1200, hint: { zh: '可运行的完整实现',            en: 'Runnable complete implementation' } },
  { tokens: 3000, hint: { zh: '代码 + 解释 + 注释',         en: 'Code + explanation + comments' } },
  { tokens: 8000, hint: { zh: '架构 + 代码 + 测试 + 文档',  en: 'Architecture + code + tests + docs' } },
];

const TOOL_LEVELS = [
  { calls: 0,  hint: { zh: '直接回答，不调用工具',        en: 'Direct answer, no tools' } },
  { calls: 3,  hint: { zh: '读取 2-5 个文件',             en: 'Read 2–5 files' } },
  { calls: 10, hint: { zh: '遍历项目结构，读取关键文件',  en: 'Traverse project, read key files' } },
  { calls: 20, hint: { zh: '自主规划、执行、验证',        en: 'Autonomous plan, execute, verify' } },
  { calls: 50, hint: { zh: '多轮迭代，反复调用工具',      en: 'Multi-round iteration, heavy tool use' } },
];

const SCALE_VALUES = [1, 100, 1000, 10000, 100000];

const CATEGORY_COLORS = {
  dev: { bg: 'rgba(0,212,170,0.08)', border: 'rgba(0,212,170,0.2)', text: '#00d4aa' },
  ops: { bg: 'rgba(255,179,71,0.08)', border: 'rgba(255,179,71,0.25)', text: '#ffb347' },
};