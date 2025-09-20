
$(function () {
  $("#navbar").load("navbar.html");
  $("#footer").load("footer.html");
  setMainHeight();
  initCarousel(".schedule-carousel");
  initCarousel(".guest-carousel");
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
  const ids = [
    "mainTitle",
    "mainSubtitle",
    "heroDescription",
    "dateLine1",
    "dateLine2",
    "dateLine3",
    "signUp",
    "scheduleTitle",
    "activityTitle1",
    "location",
    "prevBtn",
    "nextBtn",
    "moderator",
    "heloisaTitle",
    "Break",
  ];
  ids.forEach((id) => {
    const key = `${id}_${lang}`;
    if (translations[key]) {
      $(`#${id}`).html(translations[key]);
    }
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
