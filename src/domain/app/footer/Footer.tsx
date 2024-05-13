import { Footer as HDSFooter, Logo, logoFi, logoSv } from 'hds-react';
import React, { FunctionComponent } from 'react';
import type { MenuItem } from 'react-helsinki-headless-cms';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';
import { useTranslation } from 'react-i18next';

import { resetFocusId } from '../../../common/components/resetFocus/ResetFocus';
import { FOOTER_MENU_NAME } from '../../../headless-cms/constants';
import useLocale from '../../../hooks/useLocale';
import styles from './footer.module.scss';

type ValidMenuItem = {
  id: MenuItem['id'];
  label: NonNullable<MenuItem['label']>;
  path: NonNullable<MenuItem['path']>;
};

const isValidMenuItem = (menuItem: MenuItem): menuItem is ValidMenuItem =>
  !!menuItem.label && !!menuItem.path;

const Footer: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  const footerMenuQuery = useMenuQuery({
    variables: { id: FOOTER_MENU_NAME[locale], menuIdentifiersOnly: true },
  });
  const footerLinks =
    footerMenuQuery.data?.menu?.menuItems?.nodes?.filter(isValidMenuItem) ?? [];

  return (
    <HDSFooter title={t('appName')} className={styles.footer}>
      <HDSFooter.Base
        copyrightHolder={t('footer.copyright')}
        copyrightText={t('footer.allRightsReserved')}
        logo={
          <Logo
            src={locale === 'sv' ? logoSv : logoFi}
            size="medium"
            alt={t('common.cityOfHelsinki')}
          />
        }
        backToTopLabel={t('footer.backToTop')}
        onBackToTopClick={handleBackToTop}
      >
        {footerLinks.map((footerLink) => (
          <HDSFooter.Link
            key={footerLink.id}
            href={footerLink.path}
            label={footerLink.label}
          />
        ))}
      </HDSFooter.Base>
    </HDSFooter>
  );
};

export default Footer;
