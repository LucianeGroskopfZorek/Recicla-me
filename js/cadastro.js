const form = document.getElementById("cadastro-form");
const successPanel = document.getElementById("cadastro-success");
const storageError = document.getElementById("storage-error");
const phoneInput = document.getElementById("telefone");
const phoneRequiredMarker = document.getElementById("telefone-required-marker");
const channelOptions = [...form.querySelectorAll('input[name="canal"]')];

const controls = {
  nome: [document.getElementById("nome")],
  email: [document.getElementById("email")],
  telefone: [phoneInput],
  bairro: [document.getElementById("bairro")],
  canal: channelOptions,
  consentimento: [document.getElementById("consentimento")],
};

const messages = {
  nome: "Informe seu nome.",
  email: "Informe um e-mail válido.",
  telefone: "Informe um telefone válido no formato (47) 99999-9999.",
  bairro: "Selecione seu bairro.",
  canal: "Escolha como prefere receber os avisos.",
  consentimento: "É necessário aceitar o consentimento para continuar.",
};

function selectedChannel() {
  return channelOptions.find((option) => option.checked)?.value ?? "";
}

function updatePhoneRequirement() {
  const isWhatsApp = selectedChannel() === "WhatsApp";
  phoneInput.required = isWhatsApp;
  phoneRequiredMarker.hidden = !isWhatsApp;
}

function setFieldError(fieldName, message) {
  const error = document.getElementById(`${fieldName}-error`);
  error.textContent = message;
  error.hidden = !message;

  for (const control of controls[fieldName]) {
    if (message) {
      control.setAttribute("aria-invalid", "true");
    } else {
      control.removeAttribute("aria-invalid");
    }
  }
}

function validateField(fieldName) {
  let valid = true;

  if (fieldName === "nome") {
    valid = controls.nome[0].value.trim().length > 0;
  } else if (fieldName === "email") {
    const email = controls.email[0].value.trim();
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  } else if (fieldName === "telefone") {
    const digits = phoneInput.value.replace(/\D/g, "");
    valid = (!phoneInput.required && digits.length === 0) || digits.length === 11;
  } else if (fieldName === "bairro") {
    valid = controls.bairro[0].value !== "";
  } else if (fieldName === "canal") {
    valid = selectedChannel() !== "";
  } else if (fieldName === "consentimento") {
    valid = controls.consentimento[0].checked;
  }

  setFieldError(fieldName, valid ? "" : messages[fieldName]);
  return valid;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const number = digits.slice(2);
  const firstPart = number.slice(0, 5);
  const secondPart = number.slice(5);
  return `(${areaCode}) ${firstPart}${secondPart ? `-${secondPart}` : ""}`;
}

function saveRegistration(registration) {
  try {
    const stored = JSON.parse(localStorage.getItem("recicla_cadastros") || "[]");
    const registrations = Array.isArray(stored) ? stored : [];
    registrations.push(registration);
    localStorage.setItem("recicla_cadastros", JSON.stringify(registrations));
    return true;
  } catch {
    return false;
  }
}

function clearErrors() {
  for (const fieldName of Object.keys(controls)) {
    setFieldError(fieldName, "");
  }
  storageError.hidden = true;
  storageError.textContent = "";
}

form.addEventListener("input", (event) => {
  if (event.target === phoneInput) {
    phoneInput.value = formatPhone(phoneInput.value);
  }

  const fieldName = event.target.name;
  if (fieldName && controls[fieldName]) {
    const error = document.getElementById(`${fieldName}-error`);
    if (!error.hidden) validateField(fieldName);
  }
});

form.addEventListener("change", (event) => {
  if (event.target.name === "canal") {
    updatePhoneRequirement();
    const channelError = document.getElementById("canal-error");
    if (!channelError.hidden) validateField("canal");

    const phoneError = document.getElementById("telefone-error");
    if (!phoneError.hidden) validateField("telefone");
  }

  const fieldName = event.target.name;
  if (fieldName && controls[fieldName]) {
    const error = document.getElementById(`${fieldName}-error`);
    if (!error.hidden) validateField(fieldName);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  storageError.hidden = true;

  const fieldNames = ["nome", "email", "telefone", "bairro", "canal", "consentimento"];
  const invalidFields = fieldNames.filter((fieldName) => !validateField(fieldName));
  if (invalidFields.length > 0) {
    controls[invalidFields[0]][0].focus();
    return;
  }

  const bairroSelect = controls.bairro[0];
  const registration = {
    nome: controls.nome[0].value.trim(),
    email: controls.email[0].value.trim(),
    telefone: phoneInput.value,
    bairro: bairroSelect.options[bairroSelect.selectedIndex].text,
    canal: selectedChannel(),
    interesses: [...form.querySelectorAll('input[name="interesses"]:checked')].map(
      (interest) => interest.value,
    ),
    data: new Date().toISOString(),
  };

  if (!saveRegistration(registration)) {
    storageError.textContent = "Não foi possível salvar o cadastro neste navegador. Tente novamente.";
    storageError.hidden = false;
    storageError.focus();
    return;
  }

  document.getElementById("success-name").textContent = registration.nome;
  document.getElementById("success-bairro").textContent = registration.bairro;
  form.hidden = true;
  successPanel.hidden = false;
  document.getElementById("success-title").focus();
});

document.getElementById("novo-cadastro").addEventListener("click", () => {
  form.reset();
  clearErrors();
  updatePhoneRequirement();
  successPanel.hidden = true;
  form.hidden = false;
  document.getElementById("nome").focus();
});

updatePhoneRequirement();