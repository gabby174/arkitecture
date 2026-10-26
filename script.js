document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const navHeight = document.querySelector("nav").offsetHeight;

  // Smooth scroll, offset by the fixed navbar
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      e.preventDefault();
      if (id === "contacts") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(id);
      if (!target) return; // e.g. PAGES has no section yet
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // Highlight the nav link for the section currently on screen
  const sections = [...links]
    .map((l) => document.getElementById(l.getAttribute("href").slice(1)))
    .filter(Boolean);

  function setActive() {
    const y = window.scrollY + navHeight + 80;
    let current = sections[0];
    sections.forEach((s) => { if (s.offsetTop <= y) current = s; });
    links.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + current.id)
    );
  }
  window.addEventListener("scroll", setActive);
  setActive();
});
