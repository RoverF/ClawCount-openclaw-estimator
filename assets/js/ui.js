// ─── ClawCount · ui.js ─────────────────────────────────────────────────────
// All DOM rendering. Reads from global `state` and `lang`.

function applyI18n() {
  const s = I18N[lang];
  document.title = s.pageTitle;
  document.documentElement.lang = lang;
  document.getElementById('tagline').textContent       = s.tagline;
  document.getElementById('headerTag').textContent     = s.headerTag;
  document.getElementById('sectionTask').textContent   = s.sectionTask;
  document.getElementById('sectionParams').textContent = s.sectionParams;
  document.getElementById('sectionModels').textContent = s.sectionModels;
  document.getElementById('panelTitle').textContent    = s.panelTitle;
  document.getElementById('inputQ').textContent        = s.inputQ;
  document.getElementById('outputQ').textContent       = s.outputQ;
  document.getElementById('toolQ').textContent         = s.toolQ;
  document.getElementById('scaleQ').textContent        = s.scaleQ;
  document.getElementById('summaryTitle').textContent  = s.summaryTitle;
  document.getElementById('statInput').textContent     = s.statInput;
  document.getElementById('statOutput').textContent    = s.statOutput;
  document.getElementById('statMin').textContent       = s.statMin;
  document.getElementById('statMax').textContent       = s.statMax;
  document.getElementById('footnote').innerHTML        = s.footnote.replace(/\n/g, '<br>');
}

function renderHints() {
  const s = I18N[lang];
  const set = (id, arr, indices) => {
    document.getElementById(id).innerHTML = indices.map(i => `<span>${arr[i]}</span>`).join('');
  };
  set('inputHints',  s.inputHints,  [0, 2, 4, 7]);
  set('outputHints', s.outputHints, [0, 2, 4]);
  set('toolHints',   s.toolHints,   [0, 2, 4]);
}

function renderScaleTabs() {
  const labels = I18N[lang].scaleTabs;
  const container = document.getElementById('scaleTabs');
  container.innerHTML = '';
  SCALE_VALUES.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.className = 'scale-tab' + (v === state.scale ? ' active' : '');
    btn.textContent = labels[i];
    btn.addEventListener('click', () => { state.scale = v; refresh(); });
    container.appendChild(btn);
  });
  const activeIdx = SCALE_VALUES.indexOf(state.scale);
  document.getElementById('scaleDisplay').textContent = labels[activeIdx >= 0 ? activeIdx : 0];
}

function renderTasks() {
  const grid = document.getElementById('taskGrid');
  grid.innerHTML = '';
  TASKS.forEach(task => {
    const cat = CATEGORY_COLORS[task.category];
    const catLabel = task.category === 'dev' ? I18N[lang].catDev : I18N[lang].catOps;
    const card = document.createElement('div');
    card.className = 'task-card no-select' + (task.id === state.task.id ? ' selected' : '');
    card.innerHTML = `
      <div class="task-category" style="background:${cat.bg};border:1px solid ${cat.border};color:${cat.text}">${catLabel}</div>
      <div class="task-icon">${task.icon}</div>
      <div class="task-name">${task[lang].name}</div>
      <div class="task-desc">${task[lang].desc}</div>
      <div class="task-meta"><span>sys ~${task.sysTokens}</span><span>tools ×${task.toolCalls}</span></div>
    `;
    card.addEventListener('click', () => {
      state.task = task;
      state.toolLevel = task.toolCalls <= 0 ? 0 : task.toolCalls <= 3 ? 1 : task.toolCalls <= 10 ? 2 : task.toolCalls <= 20 ? 3 : 4;
      document.getElementById('toolHumanSlider').value = state.toolLevel;
      refresh();
    });
    grid.appendChild(card);
  });
}

