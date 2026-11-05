(function () {
  var KEY = "zqphoto-site-lang";
  var root = document.documentElement;

  function detect() {
    var param = new URLSearchParams(location.search).get("lang");
    if (param === "en" || param === "zh") return param;
    if (location.hash === "#en") return "en";
    if (location.hash === "#zh") return "zh";
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === "en" || stored === "zh") return stored;
    } catch (e) {}
    var nav = (navigator.language || "zh-Hans").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i].dataset.lang === lang ? "true" : "false");
    }
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function bind() {
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () { apply(this.dataset.lang); });
    }
  }

  function markActiveLink() {
    var path = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll("nav.links a");
    for (var i = 0; i < links.length; i++) {
      var target = (links[i].getAttribute("href") || "").split("/").pop();
      if (target === path) links[i].classList.add("active");
    }
  }

  apply(detect());
  bind();
  markActiveLink();
})();
