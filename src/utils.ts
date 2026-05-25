export function getKey(meta: any): string | null {
  return meta.name || meta.property || meta.httpEquiv || null;
}

export function safeJson(data: any): string | null {
  try {
    return JSON.stringify(data).replace(/<\/script/g, "<\\/script");
  } catch {
    return null;
  }
}