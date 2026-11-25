/** @param {HTMLFormElement} form */
function validateCartQuantities(form) {
  const inputs = Array.from(
    form.querySelectorAll("[data-quantity-variant]"),
  ).filter((input) => input instanceof HTMLInputElement);
  for (const input of inputs) {
    const variant = input.dataset.quantityVariant;
    const total = inputs
      .filter((other) => other.dataset.quantityVariant === variant)
      .reduce((sum, other) => sum + (other.valueAsNumber || 0), 0);
    const minimum = Number(input.dataset.quantityMinimum);
    const increment = Number(input.dataset.quantityIncrement);
    const limit = input.dataset.quantityLimit;
    let error = "";
    if (limit !== undefined && limit !== "") {
      const maximum = Number(limit);
      input.max = String(
        Math.max(0, maximum - total + (input.valueAsNumber || 0)),
      );
      if (total > maximum) error = input.dataset.quantityLimitError ?? "";
    }
    if (total > 0 && (total < minimum || total % increment !== 0)) {
      error = input.dataset.quantityRuleError ?? "";
    }
    input.setCustomValidity(error);
  }
}

document.addEventListener("input", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (!input.matches("[data-quantity-variant]")) return;
  if (input.form) validateCartQuantities(input.form);
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (!form.matches("[data-cart-quantity-form]")) return;
  validateCartQuantities(form);
  if (!form.reportValidity()) event.preventDefault();
});

// Nonvisual marker for checking that the storefront script ran.
document.documentElement.dataset.themeAssets = "loaded";

const mobileHeader = window.matchMedia("(max-width: 40rem)");

/** @param {ParentNode} root */
function initializeHeaderMenus(root) {
  for (const header of root.querySelectorAll("[data-site-header]")) {
    if (header.hasAttribute("data-menu-ready")) continue;

    const toggle = header.querySelector("[data-header-menu-toggle]");
    const drawer = header.querySelector("dialog");
    const firstLink = header.querySelector(".header__menu a");
    if (!(toggle instanceof HTMLButtonElement) || !(drawer instanceof HTMLDialogElement)) continue;
    if (typeof drawer.showModal !== "function") continue;

    toggle.addEventListener("click", () => {
      if (!mobileHeader.matches || drawer.open) return;

      try {
        drawer.showModal();
      } catch {
        header.removeAttribute("data-menu-ready");
        toggle.hidden = true;
        if (firstLink instanceof HTMLAnchorElement) firstLink.focus();
      }
    });

    drawer.addEventListener("close", () => {
      if (drawer.open) return;
      const returnTarget = mobileHeader.matches ? toggle : firstLink;
      if (returnTarget instanceof HTMLElement) returnTarget.focus({ preventScroll: true });
    });

    toggle.hidden = false;
    header.setAttribute("data-menu-ready", "");
  }
}

if (typeof HTMLDialogElement !== "undefined") {
  initializeHeaderMenus(document);
  mobileHeader.addEventListener("change", () => {
    if (mobileHeader.matches) return;
    for (const drawer of document.querySelectorAll(".header__drawer[open]")) {
      if (drawer instanceof HTMLDialogElement) drawer.close();
    }
  });
  document.addEventListener("shopify:section:load", (event) => {
    if (event.target instanceof Element) initializeHeaderMenus(event.target);
  });
}
