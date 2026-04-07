const $ = (id) => document.getElementById(id);

const state = {
  token: localStorage.getItem("jwtToken") || "",
};

const logEl = $("log");
const tokenEl = $("token");

function log(message, data) {
  const line = `[${new Date().toLocaleTimeString()}] ${message}`;
  const body = data ? `\n${JSON.stringify(data, null, 2)}` : "";
  logEl.textContent = `${line}${body}\n${logEl.textContent}`;
}

function setToken(token) {
  state.token = token || "";
  tokenEl.value = state.token;
  if (state.token) {
    localStorage.setItem("jwtToken", state.token);
  } else {
    localStorage.removeItem("jwtToken");
  }
}

async function api(path, options = {}, withAuth = false) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (withAuth && state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(path, { ...options, headers });
  const text = await response.text();
  let json = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(json?.error || json?.message || "Error de API");
    error.payload = json;
    throw error;
  }

  return json;
}

function renderList(container, items, config) {
  container.innerHTML = "";

  if (!items || items.length === 0) {
    container.innerHTML = "<li>No hay elementos todavía.</li>";
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${item[config.nameField]}</strong>
        <div class="item-meta">${Number(item.price).toFixed(2)} EUR</div>
      </div>
      <div class="inline-actions">
        <button class="danger" data-id="${item._id}">Borrar</button>
      </div>
    `;

    li.querySelector("button").addEventListener("click", () => config.onDelete(item._id));
    container.appendChild(li);
  });
}

async function loadVinos() {
  try {
    const vinos = await api("/api/vinos");
    renderList($("vinosList"), vinos, {
      nameField: "name",
      onDelete: async (id) => {
        try {
          await api(`/api/vinos/${id}`, { method: "DELETE" });
          log("Vino eliminado", { id });
          await loadVinos();
        } catch (error) {
          log(error.message, error.payload);
        }
      },
    });
    log("Vinos cargados", { total: vinos.length });
  } catch (error) {
    log(error.message, error.payload);
  }
}

async function loadChelas() {
  try {
    const chelas = await api("/api/chelas", {}, true);
    renderList($("chelasList"), chelas, {
      nameField: "nombre",
      onDelete: async (id) => {
        try {
          await api(`/api/chelas/${id}`, { method: "DELETE" }, true);
          log("Chela eliminada", { id });
          await loadChelas();
        } catch (error) {
          log(error.message, error.payload);
        }
      },
    });
    log("Chelas cargadas", { total: chelas.length });
  } catch (error) {
    $("chelasList").innerHTML = "<li>Necesitas login para ver/editar chelas.</li>";
    log(error.message, error.payload);
  }
}

async function doAuth(mode) {
  const email = $("email").value.trim();
  const password = $("password").value.trim();

  if (!email || !password) {
    log("Email y contraseña son obligatorios");
    return;
  }

  try {
    const endpoint = mode === "register" ? "/api/auth/registro" : "/api/auth/login";
    const payload = await api(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setToken(payload.token || "");
    log(mode === "register" ? "Registro completado" : "Login correcto", payload.usuari);
    await loadChelas();
  } catch (error) {
    log(error.message, error.payload);
  }
}

async function addVino() {
  const name = $("vinoName").value.trim();
  const price = Number($("vinoPrice").value);

  if (!name || Number.isNaN(price)) {
    log("Nombre y precio de vino son obligatorios");
    return;
  }

  try {
    await api("/api/vinos", {
      method: "POST",
      body: JSON.stringify({ name, price }),
    });
    $("vinoName").value = "";
    $("vinoPrice").value = "";
    log("Vino añadido", { name, price });
    await loadVinos();
  } catch (error) {
    log(error.message, error.payload);
  }
}

async function addChela() {
  const nombre = $("chelaName").value.trim();
  const price = Number($("chelaPrice").value);

  if (!nombre || Number.isNaN(price)) {
    log("Nombre y precio de chela son obligatorios");
    return;
  }

  try {
    await api(
      "/api/chelas",
      {
        method: "POST",
        body: JSON.stringify({ nombre, price }),
      },
      true
    );
    $("chelaName").value = "";
    $("chelaPrice").value = "";
    log("Chela añadida", { nombre, price });
    await loadChelas();
  } catch (error) {
    log(error.message, error.payload);
  }
}

function init() {
  setToken(state.token);
  $("btnRegister").addEventListener("click", () => doAuth("register"));
  $("btnLogin").addEventListener("click", () => doAuth("login"));
  $("btnLogout").addEventListener("click", async () => {
    setToken("");
    log("Sesión cerrada");
    await loadChelas();
  });

  $("btnSaveToken").addEventListener("click", async () => {
    setToken(tokenEl.value.trim());
    log("Token guardado manualmente");
    await loadChelas();
  });

  $("btnAddVino").addEventListener("click", addVino);
  $("btnAddChela").addEventListener("click", addChela);
  $("btnReloadVinos").addEventListener("click", loadVinos);
  $("btnReloadChelas").addEventListener("click", loadChelas);

  loadVinos();
  loadChelas();
}

init();
