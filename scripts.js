document.addEventListener("DOMContentLoaded", function () {
  // Set Footer Year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  initViewer();
  initVideo();
});

// Video thumbnail: swap in the YouTube player only when tapped
function initVideo() {
  var buttons = document.querySelectorAll("[data-video]");
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.className = "video__player";
      var start = btn.getAttribute("data-start");
      frame.src =
        "https://www.youtube-nocookie.com/embed/" +
        btn.getAttribute("data-video") +
        "?autoplay=1&rel=0" +
        (start ? "&start=" + start : "");
      frame.title = btn.getAttribute("data-title") || "Video";
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      btn.replaceWith(frame);
      frame.focus();
    });
  });
}

// Photo / certificate viewer
// Buttons with data-gallery="<group>" open the viewer; Previous/Next stay within that group.
function initViewer() {
  var viewer = document.getElementById("viewer");
  if (!viewer) return;

  var items = Array.prototype.slice.call(document.querySelectorAll("[data-gallery]"));
  var img = viewer.querySelector(".viewer__img");
  var label = viewer.querySelector("[data-viewer-label]");
  var count = viewer.querySelector("[data-viewer-count]");
  var closeBtn = viewer.querySelector("[data-viewer-close]");
  var nav = viewer.querySelector(".viewer__nav");
  var group = [];
  var index = 0;
  var opener = null;

  function show() {
    var item = group[index];
    var thumb = item.querySelector("img");
    img.src = item.getAttribute("data-full") || thumb.src;
    img.alt = item.getAttribute("data-alt") || "";
    label.textContent = item.getAttribute("data-label") || "";
    count.textContent = index + 1 + " / " + group.length;
    nav.hidden = group.length < 2;
    setZoom(false);
  }

  function open(item) {
    var name = item.getAttribute("data-gallery");
    group = items.filter(function (el) {
      return el.getAttribute("data-gallery") === name;
    });
    index = group.indexOf(item);
    opener = item;
    show();
    viewer.hidden = false;
    document.body.classList.add("viewer-open");
    closeBtn.focus();
  }

  function close() {
    viewer.hidden = true;
    document.body.classList.remove("viewer-open");
    setZoom(false);
    if (opener) opener.focus();
  }

  function step(delta) {
    index = (index + delta + group.length) % group.length;
    show();
  }

  function setZoom(on, x, y) {
    viewer.classList.toggle("is-zoomed", on);
    img.style.transformOrigin = on ? x + "% " + y + "%" : "50% 50%";
  }

  // Point under the cursor/finger as a percentage of the image box
  function pointIn(e) {
    var r = img.getBoundingClientRect();
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
    };
  }

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      open(item);
    });
  });

  closeBtn.addEventListener("click", close);
  viewer.querySelector("[data-viewer-prev]").addEventListener("click", function () {
    step(-1);
  });
  viewer.querySelector("[data-viewer-next]").addEventListener("click", function () {
    step(1);
  });

  // The visible photo inside the <img> box (object-fit: contain leaves empty bands around it)
  function onPhoto(e) {
    var r = img.getBoundingClientRect();
    if (!img.naturalWidth) return false;
    var scale = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
    var w = img.naturalWidth * scale;
    var h = img.naturalHeight * scale;
    var left = r.left + (r.width - w) / 2;
    var top = r.top + (r.height - h) / 2;
    return e.clientX >= left && e.clientX <= left + w && e.clientY >= top && e.clientY <= top + h;
  }

  // Click/tap on the photo zooms in at that spot; any click while zoomed zooms out.
  // Clicking outside the photo while not zoomed closes the viewer. Buttons handle their own clicks.
  viewer.addEventListener("click", function (e) {
    if (e.target.closest("button")) return;
    if (viewer.classList.contains("is-zoomed")) {
      setZoom(false);
    } else if (e.target === img && onPhoto(e)) {
      var p = pointIn(e);
      setZoom(true, p.x, p.y);
    } else {
      close();
    }
  });

  // While zoomed, moving the mouse (or dragging a finger) looks around the photo.
  // Not zoomed, the zoom cursor shows only over the photo itself.
  img.addEventListener("pointermove", function (e) {
    if (!viewer.classList.contains("is-zoomed")) {
      img.style.cursor = onPhoto(e) ? "" : "default";
      return;
    }
    var p = pointIn(e);
    img.style.transformOrigin = p.x + "% " + p.y + "%";
  });

  // Escape zooms out then closes, arrows step, +/- zoom, Tab stays inside the viewer.
  // Listens on the document because tapping the photo moves focus off the viewer's buttons.
  document.addEventListener("keydown", function (e) {
    if (viewer.hidden) return;
    if (e.key === "Escape") {
      e.preventDefault();
      if (viewer.classList.contains("is-zoomed")) setZoom(false);
      else close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      setZoom(true, 50, 50);
    } else if (e.key === "-") {
      e.preventDefault();
      setZoom(false);
    } else if (e.key === "Tab") {
      var focusables = viewer.querySelectorAll("button");
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (!viewer.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
