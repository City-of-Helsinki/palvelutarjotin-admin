import { Koros } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { PRIVACY_POLICY_LINKS, TEACHER_UI_LINKS } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import Container from '../layout/Container';
import styles from './footer.module.scss';

const Footer: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <footer className={styles.footerWrapper}>
      <Koros className={styles.koros} />
      <Container>
        <div className={styles.footer}>
          <div className={styles.helsinkiLogo}></div>
          <div className={styles.copyright}>
            <div>{t('footer.copyrightText')}</div>
            <div className={styles.links}>
              <div>
                <a
                  href={TEACHER_UI_LINKS[locale]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.teacherUI')}
                </a>
              </div>
              <div>
                <a
                  href={PRIVACY_POLICY_LINKS[locale]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.privacyPolicy')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
