/* ---------- Dados (os mesmos do separacao.js, com emoji) ---------- */
const TIPOS = {
  papel: { nome: "Papel", cor: "#1565c0", ic: "📄" },
  plastico: { nome: "Plástico", cor: "#c62828", ic: "🧴" },
  vidro: { nome: "Vidro", cor: "#2e7d32", ic: "🍾" },
  metal: { nome: "Metal", cor: "#f9a825", ic: "🥫" },
  organico: { nome: "Orgânico", cor: "#6d4c41", ic: "🍌" },
  rejeito: { nome: "Rejeito", cor: "#546e7a", ic: "🗑️" },
  especial: { nome: "Ponto de coleta", cor: "#bf360c", ic: "🔋" },
};
const ITENS = [
  ["Garrafa PET", "plastico", "Enxágue e amasse antes de descartar.", "🥤"],
  ["Frasco de shampoo", "plastico", "Enxágue antes de descartar.", "🧴"],
  ["Pote de iogurte", "plastico", "Enxágue antes de descartar.", "🍦"],
  [
    "Embalagem de salgadinho",
    "rejeito",
    "A parte metalizada mistura materiais e não é reciclada na maioria das cidades.",
    "🍟",
  ],
  ["Jornal", "papel", "Só se estiver seco e limpo.", "📰"],
  ["Caixa de papelão", "papel", "Desmonte para ocupar menos espaço.", "📦"],
  ["Papel higiênico usado", "rejeito", "Papel sujo ou usado não é reciclado.", "🧻"],
  ["Fralda", "rejeito", "Enrole bem antes de descartar.", "👶"],
  ["Guimba de cigarro", "rejeito", "Apague completamente antes de jogar fora.", "🚬"],
  ["Espelho", "rejeito", "O revestimento não se mistura ao vidro comum.", "🪞"],
  [
    "Prato de porcelana quebrado",
    "rejeito",
    "Cerâmica e porcelana não são recicláveis com o vidro.",
    "🍽️",
  ],
  [
    "Garrafa de vidro",
    "vidro",
    "Vazia. Se quebrar, embrulhe em jornal e identifique.",
    "🍾",
  ],
  [
    "Pote de conserva",
    "vidro",
    "Separe a tampa de metal e descarte na lixeira amarela.",
    "🫙",
  ],
  ["Lata de refrigerante", "metal", "Amasse para ocupar menos espaço.", "🥫"],
  ["Papel alumínio", "metal", "Limpo e amassado em uma bolinha.", "✨"],
  ["Casca de banana", "organico", "Ótima para compostagem.", "🍌"],
  ["Casca de ovo", "organico", "Pode ir na compostagem.", "🥚"],
  ["Borra de café", "organico", "O filtro de papel pode ir junto.", "☕"],
  [
    "Pilha",
    "especial",
    "Leve a um ponto de coleta. Mercados e lojas costumam ter.",
    "🔋",
  ],
  ["Lâmpada", "especial", "Não quebre. Leve a um ponto de coleta.", "💡"],
  ["Celular velho", "especial", "Eletrônicos têm ponto de coleta próprio.", "📱"],
  ["Remédio vencido", "especial", "Farmácias costumam receber.", "💊"],
  [
    "Óleo de cozinha usado",
    "especial",
    "Guarde em uma garrafa PET fechada e leve a um ponto de coleta.",
    "🛢️",
  ],
];

/* ---------- Configuração da pontuação ---------- */
const RODADA = 10;
const BASE = 100;
const BONUS_MAX = 50;
const TEMPO_BONUS = 8000;
const PENALIDADE = 50;
const PONTOS_APOS_ERRO = 20;
const COMBO_PASSO = 0.2;
const COMBO_MAX = 2;

const $ = (id) => document.getElementById(id);
const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const dur = (ms) => (reduz ? 1 : ms);
const palco = $("palco");
const msg = $("msg");
const lixeiras = $("lixeiras");
const barraTempo = $("tempo");
const barraBonus = document.querySelector(".barra");
const fim = $("fim");
let fila, idx, pontos, seq, acertos, erros, inicio, travado, itemEl, errouNeste;
let raf;
let recorde = 0;
const ordem = Object.keys(TIPOS);

