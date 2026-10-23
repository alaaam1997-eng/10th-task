const modeBtn = document.querySelector("#theme-toggle-button");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");
const tabs = document.querySelectorAll(".portfolio-filter");
const cards = document.querySelectorAll(".portfolio-item");
const backToTop = document.querySelector("#scroll-to-top");
const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");
const resetButton = document.getElementById("reset-settings");
const fontOptions = document.querySelectorAll(".font-option");
const colorsGrid = document.getElementById("theme-colors-grid");
const fontNames = {
  alexandria: "Alexandria",
  tajawal: "Tajawal",
  cairo: "Cairo",
};
const colors = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];
const carousel = document.getElementById("testimonials-carousel");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const card = document.querySelectorAll(".testimonial-card");

const indicators = document.querySelectorAll(".carousel-indicator");

// const card = carousel.children;


// ****************************** light and dark mood *******************************
modeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});
//********************************** scroll spy **********************************
window.addEventListener("scroll", function () {
  let currentSection = "";
  //scroll spy
  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 150) {
      currentSection = sections[i].getAttribute("id");
    }
  }

  for (let j = 0; j < links.length; j++) {
    links[j].classList.remove("active");

    if (links[j].getAttribute("href") == "#" + currentSection) {
      links[j].classList.add("active");
    }
  }
});

//**************************tab section********************************

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    let filter = this.getAttribute("data-filter");
    //*******************style tab edit*************************************
    for (let k = 0; k < tabs.length; k++) {
      tabs[k].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "shadow-lg",
        "shadow-primary/50",
      );
      tabs[k].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "bg-slate-100",
        "dark:bg-slate-700",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }

    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
    );
    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "bg-slate-100",
      "dark:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );

    //************************movement***********************************
    for (let k = 0; k < cards.length; k++) {
      cards[k].classList.remove("show-card", "hide-card");
      cards[k].style.display = "block";
    }
    void cards[0].offsetWidth;
    for (let n = 0; n < cards.length; n++) {
      cards[n].classList.add("hide-card");
    }

    setTimeout(function () {
      for (let m = 0; m < cards.length; m++) {
        let category = cards[m].getAttribute("data-category");

        cards[m].classList.remove("hide-card");
        cards[m].style.display = "none";

        if (filter == "all" || filter == category) {
          cards[m].style.display = "block";
          cards[m].classList.add("show-card");
        }
      }
    }, 250);
  });
}
//*************************** back to up **********************************

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.remove("invisible");
    backToTop.classList.remove("opacity-0");
    backToTop.classList.add("visible");
    backToTop.classList.add("opacity-100");
  } else {
    backToTop.classList.remove("visible");
    backToTop.classList.remove("opacity-100");
    backToTop.classList.add("invisible");
    backToTop.classList.add("opacity-0");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//************************************ side bar ****************************

settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.remove("translate-x-full");
  if (settingsSidebar.classList.contains("translate-x-full")) {
    settingsToggle.style.right = "0";
  } else {
    settingsToggle.style.right = "320px";
  }

  settingsSidebar.setAttribute("aria-hidden", "false");
  settingsToggle.setAttribute("aria-expanded", "true");
});

closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");

  settingsSidebar.setAttribute("aria-hidden", "true");
  settingsToggle.setAttribute("aria-expanded", "false");
  settingsToggle.style.right = "0";
});

for (let i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", function () {
    let selectedFont = this.getAttribute("data-font");

    document.body.style.fontFamily = fontNames[selectedFont];

    for (let j = 0; j < fontOptions.length; j++) {
      fontOptions[j].classList.remove("active");

      fontOptions[j].setAttribute("aria-checked", "false");
    }

    this.classList.add("active");

    this.setAttribute("aria-checked", "true");
  });
}

for (let i = 0; i < colors.length; i++) {
  let colorButton = document.createElement("button");

  colorButton.type = "button";
  colorButton.style.backgroundColor = colors[i];
  colorButton.className =
    "w-10 h-10 rounded-full cursor-pointer border-2 border-slate-300";

  colorButton.setAttribute("data-color", colors[i]);
  colorButton.setAttribute("aria-label", "اختيار اللون " + colors[i]);

  colorButton.addEventListener("click", function () {
    let selectedColor = this.getAttribute("data-color");
    console.log(this.getAttribute("data-color"));

    document.documentElement.style.setProperty(
      "--color-primary",
      selectedColor,
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      selectedColor,
    );
    document.documentElement.style.setProperty("--color-accent", selectedColor);
  });

  colorsGrid.appendChild(colorButton);
}

resetButton.addEventListener("click", function () {
  document.body.style.fontFamily = "Tajawal";

  // Reset theme color
  document.documentElement.style.setProperty("--color-primary", "#6366f1");
  document.documentElement.style.setProperty("--color-secondary", "#8b5cf6");
  document.documentElement.style.setProperty("--color-accent", "#a855f7");

  // Reset font selection
  for (let i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove("active");

    fontOptions[i].setAttribute("aria-checked", "false");

    if (fontOptions[i].getAttribute("data-font") === "tajawal") {
      fontOptions[i].classList.add("active");

      fontOptions[i].setAttribute("aria-checked", "true");
    }
  }
});
//***********************carousel ***************************************
let index = 0;

function updateCarousel() {
  let cardWidth = card[0].getBoundingClientRect().width;
  let gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;

  let move = index * (cardWidth + gap);

  carousel.style.transform = "translateX(" + move + "px)";

  for (let i = 0; i < indicators.length; i++) {
    if (i === index) {
      indicators[i].classList.add("bg-accent");
      indicators[i].classList.remove("bg-slate-400", "dark:bg-slate-600");
      indicators[i].setAttribute("aria-selected", "true");
    } else {
      indicators[i].classList.remove("bg-accent");
      indicators[i].classList.add("bg-slate-400");
      indicators[i].setAttribute("aria-selected", "false");
    }
  }
}

nextBtn.addEventListener("click", function () {
  if (index < card.length - 3) {
    index++;
  } else {
    index = 0;
  }

  updateCarousel();
});

prevBtn.addEventListener("click", function () {
  if (index > 0) {
    index--;
  } else {
    index = card.length - 3;
  }

  updateCarousel();
});

for (let i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    index = Number(this.getAttribute("data-index"));
    updateCarousel();
  });
}

window.addEventListener("resize", updateCarousel);
