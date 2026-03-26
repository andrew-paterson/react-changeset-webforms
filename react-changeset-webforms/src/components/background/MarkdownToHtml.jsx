import React, { useMemo } from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({});

/**
 * MarkdownToHtml
 *
 * Renders a markdown string as inline HTML. External links (those pointing to
 * a different hostname, or not starting with '#') automatically get
 * `target="_blank"` and `rel="noopener noreferrer"`.
 *
 * Uses `dangerouslySetInnerHTML` — ensure `source` is trusted / sanitised
 * before passing it in.
 *
 * Props:
 *  - source  {string}  The markdown string to render.
 */
export default function MarkdownToHtml({ source }) {
  const html = useMemo(() => {
    if (!source) return '';

    const el = document.createElement('div');
    el.innerHTML = md.renderInline(source);

    el.querySelectorAll('a').forEach((link) => {
      if (link.hostname !== window.location.hostname && !link.getAttribute('href')?.startsWith('#')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });

    return el.innerHTML;
  }, [source]);

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
