# Studebaker Engineering Template

A restrained, product-focused foundation for independent boutique brands, based on Shopify's Skeleton theme. Native Liquid commerce is styled with system fonts, a neutral palette, and responsive layouts. Source customization is expected.

## Local development

The repository contains the deployable theme and requires no build step. Shopify renders Liquid and serves the CSS and JavaScript in `assets/` directly. Use an authenticated [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) for preview and upload.

```sh
shopify theme dev --store your-store.myshopify.com
```

Open the preview URL printed by Shopify CLI. Edit Liquid or the files in `assets/` and let Shopify CLI reload the preview.

## Commands

| Command | Purpose |
| --- | --- |
| `shopify theme dev --store <store>` | Start Shopify preview with live reload |
| `shopify theme check` | Validate Liquid and theme files |
| `shopify theme push --unpublished --store <store>` | Upload an unpublished theme after validation |

Use Shopify’s Liquid extension in VS Code for Liquid formatting, syntax highlighting, and diagnostics. Enable Liquid format-on-save in your local VS Code settings if desired. Shopify’s admin code editor also provides formatting and Theme Check. Use the editor’s built-in JavaScript support with the JSDoc annotations in the theme. [Shopify Liquid extension](https://shopify.dev/docs/storefronts/themes/tools/shopify-liquid-vscode), [Shopify admin code editor](https://shopify.dev/docs/storefronts/themes/tools/code-editor)

Direct Shopify CLI preview, packaging, and upload work from a checkout. The standard theme directories at the repository root also support a future GitHub connection from the same branch. [Shopify GitHub theme requirements](https://shopify.dev/docs/storefronts/themes/tools/github)

## Rebrand for a client

1. Set the store name in **Settings → General**. The header uses this name when the logo picker is empty, and the footer uses it in the copyright. [Shopify store details](https://help.shopify.com/en/manual/your-account/manage-orgs-and-stores/manage-store-details)
2. Open **Online Store → Themes** and edit the theme. Under **Theme settings → Brand identity**, upload a tightly cropped logo and a square favicon. The header scales the logo within its available space and uses the store name as its image alternative. The favicon is shared by storefront, password, and gift card pages.
3. Edit `assets/tokens.css` for the palette, body and heading fonts, page width, margins, and spacing. Update `--color-on-accent` alongside `--color-accent` and check their contrast. See [styling conventions](docs/styling.md).
4. In **Online Store → Pages**, create or update the client's informational pages. Use **Default page** for standard rich text and **about** for the brand story. Set the optional **Hero image** in the theme editor's **About page** section and add descriptive alt text if it conveys information. Shopify lists templates from the published theme for page assignment. [Shopify template assignment](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates)
5. In **Settings → Policies**, save the client's applicable policies. Add links by selecting **Policies** when editing the footer menu. The theme styles Shopify's native policy pages in `assets/base.css`. [Shopify policy settings](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos)
6. In **Content → Menus**, create or update the primary and footer menus. Add top-level links to the relevant collections, pages, and policies. In the theme editor, select each menu under **Header → Menu** and **Footer → Menu**. Both sections display the selected menu's top-level entries. [Shopify menu editing](https://help.shopify.com/en/manual/online-store/menus-and-links/editing-menus)

For custom layouts, start with `sections/hello-world.liquid` and `templates/index.json` for the homepage, `sections/page-about.liquid` for the brand story, and `sections/header.liquid` or `sections/footer.liquid` for the storefront shell. Update storefront copy in `locales/en.default.json` where the section uses translation keys.

### Manual review

- **Variants and add to cart.** Select a variant and confirm its price, availability, and quantity rules update. Test a direct variant URL, a sold-out variant, and adding an available variant to the cart. Repeat variant selection with JavaScript disabled using the native submit button.
- **Cart.** Update quantities, including multiple lines for the same variant if available. Check quantity validation, remove a line, and verify totals and checkout handoff.
- **Collections.** Check product cards, image sizing, pagination, and an empty collection.
- **Content and policies.** Review the About hero, standard page copy, and native policy formatting.
- **Navigation and branding.** Check both menus, link destinations and focus, logo sizing and the text fallback, and the favicon. Compare desktop and narrow mobile layouts for navigation wrapping, product columns, and cart scrolling.

## Structure

- `assets/` contains deployable CSS, JavaScript, and images.
- `layout/`: shared storefront and password HTML wrappers.
- `sections/`, `blocks/`, `snippets/`: Shopify components; preserve component-local Liquid styles.
- `templates/`: merchant-editable page composition.
- `config/`, `locales/`: settings and translations.

See [docs/styling.md](docs/styling.md) for tokens, cascade layers, rebranding guidance, and manual review. See [AGENTS.md](AGENTS.md) for architectural conventions. Original Skeleton theme licensing remains in [LICENSE.md](LICENSE.md).
