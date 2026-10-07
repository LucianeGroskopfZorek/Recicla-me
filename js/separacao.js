/* ==========================================================
   separacao.js - guia das lixeiras e busca "Onde jogo isto?"
   ========================================================== */

const tipos = {
  papel: { nome: "Lixeira azul (papel)", cor: "#1565c0" },
  plastico: { nome: "Lixeira vermelha (plástico)", cor: "#c62828" },
  vidro: { nome: "Lixeira verde (vidro)", cor: "#2e7d32" },
  metal: { nome: "Lixeira amarela (metal)", cor: "#f9a825" },
  organico: { nome: "Lixeira marrom (orgânico)", cor: "#6d4c41" },
  rejeito: { nome: "Lixeira cinza (rejeito)", cor: "#546e7a" },
  especial: { nome: "Ponto de coleta", cor: "#bf360c" },
};

const itens = [
  ["Garrafa PET", "plastico", "Enxágue e amasse antes de descartar."],
  ["Frasco de shampoo", "plastico", "Enxágue antes de descartar."],
  ["Pote de iogurte", "plastico", "Enxágue antes de descartar."],
  ["Copo descartável", "plastico", "Enxágue e descarte junto com os plásticos."],
  ["Sacola plástica", "plastico", "Só se estiver limpa e seca."],
  [
    "Embalagem de salgadinho",
    "rejeito",
    "A parte metalizada mistura materiais e não é reciclada na maioria das cidades.",
  ],
  ["Jornal", "papel", "Só se estiver seco e limpo."],
  ["Revista", "papel", "Mantenha seca e limpa."],
  ["Caixa de papelão", "papel", "Desmonte para ocupar menos espaço."],
  [
    "Caixa de pizza",
    "papel",
    "Só a parte limpa. A parte com gordura vai no rejeito.",
  ],
  ["Folha de caderno", "papel", "Pode ir inteira, amassada ou picada."],
  ["Papel higiênico usado", "rejeito", "Papel sujo ou usado não é reciclado."],
  ["Guardanapo usado", "rejeito", "Papel sujo não é reciclado."],
  ["Fralda", "rejeito", "Enrole bem antes de descartar."],
  ["Absorvente", "rejeito", "Enrole bem antes de descartar."],
  ["Guimba de cigarro", "rejeito", "Apague completamente antes de jogar fora."],
  [
    "Espelho",
    "rejeito",
    "O revestimento não se mistura ao vidro comum. Embrulhe os cacos com cuidado.",
  ],
  [
    "Prato de porcelana quebrado",
    "rejeito",
    "Cerâmica e porcelana não são recicláveis com o vidro.",
  ],
  [
    "Garrafa de vidro",
    "vidro",
    "Vazia. Se quebrar, embrulhe em jornal e identifique.",
  ],
  [
    "Pote de conserva",
    "vidro",
    "Separe a tampa de metal e descarte na lixeira amarela.",
  ],
  ["Lata de refrigerante", "metal", "Amasse para ocupar menos espaço."],
  ["Lata de atum", "metal", "Lave antes de descartar."],
  ["Papel alumínio", "metal", "Limpo e amassado em uma bolinha."],
  ["Tampinha de metal", "metal", "Junte várias em um pote."],
  ["Casca de banana", "organico", "Ótima para compostagem."],
  ["Casca de ovo", "organico", "Pode ir na compostagem."],
  ["Borra de café", "organico", "O filtro de papel pode ir junto."],
  [
    "Resto de comida",
    "organico",
    "Se a compostagem for caseira, evite carne e laticínios.",
  ],
  ["Pilha", "especial", "Leve a um ponto de coleta. Mercados e lojas costumam ter."],
  ["Bateria", "especial", "Leve a um ponto de coleta."],
  ["Lâmpada", "especial", "Não quebre. Leve a um ponto de coleta."],
  ["Celular velho", "especial", "Eletrônicos têm ponto de coleta próprio."],
  ["Remédio vencido", "especial", "Farmácias costumam receber."],
  [
    "Óleo de cozinha usado",
    "especial",
    "Guarde em uma garrafa PET fechada e leve a um ponto de coleta.",
  ],
  [
    "Lata de tinta",
    "especial",
    "Tinta e solvente são resíduos perigosos. Nunca vão no lixo comum.",
  ],
];

