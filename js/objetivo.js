(() => {
  const tabList = document.querySelector(".objetivo__abas");
  const panel = document.querySelector(".objetivo__painel");

  if (!tabList || !panel) {
    console.error("Não foi possível inicializar as abas do objetivo.");
    return;
  }

  const items = [
    {
      label: "📅 Agendamento por bairro",
      description: "Administradores definem os dias de coleta de cada bairro.",
    },
    {
      label: "🚛 Check-in do motorista",
      description:
        "O motorista confirma sua localização por geolocalização no início da rota.",
    },
    {
      label: "🔔 Alertas aos moradores",
      description: "Lembretes por e-mail, automáticos ou manuais.",
    },
    {
      label: "📋 Cadastro por QR Code",
      description:
        "Moradores se cadastram em eventos comunitários escaneando um QR Code.",
    },
    {
      label: "👤 Gestão de usuários",
      description: "Acesso por perfil (moradores, motoristas e administradores).",
    },
    {
      label: "📊 Acompanhamento de solicitações",
      description: "Moradores registram e acompanham pedidos de coleta.",
    },
  ];

  const tabs = items.map((item, index) => {
    const tab = document.createElement("button");
    tab.className = "objetivo__aba";
    tab.type = "button";
    tab.id = `objetivo-tab-${index + 1}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "objetivo-painel");
    tab.textContent = item.label;
    tabList.append(tab);
    return tab;
  });

  panel.id = "objetivo-painel";
  panel.setAttribute("tabindex", "0");

  const selectTab = (selectedIndex) => {
    tabs.forEach((tab, index) => {
      const isSelected = index === selectedIndex;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute("aria-labelledby", tabs[selectedIndex].id);
    panel.textContent = `${items[selectedIndex].label}: ${items[selectedIndex].description}`;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      selectTab(nextIndex);
      tabs[nextIndex].focus();
    });
  });

  selectTab(0);
})();
