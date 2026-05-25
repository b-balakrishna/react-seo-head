import { useEffect, useRef } from "react";
import { addEntry, removeEntry, createEntry } from "./manager";
import { SEOHeadProps, HeadEntry } from "./types";

export function SEO_Head(props: SEOHeadProps) {
  const ref = useRef<HeadEntry | null>(null);

  if (!ref.current) {
    ref.current = createEntry(props);
  }

  ref.current.props = props;

  useEffect(() => {
    addEntry(ref.current!);
    return () => removeEntry(ref.current!);
  }, []);

  return null;
}