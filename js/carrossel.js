/* carrossel.js - carrossel educativo da pagina separacao.html */
(() => {
  const raiz = document.querySelector("[data-carrossel]");
  if (!raiz) return;

  const viewport = raiz.querySelector(".rc-viewport");
  const trilho = raiz.querySelector(".rc-track");
  const slides = Array.from(raiz.querySelectorAll(".rc-slide"));
  const pontos = raiz.querySelector(".rc-dots");
  const anterior = raiz.querySelector("[data-anterior]");
  const proximo = raiz.querySelector("[data-proximo]");
  const barra = raiz.querySelector(".rc-barra span");
  const status = raiz.querySelector(".rc-status");
  let atual = 0;

  raiz.classList.add("is-ativo");

  const botoes = slides.map((slide, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "rc-dot";
    b.setAttribute("aria-label", `Ir para o passo ${n + 1}: ${slide.dataset.titulo}`);
    b.addEventListener("click", () => ir(n));
    pontos.appendChild(b);
    return b;
  });

  function ir(n) {
    atual = Math.max(0, Math.min(slides.length - 1, n));
    trilho.style.transform = `translateX(${-100 * atual}%)`;
    slides.forEach((s, k) => {
      s.inert = k !== atual;
      s.setAttribute("aria-hidden", String(k !== atual));
    });
    botoes.forEach((b, k) => b.setAttribute("aria-current", String(k === atual)));
    anterior.disabled = atual === 0;
    proximo.disabled = atual === slides.length - 1;
    barra.style.width = `${((atual + 1) / slides.length) * 100}%`;
    status.textContent = `Passo ${atual + 1} de ${slides.length}: ${slides[atual].dataset.titulo}`;
  }

  anterior.addEventListener("click", () => ir(atual - 1));
  proximo.addEventListener("click", () => ir(atual + 1));

  raiz.addEventListener("keydown", (e) => {
    if (e.target.matches("input")) return;
    if (e.key === "ArrowLeft") { ir(atual - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { ir(atual + 1); e.preventDefault(); }
  });

  let inicioX = null;
  viewport.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 50) ir(atual + (dx < 0 ? 1 : -1));
    inicioX = null;
  });

  ir(0);
})();
