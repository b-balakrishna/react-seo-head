import { HeadEntry } from "./types";

let ssrEntries: HeadEntry[] = [];

export function collect(entry: HeadEntry) {
  ssrEntries.push(entry);
}

export function renderToString(): string {
  return ssrEntries.map(e => {
    if (e.props.title) {
      return `<title>${e.props.title}</title>`;
    }
    return "";
  }).join("\n");
}

export function reset() {
  ssrEntries = [];
}