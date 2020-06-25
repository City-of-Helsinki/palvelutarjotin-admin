import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { useMyProfileQuery } from '../../../generated/graphql';
import { getSelectedOrganisation } from '../../myProfile/utils';
import { activeOrganisationSelector } from '../selector';
import styles from './activeOrganisationInfo.module.scss';

interface Props {
  as?: 'h1' | 'div';
}

const ActiveOrganisationInfo = ({
  as: Tag = 'div',
}: Props): ReactElement | null => {
  const { data: myProfileData } = useMyProfileQuery();
  const activeOrganisation = useSelector(activeOrganisationSelector);

  const organisation = myProfileData?.myProfile
    ? getSelectedOrganisation(myProfileData.myProfile, activeOrganisation)
    : null;

  return organisation ? (
    <Tag className={styles.activeOrganisationInfo}>{organisation.name}</Tag>
  ) : null;
};

export default ActiveOrganisationInfo;
