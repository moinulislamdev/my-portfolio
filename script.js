// Moinul Islam — portfolio interactions
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("scrollProgress");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Reading progress indicator
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", event => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal sections as they enter the viewport
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Rotating role text with a lightweight typing effect
  const roleElement = document.getElementById("typedRole");
  const roles = ["web applications.", "Laravel solutions.", "DevOps skills.", "cloud knowledge."];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (roleElement && !reducedMotion) {
    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;

    const type = () => {
      const current = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      roleElement.textContent = current.substring(0, characterIndex);

      let delay = deleting ? 45 : 75;
      if (deleting && characterIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      } else if (!deleting && characterIndex >= roles[roleIndex].length) {
        deleting = true;
        delay = 1500;
      }
      window.setTimeout(type, delay);
    };
    window.setTimeout(type, 1800);
  }
});