/* ---------- Guia das lixeiras ---------- */
(() => {
  const opcoes = document.getElementById("guia-opcoes");
  const painel = document.getElementById("guia-painel");
  if (!opcoes || !painel) return;

  const guia = {
    papel: {
      titulo: "Lixeira azul: papel",
      vai: [
        "Jornais e revistas",
        "Caixas de papelão",
        "Folhas de caderno e envelopes",
        "Embalagens de papel limpas",
      ],
      nao: [
        "Papel higiênico e guardanapo usado",
        "Papel engordurado",
        "Fita adesiva e etiquetas",
        "Papel molhado ou sujo",
      ],
      dica: "Mantenha o papel seco e limpo. Desmonte as caixas para ocupar menos espaço.",
    },
    plastico: {
      titulo: "Lixeira vermelha: plástico",
      vai: [
        "Garrafas PET",
        "Frascos de limpeza e higiene",
        "Potes, tampas e copos descartáveis",
        "Sacolas limpas e secas",
      ],
      nao: [
        "Embalagem metalizada de salgadinho",
        "Cabo de panela e tomadas",
        "Plástico com restos de comida",
        "Fraldas e absorventes",
      ],
      dica: "Enxágue rapidamente e amasse as embalagens antes de descartar.",
    },
    vidro: {
      titulo: "Lixeira verde: vidro",
      vai: [
        "Garrafas",
        "Potes de conserva",
        "Frascos de perfume e de remédio vazios",
      ],
      nao: [
        "Espelhos",
        "Vidro de janela e para-brisa",
        "Lâmpadas",
        "Cerâmica e porcelana",
      ],
      dica: 'Se o vidro quebrar, embrulhe os cacos em jornal e escreva "vidro" por fora.',
    },
    metal: {
      titulo: "Lixeira amarela: metal",
      vai: [
        "Latas de refrigerante e de conserva",
        "Tampinhas de metal",
        "Papel alumínio limpo",
        "Panelas velhas sem cabo",
      ],
      nao: [
        "Esponja de aço",
        "Latas de tinta e de aerossol com resto de produto",
        "Pilhas e baterias",
        "Clipes e grampos pequenos",
      ],
      dica: "Lave e amasse as latas. Tampinhas rendem mais se forem juntadas em um pote.",
    },
    organico: {
      titulo: "Lixeira marrom: orgânico",
      vai: [
        "Cascas e restos de frutas e verduras",
        "Borra de café e sachê de chá",
        "Cascas de ovo",
        "Folhas e podas pequenas",
      ],
      nao: [
        "Óleo de cozinha",
        "Fezes de animais",
        "Plásticos e embalagens",
        "Carne e laticínios, se a compostagem for caseira",
      ],
      dica: "Restos orgânicos viram adubo. Uma composteira caseira reduz o lixo da sua casa.",
    },
    rejeito: {
      titulo: "Lixeira cinza: rejeito",
      vai: [
        "Papel higiênico, fraldas e absorventes",
        "Guimbas de cigarro",
        "Espelhos",
        "Cerâmica e porcelana quebradas",
        "Embalagens metalizadas",
      ],
      nao: [
        "Recicláveis limpos",
        "Pilhas, baterias e lâmpadas",
        "Remédios vencidos",
        "Eletrônicos",
      ],
      dica: "Rejeito é o que sobra depois de separar tudo. Quanto mais você separa, menos lixo vai para o aterro.",
    },
    especial: {
      titulo: "Ponto de coleta: resíduos especiais",
      vai: [
        "Pilhas e baterias",
        "Lâmpadas",
        "Eletrônicos velhos",
        "Remédios vencidos",
        "Óleo de cozinha usado",
        "Tintas e solventes",
      ],
      nao: ["Nenhum deles vai no lixo comum nem na reciclagem"],
      dica: "Procure pontos de coleta em mercados, farmácias e lojas de eletrônicos, ou pergunte à prefeitura.",
    },
  };

  const botoes = Array.from(opcoes.querySelectorAll(".rc-lixeira"));
  const titulo = document.getElementById("guia-titulo");
  const vai = document.getElementById("guia-vai");
  const nao = document.getElementById("guia-nao");
  const dica = document.getElementById("guia-dica");

  function preencher(lista, itens) {
    lista.textContent = "";
    itens.forEach((texto) => {
      const li = document.createElement("li");
      li.textContent = texto;
      lista.appendChild(li);
    });
  }

  function mostrar(tipo) {
    const dados = guia[tipo];
    const botao = botoes.find((b) => b.dataset.tipo === tipo);
    if (!dados || !botao) return;

    botoes.forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
    painel.style.setProperty(
      "--cor",
      getComputedStyle(botao).getPropertyValue("--cor").trim(),
    );
    titulo.textContent = dados.titulo;
    preencher(vai, dados.vai);
    preencher(nao, dados.nao);
    dica.textContent = dados.dica;
  }

  opcoes.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".rc-lixeira");
    if (botao) mostrar(botao.dataset.tipo);
  });

  mostrar("papel");
})();

