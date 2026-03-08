const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");
let mouseX = 0,
  mouseY = 0,
  followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

document
  .querySelectorAll("a, button, .card, .project-card, .workshop-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      follower.style.transform = "translate(-50%, -50%) scale(2)";
      follower.style.opacity = "0.2";
    });
    el.addEventListener("mouseleave", () => {
      follower.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.opacity = "0.5";
    });
  });

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-fill")
          .forEach((bar) => bar.classList.add("animated"));
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const skillsSection = document.getElementById("skills");
if (skillsSection) skillObserver.observe(skillsSection);

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.style.display === "flex";
  navLinks.style.display = isOpen ? "none" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "70px";
  navLinks.style.right = "2rem";
  navLinks.style.background = "var(--bg)";
  navLinks.style.padding = "1.5rem";
  navLinks.style.border = "1px solid var(--border)";
  navLinks.style.borderRadius = "8px";
  navLinks.style.gap = "1.2rem";
  navLinks.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 900) navLinks.style.display = "none";
  });
});

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200)
      current = section.getAttribute("id");
  });
  navItems.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + current)
      link.style.color = "var(--accent)";
  });
});
