(() => {
  const themeButton = document.querySelector(".theme-toggle");

  if (!themeButton) {
    return;
  }

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
      "aria-label",
      isDark ? "Ativar modo claro" : "Ativar modo escuro",
    );
    themeButton.textContent = isDark ? "☀ Modo claro" : "☾ Modo escuro";
  };

  applyTheme(localStorage.getItem("recicla-me-theme"));

  themeButton.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("recicla-me-theme", nextTheme);
    applyTheme(nextTheme);
  });
})();
