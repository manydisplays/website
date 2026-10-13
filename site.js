// Many Displays website. Tiny, optional JavaScript: the site works without it.
//
// TODO(launch): confirm the final price. It is also written as fallback text inside every
// <span data-price> in the HTML, so update both this constant and those spans.
var PRICE = "$19";

// The checkout URL itself lives in buy.html (single <a id="checkout">). Every "Buy" button
// on the site links to buy.html, so the URL only needs to change there.

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-price]").forEach(function (el) {
    el.textContent = PRICE;
  });
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
});
