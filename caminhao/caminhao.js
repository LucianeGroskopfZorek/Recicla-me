/* ===========================
   ONDE ESTÁ O CAMINHÃO · caminhao.js
   Simula o caminhão de coleta andando pela rota, em um mapa Leaflet
   =========================== */

// ##########---------------------------------------##############################
// PASSO 1 - Dados: paradas e configurações
// ##########---------------------------------------##############################

// pontos de EXEMPLO em Canoinhas (latitude, longitude). Troque pelos bairros reais do seu projeto
const paradas = [
  { nome: "Garagem da coleta", lat: -26.1770, lng: -50.3900 },
  { nome: "Bairro Centro",      lat: -26.1760, lng: -50.3880 },
  { nome: "Alto das Palmeiras", lat: -26.1850, lng: -50.3790 },
  { nome: "Campo da Água Verde", lat: -26.1690, lng: -50.4010 }
];

const VELOCIDADE_SIMULADA = 30;   // metros que o caminhão anda a cada "tick" (só para a demonstração ficar rápida)
const INTERVALO_MS = 100;         // tempo entre um tick e outro
const VELOCIDADE_REAL_KMH = 20;   // velocidade usada só para calcular o "chega em X min"

// ##########---------------------------------------##############################
// PASSO 2 - Selecionar elementos e criar o mapa
// ##########---------------------------------------##############################

const textoStatus = document.getElementById("status");
const botaoIniciar = document.getElementById("botao-iniciar");
const botaoReiniciar = document.getElementById("botao-reiniciar");
const botaoOndeEstou = document.getElementById("botao-onde-estou");
const infoUsuario = document.getElementById("info-usuario");
const listaParadas = document.getElementById("lista-paradas");

// L é o objeto do Leaflet. setView([lat, lng], zoom) centraliza o mapa
const mapa = L.map("mapa").setView([paradas[0].lat, paradas[0].lng], 14);

// Fundos de mapa (tiles = as "fotos" do mapa). Cada fornecedor gratuito tem regras próprias e elas mudam com o tempo:
// o CARTO passou a exigir chave, e o OpenStreetMap bloqueia páginas sem identificação (aberta por file://) e redes com muitos acessos.
// Por isso o mapa tem um seletor (canto superior direito): se um fundo falhar, é só escolher outro.
const fundoEsri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 19,
  attribution: "Tiles © Esri"
});

const fundoOsm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© Colaboradores do OpenStreetMap"   // atribuição obrigatória pela licença
});

// sem fundo: só a rota e os pontos sobre o cinza (plano B total, funciona até sem internet)
const semFundo = L.layerGroup();

fundoEsri.addTo(mapa);   // fundo inicial

// L.control.layers cria o seletor de fundos
L.control.layers({
  "Ruas (Esri)": fundoEsri,
  "OpenStreetMap": fundoOsm,
  "Sem fundo": semFundo
}, null, { position: "topright" }).addTo(mapa);

// se o fundo escolhido falhar de verdade (imagem não carrega), avisa o usuário
let errosDeImagem = 0;
[fundoEsri, fundoOsm].forEach(function (camada) {
  camada.on("tileerror", function () {
    errosDeImagem++;
    if (errosDeImagem === 4) {
      infoUsuario.textContent = "O fundo do mapa não carregou. Escolha outro no seletor do mapa (canto superior direito).";
    }
  });
});

// ##########---------------------------------------##############################
// PASSO 3 - Marcadores das paradas e do caminhão
// ##########---------------------------------------##############################

paradas.forEach(function (parada, i) {
  // cada parada ganha um número no mapa (a garagem é a 0) e um item na lista
  parada.coletada = false;
  parada.marcador = L.marker([parada.lat, parada.lng], {
    icon: L.divIcon({ className: "icone-parada", html: String(i), iconSize: [24, 24] }),
    title: parada.nome
  }).addTo(mapa).bindPopup(parada.nome);

  if (i > 0) {
    const item = document.createElement("li");
    item.textContent = parada.nome;
    parada.item = item;
    listaParadas.appendChild(item);
  }
});

