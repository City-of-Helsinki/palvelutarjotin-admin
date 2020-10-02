import React from 'react';

import { useMyProfileQuery } from '../../generated/graphql';
import CreateMyProfile from './CreateMyProfile';

const MyProfileWrapper: React.FC = ({ children }) => {
  const { data, refetch } = useMyProfileQuery();

  return data?.myProfile ? (
    <>{children}</>
  ) : (
    <CreateMyProfile refetch={refetch} />
  );
};

export default MyProfileWrapper;