try {
  const salvo = Number(localStorage.getItem("recicla-recorde"));
  recorde = Number.isFinite(salvo) && salvo > 0 ? salvo : 0;
} catch (e) {
  console.warn("Não foi possível ler o recorde salvo.", e);
}
$("rec").textContent = recorde;

/* Monta as lixeiras */
ordem.forEach((t, i) => {
  const b = document.createElement("button");
  b.className = "bin";
  b.dataset.tipo = t;
  b.style.setProperty("--cor", TIPOS[t].cor);
  b.setAttribute("aria-label", `${TIPOS[t].nome} (tecla ${i + 1})`);
  const tampa = document.createElement("div");
  tampa.className = "tampa";
  const corpo = document.createElement("div");
  corpo.className = "corpo";
  corpo.textContent = TIPOS[t].ic;
  const rotulo = document.createElement("span");
  rotulo.className = "rot";
  rotulo.textContent = `${i + 1}. ${TIPOS[t].nome}`;
  b.append(tampa, corpo, rotulo);
  b.addEventListener("click", () => resolver(t, b));
  lixeiras.appendChild(b);
});

const multiplicador = () =>
  Math.min(COMBO_MAX, 1 + seq * COMBO_PASSO);

function atualizarPlacar() {
  $("pts").textContent = pontos;
  $("combo").textContent = "x" + multiplicador().toFixed(1).replace(".", ",");
  $("prog").textContent = `${Math.min(idx + 1, RODADA)}/${RODADA}`;
}

function novoJogo() {
  const baralho = [...ITENS];
  for (let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
  }
  fila = baralho.slice(0, RODADA);
  idx = 0;
  pontos = 0;
  seq = 0;
  acertos = 0;
  erros = 0;
  travado = false;
  cancelAnimationFrame(raf);
  fim.classList.remove("on");
  mostrarItem();
}

function mostrarItem() {
  if (itemEl) itemEl.remove();
  const [nome, , , emo] = fila[idx];
  itemEl = document.createElement("div");
  itemEl.id = "item";
  const emoji = document.createElement("div");
  emoji.className = "emo";
  emoji.textContent = emo;
  const nomeItem = document.createElement("div");
  nomeItem.className = "nome";
  nomeItem.textContent = nome;
  itemEl.append(emoji, nomeItem);
  itemEl.setAttribute("aria-label", "Objeto: " + nome);
  palco.insertBefore(itemEl, msg);
  errouNeste = false;
  travado = false;
  msg.textContent = "";
  msg.className = "";
  atualizarPlacar();
  prepararArraste();
  inicio = performance.now();
  atualizarBarraTempo();
}

function atualizarBarraTempo() {
  cancelAnimationFrame(raf);
  const tick = () => {
    if (travado || !itemEl) return;
    const f = Math.max(0, 1 - (performance.now() - inicio) / TEMPO_BONUS);
    barraTempo.style.transform = `scaleX(${f})`;
    barraTempo.style.background = f > 0.4 ? "var(--verde)" : "#f9a825";
    barraBonus.setAttribute("aria-valuenow", String(Math.round(f * 100)));
    raf = requestAnimationFrame(tick);
  };
  tick();
}

/* ---------- Arrastar ---------- */
let pos = { x: 0, y: 0, r: 0 };

