// Google Analytics 4 with Consent Mode v2: nothing is stored on the visitor's device until they
// accept the banner. "Reject" keeps GA in cookieless, consent-denied mode. The choice is kept in
// localStorage for a year. Set GA_ID to the measurement id of the web data stream.
var GA_ID = "G-Q8E2947M7M";

(function () {
  if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return; // not configured yet
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var choice = null;
  try { choice = JSON.parse(localStorage.getItem("md-consent") || "null"); } catch (e) {}
  if (choice && Date.now() - choice.at > 365 * 86400000) choice = null;

  gtag("consent", "default", {
    analytics_storage: choice && choice.granted ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    wait_for_update: 500,
  });
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  if (choice) return;
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.id = "consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookies");
    bar.innerHTML =
      '<p>We use Google Analytics to count visits. No ads, no selling data. <a href="privacy.html">Privacy</a></p>' +
      '<div><button type="button" data-consent="no">No thanks</button><button type="button" class="btn btn-primary" data-consent="yes">OK</button></div>';
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]");
      if (!b) return;
      var granted = b.getAttribute("data-consent") === "yes";
      try { localStorage.setItem("md-consent", JSON.stringify({ granted: granted, at: Date.now() })); } catch (err) {}
      gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
      bar.remove();
    });
    document.body.appendChild(bar);
  });
})();
