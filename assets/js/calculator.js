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

  const costs = MODELS.map(model => ({
    model,
    cost:       (scaledInput  / 1e6) * model.inputPer1M + (scaledOutput / 1e6) * model.outputPer1M,
    inputCost:  (scaledInput  / 1e6) * model.inputPer1M,
    outputCost: (scaledOutput / 1e6) * model.outputPer1M,
  })).sort((a, b) => a.cost - b.cost);

  return { totalInput, totalOutput, scaledInput, scaledOutput, toolCalls, toolTokens,
    costs, minCost: costs[costs.length-1].cost === costs[0].cost ? costs[0].cost : costs[0].cost,
    maxCost: costs[costs.length-1].cost };
}

function getRecommendation(taskId, totalTokens, lang) {
  const r = I18N[lang].rec;
  if (taskId === 'heartbeat')                         return r.heartbeat;
  if (taskId === 'ops_scrape' && totalTokens > 20000) return r.opsScrapeLong;
  if (taskId === 'ops_scrape')                        return r.opsScrape;
  if (taskId === 'agent' || taskId === 'migrate')     return r.agent;
  if (taskId === 'search'    && totalTokens > 20000)  return r.searchLong;
  if (taskId === 'explain'   || taskId === 'docs')    return r.docs;
  if (taskId === 'codewrite' || taskId === 'refactor')return r.coding;
  if (totalTokens > 30000)                            return r.longContext;
  return r.default;
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
