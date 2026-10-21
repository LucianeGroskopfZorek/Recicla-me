# ♻️ Recicla-me Se For Capaz

[![Site no ar](https://img.shields.io/badge/site-no%20ar-2e7d32?logo=github)](https://lucianegroskopfzorek.github.io/Recicla-me/)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?logo=javascript&logoColor=black)

Site informativo e educativo sobre coleta seletiva e descarte correto de resíduos em **Canoinhas, Santa Catarina**. O projeto reúne orientações de descarte, horários de coleta, um carrossel explicativo, um jogo de separação de lixo e uma demonstração da rota do caminhão de coleta.

Esta é a **fase frontend** do projeto (HTML, CSS e JavaScript puros). O back-end será adicionado depois.

## 🌐 Acesse o site

👉 **[lucianegroskopfzorek.github.io/Recicla-me](https://lucianegroskopfzorek.github.io/Recicla-me/)**

## 📋 Sumário

- [O problema](#-o-problema)
- [Funcionalidades](#-funcionalidades)
- [Acessibilidade](#-acessibilidade)
- [Páginas](#-páginas)
- [Estrutura do projeto](#️-estrutura-do-projeto)
- [Tecnologias](#️-tecnologias)
- [Como executar](#-como-executar)
- [Publicação (GitHub Pages)](#-publicação-github-pages)
- [Próximos passos](#-próximos-passos)
- [Observações](#-observações)
- [Autora](#-autora)

## 🎯 O problema

Muitos municípios brasileiros têm dificuldade para gerenciar a coleta seletiva de forma eficiente. Em Canoinhas (SC) não é diferente: os moradores não sabiam os dias de coleta, os motoristas não tinham um sistema digital de check-in e os administradores não tinham uma visão centralizada da operação.

O **Recicla-me Se For Capaz** foi criado para enfrentar esse cenário, aproximando a população da coleta seletiva com informação clara e acessível. A página inicial apresenta esse objetivo em uma seção interativa, onde cada funcionalidade do projeto pode ser explorada com um clique.

## ✨ Funcionalidades

- **Página inicial** com vídeo de abertura (com botão de pausar), seção interativa "O Problema" e acesso rápido às categorias de descarte.
- **Orientações por tipo de resíduo:** recicláveis, lixo comum, galhos e entulho, cada um com tabela de dias e horários.
- **Carrossel educativo** sobre o caminho do plástico reciclado, navegável por botões, bolinhas, setas do teclado ou deslize no celular.
- **Jogo de separação:** arraste cada objeto até a lixeira certa, toque na lixeira ou use as teclas de 1 a 7. Tem pontuação, combo, bônus de rapidez e recorde.
- **Rota do caminhão de coleta** em mapa interativo (Leaflet).
- **Formulário de cadastro** com validação e escolha do canal de avisos (e-mail ou WhatsApp).
- **Página de contato** com canais de atendimento, indicador de horário de funcionamento e formulário de mensagem.
- **Tabela interna de consulta** com os horários de cada tipo de coleta.
- **Modo claro e escuro** em todas as páginas.
- **Cabeçalho e menu padronizados** em todo o site.

## ♿ Acessibilidade

- Estrutura semântica (`header`, `nav`, `main`, `footer`) e idioma definido em `pt-BR`.
- Rótulos ARIA, regiões `aria-live` e navegação por teclado no carrossel, no jogo e na seção interativa da página inicial.
- Formulários com `label`, `fieldset` e mensagens de erro associadas aos campos.
- Respeito à preferência do sistema por menos animações (`prefers-reduced-motion`).
- Layout responsivo para celular e computador.

## 📄 Páginas

| Página | Descrição |
| --- | --- |
| [`index.html`](index.html) | Página inicial |
| [`cadastro.html`](cadastro.html) | Formulário de cadastro |
| [`separacao.html`](separacao.html) | Carrossel sobre a reciclagem do plástico |
| [`jogo-separacao.html`](jogo-separacao.html) | Jogo educativo de separação de resíduos |
| [`caminhao/index.html`](caminhao/index.html) | Demonstração da rota do caminhão de coleta |
| [`contato.html`](contato.html) | Canais de contato e formulário de mensagem |
| [`reciclavel.html`](reciclavel.html) | Orientações sobre materiais recicláveis |
| [`lixo-comum.html`](lixo-comum.html) | Orientações sobre lixo comum |
| [`entulho.html`](entulho.html) | Orientações sobre galhos e entulho |
| [`tabela-interna.html`](tabela-interna.html) | Tabela de horários de coleta |

## 🗂️ Estrutura do projeto

```text
.
├── README.md
├── .gitignore
├── index.html
├── cadastro.html
├── contato.html
├── entulho.html
├── lixo-comum.html
├── reciclavel.html
├── separacao.html
├── jogo-separacao.html
├── tabela-interna.html
├── css/
│   ├── style.css          (estilos globais, cabeçalho, menu e modo escuro)
│   ├── home.css
│   ├── objetivo.css
│   ├── cadastro.css
│   ├── contato.css
│   ├── separacao.css
│   └── carrossel.css
├── js/
│   ├── theme.js           (alternância de modo claro/escuro)
│   ├── home.js
│   ├── objetivo.js
│   ├── cadastro.js
│   ├── contato.js
│   ├── carrossel.js
│   └── jogo-separacao.js
├── imagens/
├── video/
└── caminhao/
    ├── index.html
    ├── caminhao.js
    ├── style.css
    └── libs/              (Leaflet)
```

## 🛠️ Tecnologias

- HTML5
- CSS3 (variáveis CSS, Flexbox e Grid)
- JavaScript (vanilla, sem frameworks)
- [Leaflet](https://leafletjs.com/) para o mapa da rota do caminhão
- Fonte Fredoka (Google Fonts) no jogo
- GitHub Pages para a publicação

## 🚀 Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/LucianeGroskopfZorek/Recicla-me.git
   ```

2. Entre na pasta:

   ```bash
   cd Recicla-me
   ```

3. Abra o `index.html` no navegador, ou use a extensão **Live Server** do VS Code (botão *Go Live*, no canto inferior direito).

Não é preciso instalar nenhuma dependência.

## 🌍 Publicação (GitHub Pages)

O site é publicado automaticamente a partir da branch `main`:

👉 **https://lucianegroskopfzorek.github.io/Recicla-me/**

Para configurar em outro repositório:

1. No repositório, vá em **Settings → Pages**.
2. Em **Branch**, escolha `main` e a pasta `/ (root)`, e clique em **Save**.
3. Aguarde alguns minutos. A cada `git push` na `main`, o site é atualizado em um ou dois minutos.

## 🔭 Próximos passos

O back-end será desenvolvido em uma próxima fase, para que o site deixe de ser apenas informativo. Entre as funcionalidades previstas para o sistema completo:

- [ ] Agendamento dos dias de coleta por bairro, definido pela administração
- [ ] Check-in do motorista por geolocalização no início de cada rota
- [ ] Alertas de coleta aos moradores por e-mail
- [ ] Cadastro de moradores por QR Code em eventos comunitários
- [ ] Gestão de usuários por perfil (moradores, motoristas e administradores)
- [ ] Registro e acompanhamento de solicitações de coleta
- [ ] Envio real dos formulários de cadastro e contato

## 📌 Observações

- Os dias e horários de coleta são **exemplos**. Confirme sempre as informações com a Prefeitura de Canoinhas e a Secretaria de Meio Ambiente.
- Os formulários de cadastro e contato ainda **não enviam dados** a um servidor, pois não há back-end nesta fase.
- A rota do caminhão é uma **demonstração simulada**.
- Este projeto frontend é independente do projeto Flask/MySQL desenvolvido no primeiro semestre, apesar de ambos terem o mesmo nome.

## 👩‍💻 Autora

**Luciane Groskopf Zorek**
Projeto desenvolvido no curso Jovem Programador (SENAC-SC).
GitHub: [@LucianeGroskopfZorek](https://github.com/LucianeGroskopfZorek)