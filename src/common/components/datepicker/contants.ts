import { enGB, fi, sv } from 'date-fns/locale';

export const DATE_FORMAT = 'd.M.yyyy';
export const DATETIME_FORMAT = `${DATE_FORMAT} HH:mm`;

export const dateLocales = { fi, en: enGB, sv };
