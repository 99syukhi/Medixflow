(function () {
  "use strict";

  const body = document.body;

  // Elements
  const tabsContainer = document.querySelector(".tabs");
  const tabs = document.querySelectorAll(".tabs .tab[data-tab]");
  const underline = document.querySelector(".tabs .tab-underline");
  const panels = document.querySelectorAll(".panel[data-panel]");


  // Back link for page transition
  const backLink = document.querySelector(".back-btn");

  // Guard
  if (!tabsContainer || !tabs.length || !panels.length) return;

  
  // Page fade-in on load
  
  body.classList.add("is-entering");
  requestAnimationFrame(() => {
    body.classList.remove("is-entering");
  });

  
  // Responsive class toggling
  
  function applyResponsiveClass() {
    const w = window.innerWidth;

    body.classList.remove("is-mobile", "is-tablet", "is-desktop");

    if (w <= 767) body.classList.add("is-mobile");
    else if (w <= 1024) body.classList.add("is-tablet");
    else body.classList.add("is-desktop");

    // Reposition underline after layout changes
    const activeTab = document.querySelector(".tabs .tab.is-active") || tabs[0];
    moveUnderlineToTab(activeTab);
  }

  window.addEventListener("resize", applyResponsiveClass);
  applyResponsiveClass();

  
  // Sliding underline helper
  
  function moveUnderlineToTab(tabEl) {
    if (!underline || !tabEl) return;

    const tabRect = tabEl.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    
    const inset = 18; 
    const left = tabRect.left - containerRect.left + inset;
    const width = tabRect.width - inset * 2;

    underline.style.left = `${Math.max(0, left)}px`;
    underline.style.width = `${Math.max(30, width)}px`;
  }

  
  // Tabs + panel switching with animation
  
  function setActive(tabKey, animate = true) {
    tabs.forEach((t) => {
      const active = t.dataset.tab === tabKey;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");

      if (active) moveUnderlineToTab(t);
    });

    // Panels show/hide + smooth animation
    panels.forEach((p) => {
      const isTarget = p.dataset.panel === tabKey;

      if (isTarget) {
        p.classList.add("is-active");
        if (animate) {
          p.classList.remove("is-animating");
          void p.offsetWidth; // restart animation
          p.classList.add("is-animating");
        }
      } else {
        p.classList.remove("is-active", "is-animating");
      }
    });


    // scroll active panel to top when switching tabs
    if (animate) {
      const activePanel = document.querySelector(`.panel[data-panel="${tabKey}"]`);
      if (activePanel) activePanel.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Init default tab
  setActive("toekomstig", false);

  // On click
  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      setActive(t.dataset.tab, true);
    });
  });

  // Keyboard support (Left/Right arrows)
  tabsContainer.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;

    const tabArr = Array.from(tabs);
    const currentIndex = tabArr.findIndex((t) => t.classList.contains("is-active"));
    if (currentIndex < 0) return;

    const nextIndex =
      e.key === "ArrowRight"
        ? (currentIndex + 1) % tabArr.length
        : (currentIndex - 1 + tabArr.length) % tabArr.length;

    tabArr[nextIndex].focus?.();
    setActive(tabArr[nextIndex].dataset.tab, true);
  });

  // Ensure underline is placed correctly after full load (fonts/images can shift layout)
  window.addEventListener("load", () => {
    const activeTab = document.querySelector(".tabs .tab.is-active") || tabs[0];
    moveUnderlineToTab(activeTab);
  });

  
  // Page fade-out when navigating back
  
  if (backLink) {
    backLink.addEventListener("click", (e) => {
      e.preventDefault();
      const href = backLink.getAttribute("href");
      if (!href) return;

      body.classList.add("is-leaving");

      
      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  }
})();