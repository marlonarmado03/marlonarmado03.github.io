// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

// Show/hide sticky navigation and scroll button based on scroll position
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Side Navigation Menu
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

// Open side navigation
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Close side navigation
cancelBtn.onclick = hideNavMenu;

// Close side navigation when a menu link is clicked
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

// Reveal animation for section blocks
const revealElements = document.querySelectorAll(".reveal");
const staggerGroups = document.querySelectorAll(".stagger-group");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => revealObserver.observe(element));
staggerGroups.forEach((group) => {
  group.querySelectorAll(".stagger-item").forEach((item, index) => {
    item.style.setProperty("--stagger-delay", `${index * 0.12}s`);
  });
});

const heroVisual = document.querySelector(".hero-visual");
const heroFrame = document.querySelector(".hero-image-frame");

if (heroVisual && heroFrame) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    heroFrame.style.transform = `rotate(${offsetX * 8}deg) translateY(${offsetY * -10}px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroFrame.style.transform = "";
  });
}

const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const chatbotWidget = document.querySelector(".chatbot-widget");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotPanel = document.querySelector(".chatbot-panel");
const chatbotClose = document.querySelector(".chatbot-close");
const chatConversation = document.querySelector(".chatbot-conversation");
const chatQuestions = document.querySelectorAll(".chat-question");

const chatbotReplies = {
  services:
    "Marlon offers custom web development, UI/UX design, performance optimization, mobile app development, API integration, and maintenance support.",
  projects:
    "Recent featured work includes a Human Resources Management System, a Car Rental and Transport System, and a Barangay Management System.",
  skills:
    "Main technologies used here are PHP, React Native, MySQL, JavaScript, HTML, and CSS for responsive and user-friendly solutions.",
  contact:
    "Visitors can use the Contact section on this page to reach out about web and mobile projects. You can also invite them to click the chat or contact call-to-action."
};

const setChatbotState = (isOpen) => {
  if (!chatbotWidget || !chatbotToggle || !chatbotPanel) {
    return;
  }

  chatbotWidget.classList.toggle("open", isOpen);
  chatbotToggle.setAttribute("aria-expanded", String(isOpen));
  chatbotPanel.setAttribute("aria-hidden", String(!isOpen));
};

const appendChatMessage = (message, type) => {
  if (!chatConversation) {
    return;
  }

  const bubble = document.createElement("div");
  bubble.className = `chatbot-message ${type}`;
  bubble.textContent = message;
  chatConversation.appendChild(bubble);
  chatConversation.scrollTop = chatConversation.scrollHeight;
};

if (chatbotToggle) {
  chatbotToggle.addEventListener("click", () => {
    const isOpen = chatbotWidget.classList.contains("open");
    setChatbotState(!isOpen);
  });
}

if (chatbotClose) {
  chatbotClose.addEventListener("click", () => setChatbotState(false));
}

chatQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    const { question } = button.dataset;
    const label = button.textContent.trim();
    const reply = chatbotReplies[question];

    if (!reply) {
      return;
    }

    setChatbotState(true);
    appendChatMessage(label, "user");

    window.setTimeout(() => {
      appendChatMessage(reply, "bot");
    }, 220);
  });
});
