import React, { ReactElement } from 'react';

import { useMyProfileQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getSelectedOrganisation } from '../../myProfile/utils';
import { activeOrganisationSelector } from '../selector';
import styles from './activeOrganisationInfo.module.scss';

interface Props {
  as?: 'h1' | 'div';
  // You can override activeOrganisation by organisationId prop
  organisationId?: string;
}

const ActiveOrganisationInfo = ({
  as: Tag = 'div',
  organisationId,
}: Props): ReactElement | null => {
  const { data: myProfileData } = useMyProfileQuery();
  const activeOrganisation = useAppSelector(activeOrganisationSelector);

  const organisation = myProfileData?.myProfile
    ? getSelectedOrganisation(
        myProfileData.myProfile,
        organisationId || activeOrganisation,
        !organisationId
      )
    : null;

  return organisation ? (
    <Tag className={styles.activeOrganisationInfo}>{organisation.name}</Tag>
  ) : null;
};

export default ActiveOrganisationInfo;
