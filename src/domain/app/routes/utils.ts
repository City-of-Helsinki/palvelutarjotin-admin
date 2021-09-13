import { ROUTES } from './constants';

export const getCmsPath = (slug?: string | null) => {
  return ROUTES.CMS_PAGE.replace('/:slug', slug ?? '');
};
