// ─── ClawCount · calculator.js ─────────────────────────────────────────────
// Pure functions — no DOM access. Easy to unit-test later.

const TOOL_TOKEN_OVERHEAD = 245; // avg tokens per tool call

function calcAllCosts({ inputLevel, outputLevel, toolLevel, sysTokens, scale }) {
  const toolCalls    = TOOL_LEVELS[toolLevel].calls;
  const toolTokens   = toolCalls * TOOL_TOKEN_OVERHEAD;
  const totalInput   = sysTokens + INPUT_LEVELS[inputLevel].tokens + toolTokens;
  const totalOutput  = OUTPUT_LEVELS[outputLevel].tokens;
  const scaledInput  = totalInput  * scale;
  const scaledOutput = totalOutput * scale;

  const all = MODELS.map(model => ({
    model,
    cost:       (scaledInput  / 1e6) * model.inputPer1M + (scaledOutput / 1e6) * model.outputPer1M,
    inputCost:  (scaledInput  / 1e6) * model.inputPer1M,
    outputCost: (scaledOutput / 1e6) * model.outputPer1M,
  }));

  // Free models pinned at end; paid models sorted cheapest first
  const paid = all.filter(r => !r.model.isFree).sort((a, b) => a.cost - b.cost);
  const free = all.filter(r =>  r.model.isFree);
  const costs = [...paid, ...free];

  return { totalInput, totalOutput, scaledInput, scaledOutput, toolCalls, toolTokens,
    costs,
    minCost: paid.length ? paid[0].cost : 0,
    maxCost: paid.length ? paid[paid.length - 1].cost : 0,
  };
}

function getRecommendation(taskId, totalTokens, lang) {
  const zh = lang === 'zh';
  if (taskId === 'heartbeat')
    return zh ? 'Gemini 2.5 Flash — 定时任务，成本极低'         : 'Gemini 2.5 Flash — Cron jobs, ultra-low cost';
  if (taskId === 'ops_scrape' && totalTokens > 20000)
    return zh ? 'Kimi 2.5 — 超长上下文抓取，2M token 无损'      : 'Kimi 2.5 — Long-context scraping, up to 2M tokens';
  if (taskId === 'ops_scrape')
    return zh ? 'Gemini 2.5 Flash — 轻量抓取，最省成本'          : 'Gemini 2.5 Flash — Light scraping, cheapest';
  if (taskId === 'agent' || taskId === 'migrate')
    return zh ? 'Claude 3.5 Sonnet — Coding Agent 首选'         : 'Claude 3.5 Sonnet — Best for coding agents';
  if (taskId === 'codewrite' || taskId === 'refactor')
    return zh ? 'GLM-4.7 — 开源编程第一，性价比极高'             : 'GLM-4.7 — #1 open-source coding, great value';
  if (taskId === 'search' && totalTokens > 20000)
    return zh ? 'Kimi 2.5 — 超长上下文检索'                     : 'Kimi 2.5 — Long-context code search';
  if (taskId === 'explain' || taskId === 'docs')
    return zh ? 'MiniMax M2.5 — 文档任务最省钱'                  : 'MiniMax M2.5 — Cheapest for doc tasks';
  if (totalTokens > 30000)
    return zh ? 'Kimi 2.5 — 超长上下文首选'                     : 'Kimi 2.5 — Best for long context';
  return zh   ? 'GLM-4.7 — 均衡性价比，推荐首试'                : 'GLM-4.7 — Balanced value, good default choice';
}

function fmt(n) {
  if (n < 0.0001) return '<$0.0001';
  if (n < 0.01)   return '$' + n.toFixed(4);
  if (n < 1)      return '$' + n.toFixed(3);
  if (n < 100)    return '$' + n.toFixed(2);
  return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function fmtTok(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}