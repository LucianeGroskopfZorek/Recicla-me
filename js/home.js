/* ==========================================================
   home.js - desafio das lixeiras e dica rápida (Recicla-me)
   Carregue com: <script src="js/home.js" defer></script>
   ========================================================== */

/* ---------- Desafio: em qual lixeira eu jogo? ---------- */
(() => {
  const jogo = document.getElementById("quiz-jogo");
  if (!jogo) return;

  const TOTAL = 6; // quantos itens por rodada

  const itens = [
    {
      nome: "Caixa de papelão",
      emoji: "📦",
      tipo: "papel",
      info: "Papelão limpo e seco é reciclável. Desmonte a caixa para ocupar menos espaço.",
    },
    {
      nome: "Jornal velho",
      emoji: "📰",
      tipo: "papel",
      info: "Jornal seco vai para a reciclagem. Molhado ou engordurado, não.",
    },
    {
      nome: "Frasco de shampoo vazio",
      emoji: "🧴",
      tipo: "plastico",
      info: "Enxágue antes de descartar. Resto de produto atrapalha a reciclagem.",
    },
    {
      nome: "Copo descartável de plástico",
      emoji: "🥤",
      tipo: "plastico",
      info: "Enxágue e descarte junto com os plásticos.",
    },
    {
      nome: "Garrafa de vidro",
      emoji: "🍾",
      tipo: "vidro",
      info: "Vidro inteiro vai na lixeira verde. Se estiver quebrado, embrulhe em jornal e avise quem coleta.",
    },
    {
      nome: "Lata de milho vazia",
      emoji: "🥫",
      tipo: "metal",
      info: "Lave e amasse a lata para ocupar menos espaço na coleta.",
    },
    {
      nome: "Casca de banana",
      emoji: "🍌",
      tipo: "organico",
      info: "Restos de comida viram adubo na compostagem.",
    },
    {
      nome: "Espelho quebrado",
      emoji: "🪞",
      tipo: "rejeito",
      info: "O espelho tem um revestimento que não se mistura ao vidro comum, então não é reciclável.",
    },
    {
      nome: "Papel higiênico usado",
      emoji: "🧻",
      tipo: "rejeito",
      info: "Papel sujo ou usado não é reciclado. Vai no lixo comum.",
    },
    {
      nome: "Embalagem de salgadinho",
      emoji: "🍟",
      tipo: "rejeito",
      info: "A parte de dentro é metalizada e mistura materiais. Na maioria das cidades, não é reciclada.",
    },
  ];

  const nomesLixeira = {
    papel: "de papel (azul)",
    plastico: "de plástico (vermelha)",
    vidro: "de vidro (verde)",
    metal: "de metal (amarela)",
    organico: "de orgânico (marrom)",
    rejeito: "de rejeito (cinza)",
  };

  const el = (id) => document.getElementById(id);
  const emoji = el("quiz-emoji");
  const nome = el("quiz-nome");
  const progresso = el("quiz-progresso");
  const placar = el("quiz-placar");
  const barra = el("quiz-barra");
  const feedback = el("quiz-feedback");
  const proxima = el("quiz-proxima");
  const opcoes = el("quiz-opcoes");
  const resultado = el("quiz-resultado");
  const resultadoTexto = el("quiz-resultado-texto");
  const reiniciar = el("quiz-reiniciar");
  const botoes = Array.from(opcoes.querySelectorAll(".rc-lixeira"));

  let fila = [];
  let indice = 0;
  let acertos = 0;
  let respondido = false;

  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function iniciar() {
    fila = embaralhar(itens).slice(0, TOTAL);
    indice = 0;
    acertos = 0;
    resultado.hidden = true;
    jogo.hidden = false;
    mostrar();
  }

  function mostrar() {
    const item = fila[indice];
    respondido = false;

    emoji.textContent = item.emoji;
    emoji.classList.remove("rc-cai");
    nome.textContent = item.nome;
    progresso.textContent = "Item " + (indice + 1) + " de " + TOTAL;
    placar.textContent = "Acertos: " + acertos;
    barra.style.width = (indice / TOTAL) * 100 + "%";
    feedback.textContent = "Escolha a lixeira certa.";
    proxima.hidden = true;

    opcoes.classList.remove("rc-respondido");
    botoes.forEach((b) => b.classList.remove("rc-certo", "rc-errado"));

    if (indice > 0) botoes[0].focus({ preventScroll: true });
  }

  opcoes.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".rc-lixeira");
    if (!botao || respondido) return;

    respondido = true;
    const item = fila[indice];
    const acertou = botao.dataset.tipo === item.tipo;
    if (acertou) acertos++;

    opcoes.classList.add("rc-respondido");
    opcoes
      .querySelector('[data-tipo="' + item.tipo + '"]')
      .classList.add("rc-certo");
    if (!acertou) botao.classList.add("rc-errado");

    emoji.classList.add("rc-cai");
    placar.textContent = "Acertos: " + acertos;
    barra.style.width = ((indice + 1) / TOTAL) * 100 + "%";

    feedback.textContent =
      (acertou
        ? "Acertou! "
        : "Ainda não. A lixeira certa é a " + nomesLixeira[item.tipo] + ". ") +
      item.info;

    proxima.textContent =
      indice === TOTAL - 1 ? "Ver resultado" : "Próximo item";
    proxima.hidden = false;
    proxima.focus({ preventScroll: true });
  });

  proxima.addEventListener("click", () => {
    if (indice < TOTAL - 1) {
      indice++;
      mostrar();
      return;
    }

    jogo.hidden = true;
    resultado.hidden = false;

    if (acertos === TOTAL) {
      resultadoTexto.textContent =
        "Perfeito! Você acertou " + acertos + " de " + TOTAL + ".";
    } else if (acertos >= 4) {
      resultadoTexto.textContent =
        "Muito bom! Você acertou " + acertos + " de " + TOTAL + ".";
    } else {
      resultadoTexto.textContent =
        "Você acertou " +
        acertos +
        " de " +
        TOTAL +
        ". Veja a página de separação e tente de novo.";
    }
    reiniciar.focus({ preventScroll: true });
  });

  reiniciar.addEventListener("click", iniciar);

  iniciar();
})();

/* ---------- Dica rápida ---------- */
(() => {
  const botao = document.getElementById("dica-botao");
  const texto = document.getElementById("dica-texto");
  if (!botao || !texto) return;

  const dicas = [
    "Lave rapidamente as embalagens antes de separar. Sobras de comida estragam o material reciclável.",
    "Amasse latas e garrafas PET para levar mais material em cada coleta.",
    "Entulho não vai na lixeira de casa. Procure uma caçamba ou o ponto de descarte do seu município.",
    "Leve sacolas reutilizáveis ao mercado e use menos sacolas plásticas.",
    "Pilhas, baterias e lâmpadas têm ponto de coleta próprio. Não jogue no lixo comum.",
    "Restos de frutas e verduras podem virar adubo em uma composteira caseira.",
    "Óleo de cozinha usado nunca vai na pia. Guarde em uma garrafa PET e leve a um ponto de coleta.",
  ];

  let ultima = 0; // a dica que já está escrita no HTML

  botao.addEventListener("click", () => {
    let n;
    do {
      n = Math.floor(Math.random() * dicas.length);
    } while (n === ultima);
    ultima = n;
    texto.textContent = dicas[n];
  });
})();
