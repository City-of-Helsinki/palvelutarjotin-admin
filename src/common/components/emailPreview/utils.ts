import { TEMPLATE_TYPE } from '../../../domain/enrolment/types';
import { EmailTemplatesQuery } from '../../../generated/graphql';
import { Language } from '../../../types';

export const getTranslatedTemplate = (
  templates: EmailTemplatesQuery | undefined,
  templateType: TEMPLATE_TYPE,
  locale: Language
) => {
  if (!templates) return null;

  const template = templates.notificationTemplates?.edges.find(
    (t) => t?.node?.type === templateType
  );
  const translatedTemplate = template?.node?.translations.find(
    (i) => i?.languageCode.toLowerCase() === locale
  );

  return translatedTemplate;
};