function prepararArraste() {
  pos = { x: 0, y: 0, r: 0 };
  let ini = null;
  let alvoAtual = null;
  const el = itemEl;

  el.addEventListener("pointerdown", (e) => {
    if (travado) return;
    el.setPointerCapture(e.pointerId);
    ini = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    el.classList.add("solto");
  });
  el.addEventListener("pointermove", (e) => {
    if (!ini) return;
    pos.x = e.clientX - ini.x;
    pos.y = e.clientY - ini.y;
    pos.r = Math.max(
      -18,
      Math.min(18, (e.movementX || 0) * 1.2 + pos.r * 0.85),
    );
    el.style.transform = `translate(${pos.x}px,${pos.y}px) rotate(${pos.r}deg)`;
    const b = binSob(e.clientX, e.clientY);
    if (b !== alvoAtual) {
      alvoAtual?.classList.remove("alvo");
      b?.classList.add("alvo");
      alvoAtual = b;
    }
  });
  const soltar = (e) => {
    if (!ini) return;
    ini = null;
    el.classList.remove("solto");
    alvoAtual?.classList.remove("alvo");
    const b = binSob(e.clientX, e.clientY);
    alvoAtual = null;
    if (b) resolver(b.dataset.tipo, b);
    else voltar(el, 280);
  };
  const cancelar = () => {
    if (!ini) return;
    ini = null;
    alvoAtual?.classList.remove("alvo");
    alvoAtual = null;
    el.classList.remove("solto");
    voltar(el, 280);
  };
  el.addEventListener("pointerup", soltar);
  el.addEventListener("pointercancel", cancelar);
}

const binSob = (x, y) =>
  document
    .elementsFromPoint(x, y)
    .map((n) => n.closest?.(".bin"))
    .find(Boolean) || null;

function voltar(el, ms) {
  const de = `translate(${pos.x}px,${pos.y}px) rotate(${pos.r}deg)`;
  const a = el.animate(
    [{ transform: de }, { transform: "translate(0,0) rotate(0)" }],
    { duration: dur(ms), easing: "cubic-bezier(.3,1.5,.5,1)" },
  );
  pos = { x: 0, y: 0, r: 0 };
  return a.finished.finally(() => {
    a.cancel();
    el.style.transform = "";
  });
}

/* ---------- Resolver jogada ---------- */
async function resolver(tipo, bin) {
  if (travado || !itemEl || !TIPOS[tipo] || !bin) return;
  const bonus = Math.round(
    BONUS_MAX * Math.max(0, 1 - (performance.now() - inicio) / TEMPO_BONUS),
  );
  travado = true;
  cancelAnimationFrame(raf);
  const [nome, certo, nota] = fila[idx];
  const el = itemEl;
  const r0 = el.getBoundingClientRect();
  const rb = bin.getBoundingClientRect();
  const centroRepouso = {
    x: r0.left + r0.width / 2 - pos.x,
    y: r0.top + r0.height / 2 - pos.y,
  };
  const boca = {
    x: rb.left + rb.width / 2 - centroRepouso.x,
    y: rb.top - 36 - centroRepouso.y,
  };
  const transformar = (x, y, rotacao, escala = 1) =>
    `translate(${x}px,${y}px) rotate(${rotacao}deg) scale(${escala})`;

  bin.classList.add("alvo");
  const voo = el.animate(
    [
      { transform: transformar(pos.x, pos.y, pos.r) },
      {
        transform: transformar(
          (pos.x + boca.x) / 2,
          Math.min(pos.y, boca.y) - 50,
          pos.r + 10,
        ),
        offset: 0.5,
      },
      { transform: transformar(boca.x, boca.y, 24) },
    ],
    { duration: dur(420), easing: "cubic-bezier(.25,.6,.4,1)", fill: "forwards" },
  );
  await voo.finished;

  if (tipo === certo) {
    el.style.zIndex = 2;
    const queda = el.animate(
      [
        { transform: transformar(boca.x, boca.y, 24), opacity: 1 },
        {
          transform: transformar(
            boca.x + 4,
            boca.y + rb.height * 0.55,
            34,
            0.7,
          ),
          opacity: 1,
          offset: 0.85,
        },
        {
          transform: transformar(
            boca.x + 4,
            boca.y + rb.height * 0.7,
            36,
            0.55,
          ),
          opacity: 0,
        },
      ],
      { duration: dur(380), easing: "cubic-bezier(.6,0,1,.5)", fill: "forwards" },
    );
    await queda.finished;
    bin.classList.remove("alvo");
    bin.classList.add("bate");
    setTimeout(() => bin.classList.remove("bate"), 450);

    let ganho;
    if (errouNeste) {
      ganho = PONTOS_APOS_ERRO;
      seq = 0;
    } else {
      ganho = Math.round((BASE + bonus) * multiplicador());
      seq++;
      acertos++;
    }
    pontos += ganho;
    flutuar(`+${ganho}`, rb, "#2e7d32");
    msg.className = "ok";
    msg.textContent = `${nome}: ${nota}`;
    const p = $("pts");
    p.classList.remove("sobe");
    void p.offsetWidth;
    p.classList.add("sobe");
    atualizarPlacar();
    idx++;
    setTimeout(() => (idx >= RODADA ? terminar() : mostrarItem()), dur(1100));
  } else {
    bin.classList.remove("alvo");
    bin.classList.add("treme");
    setTimeout(() => bin.classList.remove("treme"), 420);
    const certaEl = lixeiras.querySelector(`[data-tipo="${certo}"]`);
    certaEl.classList.add("dica");
    setTimeout(() => certaEl.classList.remove("dica"), 1900);
    errouNeste = true;
    erros++;
    seq = 0;
    pontos = Math.max(0, pontos - PENALIDADE);
    flutuar(`-${PENALIDADE}`, rb, "#c62828");
    msg.className = "erro";
    msg.textContent = `${nome} não vai em ${TIPOS[tipo].nome}. Tente a lixeira que está piscando.`;
    atualizarPlacar();
    pos = { x: boca.x, y: boca.y, r: 24 };
    await el.animate(
      [
        { transform: transformar(boca.x, boca.y, 24) },
        {
          transform: transformar(boca.x + 30, boca.y - 70, -20),
          offset: 0.4,
        },
        { transform: "translate(0,0) rotate(0)" },
      ],
      { duration: dur(520), easing: "cubic-bezier(.3,.7,.5,1)", fill: "forwards" },
    ).finished;
    pos = { x: 0, y: 0, r: 0 };
    el.getAnimations().forEach((a) => a.cancel());
    el.style.transform = "";
    inicio = performance.now();
    travado = false;
    atualizarBarraTempo();
  }
}