const iconeCaminhao = L.divIcon({ className: "icone-caminhao", html: "🚛", iconSize: [34, 34] });
const caminhao = L.marker([paradas[0].lat, paradas[0].lng], { icon: iconeCaminhao, zIndexOffset: 1000, title: "Caminhão de coleta" }).addTo(mapa);

// ##########---------------------------------------##############################
// PASSO 4 - Buscar a rota pelas ruas (API OSRM) com plano B
// ##########---------------------------------------##############################

let caminho = [];          // lista de pontos [lat, lng] por onde o caminhão passa
let distAcumulada = [];    // distância (m) do início até cada ponto do caminho
let indiceParadaNoCaminho = []; // posição, no caminho, onde cada parada fica
let linhaRota = null;

async function carregarRota() {
  // OSRM quer "longitude,latitude" (ordem invertida em relação ao Leaflet!), separados por ;
  const coords = paradas.map(function (p) { return p.lng + "," + p.lat; }).join(";");
  const url = "https://router.project-osrm.org/route/v1/driving/" + coords + "?overview=full&geometries=geojson";

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error("Resposta " + resposta.status);
    const dados = await resposta.json();
    if (dados.code !== "Ok") throw new Error("Rota não encontrada");

    // GeoJSON vem como [lng, lat]; o Leaflet usa [lat, lng], então invertemos
    caminho = dados.routes[0].geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
    textoStatus.textContent = "Rota pelas ruas carregada. Pronto para iniciar.";
  } catch (erro) {
    // plano B: sem internet ou API fora do ar, liga as paradas em linha reta
    console.warn("Não foi possível buscar a rota pelas ruas:", erro.message);
    caminho = paradas.map(function (p) { return [p.lat, p.lng]; });
    textoStatus.textContent = "Sem acesso à API de rotas: usando linha reta entre as paradas (modo simulado).";
  }
  prepararCaminho();
}

// calcula as distâncias e descobre em que ponto do caminho fica cada parada
function prepararCaminho() {
  distAcumulada = [0];
  for (let i = 1; i < caminho.length; i++) {
    // mapa.distance devolve metros entre dois pontos
    distAcumulada.push(distAcumulada[i - 1] + mapa.distance(caminho[i - 1], caminho[i]));
  }

  // para cada parada, acha o ponto do caminho mais próximo, sempre andando para frente
  indiceParadaNoCaminho = [];
  let busca = 0;
  paradas.forEach(function (parada) {
    let melhor = busca, menor = Infinity;
    for (let i = busca; i < caminho.length; i++) {
      const d = mapa.distance(caminho[i], [parada.lat, parada.lng]);
      if (d < menor) { menor = d; melhor = i; }
    }
    indiceParadaNoCaminho.push(melhor);
    busca = melhor;
  });

  if (linhaRota) mapa.removeLayer(linhaRota);
  linhaRota = L.polyline(caminho, { color: "#1A6632", weight: 5, opacity: 0.7 }).addTo(mapa);
  mapa.fitBounds(linhaRota.getBounds(), { padding: [30, 30] });

  botaoIniciar.disabled = false;
  botaoReiniciar.disabled = false;
}

// ##########---------------------------------------##############################
// PASSO 5 - Mover o caminhão
// ##########---------------------------------------##############################

let distanciaPercorrida = 0;
let proximaParada = 1;
let temporizador = null;
let emParada = false;

// descobre a posição [lat, lng] correspondente a uma distância percorrida
function posicaoNaDistancia(d) {
  let i = 1;
  while (i < distAcumulada.length - 1 && distAcumulada[i] < d) i++;
  const trecho = distAcumulada[i] - distAcumulada[i - 1];
  const fracao = trecho === 0 ? 0 : (d - distAcumulada[i - 1]) / trecho;   // 0 a 1 dentro do trecho
  const a = caminho[i - 1], b = caminho[i];
  return [a[0] + (b[0] - a[0]) * fracao, a[1] + (b[1] - a[1]) * fracao];   // interpolação linear
}

function atualizarStatus() {
  const alvo = paradas[proximaParada];
  const metrosAteParada = distAcumulada[indiceParadaNoCaminho[proximaParada]] - distanciaPercorrida;
  // tempo = distância / velocidade (km/h para m/min: x 1000 / 60)
  const minutos = Math.max(1, Math.round(metrosAteParada / (VELOCIDADE_REAL_KMH * 1000 / 60)));
  textoStatus.textContent = "A caminho de " + alvo.nome + ", chega em cerca de " + minutos + " min.";
}

