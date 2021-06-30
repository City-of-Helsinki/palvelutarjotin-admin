import React from 'react';

import TextWithLineBreaks from '../textWithLineBreaks/TextWithLineBreaks';

interface Props {
  text?: string;
  className?: string;
}

/***
 * Checks the presence of HTML elements in the string.
 * The fact is that every string is HTML,
 * but not every HTML contains element nodes (or HTML-tags).
 */
const containsHTMLTags = (text: string): boolean => {
  return /<\/?[a-z][\s\S]*>/i.test(text);
};

const TextWithHTMLOrLineBreaks: React.FC<Props> = ({ text, className }) => {
  if (!text) return null;
  return containsHTMLTags(text) ? (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: text ?? '' }}
    />
  ) : (
    <TextWithLineBreaks text={text} className={className} />
  );
};

export default TextWithHTMLOrLineBreaks;
export { containsHTMLTags };