/* ---------- Busca: onde jogo isto? ---------- */
(() => {
  const campo = document.getElementById("busca-campo");
  const lista = document.getElementById("busca-resultado");
  const msg = document.getElementById("busca-msg");
  if (!campo || !lista || !msg) return;

  const normalizar = (texto) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  function buscar() {
    const termo = normalizar(campo.value);
    lista.textContent = "";
    msg.textContent = "";
    if (termo.length < 2) return;

    const achados = itens
      .filter((i) => normalizar(i[0]).includes(termo))
      .slice(0, 6);

    if (achados.length === 0) {
      msg.textContent =
        "Não achei esse item. Tente outra palavra, como garrafa, jornal ou casca.";
      return;
    }

    achados.forEach(([nome, tipo, nota]) => {
      const li = document.createElement("li");
      li.className = "rc-resultado-item";
      li.style.setProperty("--cor", tipos[tipo].cor);

      const titulo = document.createElement("strong");
      titulo.textContent = nome;
      const lixeira = document.createElement("span");
      lixeira.className = "rc-resultado-item__lixeira";
      lixeira.textContent = tipos[tipo].nome;
      const obs = document.createElement("p");
      obs.textContent = nota;

      li.append(titulo, lixeira, obs);
      lista.appendChild(li);
    });
  }

  campo.addEventListener("input", buscar);

  document.querySelectorAll(".rc-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      campo.value = chip.dataset.termo;
      buscar();
      campo.focus();
    });
  });
})();

