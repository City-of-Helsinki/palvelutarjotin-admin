import * as React from 'react';

import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import sortFavorably from '../../../utils/sortFavorably';
import { CreateEventFormFields } from '../types';

export default function useSelectableEventLanguages(
  initialValues: CreateEventFormFields
) {
  const locale = useLocale();

  const [selectedLanguages, setSelectedLanguages] = React.useState<Language[]>([
    'fi',
  ]);

  const sortedSelectedLanguages = sortFavorably(selectedLanguages as string[], [
    locale,
    'fi',
  ]);

  const setSelectedLanguageVersions = () => {
    const langs = Object.entries(initialValues.name).reduce<string[]>(
      (prev, [lang, value]) => (value ? [...prev, lang] : prev),
      []
    );
    setSelectedLanguages(langs as Language[]);
  };

  const handleSelectedLanguagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedLanguages([
        ...(selectedLanguages ?? []),
        e.target.value as Language,
      ]);
    } else {
      setSelectedLanguages(
        (selectedLanguages ?? []).filter((lang) => e.target.value !== lang)
      );
    }
  };

  return {
    selectedLanguages,
    setSelectedLanguages,
    sortedSelectedLanguages,
    setSelectedLanguageVersions,
    handleSelectedLanguagesChange,
  };
}
