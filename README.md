# Recicla-me Se For Capaz

Site informativo sobre coleta seletiva e descarte de resíduos em Canoinhas,
Santa Catarina. A fase atual é somente frontend; o back-end será adicionado
depois.

## Páginas

- `index.html` — página inicial e acesso às categorias de descarte.
- `quem-somos.html` — apresentação do projeto e informações sobre descarte.
- `cadastro.html` — formulário de cadastro.
- `contato.html` — canais de contato e formulário de mensagem.
- `entulho.html` — orientações para galhos e entulho.
- `lixo-comum.html` — orientações sobre lixo comum.
- `reciclavel.html` — orientações sobre materiais recicláveis.
- `separacao.html` — informações sobre a reciclagem do plástico.
- `jogo-separacao.html` — jogo educativo de separação de resíduos.
- `tabela-interna.html` — tabela interna de consulta.
- `caminhao/index.html` — demonstração da rota do caminhão de coleta.

## Estrutura

```text
.
├── README.md
├── .gitignore
├── index.html
├── quem-somos.html
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
│   └── separacao.css
├── js/
│   ├── cadastro.js
│   ├── contato.js
│   ├── home.js
│   ├── jogo-separacao.js
│   ├── separacao.js (mantido, não referenciado por páginas)
│   └── theme.js
├── imagens/
│   ├── banner_para_titulo.jpg
│   ├── imagem_entulho1.jpeg
│   ├── imagem_lixo_comum1.jpeg
│   └── imagem_lixo_reciclavel1.jpeg
├── video/ (vazia)
└── caminhao/
    ├── index.html
    ├── caminhao.js
    ├── style.css
    └── libs/ (Leaflet)
```

## Como abrir

Abra `index.html` no navegador ou use a extensão Live Server do VS Code para
executar o site em um servidor local.

Este projeto frontend é independente do projeto Flask/MySQL desenvolvido no
primeiro semestre, apesar de ambos terem o mesmo nome.
