# ♻️ Recicla-me Se For Capaz

Site informativo e educativo sobre **coleta seletiva e descarte correto de resíduos** em Canoinhas, Santa Catarina. O projeto reúne orientações de descarte, horários de coleta, um carrossel explicativo, um jogo de separação de lixo e uma demonstração da rota do caminhão de coleta.

> Esta é a fase **frontend** do projeto (HTML, CSS e JavaScript puros). O back-end será adicionado depois.

## ✨ Funcionalidades

- **Página inicial** com vídeo de abertura (com botão de pausar) e acesso rápido às categorias de descarte.
- **Orientações por tipo de resíduo:** recicláveis, lixo comum, galhos e entulho, cada um com tabela de dias e horários.
- **Carrossel educativo** sobre o caminho do plástico reciclado, navegável por botões, bolinhas, setas do teclado ou deslize no celular.
- **Jogo de separação:** arraste cada objeto até a lixeira certa, toque na lixeira ou use as teclas de 1 a 7. Tem pontuação, combo, bônus de rapidez e recorde.
- **Rota do caminhão de coleta** em mapa interativo (Leaflet).
- **Formulário de cadastro** com validação e escolha do canal de avisos (e-mail ou WhatsApp).
- **Página de contato** com canais de atendimento, indicador de horário de funcionamento e formulário de mensagem.
- **Tabela interna** de consulta com os horários de cada tipo de coleta.
- **Modo claro e escuro** em todas as páginas.

## ♿ Acessibilidade

- Estrutura semântica (`header`, `nav`, `main`, `footer`) e idioma definido em `pt-BR`.
- Rótulos ARIA, regiões `aria-live` e navegação por teclado no carrossel e no jogo.
- Formulários com `label`, `fieldset` e mensagens de erro associadas aos campos.
- Respeito à preferência do sistema por menos animações (`prefers-reduced-motion`).
- Layout responsivo para celular e computador.

## 📄 Páginas

| Página | Descrição |
| --- | --- |
| `index.html` | Página inicial |
| `cadastro.html` | Formulário de cadastro |
| `separacao.html` | Carrossel sobre a reciclagem do plástico |
| `jogo-separacao.html` | Jogo educativo de separação de resíduos |
| `caminhao/index.html` | Demonstração da rota do caminhão de coleta |
| `contato.html` | Canais de contato e formulário de mensagem |
| `reciclavel.html` | Orientações sobre materiais recicláveis |
| `lixo-comum.html` | Orientações sobre lixo comum |
| `entulho.html` | Orientações sobre galhos e entulho |
| `tabela-interna.html` | Tabela de horários de coleta |

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
│   ├── style.css
│   ├── home.css
│   ├── cadastro.css
│   ├── contato.css
│   ├── separacao.css
│   └── carrossel.css
├── js/
│   ├── theme.js
│   ├── home.js
│   ├── cadastro.js
│   ├── contato.js
│   ├── carrossel.js
│   └── jogo-separacao.js
├── imagens/
├── video/
├── caminhao/
│   ├── index.html
│   ├── caminhao.js
│   ├── style.css
│   └── libs/        (Leaflet)
└── _backup/         (versões antigas de páginas)
```

## 🛠️ Tecnologias

- HTML5
- CSS3 (variáveis CSS, Flexbox e Grid)
- JavaScript (vanilla, sem frameworks)
- [Leaflet](https://leafletjs.com/) para o mapa da rota do caminhão
- Fonte [Fredoka](https://fonts.google.com/specimen/Fredoka) (Google Fonts) no jogo

## 🚀 Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/LucianeGroskopfZorek/Recicla-me.git
   ```

2. Entre na pasta:

   ```bash
   cd Recicla-me
   ```

3. Abra o `index.html` no navegador, **ou** use a extensão **Live Server** do VS Code (botão **Go Live**, no canto inferior direito).

Não é preciso instalar nenhuma dependência.

## 🌐 Publicação (GitHub Pages)

Para colocar o site no ar:

1. No repositório, vá em **Settings → Pages**.
2. Em **Branch**, escolha `main` e a pasta `/ (root)`, e clique em **Save**.
3. Aguarde alguns minutos. O site ficará em `https://lucianegroskopfzorek.github.io/Recicla-me/`.

## 📌 Observações

- Os dias e horários de coleta são exemplos. Confirme sempre as informações com a Prefeitura de Canoinhas e a Secretaria de Meio Ambiente.
- Os formulários de cadastro e contato ainda não enviam dados a um servidor, pois não há back-end nesta fase.
- Este projeto frontend é independente do projeto Flask/MySQL desenvolvido no primeiro semestre, apesar de ambos terem o mesmo nome.

## 👩‍💻 Autora

**Luciane Groskopf Zorek**
Projeto desenvolvido no curso Jovem Programador (SENAC-SC).
GitHub: [@LucianeGroskopfZorek](https://github.com/LucianeGroskopfZorek)