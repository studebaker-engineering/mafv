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

// Reload the variant-specific Liquid constraints through the native GET form.
document.addEventListener("change", (event) => {
  const selector = event.target;
  if (!(selector instanceof HTMLSelectElement)) return;
  if (!selector.matches("[data-variant-selector]")) return;
  selector.form?.requestSubmit();
});

// The native submit button remains available until enhancement has loaded.
for (const button of document.querySelectorAll("[data-variant-submit]")) {
  if (button instanceof HTMLButtonElement) button.hidden = true;
}

// Nonvisual marker for checking that the storefront script ran.
document.documentElement.dataset.themeAssets = "loaded";
