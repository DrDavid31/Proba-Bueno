document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // 1. Resaltar enlace activo
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // 2. Animación de entrada (fade-in + slide-up)
  body.classList.add("fade-enter");
  requestAnimationFrame(() => {
    body.classList.add("fade-enter-active");
  });
  body.addEventListener("transitionend", function handler(e) {
    if (e.propertyName === "opacity") {
      body.classList.remove("fade-enter", "fade-enter-active");
      body.removeEventListener("transitionend", handler);
    }
  });

  // 3. Interceptar clics en enlaces internos para animación de salida
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      // Ignorar anclas o enlaces externos
      if (!href.startsWith("#") && !href.startsWith("http")) {
        e.preventDefault();
        body.classList.add("fade-exit");
        requestAnimationFrame(() => {
          body.classList.add("fade-exit-active");
        });
        body.addEventListener("transitionend", function handler2(ev) {
          if (ev.propertyName === "opacity") {
            window.location.href = href;
            body.removeEventListener("transitionend", handler2);
          }
        });
      }
    });
  });

  // 4. Botón flotante de WhatsApp
  const wBtn = document.getElementById("whatsapp-btn");
  if (wBtn) {
    wBtn.addEventListener("click", () => {
      window.open(
        "https://api.whatsapp.com/send/?phone=525518448622&text=Me+pueden+brindar+informaci%C3%B3n+de+sus+servicios&type=phone_number&app_absent=0",
        "_blank"
      );
    });
  }

  // 5. Formulario de contacto con confirmación
  const consentBtn = document.getElementById("open-consent");
  const consentOverlay = document.getElementById("aviso-overlay");
  const cancelSend = document.getElementById("cancelar-envio");
  const confirmSend = document.getElementById("confirmar-envio");
  const consentCheck = document.getElementById("aceptar-datos");
  const contactForm = document.getElementById("contacto-form");
  if (consentBtn && consentOverlay) {
    consentBtn.addEventListener("click", () => consentOverlay.classList.remove("hidden"));
    cancelSend?.addEventListener("click", () => consentOverlay.classList.add("hidden"));
    consentCheck?.addEventListener("change", () => {
      if (confirmSend) confirmSend.disabled = !consentCheck.checked;
    });
    confirmSend?.addEventListener("click", () => {
      consentOverlay.classList.add("hidden");
      alert("Datos enviados correctamente. (La base de datos no esta configurada)");
      contactForm?.reset();
    });
  }
});

