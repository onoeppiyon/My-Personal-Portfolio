// Animated GIF background with a show/hide toggle (choice is remembered).
(function () {
  var root = document.documentElement;
  var KEY = "bg-gif";
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var on = saved ? saved === "on" : !reduce;   // default: on (off if the visitor prefers reduced motion)

  var layer = document.createElement("div");
  layer.className = "bg-gif";
  layer.setAttribute("aria-hidden", "true");
  document.body.insertBefore(layer, document.body.firstChild);

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "bg-toggle";
  var bar = document.querySelector(".bar");
  if (bar) bar.appendChild(btn);

  function apply() {
    root.setAttribute("data-bg", on ? "on" : "off");
    // Only download the GIF while it is shown.
    layer.style.backgroundImage = on ? "url(background.gif)" : "none";
    btn.textContent = on ? "Hide background" : "Show background";
  }
  btn.addEventListener("click", function () {
    on = !on;
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) {}
    apply();
  });
  apply();
})();
