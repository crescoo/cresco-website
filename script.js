/* =================================
   MOBILE MENU
================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
  navigation.classList.toggle("active");

  menuButton.textContent =
    navigation.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll("#navigation a").forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("active");
    menuButton.textContent = "☰";
  });
});


/* =================================
   SCROLL REVEAL
================================= */

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1
  }
);

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});


/* =================================
   SCROLL PROGRESS
================================= */

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", function () {
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
});


/* =================================
   BACK TO TOP
================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =================================
   PORTFOLIO FILTERS
================================= */

const galleryFilterButtons =
  document.querySelectorAll(".filter-button");

const galleryItems =
  document.querySelectorAll(".portfolio-item");

galleryFilterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    galleryFilterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    galleryItems.forEach(function (item) {
      const itemCategory = item.dataset.category;

      const shouldShow =
        selectedCategory === "all" ||
        selectedCategory === itemCategory;

      item.classList.toggle("filter-hidden", !shouldShow);
    });
  });
});


/* =================================
   IMAGE PROJECT MODAL
================================= */

const portfolioModal =
  document.getElementById("portfolioModal");

const portfolioModalClose =
  document.getElementById("portfolioModalClose");

const portfolioModalImage =
  document.getElementById("portfolioModalImage");

const portfolioModalTitle =
  document.getElementById("portfolioModalTitle");

const portfolioModalCategory =
  document.getElementById("portfolioModalCategory");

const portfolioModalDescription =
  document.getElementById("portfolioModalDescription");

document.querySelectorAll(".portfolio-view").forEach(function (button) {
  button.addEventListener("click", function () {
    portfolioModalTitle.textContent = button.dataset.title;
    portfolioModalCategory.textContent = button.dataset.category;

    portfolioModalImage.src = button.dataset.image;
    portfolioModalImage.alt = button.dataset.title;

    portfolioModalDescription.textContent =
      button.dataset.description;

    portfolioModal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

function closeImageModal() {
  portfolioModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

portfolioModalClose.addEventListener("click", closeImageModal);

portfolioModal.addEventListener("click", function (event) {
  if (event.target === portfolioModal) {
    closeImageModal();
  }
});


/* =================================
   VIDEO PROJECT MODAL
================================= */

const videoModal =
  document.getElementById("videoModal");

const videoModalClose =
  document.getElementById("videoModalClose");

const portfolioModalVideo =
  document.getElementById("portfolioModalVideo");

const videoModalTitle =
  document.getElementById("videoModalTitle");

const videoModalCategory =
  document.getElementById("videoModalCategory");

const videoModalDescription =
  document.getElementById("videoModalDescription");

document.querySelectorAll(".portfolio-video-view").forEach(function (button) {
  button.addEventListener("click", function () {
    videoModalTitle.textContent = button.dataset.title;
    videoModalCategory.textContent = button.dataset.category;
    videoModalDescription.textContent =
      button.dataset.description;

    portfolioModalVideo.src = button.dataset.video;
    portfolioModalVideo.currentTime = 0;

    videoModal.classList.add("active");
    document.body.classList.add("modal-open");

    portfolioModalVideo.play().catch(function () {
      // Some browsers require the visitor to click Play.
    });
  });
});

function closeVideoModal() {
  videoModal.classList.remove("active");
  portfolioModalVideo.pause();
  portfolioModalVideo.src = "";
  document.body.classList.remove("modal-open");
}

videoModalClose.addEventListener("click", closeVideoModal);

videoModal.addEventListener("click", function (event) {
  if (event.target === videoModal) {
    closeVideoModal();
  }
});


/* =================================
   VIDEO HOVER PREVIEW
================================= */

document.querySelectorAll(".portfolio-video video").forEach(function (video) {
  const videoCard = video.closest(".portfolio-video");

  videoCard.addEventListener("mouseenter", function () {
    video.play().catch(function () {
      // Browser may require direct interaction.
    });
  });

  videoCard.addEventListener("mouseleave", function () {
    video.pause();
    video.currentTime = 0;
  });
});


/* =================================
   FAQ ACCORDION
================================= */

document.querySelectorAll(".faq-question").forEach(function (question) {
  question.addEventListener("click", function () {
    const currentItem = question.parentElement;

    document.querySelectorAll(".faq-item").forEach(function (item) {
      if (item !== currentItem) {
        item.classList.remove("active");
      }
    });

    currentItem.classList.toggle("active");
  });
});


/* =================================
   CONTACT FORM DEMO
================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formMessage.style.display = "block";
  formMessage.textContent =
    "Thank you! Your enquiry has been received.";

  contactForm.reset();
});


/* =================================
   DARK / LIGHT THEME
================================= */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  const isLightMode =
    document.body.classList.contains("light-mode");

  themeButton.textContent = isLightMode ? "☾" : "☼";

  localStorage.setItem(
    "crescoTheme",
    isLightMode ? "light" : "dark"
  );
});

if (localStorage.getItem("crescoTheme") === "light") {
  document.body.classList.add("light-mode");
  themeButton.textContent = "☾";
}


/* =================================
   CLOSE MODALS WITH ESCAPE
================================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeImageModal();
    closeVideoModal();
  }
});