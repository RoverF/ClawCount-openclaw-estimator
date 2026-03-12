// ─── ClawCount · main.js ───────────────────────────────────────────────────
// App bootstrap, state, and event wiring.

let lang = 'zh';

let state = {
  task:        TASKS[0],
  inputLevel:  2,
  outputLevel: 2,
  toolLevel:   1,
  scale:       1,
};

function refresh() {
  const result = calcAllCosts({
    inputLevel:  state.inputLevel,
    outputLevel: state.outputLevel,
    toolLevel:   state.toolLevel,
    sysTokens:   state.task.sysTokens,
    scale:       state.scale,
  });
  renderTasks();
  renderScaleTabs();
  renderSliderValues(result);
  renderSummary(result);
  renderModels(result);
}

function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      applyI18n();
      renderHints();
      refresh();
    });
  });
}

function initSliders() {
  document.getElementById('inputHumanSlider').addEventListener('input', e => {
    state.inputLevel = +e.target.value; refresh();
  });
  document.getElementById('outputHumanSlider').addEventListener('input', e => {
    state.outputLevel = +e.target.value; refresh();
  });
  document.getElementById('toolHumanSlider').addEventListener('input', e => {
    state.toolLevel = +e.target.value; refresh();
  });
}

// Boot
applyI18n();
renderHints();
initLangToggle();
initSliders();
refresh();