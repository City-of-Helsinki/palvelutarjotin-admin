export const enrolmentResult = {
  data: {
    enrolment: {
      id: 'RW5yb2xtZW50Tm9kZTo1Ng==',
      notificationType: 'EMAIL_SMS',
      enrolmentTime: '2020-08-14T07:15:24.589508+00:00',
      person: {
        id: 'UGVyc29uTm9kZTpjZjFiZjIxNS0yZDU0LTQ5YTQtYWEyNS0yNmU5YTk1Y2ExN2E=',
        emailAddress: 'ilmo@ilmoittautuja.com',
        name: 'Ilmoittautuja',
        phoneNumber: '123321123',
        language: 'FI',
        __typename: 'PersonNode',
      },
      status: 'APPROVED',
      studyGroup: {
        id: 'U3R1ZHlHcm91cE5vZGU6NjA=',
        groupSize: 20,
        amountOfAdult: 1,
        name: 'Yläaste',
        groupName: 'Ryhmän nimi',
        studyLevel: 'GRADE_3',
        extraNeeds: 'Lisätietoja tässä',
        person: {
          id:
            'UGVyc29uTm9kZTpjZjFiZjIxNS0yZDU0LTQ5YTQtYWEyNS0yNmU5YTk1Y2ExN2E=',
          emailAddress: 'ilmo@ilmoittautuja.com',
          name: 'Ilmoittautuja',
          phoneNumber: '123321123',
          language: 'FI',
          __typename: 'PersonNode',
        },
        __typename: 'StudyGroupNode',
      },
      __typename: 'EnrolmentNode',
      occurrence: {
        id: 'T2NjdXJyZW5jZU5vZGU6MTIw',
        maxGroupSize: 30,
        minGroupSize: 10,
        pEvent: {
          id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
          organisation: {
            id: 'T3JnYW5pc2F0aW9uTm9kZTox',
            __typename: 'OrganisationNode',
          },
          __typename: 'PalvelutarjotinEventNode',
        },
        __typename: 'OccurrenceNode',
      },
    },
  },
};
