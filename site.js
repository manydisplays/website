// Many Displays website. Tiny, optional JavaScript: the site works without it.
//
// The price is also written as fallback text inside every <span data-price> in the HTML, so
// update both this constant and those spans.
var PRICE = "$19";

// Where visitors come from, without cookies or third parties. The campaign tags of the visit
// (utm_*, or the ?ref= that Product Hunt and others add, or the referrer's host) are kept in
// localStorage and appended to the download and checkout links, which live on
// shop.manydisplays.com. The shop counts downloads and stores the tags with the purchase.
// A tagged visit replaces what was stored; an untagged one keeps the first source.
(function () {
  var KEY = "md-attr";
  var params = new URLSearchParams(location.search);
  var tagged = params.get("utm_source") || params.get("ref") || params.get("src") || "";
  var stored = null;
  try { stored = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}

  if (tagged || !stored) {
    var refHost = "";
    try { refHost = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : ""; } catch (e) {}
    if (refHost === location.hostname) refHost = "";
    stored = {
      source: tagged || refHost || "direct",
      medium: params.get("utm_medium") || (tagged ? "" : refHost ? "referral" : "none"),
      campaign: params.get("utm_campaign") || "",
      content: params.get("utm_content") || "",
      ref: refHost,
      landing: location.pathname,
    };
    try { localStorage.setItem(KEY, JSON.stringify(stored)); } catch (e) {}
  }

  function decorate(link) {
    var url = new URL(link.href);
    ["source", "medium", "campaign", "content"].forEach(function (k) {
      if (stored[k]) url.searchParams.set("utm_" + k, String(stored[k]).slice(0, 100));
    });
    if (stored.ref) url.searchParams.set("ref", stored.ref);
    if (stored.landing) url.searchParams.set("landing", stored.landing);
    link.href = url.toString();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="https://shop.manydisplays.com/"]').forEach(decorate);
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-price]").forEach(function (el) {
    el.textContent = PRICE;
  });
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
});
