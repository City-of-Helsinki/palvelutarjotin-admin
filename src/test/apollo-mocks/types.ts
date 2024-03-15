import type { Menu, Language } from 'react-helsinki-headless-cms';

export type MenuQueryResponse = {
  data: {
    menu: Menu;
  };
};

export type LanguagesQueryResponse = {
  data: {
    languages: Language[];
  };
};
