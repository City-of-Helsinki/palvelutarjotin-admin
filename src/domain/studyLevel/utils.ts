import { TFunction } from 'i18next';

import { StudyLevelNodeConnection } from '../../generated/graphql';
import { translateValue } from '../../utils/translateUtils';

export interface StudyLevelOption {
  label: string;
  value: string;
}

export const getStudyLevelOptions = (
  studyLevels: StudyLevelNodeConnection | null | undefined,
  t: TFunction
): Array<StudyLevelOption> => {
  return (
    studyLevels?.edges?.map((edge) => {
      const level: string = edge?.node?.id?.toUpperCase() || '';

      return {
        value: level,
        label: level.startsWith('GRADE')
          ? t('studyLevel.grade_interval', {
              postProcess: 'interval',
              count: Number(level.split('_')[1]),
            })
          : translateValue('studyLevel.', level, t),
      } as StudyLevelOption;
    }) ?? []
  );
};

export const joinStudyLevelLabels = (
  studyLevels: StudyLevelNodeConnection | null | undefined,
  t: TFunction
): string => {
  return getStudyLevelOptions(studyLevels, t)
    .map((option) => option.label)
    .join(', ');
};