/* ---------- Quiz: teste o que você aprendeu ---------- */
(() => {
  const perguntaElemento = document.getElementById("quiz-pergunta");
  const opcoesElemento = document.getElementById("quiz-opcoes");
  const progressoElemento = document.getElementById("quiz-progresso");
  const feedbackElemento = document.getElementById("quiz-feedback");
  const finalElemento = document.getElementById("quiz-final");
  const proximaBotao = document.getElementById("quiz-proxima");
  const reiniciarBotao = document.getElementById("quiz-reiniciar");

  if (
    !perguntaElemento ||
    !opcoesElemento ||
    !progressoElemento ||
    !feedbackElemento ||
    !finalElemento ||
    !proximaBotao ||
    !reiniciarBotao
  ) {
    return;
  }

  const opcoesDeLixeira = Object.values(tipos).map((tipo) => tipo.nome);
  const perguntas = itens.map(([nome, tipo, explicacao]) => ({
    pergunta: `Em qual lixeira vai: ${nome}?`,
    opcoes: opcoesDeLixeira,
    correta: tipos[tipo].nome,
    explicacao,
  }));

  perguntas.push({
    pergunta: "Qual cor de lixeira recebe embalagens de vidro?",
    opcoes: opcoesDeLixeira,
    correta: tipos.vidro.nome,
    explicacao:
      "No padrão brasileiro de coleta seletiva, a lixeira verde recebe embalagens de vidro.",
  });

  function embaralhar(lista) {
    const resultado = [...lista];
    for (let indice = resultado.length - 1; indice > 0; indice -= 1) {
      const troca = Math.floor(Math.random() * (indice + 1));
      [resultado[indice], resultado[troca]] = [
        resultado[troca],
        resultado[indice],
      ];
    }
    return resultado;
  }

  let perguntasDaRodada = [];
  let indiceAtual = 0;
  let pontuacao = 0;

  function mostrarPergunta() {
    const pergunta = perguntasDaRodada[indiceAtual];
    progressoElemento.textContent = `Pergunta ${indiceAtual + 1} de ${perguntasDaRodada.length}`;
    perguntaElemento.textContent = pergunta.pergunta;
    feedbackElemento.textContent = "";
    feedbackElemento.className = "rc-quiz__feedback";
    finalElemento.textContent = "";
    opcoesElemento.textContent = "";
    proximaBotao.hidden = true;

    embaralhar(pergunta.opcoes).forEach((opcao) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "rc-quiz__opcao";
      botao.textContent = opcao;
      botao.addEventListener("click", () => responder(opcao, botao));
      opcoesElemento.appendChild(botao);
    });
  }

  function responder(resposta, botaoSelecionado) {
    const pergunta = perguntasDaRodada[indiceAtual];
    const acertou = resposta === pergunta.correta;
    if (acertou) pontuacao += 1;

    opcoesElemento.querySelectorAll("button").forEach((botao) => {
      botao.disabled = true;
      if (botao === botaoSelecionado) {
        botao.setAttribute("aria-pressed", "true");
      }
    });

    feedbackElemento.classList.add(
      acertou ? "rc-quiz__feedback--certo" : "rc-quiz__feedback--erro",
    );
    feedbackElemento.textContent = acertou
      ? `Isso mesmo! ${pergunta.explicacao}`
      : `Ainda não. A resposta certa é ${pergunta.correta}. ${pergunta.explicacao}`;
    proximaBotao.textContent =
      indiceAtual === perguntasDaRodada.length - 1
        ? "Ver resultado"
        : "Próxima pergunta";
    proximaBotao.hidden = false;
  }

  function mostrarResultado() {
    progressoElemento.textContent = "Quiz concluído!";
    perguntaElemento.textContent = "";
    opcoesElemento.textContent = "";
    feedbackElemento.textContent = "";
    proximaBotao.hidden = true;
    reiniciarBotao.hidden = false;

    let incentivo = "Boa tentativa! Revise o guia e tente novamente.";
    if (pontuacao === perguntasDaRodada.length) {
      incentivo = "Perfeito! Você já sabe separar muito bem.";
    } else if (pontuacao >= 3) {
      incentivo = "Muito bem! Você está aprendendo a separar direitinho.";
    }
    finalElemento.textContent = `Você acertou ${pontuacao} de ${perguntasDaRodada.length}. ${incentivo}`;
  }

  function iniciarRodada() {
    perguntasDaRodada = embaralhar(perguntas).slice(0, 5);
    indiceAtual = 0;
    pontuacao = 0;
    reiniciarBotao.hidden = true;
    mostrarPergunta();
  }

  proximaBotao.addEventListener("click", () => {
    indiceAtual += 1;
    if (indiceAtual >= perguntasDaRodada.length) {
      mostrarResultado();
      return;
    }
    mostrarPergunta();
    opcoesElemento.querySelector("button")?.focus();
  });

  reiniciarBotao.addEventListener("click", iniciarRodada);
  iniciarRodada();
})();
