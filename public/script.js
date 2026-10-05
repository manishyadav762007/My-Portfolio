(() => {
  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const skills = [
    ["Python", "Backend & scripting", "python", "default"],
    ["HTML5", "Web structure", "html5", "default"],
    ["CSS3", "Responsive styling", "css3", "default"],
    ["JavaScript", "Interactive experiences", "javascript", "default"],
    ["Vue.js", "Frontend development", "vue", "default"],
    ["Flask", "Python web apps", "flask", "dark"],
    ["FastAPI", "API development", "fastapi", "default"],
    ["SQLite", "Relational databases", "sqlite", "default"],
    ["MySQL", "Database management", "mysql", "dark"],
    ["Redis", "System design · caching", "redis", "default"],
    ["Celery", "System design · tasks", "celery", "default"],
    ["GitHub", "Code & collaboration", "github", "dark"],
  ];
  const grid = document.getElementById("skill-grid");
  skills.forEach(([name, description, slug, variant]) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    const image = document.createElement("img");
    image.src = `https://thesvg.org/icons/${slug}/${variant}.svg`;
    image.alt = "";
    image.width = 29;
    image.height = 29;
    image.loading = "lazy";
    const title = document.createElement("strong");
    title.textContent = name;
    const subtitle = document.createElement("span");
    subtitle.textContent = description;
    card.append(image, title, subtitle);
    grid.append(card);
  });

  const roles = [
    "Python Developer Intern",
    "Software Developer",
    "Full Stack Developer",
    "Python Specialist",
    "Data Science Enthusiast",
  ];
  const typedRole = document.getElementById("typed-role");
  if (!reducedMotion) {
    let roleIndex = 0;
    let length = roles[0].length;
    let deleting = true;
    function typeRole() {
      const current = roles[roleIndex];
      length += deleting ? -1 : 1;
      typedRole.textContent = current.slice(0, length);
      let delay = deleting ? 38 : 75;
      if (deleting && length === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 260;
      } else if (!deleting && length === current.length) {
        deleting = true;
        delay = 2000;
      }
      window.setTimeout(typeRole, delay);
    }
    window.setTimeout(typeRole, 2000);
  }

  const menu = document.getElementById("navigation");
  const menuToggle = document.querySelector(".menu-toggle");
  function closeMenu() {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  if ("IntersectionObserver" in window) {
    if (!reducedMotion) {
      document.body.classList.add("motion-ready");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((section) => revealObserver.observe(section));
    }
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            menu.querySelectorAll("a").forEach((link) => {
              const active = link.hash === `#${entry.target.id}`;
              link.classList.toggle("active", active);
              if (active) link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => navObserver.observe(section));
  }

  const dialog = document.getElementById("detail-dialog");
  const dialogContent = document.getElementById("dialog-content");
  const projectDetails = {
    trekking: {
      title: "Trekking Management System",
      label: "01 / FULL-STACK PROJECT",
      description:
        "Built as part of my Modern Application Development 1 coursework in the IIT Madras BS program, this project connects Python application development with the world of trekking.",
      stack: ["Python", "Flask", "SQLite", "HTML / CSS"],
      lessons: [
        "Bringing frontend and backend concepts together in one application.",
        "Working with Flask and a relational SQLite database.",
        "Applying coursework to a complete academic project, earning a 9 CGPA project grade.",
      ],
      repository:
        "https://github.com/manishyadav762007/MAD-1-Project-IITM-BS-Trekking-Management-System-",
    },
    javascript: {
      title: "JavaScript · 10 Mini Projects",
      label: "02 / LEARNING BY DOING",
      description:
        "A collection of ten basic JavaScript projects created along my learning journey. Each small build is an opportunity to understand the language through practical experimentation.",
      stack: ["JavaScript", "HTML5", "CSS3", "DOM"],
      lessons: [
        "Practicing core JavaScript concepts through small, focused builds.",
        "Connecting HTML, CSS, and JavaScript to create interactive pages.",
        "Learning incrementally and sharing the journey through source code.",
      ],
      repository:
        "https://github.com/manishyadav762007/Javascript-learning-Projects-",
    },
  };
  const achievementDetails = {
    foundation: [
      "ACADEMIC MILESTONE",
      "Foundation completed",
      "Achieved the Foundation Stage milestone in the IIT Madras BS Data Science & Applications program. Now in my 2nd year, I am pursuing a Diploma in Programming to strengthen my expertise in software development and data science.",
    ],
    project: [
      "LEARNING IN PRACTICE",
      "9 CGPA · MAD1 Project",
      "Currently holding an overall Project CGPA of 9 in the IIT Madras BS program, showcasing strong academic excellence and practical application of Web Devlopment.",
    ],
    sports: [
      "BEYOND THE KEYBOARD",
      "A sporting spirit",
      `<ul>
        <li>
          <strong>Gold Medal</strong> – PPL 3.0 (Cricket), achieved as Team
          Captain
        </li>
        <li>
          <strong>Silver Medal</strong> – Chaseres League 2.0 (Paradox Event),
          achieved as Team Captain
        </li>
      </ul>`,
    ],
  };
  let previousFocus;
  function openDialog(content) {
    previousFocus = document.activeElement;
    dialogContent.innerHTML = content;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.scrollTop = 0;
    dialog.querySelector(".dialog-close").focus();
  }
  function showProject(key, updateUrl = true) {
    const project = projectDetails[key];
    if (!project) return;
    openDialog(
      `<span class="overline">${project.label}</span><h2 id="dialog-title">${project.title}</h2>${key === "trekking" ? '<img class="dialog-image" src="./images/trekking.png" alt="Himalayan peaks and a trekking trail">' : ""}<p>${project.description}</p><div class="tags">${project.stack.map((tag) => `<span>${tag}</span>`).join("")}</div><h3>What I learned</h3><ul>${project.lessons.map((lesson) => `<li>${lesson}</li>`).join("")}</ul><p class="dialog-note">This project is available as source code. A hosted live demo has not been linked yet.</p><a class="button primary" href="${project.repository}" target="_blank" rel="noopener noreferrer">Explore the GitHub repo <svg class="icon"><use href="#arrow-up"/></svg></a>`,
    );
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("project", key);
      window.history.pushState({ project: key }, "", url);
    }
  }
  document.querySelectorAll("[data-project]").forEach((link) =>
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      showProject(link.dataset.project);
    }),
  );
  document.querySelectorAll("[data-achievement]").forEach((button) =>
    button.addEventListener("click", () => {
      const [label, title, description] =
        achievementDetails[button.dataset.achievement];
      openDialog(
        `<span class="overline">${label}</span><h2 id="dialog-title">${title}</h2><p>${description}</p><a class="button secondary" href="mailto:manishyadav762007@gmail.com?subject=Certificate%20request">Request certificate <svg class="icon"><use href="#mail"/></svg></a>`,
      );
    }),
  );
  document.querySelectorAll("[data-cv]").forEach((button) =>
    button.addEventListener("click", () => {
      // openDialog(
      //   '<span class="overline">LET’S CONNECT</span><h2 id="dialog-title">Looking for my CV?</h2><p>The resume PDF has not been attached to this portfolio yet. Send me a quick email and ask for the latest copy.</p><a class="button primary" href="mailto:manishyadav762007@gmail.com?subject=Request%20for%20your%20CV">Request my CV <svg class="icon"><use href="#mail"/></svg></a>',
      // );
      window.open("./documents/mycv.pdf", "_blank");
    }),
  );
  document
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    const url = new URL(window.location.href);
    if (url.searchParams.has("project")) {
      url.searchParams.delete("project");
      window.history.replaceState(null, "", url);
    }
    previousFocus?.focus();
  });
  window.addEventListener("popstate", () => {
    const project = new URLSearchParams(window.location.search).get("project");
    if (projectDetails[project]) showProject(project, false);
    else if (dialog.open) dialog.close();
  });
  const initialProject = new URLSearchParams(window.location.search).get(
    "project",
  );
  if (projectDetails[initialProject]) showProject(initialProject, false);

  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");
  function replyTo(message) {
    const text = message.toLowerCase();
    if (
      /\b(skill|skills|stack|python|language|languages|flask|fastapi|vue|redis|celery|database|databases)\b/.test(
        text,
      )
    )
      return "Manish works with Python, Flask, FastAPI, HTML, CSS, JavaScript, and Vue.js. His database toolkit includes SQLite and MySQL, with Redis and Celery for system design. Explore the Skills section for the full toolkit!";
    if (/\b(project|projects|trek|trekking|javascript|build|work)\b/.test(text))
      return "Explore two featured projects: a Trekking Management System built with Flask and SQLite, and a collection of 10 JavaScript mini projects. The Projects section has details and links to both GitHub repositories.";
    if (
      /\b(contact|email|phone|hire|hiring|connect|internship|opportunity|opportunities|available)\b/.test(
        text,
      )
    )
      return "You can reach Manish at manishyadav762007@gmail.com or +91 86980 84063. He is open to opportunities! His LinkedIn profile is linkedin.com/in/maniish-yadavv.";
    if (
      /\b(education|study|studying|college|iit|iitm|madras|degree|student)\b/.test(
        text,
      )
    )
      return "Manish is pursuing the BS program at IIT Madras. He completed the foundation stage and earned a 9 CGPA grade for his MAD1 project.";
    if (
      /\b(achievement|achievements|certificate|certificates|sport|sports|medal|medals|grade|cgpa)\b/.test(
        text,
      )
    )
      return "His milestones include completing the IIT Madras BS foundation stage, a 9 CGPA MAD1 project grade, and sports achievements. Original certificate images are not yet attached, but you can request them by email.";
    if (/\b(cv|resume)\b/.test(text))
      return "The resume PDF has not been attached yet. Please email manishyadav762007@gmail.com to request the latest CV.";
    if (/\b(github|repository|repo)\b/.test(text))
      return "Find Manish’s code at github.com/manishyadav762007. Each featured project also has a direct GitHub Repo link.";
    if (/\b(hello|hi|hey|namaste)\b/.test(text))
      return "Hello! I can tell you about Manish’s skills, projects, education, achievements, or contact details. What would you like to explore?";
    if (/\b(thanks|thank)\b/.test(text))
      return "You’re welcome! Feel free to explore the projects or get in touch with Manish.";
    if (/\b(who|about|manish)\b/.test(text))
      return "Manish Yadav is a Python and full-stack development enthusiast studying in the IIT Madras BS program. He enjoys building practical projects, exploring data science, and playing sports.";
    return "I’m a simple portfolio guide, so I only know a few topics. Try asking about skills, projects, education, achievements, the CV, or contact details.";
  }
  function appendMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.textContent = text;
    chatMessages.append(message);
    while (chatMessages.children.length > 40)
      chatMessages.firstElementChild.remove();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function sendChat(text) {
    const value = text.trim().slice(0, 500);
    if (!value) return;
    appendMessage(value, "user");
    appendMessage(replyTo(value), "bot");
    chatInput.value = "";
  }
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.isComposing || event.keyCode === 229))
      event.preventDefault();
  });
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChat(chatInput.value);
    chatInput.focus();
  });
  document
    .querySelectorAll("[data-question]")
    .forEach((button) =>
      button.addEventListener("click", () => sendChat(button.dataset.question)),
    );
  document.querySelector(".chat-launcher").addEventListener("click", () => {
    document.getElementById("assistant").scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "center",
    });
    chatInput.focus({ preventScroll: true });
  });

  const contactForm = document.getElementById("contact-form");
  contactForm
    .querySelectorAll("input, textarea")
    .forEach((input) =>
      input.addEventListener("input", () => input.setCustomValidity("")),
    );
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = ["name", "subject", "message"];
    for (const id of fields) {
      const field = document.getElementById(id);
      field.setCustomValidity(
        field.value.trim().length < Number(field.getAttribute("minlength"))
          ? "Please add a little more detail, not just spaces."
          : "",
      );
    }
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const subject = String(data.get("subject")).trim();
    const body = `${String(data.get("message")).trim()}\n\nFrom: ${String(data.get("name")).trim()}\nReply to: ${String(data.get("email")).trim()}`;
    const emailUrl = `mailto:manishyadav762007@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
    document.getElementById("form-status").textContent =
      "Your email draft is ready to open. Please send it from your email app. If it does not open, email manishyadav762007@gmail.com directly.";
  });

  document.documentElement.dataset.ready = "true";
})();

// typing effect code

const roles = [
  "Software Developer Engineer",
  "Python Developer",
  " Future Data Science Enthusiast",
  " Future Data Scientist",
  " Future AI & ML Engineer",
];

const typedSpan = document.getElementById("typed-role");
const cursor = document.querySelector(".typing-cursor");

let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (typing) {
    // Typing characters one by one
    typedSpan.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      typing = false;
      setTimeout(typeEffect, 2000); // pause after full word
      return;
    }
  } else {
    // Deleting characters one by one
    typedSpan.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length; // move to next role
    }
  }

  setTimeout(typeEffect, typing ? 100 : 50); // typing speed vs deleting speed
}

// Start typing effect
typeEffect();
