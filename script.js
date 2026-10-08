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
  let currentTheme = localStorage.getItem("aura_theme") || "dark";

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    if (themeToggle) {
      themeToggle.innerHTML = `<i data-lucide="${theme === "light" ? "sun" : "moon"}" id="themeIcon"></i>`;
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
        const targetAttr = num.getAttribute("data-target") || "0";
        const decimals = targetAttr.includes(".") ? targetAttr.split(".")[1].length : 0;
        const target = parseFloat(targetAttr);
        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            num.textContent = target.toFixed(decimals);
            clearInterval(timer);
          } else {
            num.textContent = current.toFixed(decimals);
          }
        }, 30);
      });
    }
  }

  window.addEventListener("scroll", animateCounters);
  animateCounters();

  /* ==========================================================================
     Authentication & Session Management System
     ========================================================================== */

  // DOM Elements for Auth
  const loginNavBtn = document.getElementById("loginNavBtn");
  const signupNavBtn = document.getElementById("signupNavBtn");
  const authLoggedOut = document.getElementById("authLoggedOut");
  const authLoggedIn = document.getElementById("authLoggedIn");
  const userAvatarBtn = document.getElementById("userAvatarBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  const userAvatarText = document.getElementById("userAvatarText");
  const userNameText = document.getElementById("userNameText");
  const dropdownUserName = document.getElementById("dropdownUserName");
  const dropdownUserEmail = document.getElementById("dropdownUserEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  const authModalOverlay = document.getElementById("authModalOverlay");
  const authModalClose = document.getElementById("authModalClose");
  const tabLoginBtn = document.getElementById("tabLoginBtn");
  const tabSignupBtn = document.getElementById("tabSignupBtn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const authAlert = document.getElementById("authAlert");
  const toastContainer = document.getElementById("toastContainer");

  // State
  let users = JSON.parse(localStorage.getItem("aura_users") || "[]");
  let currentUser = JSON.parse(localStorage.getItem("aura_current_user") || "null");

  // Helper: Toast Notifications
  function showToast(message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Helper: Auth Modal Alert
  function showAlert(message) {
    if (!authAlert) return;
    authAlert.textContent = message;
    authAlert.classList.remove("hidden");
  }

  function hideAlert() {
    if (!authAlert) return;
    authAlert.classList.add("hidden");
    authAlert.textContent = "";
  }

  // Open / Close Auth Modal
  function openAuthModal(defaultTab = "login") {
    if (!authModalOverlay) return;
    authModalOverlay.classList.remove("hidden");
    hideAlert();
    switchTab(defaultTab);
  }

  function closeAuthModal() {
    if (!authModalOverlay) return;
    authModalOverlay.classList.add("hidden");
    hideAlert();
  }

  function switchTab(tab) {
    if (tab === "login") {
      tabLoginBtn?.classList.add("active");
      tabSignupBtn?.classList.remove("active");
      loginForm?.classList.remove("hidden");
      signupForm?.classList.add("hidden");
    } else {
      tabSignupBtn?.classList.add("active");
      tabLoginBtn?.classList.remove("active");
      signupForm?.classList.remove("hidden");
      loginForm?.classList.add("hidden");
    }
    hideAlert();
  }

  // Update Navigation Bar UI
  function updateAuthUI() {
    if (currentUser) {
      if (authLoggedOut) authLoggedOut.classList.add("hidden");
      if (authLoggedIn) authLoggedIn.classList.remove("hidden");

      const initials = currentUser.name
        ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)
        : "U";

      if (userAvatarText) userAvatarText.textContent = initials;
      if (userNameText) userNameText.textContent = currentUser.name || currentUser.email;
      if (dropdownUserName) dropdownUserName.textContent = currentUser.name || "User";
      if (dropdownUserEmail) dropdownUserEmail.textContent = currentUser.email;
    } else {
      if (authLoggedOut) authLoggedOut.classList.remove("hidden");
      if (authLoggedIn) authLoggedIn.classList.add("hidden");
    }
  }

  // Event Listeners for Modal Trigger
  if (loginNavBtn) loginNavBtn.addEventListener("click", () => openAuthModal("login"));
  if (signupNavBtn) signupNavBtn.addEventListener("click", () => openAuthModal("signup"));
  if (authModalClose) authModalClose.addEventListener("click", closeAuthModal);

  if (authModalOverlay) {
    authModalOverlay.addEventListener("click", (e) => {
      if (e.target === authModalOverlay) closeAuthModal();
    });
  }

  if (tabLoginBtn) tabLoginBtn.addEventListener("click", () => switchTab("login"));
  if (tabSignupBtn) tabSignupBtn.addEventListener("click", () => switchTab("signup"));

  // Toggle Profile Dropdown
  if (userAvatarBtn && profileDropdown) {
    userAvatarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!profileDropdown.contains(e.target) && e.target !== userAvatarBtn) {
        profileDropdown.classList.add("hidden");
      }
    });
  }

  // Sign Up Handler
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideAlert();

      const name = document.getElementById("signupName")?.value.trim();
      const email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
      const password = document.getElementById("signupPassword")?.value;
      const confirmPassword = document.getElementById("signupConfirmPassword")?.value;

      if (!name || !email || !password || !confirmPassword) {
        showAlert("Please fill in all required fields.");
        return;
      }

      if (password.length < 6) {
        showAlert("Password must be at least 6 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        showAlert("Passwords do not match.");
        return;
      }

      users = JSON.parse(localStorage.getItem("aura_users") || "[]");
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        showAlert("An account with this email already exists.");
        return;
      }

      const newUser = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      localStorage.setItem("aura_users", JSON.stringify(users));

      currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem("aura_current_user", JSON.stringify(currentUser));

      updateAuthUI();
      closeAuthModal();
      signupForm.reset();
      showToast(`Welcome aboard, ${newUser.name}! Your account has been created.`, "success");
    });
  }

  // Log In Handler
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideAlert();

      const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
      const password = document.getElementById("loginPassword")?.value;

      if (!email || !password) {
        showAlert("Please enter both email and password.");
        return;
      }

      users = JSON.parse(localStorage.getItem("aura_users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        showAlert("Invalid email address or password.");
        return;
      }

      currentUser = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem("aura_current_user", JSON.stringify(currentUser));

      updateAuthUI();
      closeAuthModal();
      loginForm.reset();
      showToast(`Welcome back, ${user.name}!`, "success");
    });
  }

  // Log Out Handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      currentUser = null;
      localStorage.removeItem("aura_current_user");
      updateAuthUI();
      if (profileDropdown) profileDropdown.classList.add("hidden");
      showToast("Logged out successfully.", "info");
    });
  }

  // Initialize UI on Load
  updateAuthUI();
});
