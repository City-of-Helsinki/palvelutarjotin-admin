import { Element } from 'domhandler/lib/node';
import createDOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import React, { useMemo } from 'react';

type Props = {
  children: string;
  components?: {
    p?: React.ComponentType<{ children: React.ReactNode }>;
  };
};

const DefaultP = ({ children }: { children: React.ReactNode }) => (
  <p>{children}</p>
);

const HtmlToReact: React.FC<Props> = ({
  children: dirty,
  components: { p: P = DefaultP } = {},
}) => {
  const sanitizedHtml = useMemo(
    () => createDOMPurify().sanitize(dirty),
    [dirty]
  );

  return (
    <>
      {parse(sanitizedHtml, {
        replace: (domNode) => {
          if (domNode instanceof Element && domNode.name === 'p') {
            return <P>{domToReact(domNode.children)}</P>;
          }
          return domNode;
        },
      })}
    </>
  );
};

export default HtmlToReact;