function andar() {
  if (emParada) return;
  distanciaPercorrida += VELOCIDADE_SIMULADA;
  const total = distAcumulada[distAcumulada.length - 1];
  if (distanciaPercorrida > total) distanciaPercorrida = total;

  caminhao.setLatLng(posicaoNaDistancia(distanciaPercorrida));

  // chegou na próxima parada?
  const distParada = distAcumulada[indiceParadaNoCaminho[proximaParada]];
  if (distanciaPercorrida >= distParada) {
    chegouNaParada();
  } else {
    atualizarStatus();
  }
}

function chegouNaParada() {
  const parada = paradas[proximaParada];
  parada.coletada = true;
  parada.item.classList.add("coletada");
  parada.marcador.getElement().classList.add("coletada");
  textoStatus.textContent = "Coletando em " + parada.nome + "...";
  emParada = true;

  setTimeout(function () {
    emParada = false;
    proximaParada++;
    if (proximaParada >= paradas.length) {
      clearInterval(temporizador);
      temporizador = null;
      textoStatus.textContent = "Rota concluída! Todas as paradas foram atendidas. ✔";
      botaoIniciar.textContent = "▶ Iniciar rota";
    }
  }, 1500);   // para 1,5 s em cada parada
}

botaoIniciar.addEventListener("click", function () {
  if (temporizador) {                      // já está andando: o botão vira "pausar"
    clearInterval(temporizador);
    temporizador = null;
    botaoIniciar.textContent = "▶ Continuar";
    textoStatus.textContent = "Rota pausada.";
    return;
  }
  if (proximaParada >= paradas.length) reiniciar();   // terminou antes: começa de novo
  temporizador = setInterval(andar, INTERVALO_MS);
  botaoIniciar.textContent = "⏸ Pausar";
});

function reiniciar() {
  clearInterval(temporizador);
  temporizador = null;
  emParada = false;
  distanciaPercorrida = 0;
  proximaParada = 1;
  caminhao.setLatLng([paradas[0].lat, paradas[0].lng]);
  paradas.forEach(function (p, i) {
    p.coletada = false;
    if (i > 0) {
      p.item.classList.remove("coletada");
      p.marcador.getElement().classList.remove("coletada");
    }
  });
  botaoIniciar.textContent = "▶ Iniciar rota";
  textoStatus.textContent = "Rota reiniciada. Pronto para iniciar.";
}
botaoReiniciar.addEventListener("click", reiniciar);

// ##########---------------------------------------##############################
// PASSO 6 - "Onde estou?" com a geolocalização do navegador
// ##########---------------------------------------##############################

let marcadorUsuario = null;

botaoOndeEstou.addEventListener("click", function () {
  if (!("geolocation" in navigator)) {
    infoUsuario.textContent = "Este navegador não tem localização.";
    return;
  }
  infoUsuario.textContent = "Pedindo sua localização...";

  // o navegador mostra um aviso pedindo permissão ao usuário
  navigator.geolocation.getCurrentPosition(
    function (posicao) {                        // deu certo
      const minhaPos = [posicao.coords.latitude, posicao.coords.longitude];
      if (marcadorUsuario) mapa.removeLayer(marcadorUsuario);
      marcadorUsuario = L.marker(minhaPos, { alt: "Sua localização" }).addTo(mapa).bindPopup("Você está aqui").openPopup();

      const metros = mapa.distance(minhaPos, caminhao.getLatLng());
      infoUsuario.textContent = "Você está a " + (metros / 1000).toFixed(1).replace(".", ",") + " km do caminhão (em linha reta).";
      mapa.setView(minhaPos, 15);
    },
    function (erro) {                           // deu errado ou o usuário negou
      const mensagens = {
        1: "Você não autorizou a localização. Sem ela não dá para calcular a distância.",
        2: "Não foi possível descobrir sua posição agora.",
        3: "A localização demorou demais. Tente de novo."
      };
      infoUsuario.textContent = mensagens[erro.code] || "Erro ao obter a localização.";
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// começa carregando a rota
carregarRota();
