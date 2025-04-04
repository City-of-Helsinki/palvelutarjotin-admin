import { useTranslation } from 'react-i18next';

import { getStudyLevelOptions, StudyLevelOption } from './utils';
import {
  StudyLevelNodeConnection,
  StudyLevelsQuery,
  useStudyLevelsQuery,
} from '../../generated/graphql';

export interface StudyLevelsState {
  data: StudyLevelsQuery | undefined;
  loading: boolean;
  options: StudyLevelOption[];
}

/**
 * Fetch study levels from API and make options of them.
 */
export default function useStudyLevels(): StudyLevelsState {
  const { t } = useTranslation();
  const { data: studyLevelsData, loading } = useStudyLevelsQuery();
  const studyLevelOptions = getStudyLevelOptions(
    studyLevelsData?.studyLevels as StudyLevelNodeConnection,
    t
  );

  return {
    data: studyLevelsData,
    loading,
    options: studyLevelOptions,
  };
}
