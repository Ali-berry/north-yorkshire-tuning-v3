// mobile menu aur services dropdown
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".drop-toggle");
  toggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown")) document.querySelectorAll(".dropdown.is-open").forEach((item) => item.classList.remove("is-open"));
});

// FAQ: ek waqt mein ek hi khula
document.querySelectorAll(".faq").forEach((list) => {
  list.addEventListener("toggle", (event) => {
    if (!event.target.open) return;
    list.querySelectorAll("details[open]").forEach((item) => { if (item !== event.target) item.open = false; });
  }, true);
});

// contact form: server nahi hai, is liye details WhatsApp ya email mein bhar ke khul jaati hain
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const fields = contactForm.elements;
  fields.reg.addEventListener("input", () => { fields.reg.value = fields.reg.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ""); });

  const buildMessage = () => {
    const error = document.getElementById("form-error");
    const missing = ["name", "phone", "reg"].filter((name) => !fields[name].value.trim());
    error.textContent = missing.length ? "Please add your name, phone and registration." : "";
    if (missing.length) {
      fields[missing[0]].focus();
      return null;
    }
    return [
      `Name: ${fields.name.value.trim()}`,
      `Phone: ${fields.phone.value.trim()}`,
      `Reg: ${fields.reg.value.trim()}`,
      fields.town.value.trim() && `Town: ${fields.town.value.trim()}`,
      `Service: ${fields.service.value}`,
      fields.message.value.trim() && `Message: ${fields.message.value.trim()}`,
    ].filter(Boolean).join("\n");
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = buildMessage();
    if (message) window.open(`https://wa.me/${contactForm.dataset.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
  document.getElementById("send-email").addEventListener("click", () => {
    const message = buildMessage();
    if (message) window.location.href = `mailto:${contactForm.dataset.email}?subject=${encodeURIComponent("Appointment request")}&body=${encodeURIComponent(message)}`;
  });
}
