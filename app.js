const modal = document.getElementById("modal");
const openBtn = document.getElementById("open-menu-btn");
const closeBtn = document.getElementById("close-menu-btn");

if (modal && openBtn && closeBtn) {
  const KEY_ESC = "Escape";

  function openMenu() {
    modal.removeAttribute("hidden");
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    modal.setAttribute("hidden", "");
    modal.setAttribute("aria-hidden", "true");
    openBtn.focus();

    document.removeEventListener("keydown", onKeyDown);
    document.body.style.overflow = "auto";
  }

  function onKeyDown(e) {
    if (e.key === KEY_ESC) {
      closeMenu();
    }
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  // ensure clicking outside the menu (on the overlay) closes it
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMenu();
  });

  // Trap focus inside modal when open
  modal.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") !== "false") return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
} else {
  // graceful fallback: at least avoid throwing errors in console
  console.warn("Menu script: required elements not found.");
}