function flutuar(texto, rb, cor) {
  const f = document.createElement("div");
  f.className = "flut";
  f.textContent = texto;
  f.style.color = cor;
  f.style.left = `${rb.left + rb.width / 2 - 18}px`;
  f.style.top = `${rb.top - 10}px`;
  document.body.appendChild(f);
  f.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: "translateY(-60px)", opacity: 0 },
    ],
    { duration: dur(900), easing: "ease-out" },
  ).finished.then(() => f.remove());
}

function terminar() {
  cancelAnimationFrame(raf);
  if (itemEl) itemEl.remove();
  itemEl = null;
  const novo = pontos > recorde;
  if (novo) {
    recorde = pontos;
    try {
      localStorage.setItem("recicla-recorde", recorde);
    } catch (e) {
      console.warn("Não foi possível salvar o recorde.", e);
    }
  }
  $("rec").textContent = recorde;
  const nivel =
    pontos >= 1500
      ? "Mestre da Reciclagem"
      : pontos >= 900
        ? "Separador Experiente"
        : "Aprendiz da Separação";
  $("fim-t").textContent = nivel;
  $("fim-p").textContent = `${pontos} pontos${novo ? " (novo recorde!)" : ""}`;
  $("fim-r").textContent = `${acertos} de ${RODADA} de primeira, ${erros} ${erros === 1 ? "erro" : "erros"}.`;
  fim.classList.add("on");
  $("again").focus();
}

$("again").addEventListener("click", novoJogo);
window.addEventListener("keydown", (e) => {
  const alvo = e.target;
  if (
    e.altKey ||
    e.ctrlKey ||
    e.metaKey ||
    (alvo instanceof HTMLElement &&
      (alvo.isContentEditable || alvo.matches("input, textarea, select"))) ||
    fim.classList.contains("on")
  ) {
    return;
  }

  const n = Number(e.key);
  if (Number.isInteger(n) && n >= 1 && n <= ordem.length) {
    e.preventDefault();
    resolver(ordem[n - 1], lixeiras.children[n - 1]);
  }
});

novoJogo();
