export type MetaTag = {
  name?: string;
  property?: string;
  httpEquiv?: string;
  content: string;
};

export type LinkTag = {
  rel: string;
  href: string;
  [key: string]: any;
};

export type IconTag = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

export type ScriptTag = {
  type: string;
  content: string | object;
};

export type SEOHeadProps = {
  title?: string;
  meta?: MetaTag[];
  link?: LinkTag[];
  icons?: IconTag[];
  script?: ScriptTag[];
};

export type HeadEntry = {
  id: number;
  depth: number;
  props: SEOHeadProps;
};
``