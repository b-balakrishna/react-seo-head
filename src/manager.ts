import { HeadEntry, SEOHeadProps } from "./types";
import { updateDOM } from "./dom";
import { getKey } from "./utils";

let entries: HeadEntry[] = [];
let counter = 0;

export function createEntry(props: SEOHeadProps): HeadEntry {
  return {
    id: counter++,
    depth: counter,
    props
  };
}

export function addEntry(entry: HeadEntry) {
  entries.push(entry);
  render();
}

export function removeEntry(entry: HeadEntry) {
  entries = entries.filter(e => e !== entry);
  render();
}

function render() {
  const state = resolve();
  if (typeof document !== "undefined") {
    updateDOM(state);
  }
}

function resolve(): SEOHeadProps {
  const result: SEOHeadProps = {
    title: undefined,
    meta: [],
    link: [],
    icons: [],
    script: []
  };

  const seenMeta = new Map<string, boolean>();

  const sorted = [...entries].sort((a, b) => b.depth - a.depth);

  for (const entry of sorted) {
    const p = entry.props;

    if (!result.title && p.title) {
      result.title = p.title;
    }

    p.meta?.forEach(m => {
      const key = getKey(m);
      if (key && !seenMeta.has(key)) {
        seenMeta.set(key, true);
        result.meta!.push(m);
      }
    });

    result.link!.push(...(p.link || []));
    result.icons!.push(...(p.icons || []));
    result.script!.push(...(p.script || []));
  }

  return result;
}