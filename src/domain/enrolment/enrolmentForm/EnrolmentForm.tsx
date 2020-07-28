import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DropdownField from '../../../common/components/form/fields/DropdownField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import { Language, StudyLevel } from '../../../generated/graphql';
import { translateValue } from '../../../utils/translateUtils';
import Container from '../../app/layout/Container';
import { EnrolmentFormFields } from '../types';
// import { ROUTES } from '../../app/routes/constants';
import styles from './enrolmentForm.module.scss';
import ValidationSchema from './ValidationSchema';

export const defaultInitialValues: EnrolmentFormFields = {
  hasEmailNotification: false,
  hasSmsNotification: false,
  isSameResponsiblePerson: true,
  maxGroupSize: 0,
  minGroupSize: 0,
  language: '',
  person: {
    name: '',
    phoneNumber: '',
    emailAddress: '',
  },
  studyGroup: {
    person: {
      name: '',
      phoneNumber: '',
      emailAddress: '',
    },
    name: '',
    groupName: '',
    groupSize: '',
    amountOfAdult: '',
    studyLevel: '',
    extraNeeds: '',
  },
};

interface Props {
  initialValues?: EnrolmentFormFields;
  onSubmit: (values: EnrolmentFormFields) => void;
}

const EnrolmentForm: React.FC<Props> = ({
  initialValues = defaultInitialValues,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const studyLevelOptions = Object.values(StudyLevel).map((level) => ({
    label: level.startsWith('GRADE')
      ? t('studyLevel.grade_interval', {
          postProcess: 'interval',
          count: Number(level.split('_')[1]),
        })
      : translateValue('studyLevel.', level, t),
    value: level,
  }));

  const languageOptions = Object.values(Language).map((level) => ({
    label: translateValue('enrolmentForm.language.', level, t),
    value: level,
  }));

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ handleSubmit, values: { isSameResponsiblePerson } }) => {
        return (
          <form className={styles.enrolmentForm} onSubmit={handleSubmit}>
            <FocusToFirstError />
            <Container size="small">
              <h2>{t('enrolmentForm.studyGroup.titleNotifier')}</h2>
              <FormGroup>
                <Field
                  labelText={t('enrolmentForm.studyGroup.person.labelName')}
                  component={TextInputField}
                  name="studyGroup.person.name"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t(
                    'enrolmentForm.studyGroup.person.labelEmailAddress'
                  )}
                  component={TextInputField}
                  name="studyGroup.person.emailAddress"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t(
                    'enrolmentForm.studyGroup.person.labelPhoneNumber'
                  )}
                  component={TextInputField}
                  name="studyGroup.person.phoneNumber"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('enrolmentForm.studyGroup.labelName')}
                  component={TextInputField}
                  name="studyGroup.name"
                />
              </FormGroup>
              <div className={styles.rowWith2Columns}>
                <FormGroup>
                  <Field
                    helperText={t('enrolmentForm.studyGroup.helperGroupName')}
                    labelText={t('enrolmentForm.studyGroup.labelGroupName')}
                    component={TextInputField}
                    name="studyGroup.groupName"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    label={t('enrolmentForm.studyGroup.labelStudyLevel')}
                    component={DropdownField}
                    name="studyGroup.studyLevel"
                    options={studyLevelOptions}
                  />
                </FormGroup>
              </div>
              <h2>{t('enrolmentForm.studyGroup.titleGroup')}</h2>
              <div className={styles.rowWith2Columns}>
                <FormGroup>
                  <Field
                    labelText={t('enrolmentForm.studyGroup.labelGroupSize')}
                    component={TextInputField}
                    min={0}
                    name="studyGroup.groupSize"
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('enrolmentForm.studyGroup.labelAmountOfAdult')}
                    component={TextInputField}
                    min={0}
                    name="studyGroup.amountOfAdult"
                    type="number"
                  />
                </FormGroup>
              </div>
              <h2>{t('enrolmentForm.titleResponsiblePerson')}</h2>
              <FormGroup>
                <div className={styles.checkboxWrapper}>
                  <Field
                    label={t('enrolmentForm.labelIsSameResponsiblePerson')}
                    component={CheckboxField}
                    name="isSameResponsiblePerson"
                  />
                </div>
              </FormGroup>
              {!isSameResponsiblePerson && (
                <>
                  <FormGroup>
                    <Field
                      labelText={t('enrolmentForm.person.labelName')}
                      component={TextInputField}
                      name="person.name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      labelText={t('enrolmentForm.person.labelEmailAddress')}
                      component={TextInputField}
                      name="person.emailAddress"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      labelText={t('enrolmentForm.person.labelPhoneNumber')}
                      component={TextInputField}
                      name="person.phoneNumber"
                    />
                  </FormGroup>
                </>
              )}

              <div className={styles.divider} />

              <h2>{t('enrolmentForm.titleNotifications')}</h2>
              <div className={styles.rowWith3Columns}>
                <FormGroup>
                  <div className={styles.checkboxWrapper}>
                    <Field
                      label={t('enrolmentForm.labelHasEmailNotification')}
                      component={CheckboxField}
                      name="hasEmailNotification"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className={styles.checkboxWrapper}>
                    <Field
                      label={t('enrolmentForm.labelHasSmsNotification')}
                      component={CheckboxField}
                      name="hasSmsNotification"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Field
                    label={t('enrolmentForm.labelLanguage')}
                    component={DropdownField}
                    name="language"
                    options={languageOptions}
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <Field
                  helperText={t('enrolmentForm.studyGroup.helperExtraNeeds')}
                  labelText={t('enrolmentForm.studyGroup.labelExtraNeeds')}
                  component={TextAreaInputField}
                  name="studyGroup.extraNeeds"
                />
              </FormGroup>
              <div className={styles.submitButtonWrapper}>
                <Button type="submit">
                  {t('enrolmentForm.buttonUpdateEnrolment')}
                </Button>
              </div>
            </Container>
          </form>
        );
      }}
    </Formik>
  );
};

export default EnrolmentForm;
