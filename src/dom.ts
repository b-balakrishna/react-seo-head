import { SEOHeadProps, MetaTag, LinkTag, IconTag } from "./types";
import { safeJson } from "./utils";

export function updateDOM(state: SEOHeadProps) {
  updateTitle(state.title);
  updateMeta(state.meta);
  updateLinks([...(state.link || []), ...(state.icons || [])]);
  updateScripts(state.script || []);
}

function updateTitle(title?: string) {
  if (!title) return;
  document.title = title;
}

function updateMeta(metaList: MetaTag[] | undefined) {
  if (!metaList) return;

  metaList.forEach(meta => {
    const key = meta.name || meta.property || meta.httpEquiv;
    if (!key) return;

    let el = document.head.querySelector(
      `meta[name="${meta.name}"],meta[property="${meta.property}"],meta[http-equiv="${meta.httpEquiv}"]`
    ) as HTMLMetaElement | null;

    if (!el) {
      el = document.createElement("meta");
      document.head.appendChild(el);
    }

    Object.entries(meta).forEach(([k, v]) => {
      if (v != null) el!.setAttribute(k, String(v));
    });
  });
}

function updateLinks(links: Array<LinkTag | IconTag>) {
  links.forEach(link => {
    if (!link.rel || !link.href) return;

    let el = document.head.querySelector(
      `link[rel="${link.rel}"][href="${link.href}"]`
    ) as HTMLLinkElement | null;

    if (!el) {
      el = document.createElement("link");
      document.head.appendChild(el);
    }

    Object.entries(link).forEach(([k, v]) => {
      if (v != null) el!.setAttribute(k, String(v));
    });
  });
}

function updateScripts(scripts: any[]) {
  scripts.forEach(script => {
    if (script.type !== "application/ld+json") return;

    const el = document.createElement("script");
    el.type = script.type;

    const json = typeof script.content === "object"
      ? safeJson(script.content)
      : script.content;

    if (!json) return;

    el.textContent = json;
    document.head.appendChild(el);
  });
}