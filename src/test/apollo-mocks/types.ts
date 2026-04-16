import type {
  Menu,
  Language,
} from '@city-of-helsinki/react-helsinki-headless-cms';

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
