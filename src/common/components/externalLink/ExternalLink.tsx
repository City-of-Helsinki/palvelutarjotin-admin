import { IconLinkExternal } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import SrOnly from '../SrOnly/SrOnly';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  iconPosition?: 'left' | 'right';
};

const ExternalLink: React.FC<Props> = ({
  children,
  iconPosition = 'right',
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <a {...props} href={props.href} target="_blank" rel="noreferrer">
      {iconPosition === 'left' && (
        <IconLinkExternal
          style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
        />
      )}
      {children}
      {iconPosition === 'right' && (
        <IconLinkExternal
          style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}
        />
      )}
      <SrOnly>{t('common.srOnly.opensInANewTab')}</SrOnly>
    </a>
  );
};

export const getExternalUrl = (url: string): string => {
  if (url.match(/^https?:\/\//)) {
    return url;
  }
  return `//${url}`;
};

export default ExternalLink;
