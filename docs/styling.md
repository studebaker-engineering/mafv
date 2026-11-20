# Styling foundation

The default design uses whitespace, type, and borders. No runtime styling dependencies or external fonts are required. Commerce still renders server-side and uses existing native forms with JavaScript enhancement.

## Ownership and cascade

| Layer | Source and responsibility |
| --- | --- |
| reset | `assets/critical.css`: box sizing, conservative margin/media/control normalization |
| tokens | `assets/tokens.css`: all shared design values |
| base | `critical.css`: shell and content grid; `assets/base.css`: typography, focus, page rhythm, `.rte` |
| components | `assets/components.css`: controls, cards, pagination; local snippet/block styles |
| sections | Each section's `{% stylesheet %}`: header/footer, listings, product, cart, search, introduction |
| utilities | `assets/utilities.css`: visually hidden text and skip link |

The layer order is declared in `assets/critical.css`, which loads before the other stylesheets and Shopify’s injected section styles. Unlayered rules take precedence over normal layered rules. The reset’s `[hidden]` rule uses `!important` to preserve native and progressively enhanced hiding.

The storefront and password layouts load shared CSS through `snippets/theme-assets.liquid`. Edit those assets directly. Shopify serves section-local CSS from each component’s `{% stylesheet %}` tag.

## Rebranding

Start with the six palette values in `tokens.css`: background `#FAFAF8`, surface `#FFFFFF`, text/accent `#1C1C1C`, muted `#666666`, border `#DEDEDA`. Set `--color-on-accent` with the accent so button text remains readable. Check contrast after changing colors.

Change `--font-body` and `--font-heading`, heading sizes and weight, the spacing scale, page width and margins, control dimensions, and grid gap in the same file. Defaults use system fonts. Global theme settings cover brand images. The collection grid has its own section settings.

Shared card styles cover product, collection, and search cards without introducing a generic rendering framework. Rich text is scoped to `.rte` rather than adding margins to every paragraph globally. Product gallery images retain natural proportions; listing images use square crops. No carousel or new commerce feature was added.

The product layout stacks before becoming two columns at 52rem. Navigation wraps on small screens; no menu script is required. Listing grids fit their available width. The cart keeps its semantic table inside a named, keyboard-focusable horizontal scroll region, followed by a full-width mobile summary. Disabled native controls keep their semantics. Focus outlines remain visible, and reduced-motion preferences disable the subtle control transitions.

The `hello-world` section renders a simple translated store introduction with the store name and catalog link. Update its translation copy for each client; templates retain their existing references.

## Manual review checklist

Review in the local Shopify development store at narrow mobile, tablet, and desktop widths, including 200% zoom and keyboard-only use:

- Home: introduction, catalog link, long store name, wrapping navigation, account/cart links and cart count, footer links/payment icons.
- Collections: collection index, short/long descriptions and titles, product grids with few/many products, pagination, missing images, sold-out products, empty collection.
- Product: one/multiple/no images, long description and title, single/multiple variants, direct variant URLs, sold-out and quantity-limit states, quantity help, disabled add action, add-to-cart and accelerated checkout.
- Cart: empty and populated, multiple lines, long titles/properties, discounts, quantity changes and removal, totals, mobile table scrolling, update and checkout handoff.
- Search: initial, results, no results, pagination. Also review content pages, blog/article rich text and comments, 404, and password/error states.
- Interactions: skip link, visible focus, labels, hover/disabled states, reduced motion, and native form behavior with JavaScript disabled (including the variant submit button).

Use this checklist in a Shopify development preview to verify visual quality and live storefront behavior.
