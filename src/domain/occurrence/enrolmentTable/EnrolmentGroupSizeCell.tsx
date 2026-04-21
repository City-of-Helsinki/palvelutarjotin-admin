import * as React from 'react';

type Props = {
  studyGroup: {
    groupSize?: number | null;
    amountOfAdult?: number | null;
  };
};

const EnrolmentGroupSizeCell: React.FC<Props> = ({ studyGroup }) => {
  return (
    <>
      {studyGroup.groupSize} / {studyGroup.amountOfAdult}
    </>
  );
};

export default EnrolmentGroupSizeCell;
