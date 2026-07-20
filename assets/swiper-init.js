/* Cloudy Mattress - Swiper Initialization */
document.addEventListener("DOMContentLoaded", function() {
  /* Init all Swipers */
  document.querySelectorAll(".swiper").forEach(function(swiperEl) {
    if (swiperEl.classList.contains("swiper-initialized")) return;
    var slidesCount = swiperEl.querySelectorAll(".swiper-slide").length;
    var isGroup = swiperEl.classList.contains("cm-swiper-group");
    var canLoop = isGroup ? slidesCount > 1 : slidesCount > 3;
    var scope = swiperEl.closest("section") || document;
    var prevBtn = scope.querySelector(".cm-arrow.prev");
    var nextBtn = scope.querySelector(".cm-arrow.next");

    new Swiper(swiperEl, {
      observer: true,
      observeParents: true,
      slidesPerView: isGroup ? 1 : 3,
      spaceBetween: isGroup ? 40 : 20,
      speed: 800,
      loop: canLoop,
      autoplay: canLoop ? {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      } : false,
      breakpoints: isGroup ? undefined : {
        0:    { slidesPerView: 1 },
        576:  { slidesPerView: 2 },
        992:  { slidesPerView: 3 },
        1200: { slidesPerView: 3 },
      },
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
    });
  });

  /* Tab switching */
  document.querySelectorAll(".cm-tabs-nav").forEach(function(tabsNav) {
    var section = tabsNav.closest("section");
    if (!section) return;
    var tabButtons = tabsNav.querySelectorAll("[data-tab-btn]");
    var tabPanels = section.querySelectorAll(".cm-tabs-content .cm-tab-panel");
    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var key = btn.dataset.tabBtn;
        tabButtons.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        tabPanels.forEach(function(panel) {
          panel.classList.toggle("active", panel.dataset.tabPanel === key);
        });
        var activePanel = section.querySelector('.cm-tab-panel[data-tab-panel="' + key + '"]');
        if (activePanel) {
          activePanel.querySelectorAll(".swiper").forEach(function(sw) {
            if (!sw.swiper) return;
            requestAnimationFrame(function() {
              sw.swiper.updateSize();
              sw.swiper.updateSlides();
              sw.swiper.update();
            });
          });
        }
      });
    });
  });
});
