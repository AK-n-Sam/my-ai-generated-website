/* ==========================================================================
   Aura Engine — Interactive Engine & UI Scripts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Navbar Scroll Background Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.style.padding = "0.7rem 0";
      navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
    } else {
      navbar.style.padding = "1rem 0";
      navbar.style.boxShadow = "none";
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // Dark / Light Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  let currentTheme = localStorage.getItem("aura_theme") || "dark";

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.setAttribute("data-lucide", "sun");
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.setAttribute("data-lucide", "moon");
    }
    localStorage.setItem("aura_theme", theme);
    if (window.lucide) window.lucide.createIcons();
  }

  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
    });
  }

  // Hero Live Progress Animation
  const heroProgressBar = document.getElementById("heroProgressBar");
  let progressWidth = 40;
  if (heroProgressBar) {
    setInterval(() => {
      progressWidth = (progressWidth + 15) % 100;
      if (progressWidth < 20) progressWidth = 25;
      heroProgressBar.style.width = `${progressWidth}%`;
    }, 1500);
  }

  // Interactive Playground Scenarios
  const scenarios = {
    analytics: {
      status: "Active & Running",
      events: "1,248,900",
      efficiency: "99.4%",
      consoleLog: `[SYSTEM] Pipeline scenario 'Analytics Pipeline' active.<br>[DATA] Ingesting stream from 12 cluster nodes...<br>[SUCCESS] Latency reduced by 42ms. Zero dropped packets.`
    },
    security: {
      status: "Shield Guarded",
      events: "4,592,100",
      efficiency: "100.0%",
      consoleLog: `[SECURITY] Performing real-time token validation & audit check.<br>[AUTH] All 12 enterprise connectors encrypted.<br>[STATUS] Zero vulnerabilities detected.`
    },
    automation: {
      status: "Autopilot Executing",
      events: "892,450",
      efficiency: "98.9%",
      consoleLog: `[WORKFLOW] Trigger condition satisfied: High Volume Event.<br>[ACTION] Dispatched 14 background subagents.<br>[DONE] Workflow completed in 18ms.`
    }
  };

  const demoTabs = document.querySelectorAll(".demo-tab");
  const simEventsCount = document.getElementById("simEventsCount");
  const simEfficiency = document.getElementById("simEfficiency");
  const demoConsole = document.getElementById("demoConsole");
  const runSimBtn = document.getElementById("runSimBtn");
  const resetSimBtn = document.getElementById("resetSimBtn");

  let activeScenarioKey = "analytics";

  function updateScenarioUI(key) {
    const sc = scenarios[key];
    if (!sc) return;

    activeScenarioKey = key;
    if (simEventsCount) simEventsCount.textContent = sc.events;
    if (simEfficiency) simEfficiency.textContent = sc.efficiency;
    if (demoConsole) demoConsole.innerHTML = sc.consoleLog;

    demoTabs.forEach((tab) => {
      if (tab.getAttribute("data-scenario") === key) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  demoTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-scenario");
      updateScenarioUI(key);
    });
  });

  if (runSimBtn) {
    runSimBtn.addEventListener("click", () => {
      if (demoConsole) {
        demoConsole.innerHTML += `<br>[BENCHMARK] Executing workload spike test...<br>[SUCCESS] Benchmark score: 9,980 ops/sec.`;
      }
    });
  }

  if (resetSimBtn) {
    resetSimBtn.addEventListener("click", () => {
      updateScenarioUI(activeScenarioKey);
    });
  }

  // Animated Counter for Metrics Section
  const metricNumbers = document.querySelectorAll(".metric-number");
  let animated = false;

  function animateCounters() {
    const metricsSection = document.getElementById("metrics");
    if (!metricsSection || animated) return;

    const sectionPos = metricsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos) {
      animated = true;
      metricNumbers.forEach((num) => {
        const target = parseFloat(num.getAttribute("data-target"));
        const isFloat = target % 1 !== 0;
        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            num.textContent = isFloat ? target.toFixed(2) : Math.floor(target);
            clearInterval(timer);
          } else {
            num.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
          }
        }, 30);
      });
    }
  }

  window.addEventListener("scroll", animateCounters);
  animateCounters();
});
