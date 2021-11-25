import * as Yup from 'yup';

import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

export default Yup.object().shape({
  isSharingDataAccepted: Yup.bool().oneOf(
    [true],
    'enrolment:enrolmentForm.validation.isSharingDataAccepted'
  ),
  language: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  person: Yup.object().when(
    ['isSameResponsiblePerson'],
    (isSameResponsiblePerson: boolean, schema: Yup.AnyObjectSchema) => {
      return isSameResponsiblePerson
        ? schema
        : schema.shape({
            name: Yup.string().required(
              VALIDATION_MESSAGE_KEYS.STRING_REQUIRED
            ),
            phoneNumber: Yup.string(),
            emailAddress: Yup.string()
              .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
              .email(VALIDATION_MESSAGE_KEYS.EMAIL),
          });
    }
  ),
  studyGroup: Yup.object().when(['maxGroupSize', 'minGroupSize'], ((
    maxGroupSize: number,
    minGroupSize: number,
    schema: Yup.AnyObjectSchema
  ) => {
    return schema.shape(
      {
        person: Yup.object().shape({
          name: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
          phoneNumber: Yup.string(),
          emailAddress: Yup.string()
            .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
            .email(VALIDATION_MESSAGE_KEYS.EMAIL),
        }),
        unitName: Yup.string().when(
          ['unitId'],
          (unitId: string, schema: Yup.StringSchema) => {
            if (!unitId) {
              return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
            }
            return schema;
          }
        ),
        unitId: Yup.string().when(
          ['unitName'],
          (unitName: string, schema: Yup.StringSchema) => {
            if (!unitName) {
              return schema
                .nullable()
                .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
            }
            return schema.nullable();
          }
        ),
        groupName: Yup.string().required(
          VALIDATION_MESSAGE_KEYS.STRING_REQUIRED
        ),
        groupSize: Yup.number()
          .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
          .min(minGroupSize, (param) => ({
            min: param.min,
            key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
          }))
          .max(maxGroupSize, (param) => ({
            max: param.max,
            key: VALIDATION_MESSAGE_KEYS.NUMBER_MAX,
          })),
        amountOfAdult: Yup.number()
          .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
          .min(0, (param) => ({
            min: param.min,
            key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
          })),
        studyLevels: Yup.array()
          .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
          .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
      },
      [['unitId', 'unitName']]
    );
  }) as any),
});
