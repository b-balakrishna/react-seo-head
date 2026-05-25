# react-seo-head

A lightweight React library for managing `<head>` elements declaratively in React apps.

`react-seo-head` provides a small `SEO_Head` component for updating page title, meta tags, link tags, icons, and JSON-LD scripts through props.

## Install

```bash
npm install react-seo-head
```

```bash
pnpm add react-seo-head
```

```bash
yarn add react-seo-head
```

> `react` and `react-dom` are peer dependencies, so they must also be installed in your app.



## Usage

```tsx
import { SEO_Head } from "react-seo-head";

export default function HomePage() {
  return (
    <>
      <SEO_Head
        title="Home · MySite"
        meta={[
          { name: "description", content: "A lightweight SEO head manager for React." },
          { property: "og:title", content: "Home · MySite" },
          { property: "og:type", content: "website" }
        ]}
      />
      <main>
        <h1>Welcome to MySite</h1>
      </main>
    </>
  );
}
```

## Props

`SEO_Head` accepts a single `props` object matching `SEOHeadProps`.

- `title?: string`
- `meta?: MetaTag[]`
- `link?: LinkTag[]`
- `icons?: IconTag[]`
- `script?: ScriptTag[]`

### Meta tags

Each `MetaTag` can include one of these keys for deduplication:

- `name`
- `property`
- `httpEquiv`

#### Open Graph (`og:`)

The `og:` prefix is used for Open Graph metadata. Open Graph tags are read by social networks and link previews to show richer content when a page is shared.

- `og:title` – page title for social previews
- `og:description` – page description for social previews
- `og:image` – preview image URL
- `og:type` – content type like `website`, `article`, or `video`

Example:

```tsx
<SEO_Head
  meta={[
    { name: "description", content: "Page-specific description." },
    { property: "og:description", content: "Social preview text." }
  ]}
/>
```

### Link and icon tags

`link` is useful for canonical URLs, preconnects, stylesheets, or any other `<link>` tag.

`icons` is a convenience list used to render favicons and icon references in `<head>`.

Example:

```tsx
<SEO_Head
  link={[
    { rel: "canonical", href: "https://mysite.com/page" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" }
  ]}
  icons={[
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }
  ]}
/>
```

### Script tags

`script` can include structured data or other embedded scripts. If the content is an object, it is safely serialized to JSON.

```tsx
<SEO_Head
  script=[
    {
      type: "application/ld+json",
      content: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MySite",
        url: "https://mysite.com"
      }
    }
  ]
/>
```

## Scenarios

### 1. Basic page metadata

Use `SEO_Head` in a page component to set the title and description for each route.

```tsx
export function AboutPage() {
  return (
    <>
      <SEO_Head
        title="About · MySite"
        meta={[{ name: "description", content: "Learn more about our product." }]}
      />
      <article>About page content</article>
    </>
  );
}
```

### 2. Route-specific override and nested head updates

Multiple `SEO_Head` components can exist at once. The most recently rendered entry wins for duplicate meta keys.

If a newer `SEO_Head` unmounts, the head state is recomputed from the remaining entries, and older title/meta values can fall back into place.

```tsx
function BlogPost({ post }) {
  return (
    <>
      <SEO_Head
        title={`${post.title} · MySite`}
        meta={[{ name: "description", content: post.excerpt }]}
      />
      <SEO_Head
        link={[{ rel: "canonical", href: `https://mysite.com/blog/${post.slug}` }]}
      />
      <article>{post.content}</article>
    </>
  );
}
```

### 3. Icons and external resources

Add favicons and external resource links without touching document head directly.

```tsx
<SEO_Head
  icons={[
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }
  ]}
  link={[
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" }
  ]}
/>
```

### 4. Structured data / JSON-LD

Inject schema markup safely in your head.

```tsx
<SEO_Head
  script={[
    {
      type: "application/ld+json",
      content: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "MySite",
        url: "https://mysite.com"
      }
    }
  ]}
/>
```

## Server-side rendering

The package exports `SSR` helpers for server-side render flows:

- `SSR.renderToString()`
- `SSR.reset()`

These helpers are available if you need to collect head entries manually on the server and serialize them into HTML output.

## TypeScript

`react-seo-head` exports type definitions for all head props:

```ts
import type { SEOHeadProps, MetaTag, LinkTag, IconTag, ScriptTag } from "react-seo-head";
```

## License

MIT

## Keywords

- react
- seo
- head
- meta
- open-graph
- json-ld
- ssr
- react-head