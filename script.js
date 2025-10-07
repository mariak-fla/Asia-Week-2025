$(function () {
  $("#navbar").load("partials/navbar.html");

  $("#footer").load("partials/footer.html");

  $("#schedule").load("partials/schedule.html", function () {
    initCarousel(".schedule-carousel");
  });

  $("#lecturers").load("partials/lecturers.html");

  $("#guests").load("partials/guests.html", function () {
    initCarousel(".guest-carousel");
  });

  $("#partners").load("partials/partners.html");

  $("#contact").load("partials/contact.html");

  setMainHeight();
  updateLanguage();
});

function setMainHeight() {
  const main = document.querySelector("main");
  if (main) {
    main.style.height = window.innerHeight + "px";
  }
}
window.addEventListener("resize", setMainHeight);
document.addEventListener("DOMContentLoaded", setMainHeight);

// Language toggle
let translations = {};
$.getJSON("translation.json", function (data) {
  data.forEach((item) => {
    translations[item.key] = item.value;
  });
  updateLanguage();
});

$(document).on("change", "#lang-toggle", updateLanguage);

function updateLanguage() {
  const isJP = $("#lang-toggle").is(":checked");
  const lang = isJP ? "jp" : "en";

  $("[class*='i18n-']").each(function () {
    const classes = this.className.split(/\s+/);
    classes.forEach((cls) => {
      if (cls.startsWith("i18n-")) {
        const keyBase = cls.replace(/^i18n-/, ""); // Remove i18n- prefix
        const key = `${keyBase}_${lang}`;
        if (translations[key]) {
          console.log(
            "Translating",
            cls,
            "with key",
            key,
            "->",
            translations[key]
          );
          $(this).html(translations[key]);
        }
      }
    });
  });
}

// Carousel Logic
function initCarousel(carouselSelector) {
  const $carousel = $(carouselSelector);
  const $track = $carousel.find(".carousel-track");
  const $slides = $track.children(".carousel-slide");
  const $prev = $carousel.parent().find(".slide-btn.prev");
  const $next = $carousel.parent().find(".slide-btn.next");
  let current = 0;
  const total = $slides.length;

  function updateCarousel() {
    const slideWidth = $slides[0].offsetWidth;
    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    if (isDesktop) {
      $track.css("transform", `translateX(-${current * slideWidth}px)`);
    } else {
      $track.css("transform", `translateX(-${current * 100}vw)`);
    }
  }

  $prev.on("click", function (e) {
    e.preventDefault();
    current = (current - 1 + total) % total;
    console.log(current);
    updateCarousel();
  });
  $next.on("click", function (e) {
    e.preventDefault();
    current = (current + 1) % total;
    updateCarousel();
  });

  $(window).on("resize", updateCarousel);
  updateCarousel();
}
