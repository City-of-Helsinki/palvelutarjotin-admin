import React, { ReactElement } from 'react';

import styles from './activeOrganisationInfo.module.scss';
import { useMyProfileQuery } from '../../../generated/graphql';
import { getSelectedOrganisation } from '../../myProfile/utils';
import useOrganisationContext from '../contextProviders/useOrganisationContext';

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
  const { activeOrganisation } = useOrganisationContext();
  const organisation = myProfileData?.myProfile
    ? getSelectedOrganisation(
        myProfileData.myProfile,
        (organisationId || activeOrganisation?.id) ?? null,
        !organisationId
      )
    : null;

  return organisation ? (
    <Tag className={styles.activeOrganisationInfo}>{organisation.name}</Tag>
  ) : null;
};

export default ActiveOrganisationInfo;
