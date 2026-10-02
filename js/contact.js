/* ==========================================================
   contact.js - status de atendimento e formulário de mensagem
   ========================================================== */

/* ---------- Está atendendo agora? ---------- */
(() => {
  const status = document.getElementById('contato-status');
  if (!status) return;

  const abre = Number(status.dataset.abre);
  const fecha = Number(status.dataset.fecha);
  const dias = status.dataset.dias.split(',').map(Number);

  const agora = new Date();
  const hora = agora.getHours() + agora.getMinutes() / 60;
  const aberto = dias.includes(agora.getDay()) && hora >= abre && hora < fecha;

  status.textContent = aberto
    ? 'Estamos atendendo agora.'
    : 'Fora do horário. Respondemos no próximo dia útil.';
  status.classList.toggle('rc-aberto', aberto);
})();

/* ---------- Formulário ---------- */
(() => {
  const form = document.getElementById('form-contato');
  if (!form) return;

  const sucesso = document.getElementById('contato-sucesso');
  const outra = document.getElementById('contato-outra');
  const contador = document.getElementById('c-contador');

  const campos = {
    nome: {
      el: document.getElementById('c-nome'),
      erro: document.getElementById('c-nome-erro'),
      validar: (v) => (v.trim().length < 3 ? 'Digite seu nome (mínimo 3 letras).' : '')
    },
    email: {
      el: document.getElementById('c-email'),
      erro: document.getElementById('c-email-erro'),
      validar: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Digite um e-mail válido, como nome@email.com.')
    },
    assunto: {
      el: document.getElementById('c-assunto'),
      erro: document.getElementById('c-assunto-erro'),
      validar: (v) => (v === '' ? 'Escolha um assunto.' : '')
    },
    mensagem: {
      el: document.getElementById('c-mensagem'),
      erro: document.getElementById('c-mensagem-erro'),
      validar: (v) => (v.trim().length < 10 ? 'Escreva pelo menos 10 caracteres.' : '')
    }
  };

  function validarCampo(campo) {
    const texto = campo.validar(campo.el.value);
    campo.erro.textContent = texto;
    campo.el.setAttribute('aria-invalid', texto ? 'true' : 'false');
    return texto === '';
  }

  // Limpa o erro assim que a pessoa corrige o campo
  Object.values(campos).forEach((campo) => {
    const evento = campo.el.tagName === 'SELECT' ? 'change' : 'input';
    campo.el.addEventListener(evento, () => {
      if (campo.el.getAttribute('aria-invalid') === 'true') validarCampo(campo);
    });
  });

  campos.mensagem.el.addEventListener('input', () => {
    contador.textContent = campos.mensagem.el.value.length + ' de 500 caracteres';
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const invalidos = Object.values(campos).filter((c) => !validarCampo(c));
    if (invalidos.length > 0) {
      invalidos[0].el.focus();
      return;
    }

    const registro = {
      nome: campos.nome.el.value.trim(),
      email: campos.email.el.value.trim(),
      assunto: campos.assunto.el.value,
      mensagem: campos.mensagem.el.value.trim(),
      data: new Date().toISOString()
    };

    // Demonstração: guarda no navegador. Depois, troque por um envio ao back-end.
    try {
      const lista = JSON.parse(localStorage.getItem('recicla_mensagens') || '[]');
      lista.push(registro);
      localStorage.setItem('recicla_mensagens', JSON.stringify(lista));
    } catch (erro) {
      /* sem armazenamento disponível: segue sem guardar */
    }

    document.getElementById('sucesso-nome').textContent = registro.nome.split(' ')[0];
    document.getElementById('sucesso-email').textContent = registro.email;
    form.hidden = true;
    sucesso.hidden = false;
    sucesso.focus();
  });

  outra.addEventListener('click', () => {
    form.reset();
    contador.textContent = '0 de 500 caracteres';
    Object.values(campos).forEach((c) => {
      c.erro.textContent = '';
      c.el.setAttribute('aria-invalid', 'false');
    });
    sucesso.hidden = true;
    form.hidden = false;
    campos.nome.el.focus();
  });
})();
