import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  OrganisationNodeFieldsFragment,
  useMyProfileQuery,
} from '../../../generated/graphql';
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

  const organisations =
    myProfileData?.myProfile?.organisations.edges.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  const organisation = useMemo(() => {
    const organisation = activeOrganisation
      ? organisations.find((item) => item.id === activeOrganisation)
      : null;

    return organisation || organisations[0];
  }, [activeOrganisation, organisations]);

  return organisation ? (
    <Tag className={styles.activeOrganisationInfo}>{organisation.name}</Tag>
  ) : null;
};

export default ActiveOrganisationInfo;
