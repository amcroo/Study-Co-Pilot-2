(function () {
  const storage = window.StudyMindStorage;
  const seedData = window.StudyMindData || {};

  const NAV_ITEMS = [
    { id: "dashboard", label: "Command Center", subtitle: "Daily mission", icon: "layout-dashboard", href: "./index.html" },
    { id: "roadmap", label: "Learning Path", subtitle: "Milestones", icon: "map", href: "./roadmap.html" },
    { id: "quiz", label: "Practice Lab", subtitle: "Quizzes", icon: "brain", href: "./quiz.html" },
    { id: "timetable", label: "Study Planner", subtitle: "Schedule", icon: "calendar", href: "./timetable.html" },
    { id: "resources", label: "Knowledge Hub", subtitle: "Resources", icon: "book-open", href: "./resources.html" },
    { id: "competitions", label: "Opportunities", subtitle: "Challenges", icon: "trophy", href: "./competitions.html" },
    { id: "career", label: "Career Hub", subtitle: "Jobs", icon: "briefcase", href: "./career.html" },
    { id: "progress", label: "Analytics", subtitle: "Insights", icon: "bar-chart", href: "./progress.html" }
  ];

  const ICON_PATHS = {
    "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
    map: '<path d="M14.5 4.5 9.5 2.5 4 4.5v17l5.5-2 5 2 5.5-2v-17l-5.5 2Z"></path><path d="M9.5 2.5v17"></path><path d="M14.5 4.5v17"></path>',
    brain: '<path d="M9.5 4a3.5 3.5 0 0 0-3.2 5 3.5 3.5 0 0 0 .4 6.7A3.8 3.8 0 0 0 10.5 20V4Z"></path><path d="M14.5 4a3.5 3.5 0 0 1 3.2 5 3.5 3.5 0 0 1-.4 6.7A3.8 3.8 0 0 1 13.5 20V4Z"></path><path d="M7.5 9.5h3"></path><path d="M13.5 9.5h3"></path>',
    calendar: '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>',
    "book-open": '<path d="M12 7v14"></path><path d="M3 5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2V5Z"></path><path d="M21 5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2V5Z"></path>',
    trophy: '<path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"></path><path d="M5 5H3v2a4 4 0 0 0 4 4"></path><path d="M19 5h2v2a4 4 0 0 1-4 4"></path>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><path d="M2 12h20"></path>',
    "bar-chart": '<path d="M3 3v18h18"></path><path d="M8 17V9"></path><path d="M13 17V5"></path><path d="M18 17v-6"></path>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z"></path>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 1 0 9.8 9.8Z"></path>',
    flame: '<path d="M8.5 14.5A3.5 3.5 0 0 0 12 21a5 5 0 0 0 5-5c0-3.5-2.5-5.5-4-8-.5 2-2 3-3.5 4.5Z"></path><path d="M12 2c1 3-2 4.5-2 7"></path>',
    target: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2"></path><path d="M3 12A9 9 0 0 1 18.5 5.8"></path><path d="M18 2v4h4"></path><path d="M6 22v-4H2"></path>',
    sparkles: '<path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z"></path><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path>'
  };

  function iconSvg(name) {
    const paths = ICON_PATHS[name] || ICON_PATHS["layout-dashboard"];
    return `<svg class="app-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  }

  const STUDY_GOAL_FALLBACK = "Set your study goal";

  function cleanProfileGoal(goal) {
    const value = String(goal || "").trim();
    const legacyPlaceholder = [79, 79, 80, 83];
    const normalized = value.toUpperCase();
    const isLegacyPlaceholder = normalized.length === legacyPlaceholder.length
      && legacyPlaceholder.every(function (code, index) {
        return normalized.charCodeAt(index) === code;
      });
    return isLegacyPlaceholder ? "" : value;
  }

  function getDisplayGoal(profile) {
    return cleanProfileGoal(profile && profile.goal) || STUDY_GOAL_FALLBACK;
  }

  const BADGE_LIBRARY = [
    {
      id: "quiz-master",
      title: "Quiz Master",
      condition: function (context) {
        return context.quizHistory.some(function (entry) {
          const percent = entry.percentage || (entry.total ? Math.round((entry.score / entry.total) * 100) : 0);
          return percent === 100;
        });
      }
    },
    {
      id: "seven-day-streak",
      title: "7-Day Streak",
      condition: function (context) {
        return context.streak >= 7;
      }
    },
    {
      id: "topic-conquered",
      title: "Topic Conquered",
      condition: function (context) {
        return context.roadmapTopics.some(function (topic) {
          return topic && (topic.status === "done" || topic.status === "completed");
        });
      }
    },
    {
      id: "roadmap-starter",
      title: "Roadmap Starter",
      condition: function (context) {
        return context.roadmapPhases.length > 0;
      }
    },
    {
      id: "resource-explorer",
      title: "Resource Explorer",
      condition: function (context) {
        return context.resourceVisits >= 5;
      }
    }
  ];

  const DAILY_TASKS_KEY = "studymind-daily-tasks";
  const DAILY_REWARD_BONUS = 25;
  const DAILY_TASK_DEFINITIONS = [
    {
      id: "quiz",
      title: "Complete a quiz",
      description: "Finish one practice quiz today.",
      icon: "brain",
      xp: 20
    },
    {
      id: "weak-topic",
      title: "Revise a weak topic",
      description: "Review one saved weak area or mark this after focused revision.",
      icon: "target",
      xp: 15
    },
    {
      id: "timetable",
      title: "Plan today's study block",
      description: "Add at least one timetable slot for today.",
      icon: "calendar",
      xp: 10
    },
    {
      id: "roadmap",
      title: "Move a roadmap milestone",
      description: "Make visible progress on your current roadmap step.",
      icon: "map",
      xp: 15
    },
    {
      id: "resource",
      title: "Open a learning resource",
      description: "Use one curated resource to support today's focus.",
      icon: "book-open",
      xp: 10
    }
  ];

  const page = document.documentElement.dataset.page || "dashboard";
  const sidebar = document.getElementById("sidebar");
  const topbar = document.getElementById("topbar");
  const bottomNav = document.getElementById("bottomNav");
  const modalRoot = document.getElementById("modalRoot");
  const toastRoot = document.getElementById("toastRoot");
  const loadingOverlay = document.getElementById("loadingOverlay");

  function initializeApp() {
    applyTheme(storage.getTheme());
    renderNavigation();
    renderTopbar();
    decoratePageHeader();
    decorateHeaderButtons();
    registerGlobalEvents();
    const streak = storage.updateStudyStreak();
    checkAndAwardBadges(streak);
    if (page === "dashboard") {
      renderDashboard();
    }
    initializeRevisionMode();
    openSetupOnFirstLaunch();
  }

  function getRoadmapPhases(roadmap) {
    if (typeof storage.normalizeRoadmapPhases === "function") {
      return storage.normalizeRoadmapPhases(roadmap);
    }
    if (Array.isArray(roadmap)) {
      return roadmap;
    }
    if (roadmap && Array.isArray(roadmap.phases)) {
      return roadmap.phases;
    }
    return [];
  }

  function getAllRoadmapTopics(roadmap) {
    return getRoadmapPhases(roadmap).flatMap(function (phase) {
      return Array.isArray(phase && phase.topics) ? phase.topics : [];
    });
  }

  function getBadgeMeta(badgeId) {
    const definitions = Array.isArray(seedData.badgeDefinitions) ? seedData.badgeDefinitions : [];
    return definitions.find(function (badge) { return badge.id === badgeId; }) || {};
  }

  function getResourceVisitCount() {
    return storage.getData("studymind-resource-visits", []).length;
  }

  function renderNavigation() {
    const navMarkup = NAV_ITEMS.map(createNavLink).join("");
    if (sidebar) {
      sidebar.innerHTML = `
        <div class="sidebar-panel">
          <div class="brand">
            <div class="brand-mark">${iconSvg("sparkles")}</div>
            <div class="brand-text">
              <strong>Study Co-Pilot</strong>
              <span>Learning command center</span>
            </div>
          </div>
          <nav class="sidebar-nav" aria-label="Sidebar Navigation">
            ${navMarkup}
          </nav>
          <div class="sidebar-footer">
            <div class="sidebar-tip">
              <strong>Smart routine</strong>
              <p>Plan, practice, and measure your growth from one calm workspace.</p>
            </div>
          </div>
        </div>
      `;
    }
    if (bottomNav) {
      bottomNav.innerHTML = NAV_ITEMS.map(createNavLink).join("");
    }
  }

  function createNavLink(item) {
    const activeClass = item.id === page ? "active" : "";
    return `
      <a class="nav-link ${activeClass}" href="${item.href}" data-nav-id="${item.id}">
        <span class="nav-icon">${iconSvg(item.icon)}</span>
        <span class="nav-copy">
          <span class="nav-label">${item.label}</span>
          <span class="nav-subtitle">${item.subtitle || ""}</span>
        </span>
      </a>
    `;
  }

  function renderTopbar() {
    if (!topbar) {
      return;
    }
    const profile = storage.getProfile();
    const streak = profile && Number.isFinite(Number(profile.streak)) ? Number(profile.streak) : 0;
    const name = profile && profile.name ? profile.name : "Guest Student";
    const goal = getDisplayGoal(profile);
    const initials = name.split(" ").map(function (part) { return part[0]; }).join("").slice(0, 2).toUpperCase();

    topbar.innerHTML = `
      <div class="topbar-title">
        <h2>${getPageTitle()}</h2>
        <p>${escapeHtml(goal)}</p>
      </div>
      <div class="topbar-actions">
        <div class="topbar-status" aria-label="Current study streak">
          <span>${iconSvg("flame")}</span>
          <strong>${streak} ${streak === 1 ? "day" : "days"}</strong>
        </div>
        <button class="theme-toggle" id="themeToggleButton" type="button" aria-label="Toggle theme">${iconSvg("moon")}</button>
        <button class="icon-button" id="topbarSettingsButton" type="button" aria-label="Open settings">${iconSvg("settings")}</button>
        <div class="profile-pill">
          <div class="profile-avatar">${escapeHtml(initials || "SM")}</div>
          <div class="profile-meta">
            <span>Active learner</span>
            <strong>${escapeHtml(name)}</strong>
          </div>
        </div>
      </div>
    `;
  }

  function getPageTitle() {
    const currentPage = NAV_ITEMS.find(function (item) { return item.id === page; });
    return currentPage ? currentPage.label : "Study Co-Pilot";
  }

  function getPageIcon() {
    const currentPage = NAV_ITEMS.find(function (item) { return item.id === page; });
    return currentPage ? currentPage.icon : "layout-dashboard";
  }

  function decoratePageHeader() {
    const title = document.querySelector(".page-header h1");
    if (!title || title.querySelector(".page-title-icon")) {
      return;
    }
    title.insertAdjacentHTML("afterbegin", `<span class="page-title-icon">${iconSvg(getPageIcon())}</span>`);
  }

  function decorateHeaderButtons() {
    document.querySelectorAll(".header-actions button").forEach(function (button) {
      if (button.querySelector(".app-icon")) {
        return;
      }
      const id = (button.id || "").toLowerCase();
      const label = (button.textContent || "").toLowerCase();
      const iconName = id.includes("refresh") || label.includes("refresh") || label.includes("regenerate")
        ? "refresh"
        : id.includes("settings") || id.includes("setup") || id.includes("api") || label.includes("setup") || label.includes("settings")
          ? "settings"
          : label.includes("reset") || label.includes("clear")
            ? "check"
            : getPageIcon();
      button.insertAdjacentHTML("afterbegin", iconSvg(iconName));
    });
  }

  function registerGlobalEvents() {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("submit", handleDocumentSubmit);
  }

  function handleDocumentClick(event) {
    const backButton = event.target.closest("[data-back-button]");
    if (backButton) {
      if (window.history.length > 1) {
        history.back();
      } else {
        window.location.href = "./index.html";
      }
      return;
    }

    if (event.target.closest("#themeToggleButton")) {
      toggleTheme();
      return;
    }

    if (
      event.target.closest("#topbarSettingsButton") ||
      event.target.closest("#openApiSettingsButton") ||
      event.target.closest("#openApiSettingsButtonSecondary")
    ) {
      openApiSettingsModal();
      return;
    }

    if (event.target.closest("#openSetupButton")) {
      openSetupModal();
      return;
    }

    if (event.target.closest("#refreshDashboardButton")) {
      renderDashboard();
      showToast("Command Center refreshed", "Your latest local progress has been recalculated.", "success");
      return;
    }

    const dailyTaskButton = event.target.closest("[data-daily-task-toggle]");
    if (dailyTaskButton) {
      toggleDailyTask(dailyTaskButton.getAttribute("data-daily-task-toggle"));
      return;
    }

    if (event.target.closest("#claimDailyRewardButton")) {
      claimDailyReward();
      return;
    }

    if (event.target.closest("#loadWeakTopicButton")) {
      loadRevisionTopic(false);
      return;
    }

    if (event.target.closest("#startRevisionButton")) {
      loadRevisionTopic(true);
      return;
    }

    if (event.target.closest("#dashboardResetButton") || event.target.closest("#resetAllDataButton")) {
      openResetConfirmationModal();
      return;
    }

    if (event.target.matches("[data-close-modal]") || event.target.classList.contains("modal")) {
      closeModal();
    }
  }

  function handleDocumentSubmit(event) {
    if (event.target.matches("#setupForm")) {
      event.preventDefault();
      handleSetupSubmit(event.target);
      return;
    }

    if (event.target.matches("#apiSettingsForm")) {
      event.preventDefault();
      handleApiSettingsSubmit(event.target);
    }
  }

  function applyTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.body.classList.toggle("theme-dark", nextTheme === "dark");
    document.body.classList.toggle("theme-light", nextTheme === "light");
    storage.saveTheme(nextTheme);
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains("theme-dark");
    const nextTheme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
    showToast("Theme updated", `Switched to ${nextTheme} mode.`, "success");
  }

  function showToast(title, message, tone) {
    if (!toastRoot) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = `toast ${tone || "success"}`;
    toast.innerHTML = `
      <span class="toast-title">${escapeHtml(title)}</span>
      <span class="toast-message">${escapeHtml(message)}</span>
    `;
    toastRoot.appendChild(toast);

    window.setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-6px)";
      window.setTimeout(function () { toast.remove(); }, 200);
    }, 3000);
  }

  function showLoading(message) {
    if (!loadingOverlay) {
      return;
    }
    const text = loadingOverlay.querySelector("p");
    if (text && message) {
      text.textContent = message;
    }
    loadingOverlay.classList.remove("hidden");
  }

  function hideLoading() {
    if (loadingOverlay) {
      loadingOverlay.classList.add("hidden");
    }
  }

  function openSetupOnFirstLaunch() {
    if (page !== "dashboard") {
      return;
    }
    const profile = storage.getProfile();
    if (!profile || !profile.name || !profile.goal) {
      window.setTimeout(function () {
        openSetupModal(true);
      }, 250);
    }
  }

  function openModal(content) {
    if (!modalRoot) {
      return;
    }

    modalRoot.innerHTML = `
      <div class="modal open" role="dialog" aria-modal="true">
        <div class="modal-panel">
          ${content}
        </div>
      </div>
    `;
  }

  function closeModal() {
    if (modalRoot) {
      modalRoot.innerHTML = "";
    }
  }

  function openSetupModal(isFirstLaunch) {
    const profile = storage.getProfile() || {};
    openModal(`
      <div class="modal-header">
        <div>
          <h2>${isFirstLaunch ? "Welcome to Study Co-Pilot" : "Update your study profile"}</h2>
          <p>Create your learning identity once, and the app can personalize future roadmap, quiz, and planning features around it.</p>
        </div>
        ${isFirstLaunch ? "" : '<button class="icon-button" type="button" data-close-modal aria-label="Close modal">✕</button>'}
      </div>
      <form id="setupForm" class="form-grid">
        <div class="form-row">
          <label class="form-label" for="studentName">Student name</label>
          <input class="form-control" id="studentName" name="studentName" type="text" placeholder="Enter your full name" value="${escapeAttribute(profile.name || "")}" required>
        </div>
        <div class="form-row">
          <label class="form-label" for="learningGoal">Main learning goal</label>
          <textarea class="form-control" id="learningGoal" name="learningGoal" placeholder="Example: Crack final year placement prep, improve DSA, and stay consistent with semester revision." required>${escapeHtml(cleanProfileGoal(profile.goal))}</textarea>
        </div>
        <div class="form-row">
          <label class="form-label" for="openAiKey">OpenAI API key <span class="form-help">(optional)</span></label>
          <input class="form-control" id="openAiKey" name="openAiKey" type="password" placeholder="Paste your API key if you want to save it locally" value="${escapeAttribute(profile.apiKey || "")}">
          <p class="form-help">Security note: API key is stored locally in browser localStorage for demo purposes.</p>
        </div>
        <div class="modal-footer">
          ${isFirstLaunch ? "" : '<button class="secondary-button" type="button" data-close-modal>Cancel</button>'}
          <button class="gradient-button" type="submit">Save Profile</button>
        </div>
      </form>
    `);
  }

  function handleSetupSubmit(form) {
    const formData = new FormData(form);
    const currentProfile = storage.getProfile() || {};
    const profile = {
      name: String(formData.get("studentName") || "").trim(),
      goal: String(formData.get("learningGoal") || "").trim(),
      apiKey: String(formData.get("openAiKey") || "").trim(),
      streak: currentProfile.streak || 0,
      lastActiveDate: currentProfile.lastActiveDate || ""
    };

    if (!profile.name || !cleanProfileGoal(profile.goal)) {
      showToast("Profile incomplete", "Please add your name and main learning goal.", "warning");
      return;
    }

    storage.saveProfile(profile);
    renderTopbar();
    if (page === "dashboard") {
      renderDashboard();
    }
    closeModal();
    showToast("Profile saved", "Study Co-Pilot is now personalized for you.", "success");
  }

  function openApiSettingsModal() {
    const profile = storage.getProfile() || {};
    openModal(`
      <div class="modal-header">
        <div>
          <h2>API key and settings</h2>
          <p>Save your optional OpenAI API key locally on this browser, or reset the app data if you want a clean start.</p>
        </div>
        <button class="icon-button" type="button" data-close-modal aria-label="Close modal">✕</button>
      </div>
      <form id="apiSettingsForm" class="form-grid">
        <div class="form-row">
          <label class="form-label" for="apiKeyField">OpenAI API key</label>
          <input class="form-control" id="apiKeyField" name="apiKeyField" type="password" placeholder="Stored only in localStorage on this device" value="${escapeAttribute(profile.apiKey || "")}">
          <p class="form-help">Security note: API key is stored locally in browser localStorage for demo purposes.</p>
        </div>
        <div class="form-row">
          <button class="danger-button" id="resetAllDataButton" type="button">Reset All Data</button>
          <p class="form-help">This clears profile, roadmap, quiz history, timetable, badges, weak topics, and theme preferences.</p>
        </div>
        <div class="modal-footer">
          <button class="secondary-button" type="button" data-close-modal>Cancel</button>
          <button class="gradient-button" type="submit">Save Settings</button>
        </div>
      </form>
    `);
  }

  function handleApiSettingsSubmit(form) {
    const formData = new FormData(form);
    const currentProfile = storage.getProfile() || {};
    storage.saveProfile({
      ...currentProfile,
      apiKey: String(formData.get("apiKeyField") || "").trim()
    });
    renderTopbar();
    closeModal();
    showToast("Settings updated", "Your local API preference has been saved.", "success");
  }

  function openResetConfirmationModal() {
    openModal(`
      <div class="modal-header">
        <div>
          <h2>Reset Study Co-Pilot?</h2>
          <p>This will permanently remove your local profile, streak, quiz history, roadmap, timetable, badges, weak topics, and theme settings from this browser.</p>
        </div>
        <button class="icon-button" type="button" data-close-modal aria-label="Close modal">✕</button>
      </div>
      <div class="form-grid">
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h3>Make sure you want a fresh start</h3>
          <p>Reset is useful during development, demos, or when you want to re-run the onboarding flow from scratch.</p>
        </div>
        <div class="modal-footer">
          <button class="secondary-button" type="button" data-close-modal>Keep My Data</button>
          <button class="danger-button" type="button" id="confirmResetDataButton">Yes, Reset Everything</button>
        </div>
      </div>
    `);

    const confirmButton = document.getElementById("confirmResetDataButton");
    if (confirmButton) {
      confirmButton.addEventListener("click", resetAllData, { once: true });
    }
  }

  function resetAllData() {
    showLoading("Resetting your workspace...");
    Object.values(storage.STORAGE_KEYS).forEach(function (key) {
      storage.removeData(key);
    });
    storage.removeData("studymind-resource-visits");
    storage.removeData(DAILY_TASKS_KEY);
    window.setTimeout(function () {
      hideLoading();
      closeModal();
      applyTheme("dark");
      renderTopbar();
      if (page === "dashboard") {
        renderDashboard();
      }
      showToast("Workspace reset", "All local Study Co-Pilot data has been cleared.", "warning");
      openSetupOnFirstLaunch();
    }, 500);
  }

  function renderDashboard() {
    const profile = storage.getProfile();
    const streak = storage.updateStudyStreak();
    const progress = storage.calculateOverallProgress();
    const badges = storage.getBadges();
    const roadmap = getRoadmapPhases(storage.getRoadmap());
    const quizHistory = storage.getQuizHistory();
    const weakTopics = storage.getWeakTopics();
    const timetable = storage.getTimetable();
    const todaySlots = getTodayTimetableSlots(timetable);
    const currentMilestone = getCurrentRoadmapMilestone(roadmap);
    const upcomingCompetitions = getUpcomingCompetitions();
    const badgePreview = getBadgePreview(badges);
    const dailyTaskState = getDailyTaskState();
    const dailyTaskContext = {
      quizHistory: quizHistory,
      weakTopics: weakTopics,
      todaySlots: todaySlots,
      roadmap: roadmap
    };

    renderDashboardStats({
      streak: streak,
      progress: progress,
      badges: badges.length,
      weakTopics: weakTopics.length,
      quizzesTaken: quizHistory.length,
      todaySlots: todaySlots.length
    });
    renderDailyTasks(dailyTaskState, dailyTaskContext);

    const greeting = document.getElementById("dashboardGreeting");
    const summary = document.getElementById("dashboardSummary");
    const progressBar = document.getElementById("dashboardProgressBar");
    const progressLabel = document.getElementById("dashboardProgressLabel");
    const streakNode = document.getElementById("dashboardStreak");
    const badgeNode = document.getElementById("dashboardBadges");
    const goalNode = document.getElementById("dashboardGoal");
    const heroMilestone = document.getElementById("dashboardHeroMilestone");
    const snapshot = document.getElementById("profileSnapshot");
    const suggestions = document.getElementById("dashboardSuggestions");
    const roadmapMilestone = document.getElementById("roadmapMilestone");
    const todaysTimetable = document.getElementById("todaysTimetable");
    const weakTopicsPanel = document.getElementById("weakTopicsPanel");
    const competitionsPreview = document.getElementById("competitionsPreview");
    const badgesPreview = document.getElementById("badgesPreview");

    if (greeting) {
      greeting.textContent = profile && profile.name ? `Welcome back, ${profile.name}` : "Welcome to Study Co-Pilot";
    }
    if (summary) {
      summary.textContent = cleanProfileGoal(profile && profile.goal)
        ? `Your main goal is "${getDisplayGoal(profile)}". This command center keeps your learning plan, practice, and consistency aligned around it.`
        : "Set up your profile to personalize roadmap suggestions, quizzes, study plans, and competition tracking.";
    }
    if (progressBar) {
      progressBar.style.width = `${Math.max(progress, 6)}%`;
    }
    if (progressLabel) {
      progressLabel.textContent = `${progress}%`;
    }
    if (streakNode) {
      streakNode.textContent = `${streak} ${streak === 1 ? "day" : "days"}`;
    }
    if (badgeNode) {
      badgeNode.textContent = `${badges.length} earned`;
    }
    if (goalNode) {
      goalNode.textContent = getDisplayGoal(profile);
    }
    if (heroMilestone) {
      heroMilestone.textContent = currentMilestone.title;
    }
    if (snapshot) {
      snapshot.innerHTML = `
        ${renderSnapshotRow("Student", profile && profile.name ? profile.name : "Not added")}
        ${renderSnapshotRow("Main goal", getDisplayGoal(profile))}
        ${renderSnapshotRow("Saved API key", profile && profile.apiKey ? "Configured" : "Not added")}
        ${renderSnapshotRow("Overall progress", `${progress}%`)}
        ${renderSnapshotRow("Quiz sessions", String(quizHistory.length))}
        ${renderSnapshotRow("Today's slots", String(todaySlots.length))}
      `;
    }
    if (suggestions) {
      suggestions.innerHTML = buildDashboardSuggestions({ profile: profile, roadmap: roadmap, quizHistory: quizHistory, weakTopics: weakTopics, timetable: timetable, progress: progress });
    }
    if (roadmapMilestone) {
      roadmapMilestone.innerHTML = renderRoadmapMilestone(currentMilestone);
    }
    if (todaysTimetable) {
      todaysTimetable.innerHTML = renderTodaysTimetable(todaySlots);
    }
    if (weakTopicsPanel) {
      weakTopicsPanel.innerHTML = renderWeakTopicsPanel(weakTopics);
    }
    if (competitionsPreview) {
      competitionsPreview.innerHTML = renderCompetitionsPreview(upcomingCompetitions);
    }
    if (badgesPreview) {
      badgesPreview.innerHTML = renderBadgesPreview(badgePreview);
    }
  }

  function getTodayKey() {
    return new Date().toISOString().split("T")[0];
  }

  function getDailyTaskState() {
    const saved = storage.getData(DAILY_TASKS_KEY, null);
    const todayKey = getTodayKey();
    if (!saved || saved.date !== todayKey) {
      return {
        date: todayKey,
        completedTaskIds: [],
        rewardClaimed: false,
        points: saved && Number.isFinite(Number(saved.points)) ? Number(saved.points) : 0
      };
    }
    return {
      date: todayKey,
      completedTaskIds: Array.isArray(saved.completedTaskIds) ? saved.completedTaskIds : [],
      rewardClaimed: Boolean(saved.rewardClaimed),
      points: Number.isFinite(Number(saved.points)) ? Number(saved.points) : 0
    };
  }

  function saveDailyTaskState(state) {
    storage.setData(DAILY_TASKS_KEY, state);
  }

  function getDailyTaskAutoCompletions(context) {
    const todayKey = getTodayKey();
    const quizDoneToday = (context.quizHistory || []).some(function (entry) {
      return String(entry.createdAt || "").slice(0, 10) === todayKey || String(entry.date || "") === new Date().toLocaleDateString();
    });
    const hasWeakTopic = (context.weakTopics || []).length > 0;
    const hasTodaySlot = (context.todaySlots || []).length > 0;
    const hasRoadmapProgress = getAllRoadmapTopics(context.roadmap || []).some(function (topic) {
      return topic && (topic.status === "done" || topic.status === "completed" || topic.completed);
    });
    const visitedResources = storage.getData("studymind-resource-visits", []);
    const resourceOpenedToday = (Array.isArray(visitedResources) ? visitedResources : []).some(function (visit) {
      return String(visit && (visit.visitedAt || visit.createdAt || visit.date || "")).slice(0, 10) === todayKey;
    });

    return {
      quiz: quizDoneToday,
      "weak-topic": hasWeakTopic,
      timetable: hasTodaySlot,
      roadmap: hasRoadmapProgress,
      resource: resourceOpenedToday
    };
  }

  function getCompletedDailyTaskIds(state, context) {
    const manualIds = new Set(state.completedTaskIds || []);
    const autoCompletions = getDailyTaskAutoCompletions(context);
    DAILY_TASK_DEFINITIONS.forEach(function (task) {
      if (autoCompletions[task.id]) {
        manualIds.add(task.id);
      }
    });
    return Array.from(manualIds);
  }

  function renderDailyTasks(state, context) {
    const panel = document.getElementById("dailyTasksPanel");
    if (!panel) {
      return;
    }

    const completedIds = getCompletedDailyTaskIds(state, context);
    const completedSet = new Set(completedIds);
    const completedCount = completedIds.length;
    const totalCount = DAILY_TASK_DEFINITIONS.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    const availableXp = DAILY_TASK_DEFINITIONS.reduce(function (sum, task) {
      return completedSet.has(task.id) ? sum + task.xp : sum;
    }, 0);
    const totalXp = DAILY_TASK_DEFINITIONS.reduce(function (sum, task) {
      return sum + task.xp;
    }, DAILY_REWARD_BONUS);
    const autoCompletions = getDailyTaskAutoCompletions(context);
    const progressLabel = document.getElementById("dailyTasksProgressLabel");
    const progressBar = document.getElementById("dailyTasksProgressBar");
    const rewardPoints = document.getElementById("dailyRewardPoints");
    const rewardStatus = document.getElementById("dailyRewardStatus");
    const rewardButton = document.getElementById("claimDailyRewardButton");

    panel.innerHTML = DAILY_TASK_DEFINITIONS.map(function (task) {
      const isComplete = completedSet.has(task.id);
      const isAuto = Boolean(autoCompletions[task.id]);
      return `
        <label class="daily-task-item ${isComplete ? "is-complete" : ""}">
          <span class="daily-task-icon">${iconSvg(task.icon)}</span>
          <input class="daily-task-checkbox" type="checkbox" data-daily-task-toggle="${escapeAttribute(task.id)}" ${isComplete ? "checked" : ""} aria-label="${escapeAttribute(task.title)}">
          <div>
            <h3>${escapeHtml(task.title)}</h3>
            <p>${escapeHtml(task.description)}</p>
          </div>
          <span class="task-xp-pill">${task.xp} XP${isAuto ? " auto" : ""}</span>
        </label>
      `;
    }).join("");

    if (progressLabel) {
      progressLabel.textContent = `${completedCount} / ${totalCount} completed`;
    }
    if (progressBar) {
      progressBar.style.width = Math.max(progress, completedCount ? 8 : 0) + "%";
    }
    if (rewardPoints) {
      rewardPoints.textContent = `${state.points} XP`;
    }
    if (rewardStatus) {
      rewardStatus.textContent = state.rewardClaimed
        ? "Today's reward is claimed. Keep the loop alive tomorrow."
        : completedCount === totalCount
          ? `All tasks complete. Claim ${totalXp} XP.`
          : `${availableXp} XP ready. Complete all tasks to unlock the ${DAILY_REWARD_BONUS} XP bonus.`;
    }
    if (rewardButton) {
      rewardButton.disabled = completedCount !== totalCount || state.rewardClaimed;
      rewardButton.textContent = state.rewardClaimed ? "Claimed" : "Claim Reward";
    }
  }

  function toggleDailyTask(taskId) {
    if (!taskId) {
      return;
    }
    const state = getDailyTaskState();
    const completed = new Set(state.completedTaskIds || []);
    if (completed.has(taskId)) {
      completed.delete(taskId);
    } else {
      completed.add(taskId);
    }
    state.completedTaskIds = Array.from(completed);
    saveDailyTaskState(state);
    renderDashboard();
    showToast("Daily tasks updated", "Your study loop progress has been saved for today.", "success");
  }

  function claimDailyReward() {
    const state = getDailyTaskState();
    const context = {
      quizHistory: storage.getQuizHistory(),
      weakTopics: storage.getWeakTopics(),
      todaySlots: getTodayTimetableSlots(storage.getTimetable()),
      roadmap: getRoadmapPhases(storage.getRoadmap())
    };
    const completedCount = getCompletedDailyTaskIds(state, context).length;
    if (completedCount !== DAILY_TASK_DEFINITIONS.length || state.rewardClaimed) {
      return;
    }

    state.rewardClaimed = true;
    const completedIds = new Set(getCompletedDailyTaskIds(state, context));
    const earnedXp = DAILY_TASK_DEFINITIONS.reduce(function (sum, task) {
      return completedIds.has(task.id) ? sum + task.xp : sum;
    }, DAILY_REWARD_BONUS);
    state.points += earnedXp;
    saveDailyTaskState(state);
    awardDailyRewardBadge();
    renderDashboard();
    showToast("Reward claimed", `You earned ${earnedXp} XP for today's study loop.`, "success");
  }

  function awardDailyRewardBadge() {
    const badges = storage.getBadges();
    const exists = badges.some(function (badge) { return badge.id === "daily-loop-finisher"; });
    if (exists) {
      return;
    }
    badges.push({
      id: "daily-loop-finisher",
      title: "Daily Loop Finisher",
      icon: "âœ…",
      earnedAt: new Date().toISOString()
    });
    storage.saveBadges(badges);
  }

  function initializeRevisionMode() {
    if (page !== "quiz") {
      return;
    }
    const select = document.getElementById("revisionTopicSelect");
    const insights = document.getElementById("revisionInsights");
    if (!select || !insights) {
      return;
    }
    const weakTopics = storage.getWeakTopics();
    const quizHistory = storage.getQuizHistory();

    select.innerHTML = `<option value="">Auto-select best topic</option>` + weakTopics.map(function (topic) {
      const label = typeof topic === "string" ? topic : topic.topic || topic.title || "Weak Topic";
      return `<option value="${escapeAttribute(label)}">${escapeHtml(label)}</option>`;
    }).join("");

    insights.innerHTML = `
      <div class="stack-item">
        <span>ðŸŽ¯</span>
        <div>
          <h3>${weakTopics.length} weak topics saved</h3>
          <p>${weakTopics.length ? weakTopics.slice(0, 3).map(function (topic) { return typeof topic === "string" ? topic : topic.topic || topic.title || "Weak Topic"; }).join(", ") : "Weak Topics mode will unlock after quiz attempts."}</p>
        </div>
      </div>
      <div class="stack-item">
        <span>ðŸ“ˆ</span>
        <div>
          <h3>${quizHistory.length} quiz sessions logged</h3>
          <p>${quizHistory.length ? "Mixed mode blends recent quiz topics with saved weak areas." : "Mixed mode can still start from your selected subject and topic."}</p>
        </div>
      </div>
    `;
  }

  function loadRevisionTopic(shouldStart) {
    const select = document.getElementById("revisionTopicSelect");
    const subjectField = document.getElementById("quizSubject");
    const topicField = document.getElementById("quizTopic");
    const difficultyField = document.getElementById("quizDifficulty");
    const countField = document.getElementById("quizCount");
    const form = document.getElementById("quizForm");
    const modeField = document.querySelector('input[name="revisionMode"]:checked');
    if (!select || !topicField || !subjectField) {
      return;
    }

    const mode = modeField ? modeField.value : "weak";
    const weakTopics = storage.getWeakTopics();
    const latest = storage.getQuizHistory()[0];
    const firstWeakTopic = weakTopics.length ? getWeakTopicLabel(weakTopics[0]) : "";
    const selectedTopic = select.value || "";
    const fallbackTopic = latest && latest.topic ? latest.topic : topicField.value.trim();
    const topic = mode === "mixed"
      ? selectedTopic || firstWeakTopic || fallbackTopic
      : selectedTopic || firstWeakTopic;

    if (!topic) {
      showToast("No revision target", mode === "weak" ? "Complete a quiz first so Weak Topics mode can prioritize saved mistakes." : "Choose a subject and topic, or complete a quiz to seed Mixed revision.", "warning");
      return;
    }

    if (!subjectField.value) {
      subjectField.value = latest && latest.subject ? latest.subject : "DSA";
    }
    topicField.value = topic;
    if (difficultyField) {
      difficultyField.value = "Medium";
    }
    if (countField) {
      countField.value = "5";
    }

    showToast("Revision loaded", mode === "mixed" ? "Mixed revision is ready using your recent practice context." : "Weak Topics revision is ready with priority on saved mistakes.", "success");
    if (shouldStart && form) {
      form.requestSubmit();
    }
  }

  function getWeakTopicLabel(topic) {
    return typeof topic === "string" ? topic : topic && (topic.topic || topic.title) ? topic.topic || topic.title : "";
  }

  function renderDashboardStats(values) {
    const container = document.getElementById("dashboardStats");
    if (!container) {
      return;
    }

    container.innerHTML = `
      ${renderStatCard("flame", "Streak", `${values.streak} days`, "Current consistency run.")}
      ${renderStatCard("bar-chart", "Progress", `${values.progress}%`, "Overall learning completion.")}
      ${renderStatCard("brain", "Quizzes", `${values.quizzesTaken}`, values.quizzesTaken ? "Practice sessions completed." : "No practice sessions yet.")}
    `;
  }

  function renderStatCard(icon, title, value, description) {
    return `
      <article class="stat-card">
        <div class="stat-icon">${iconSvg(icon)}</div>
        <h3>${escapeHtml(title)}</h3>
        <strong>${escapeHtml(value)}</strong>
        <p>${escapeHtml(description)}</p>
      </article>
    `;
  }

  function renderSnapshotRow(label, value) {
    return `
      <div class="snapshot-row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
  }

  function buildDashboardSuggestions(context) {
    const suggestions = [];

    if (!context.profile || !context.profile.name) {
      suggestions.push({ icon: "👤", title: "Finish onboarding", text: "Add your student name and main learning goal so Study Co-Pilot can personalize upcoming features." });
    }
    if (!context.roadmap.length) {
      suggestions.push({ icon: "🧭", title: "Create your first roadmap", text: "Roadmap planning will help break your big goal into visible milestones and study phases." });
    }
    if (!context.timetable.length) {
      suggestions.push({ icon: "🗓️", title: "Design a weekly timetable", text: "A realistic study schedule will make your dashboard feel actionable, not just informative." });
    }
    if (!context.quizHistory.length) {
      suggestions.push({ icon: "🧠", title: "Start quiz practice", text: "Use quizzes regularly to identify weak topics and reinforce recall." });
    }
    if (context.weakTopics.length) {
      suggestions.push({ icon: "🚨", title: "Revisit weak topics", text: "Spend your next focused session reviewing the concepts that caused recent mistakes." });
    }
    if (context.progress >= 50) {
      suggestions.push({ icon: "🚀", title: "You have momentum", text: "Your foundation is getting stronger. Keep the system steady and the results will compound." });
    }

    return suggestions.slice(0, 4).map(function (item) {
      return `
        <div class="stack-item">
          <span>${item.icon}</span>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  function getTodayTimetableSlots(timetable) {
    const list = Array.isArray(timetable) ? timetable : [];
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = days[new Date().getDay()];

    return list.filter(function (slot) {
      const dayValue = String(slot && (slot.day || slot.date || slot.label || "")).toLowerCase();
      return dayValue.includes(today) || dayValue === "daily" || dayValue === "everyday";
    }).slice(0, 4);
  }

  function getCurrentRoadmapMilestone(roadmap) {
    const roadmapList = getRoadmapPhases(roadmap);
    for (let phaseIndex = 0; phaseIndex < roadmapList.length; phaseIndex += 1) {
      const phase = roadmapList[phaseIndex];
      const topics = Array.isArray(phase && phase.topics) ? phase.topics : [];
      for (let topicIndex = 0; topicIndex < topics.length; topicIndex += 1) {
        const topic = topics[topicIndex];
        const isComplete = topic && (topic.status === "done" || topic.status === "completed");
        if (!isComplete) {
          return {
            title: topic && topic.title ? topic.title : (phase && (phase.title || phase.phase)) || "Start your first milestone",
            description: topic && topic.description ? topic.description : "Move one step at a time and mark progress as you go.",
            estimate: topic && topic.estimate ? topic.estimate : "1 week",
            phaseTitle: (phase && (phase.title || phase.phase)) || "Roadmap setup"
          };
        }
      }
    }

    if (roadmapList.length) {
      return {
        title: "Roadmap completed",
        description: "You have completed the saved roadmap structure. Time to level up your next learning goal.",
        estimate: "Completed",
        phaseTitle: "Milestone achieved"
      };
    }

    return {
      title: "Set up your roadmap",
      description: "Create or generate a roadmap to break your learning goal into practical milestones.",
      estimate: "Ready when you are",
      phaseTitle: "No roadmap yet"
    };
  }

  function getUpcomingCompetitions() {
    const competitions = seedData && seedData.competitions ? seedData.competitions : {};
    const coding = Array.isArray(competitions.codingCompetitions) ? competitions.codingCompetitions.slice(0, 2) : [];
    const hackathons = Array.isArray(competitions.hackathons) ? competitions.hackathons.slice(0, 1) : [];
    const certifications = Array.isArray(competitions.certificationExams) ? competitions.certificationExams.slice(0, 1) : [];
    return coding.concat(hackathons, certifications).slice(0, 4);
  }

  function getBadgePreview(badges) {
    const earnedBadgeIds = new Set((Array.isArray(badges) ? badges : []).map(function (badge) { return badge.id; }));
    const definitions = Array.isArray(seedData.badgeDefinitions) ? seedData.badgeDefinitions : [];
    return definitions.slice(0, 5).map(function (badge) {
      return {
        id: badge.id,
        title: badge.title,
        description: badge.description,
        icon: badge.icon || "🏅",
        earned: earnedBadgeIds.has(badge.id)
      };
    });
  }

  function renderRoadmapMilestone(milestone) {
    if (!milestone) {
      return renderInlineEmptyState("🧭", "No learning path yet", "Create your learning path to see your active milestone here.");
    }

    return `
      <div class="info-card">
        <div class="item-topline">
          <h3>${escapeHtml(milestone.title)}</h3>
          <span class="badge badge-primary">${escapeHtml(milestone.phaseTitle)}</span>
        </div>
        <p>${escapeHtml(milestone.description)}</p>
        <div class="info-meta">
          <span class="info-pill">⏳ ${escapeHtml(milestone.estimate)}</span>
        </div>
      </div>
    `;
  }

  function renderTodaysTimetable(slots) {
    if (!slots.length) {
      return renderInlineEmptyState("🗓️", "No study slots today", "Plan today's focus in the timetable page so your dashboard becomes action-oriented.");
    }

    return `
      <div class="schedule-list">
        ${slots.map(function (slot) {
          return `
            <div class="schedule-item">
              <div class="item-topline">
                <h3>${escapeHtml(slot.title || slot.subject || "Study Block")}</h3>
                <span class="badge badge-accent">${escapeHtml(slot.time || slot.duration || "Planned")}</span>
              </div>
              <p>${escapeHtml(slot.description || slot.note || slot.day || "A focused study session scheduled for today.")}</p>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderWeakTopicsPanel(weakTopics) {
    const topics = Array.isArray(weakTopics) ? weakTopics : [];
    if (!topics.length) {
      return renderInlineEmptyState("🎯", "No weak topics flagged", "After quiz practice, the most difficult topics will appear here for faster revision.");
    }

    return `
      <div class="weak-topics-list">
        ${topics.slice(0, 5).map(function (item) {
          return `
            <div class="weak-topic-item">
              <div class="item-topline">
                <h3>${escapeHtml(typeof item === "string" ? item : item.topic || item.title || "Weak Topic")}</h3>
                <span class="badge badge-warning">Needs review</span>
              </div>
              <p>${escapeHtml(typeof item === "string" ? "Prioritize this concept in your next revision session." : item.description || "This concept needs one more focused revision cycle.")}</p>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderCompetitionsPreview(items) {
    if (!items.length) {
      return renderInlineEmptyState("🏆", "No competition data", "Curated competitions will appear here so you can discover strong opportunities faster.");
    }

    return `
      <div class="competition-list">
        ${items.map(function (item) {
          return `
            <a class="competition-item" href="${escapeAttribute(item.link || "#")}" target="_blank" rel="noopener noreferrer">
              <div class="item-topline">
                <h3>${escapeHtml(item.name || "Competition")}</h3>
                <span class="badge badge-secondary">${escapeHtml(item.level || item.format || item.provider || "Opportunity")}</span>
              </div>
              <p>${escapeHtml(item.bestFor || item.category || item.domain || "A useful opportunity to sharpen your profile.")}</p>
            </a>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderBadgesPreview(items) {
    if (!items.length) {
      return renderInlineEmptyState("🏅", "No badges defined", "Badge milestones will appear here as soon as the app has more activity data.");
    }

    return `
      <div class="badge-list">
        ${items.map(function (badge) {
          return `
            <div class="badge-item ${badge.earned ? "is-earned" : "is-locked"}">
              <div class="item-topline">
                <h3>${escapeHtml(badge.icon)} ${escapeHtml(badge.title)}</h3>
                <span class="badge ${badge.earned ? "badge-success" : "badge-warning"}">${badge.earned ? "Earned" : "Locked"}</span>
              </div>
              <p>${escapeHtml(badge.description || "Milestone badge")}</p>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderInlineEmptyState(icon, title, description) {
    return `
      <div class="info-card">
        <div class="item-topline">
          <h3>${escapeHtml(icon)} ${escapeHtml(title)}</h3>
        </div>
        <p>${escapeHtml(description)}</p>
      </div>
    `;
  }

  function checkAndAwardBadges(streakValue) {
    const roadmap = storage.getRoadmap();
    const roadmapPhases = getRoadmapPhases(roadmap);
    const roadmapTopics = getAllRoadmapTopics(roadmap);
    const quizHistory = storage.getQuizHistory();
    const existingBadges = storage.getBadges();
    const badgeIds = new Set(existingBadges.map(function (badge) { return badge.id; }));
    const resourceVisits = getResourceVisitCount();
    const context = {
      profile: storage.getProfile(),
      streak: streakValue,
      roadmapPhases: roadmapPhases,
      roadmapTopics: roadmapTopics,
      quizHistory: quizHistory,
      timetable: storage.getTimetable(),
      progress: storage.calculateOverallProgress(),
      resourceVisits: resourceVisits
    };

    let hasNewBadge = false;

    BADGE_LIBRARY.forEach(function (badge) {
      if (!badgeIds.has(badge.id) && badge.condition(context)) {
        const meta = getBadgeMeta(badge.id);
        existingBadges.push({
          id: badge.id,
          title: meta.title || badge.title,
          icon: meta.icon || "🏅",
          earnedAt: new Date().toISOString()
        });
        hasNewBadge = true;
      }
    });

    if (hasNewBadge) {
      storage.saveBadges(existingBadges);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  window.StudyMindApp = {
    initializeApp: initializeApp,
    renderNavigation: renderNavigation,
    toggleTheme: toggleTheme,
    showToast: showToast,
    showLoading: showLoading,
    hideLoading: hideLoading,
    openSetupModal: openSetupModal,
    openApiSettingsModal: openApiSettingsModal,
    resetAllData: resetAllData,
    renderDashboard: renderDashboard,
    checkAndAwardBadges: checkAndAwardBadges,
    getRoadmapPhases: getRoadmapPhases
  };

  document.addEventListener("DOMContentLoaded", initializeApp);
})();


