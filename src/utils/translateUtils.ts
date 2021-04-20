import { InterpolationOptions, TFunction } from 'i18next';

import { createEmptyLocalizedObject } from '../constants';
import { LocalisedObject } from '../generated/graphql';
import { omitTypename } from '../types';

/**
 * Convert snake case string to camel case.
 * e.g
 * event_type => eventType
 * event_end_date => eventEndDate
 */
export const toCamelCase = (snakecase: string): string => {
  return !!snakecase && snakecase.length
    ? snakecase[0].toLowerCase() +
        snakecase
          .substr(1)
          .toLowerCase()
          .replace(/(_[a-z, 0-9])/g, ($1) => $1.toUpperCase().replace('_', ''))
    : '';
};

/**
 * Convert snake case string to pascal case.
 * e.g
 * event_type => EventType
 * event_end_date => EventEndDate
 */
export const toPascalCase = (snakecase: string): string => {
  return (
    snakecase[0].toUpperCase() +
    snakecase
      .substr(1)
      .toLowerCase()
      .replace(/(_[a-z, 0-9])/g, ($1) => $1.toUpperCase().replace('_', ''))
  );
};

/**
 * Translate a single value
 */
export const translateValue = (
  prefix: string,
  value: string,
  t: TFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: InterpolationOptions
): string => {
  return t(
    prefix
      ? `${prefix}${
          prefix.endsWith('.') ? toCamelCase(value) : toPascalCase(value)
        }`
      : toCamelCase(value),
    options
  );
};

export const getLocalisedObject = (obj?: LocalisedObject | null) =>
  omitTypename(obj) ?? createEmptyLocalizedObject();