function renderSliderValues(result) {
  const s = I18N[lang];
  document.getElementById('inputHumanVal').textContent  = s.inputHints[state.inputLevel];
  document.getElementById('outputHumanVal').textContent = s.outputHints[state.outputLevel];
  document.getElementById('toolHumanVal').textContent   = s.toolHints[state.toolLevel];
  document.getElementById('totalTokensDisplay').textContent = fmtTok(result.totalInput + result.totalOutput) + ' tokens';

  const il = INPUT_LEVELS[state.inputLevel];
  const ol = OUTPUT_LEVELS[state.outputLevel];
  const tl = TOOL_LEVELS[state.toolLevel];
  document.getElementById('tokenTranslation').innerHTML =
    `<span style="color:var(--accent)">${s.transTitle}</span><br>` +
    `📄 ${s.transInput}: <span style="color:var(--text2)">${il.hint[lang]}</span> → <span style="color:var(--accent)">${fmtTok(il.tokens)} tokens</span>${lang==='zh' ? ' (≈ '+il.words+')' : ''}<br>` +
    `💬 ${s.transOutput}: <span style="color:var(--text2)">${ol.hint[lang]}</span> → <span style="color:var(--accent)">${fmtTok(ol.tokens)} tokens</span><br>` +
    `🤖 ${s.transTool}: <span style="color:var(--text2)">${tl.hint[lang]}</span> → <span style="color:var(--accent)">${tl.calls}${s.transCalls} (${fmtTok(result.toolTokens)} tokens)</span><br>` +
    `<span style="color:var(--border2)">──────────────────────────</span><br>` +
    `${s.transTotal}: <span style="color:var(--text)">${fmtTok(result.scaledInput)} ${s.transInput}</span> + <span style="color:var(--text)">${fmtTok(result.scaledOutput)} ${s.transOutput}</span>`;
}

function renderSummary(result) {
  const s = I18N[lang];
  document.getElementById('sumInput').textContent  = fmtTok(result.scaledInput);
  document.getElementById('sumOutput').textContent = fmtTok(result.scaledOutput);
  document.getElementById('sumMin').textContent    = fmt(result.costs[0].cost);
  document.getElementById('sumMax').textContent    = fmt(result.costs[result.costs.length - 1].cost);
  const rec = getRecommendation(state.task.id, result.totalInput + result.totalOutput, lang);
  document.getElementById('recBadge').textContent = s.recPrefix + rec;
}

function renderModels(result) {
  const s = I18N[lang];
  const list = document.getElementById('modelList');
  list.innerHTML = '';

  result.costs.forEach(({ model, cost, inputCost, outputCost }, i) => {
    const pct         = result.maxCost > 0 ? (cost / result.maxCost) * 100 : 0;
    const scaleLabel  = state.scale > 1 ? `×${state.scale.toLocaleString()}${s.times}` : s.perReq;
    const cheapBadge  = i === 0 ? `<span class="cheap-badge">${s.cheapest}</span>` : '';
    const kimiTip     = model.id === 'kimi25'
      ? `<div class="kimi-tip">${s.kimiTip}</div>` : '';
    const glmTip      = model.id === 'glm47'
      ? `<div class="kimi-tip" style="color:#7dd3fc;background:rgba(56,189,248,0.06);border-color:rgba(56,189,248,0.2)">⚡ SWE-bench 73.8% — 超越 Claude Sonnet 4.5，开源编程排行第一</div>` : '';

    const row = document.createElement('div');
    row.className = 'model-row';
    row.style.animationDelay = (i * 0.05) + 's';
    row.innerHTML = `
      <div class="model-header">
        <div class="model-info">
          <div class="model-dot" style="background:${model.color}"></div>
          <div>
            <div class="model-name-row">
              <span class="model-name" style="color:${model.color}">${model.name}</span>
              <span class="model-tier">${model.tier}</span>
              ${cheapBadge}
            </div>
            <div class="model-provider">
              <span style="color:${model.providerColor}">${model.provider}</span>&nbsp;·&nbsp;${model.desc[lang]}
            </div>
          </div>
        </div>
        <div class="model-cost-block">
          <div class="model-cost" style="color:${model.color}">${fmt(cost)}</div>
          <div class="model-cost-label">${scaleLabel}</div>
        </div>
      </div>
      <div class="token-breakdown">
        <div class="token-chip">In <span>$${model.inputPer1M}/1M</span></div>
        <div class="token-chip">Out <span>$${model.outputPer1M}/1M</span></div>
        <div class="token-chip">In cost <span>${fmt(inputCost)}</span></div>
        <div class="token-chip">Out cost <span>${fmt(outputCost)}</span></div>
      </div>
      <div class="cost-bar-wrap"><div class="cost-bar" style="width:${pct}%;background:${model.color}"></div></div>
      ${kimiTip}${glmTip}
    `;
    list.appendChild(row);
  });
}