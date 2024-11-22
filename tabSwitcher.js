function switchTab(tab) {
  const valuesTab = document.getElementById("enterValuesTab");
  const equationTab = document.getElementById("enterEquationTab");
  const settingsTab = document.getElementById("settingsTab");
  const valuesSection = document.getElementById("valuesSection");
  const resultsSection = document.getElementById("results");
  const equationSection = document.getElementById("equationSection");
  const equResultsSection = document.getElementById("equResults");
  const settingsSection = document.getElementById("settingsSection");

  valuesTab.classList.remove("active");
  equationTab.classList.remove("active");
  settingsTab.classList.remove("active");

  valuesSection.classList.add("hidden");
  equationSection.classList.add("hidden");
  settingsSection.classList.add("hidden");
  resultsSection.classList.add("hidden");
  equResultsSection.classList.add("hidden");
  
  
  if (tab === 'values') {
    valuesTab.classList.add("active");
    document.documentElement.style.setProperty('--active-tab-color', 'var(--method1-color)');
    valuesSection.classList.remove("hidden");
    resultsSection.classList.remove("hidden");
  } else if (tab === 'equation') {
    equationTab.classList.add("active");
    document.documentElement.style.setProperty('--active-tab-color', 'var(--equation-color)');
    equationSection.classList.remove("hidden");
    equResultsSection.classList.remove("hidden");
  } else if (tab === 'settings') {
    settingsTab.classList.add("active");
    document.documentElement.style.setProperty('--active-tab-color', 'var(--settings-color)')
    settingsSection.classList.remove("hidden");
  }
}