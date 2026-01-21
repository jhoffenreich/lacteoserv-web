// Menú mobile
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn?.addEventListener("click", () => menu.classList.toggle("open"));

// WhatsApp redirect form
const WHATSAPP_PHONE = "541140819500"; // +54 11 4081-9500 sin + ni guiones
const form = document.getElementById("quoteForm");

function buildMessage({ nombre, telefono, cuit, razon_social, rubro, email, negocio, mensaje }) {
  const lines = [
    "Hola LacteoServ,",
    `Mi nombre es ${nombre}.`,
    `Teléfono: ${telefono}`,
    `CUIT: ${cuit}`,
    `Razón Social: ${razon_social}`,
    `Rubro: ${rubro}`,
  ];
  if (email) lines.push(`Email: ${email}`);
  if (negocio) lines.push(`Negocio: ${negocio}`);
  lines.push("");
  lines.push(`Mensaje: ${mensaje}`);
  return lines.join("\n");
}

function openWhatsAppWithText(text) {
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.nombre || !data.telefono || !data.cuit || !data.razon_social || !data.rubro || !data.mensaje) {
    alert("Por favor completá nombre, teléfono, CUIT, razón social, rubro y mensaje.");
    return;
  }

  const msg = buildMessage(data);
  openWhatsAppWithText(msg);
});

// Botones "Consultar" NO abren WhatsApp directo: prellenan y llevan al formulario
document.querySelectorAll("[data-prefill]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const prefill = btn.getAttribute("data-prefill") || "";
    const textarea = document.querySelector('textarea[name="mensaje"]');

    if (textarea) {
      textarea.value = prefill + (textarea.value ? "\n" + textarea.value : "");
    }
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    textarea?.focus();
  });
});
