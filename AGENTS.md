# AGENTS.md

🚨 MANDATORY: YOU MUST CALL "learn_shopify_api" ONCE WHEN WORKING WITH LIQUID THEMES.

Use the [Shopify AI Toolkit](https://shopify.dev/docs/apps/build/ai-toolkit) for all Shopify API and platform work. If missing, install it in the agent host per that page (or `npx skills add Shopify/shopify-ai-toolkit --list` for skill-compatible hosts).

## Theme architecture

- Keep deployable files in Shopify's standard root directories. Use sections for merchant-configurable page regions, blocks for reusable merchant-configurable components, and snippets for shared rendering logic. Prefer these components for new work and use templates to compose them.
- Include a LiquidDoc header in snippets and statically rendered blocks. Document required and optional parameters. Pass local variables explicitly to snippets through `render`.
- Use `content_for_header` in the layout head and `content_for_layout` for page content. Preserve the storefront and password entry points.
- Validate section, theme block, global settings, and locale JSON against their respective Shopify schemas: `schemas/section.json`, `schemas/theme_block.json`, `schemas/theme_settings.json`, and `schemas/translations.json`.
- Use CSS custom properties for single-property settings and modifier classes for settings that change several properties. Use string values for select options, including mobile column counts.
- Use nested Liquid conditions when more than one logical operator is needed. Use Liquid's documented objects, tags, and filters. [Liquid reference](https://shopify.dev/docs/api/liquid)

## Localization

- Use the `t` filter for theme-authored storefront copy, including accessibility labels. Put English defaults in `locales/en.default.json` and editor labels in `locales/en.default.schema.json`, referenced with `t:` in schemas. Translators handle additional languages.
- Use descriptive snake_case keys grouped by feature, up to three levels deep. Use sentence case, consistent terms, and interpolation for dynamic text. Escape values in plain-text HTML contexts and preserve intentional rich text.

## Foundation tooling and architectural conventions

- The user handles all visual inspection. Run automated validation and report any remaining visual checks. Perform visual inspection only when the user explicitly requests it.
- Prefer Shopify-native commerce functionality and preserve Shopify's theme architecture.
- Use Liquid for initial HTML rendering and native JavaScript for progressive enhancement. Keep essential content and actions usable without JavaScript.
- Keep components accessible, including keyboard interaction, focus management, and semantic HTML.
- Keep the default storefront polished and restrained, with visual identity controlled by source tokens. Preserve reusable commerce behavior.
- Avoid abstractions before they are needed. The small token foundation is intentional; do not add frameworks, a monorepo, shared packages, or a generic component system.
- Keep shared browser CSS and JavaScript in `assets/` and serve them directly through `asset_url`. Use component-local `{% stylesheet %}` and `{% javascript %}` tags where appropriate.
- Both layouts load shared assets through `snippets/theme-assets.liquid`. Keep deployable files in Shopify’s standard theme directories at the repository root.
- Use `shopify theme dev --store <store>` for development. Shopify CLI handles Liquid rendering, asset uploads, and reloads.
- Run `shopify theme check` before handing off changes. Report checks that cannot run and never claim store/browser validation without observing it.
- Use JSDoc for JavaScript types. Use the Shopify Liquid extension or Shopify’s code editor for Liquid formatting and highlighting. Avoid broad formatting of merchant-managed JSON.
- `shopify theme push --unpublished` uploads an unpublished theme. Publishing is a separate explicit action.
- Preserve existing templates, settings, translations, critical CSS, and static assets unless the task requires changes.

## Styling foundation

- Cascade order is `reset, tokens, base, components, sections, utilities`. Declare it in `assets/critical.css` before the remaining asset stylesheets and Shopify-injected CSS. Put every theme rule in its named layer; unlayered rules override normal layered rules.
- Edit `assets/tokens.css` to rebrand palette, system typography, spacing, layout, and controls. Keep token defaults in this single file. Keep global theme settings limited to brand images. Keep typography, color, layout, and controls in source.
- `critical.css` contains the handwritten reset and section shell. `base.css` contains typography, focus, rich text, and page rhythm. `components.css` contains shared controls, cards, and pagination. Section-specific layout belongs in the section's `{% stylesheet %}` within `@layer sections`; snippet/block styles use `@layer components`.
- Keep rich-text rhythm scoped to `.rte`. Prefer intrinsic grids and wrapping flex layouts. Preserve the cart's semantic table and labeled horizontal scroll region on small screens.
- Keep `[hidden]` authoritative in the reset (the intentional `!important` prevents enhanced variant buttons from reappearing). Keep control font sizes at least 1rem, focus visible, and transitions tied to the reduced-motion duration token.
- Keep the `hello-world` section handle for the translated storefront introduction to preserve existing template references.
- See `docs/styling.md` for architecture and the manual review checklist.

## Storefront content and policies

- Use the default `page.json` for informational Shopify Pages such as Shipping & Returns. Render the Page title and rich-text HTML from Shopify.
- Keep `page.about.json` and `sections/page-about.liquid` focused on the brand story. Use the Shopify Page for copy and the section image picker for the optional hero.
- Manage legal policies in Shopify Admin under Settings → Policies. Shopify supplies storefront policy markup through `content_for_layout`. Style its native wrapper and body in `assets/base.css` without creating a policy template or duplicate Shopify Pages.
- Use the Header and Footer menu settings for merchant-selected Page and policy links. Link to configured policies through native menu entries.
