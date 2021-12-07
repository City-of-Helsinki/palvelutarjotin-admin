import { Field, Formik, useFormikContext } from 'formik';
import { Button, Checkbox } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DropdownField from '../../../common/components/form/fields/DropdownField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import UnitPlaceSelectorField from '../../../common/components/form/fields/UnitPlaceSelectorField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import { Language } from '../../../generated/graphql';
import { translateValue } from '../../../utils/translateUtils';
import Container from '../../app/layout/Container';
import useStudyLevels from '../../studyLevel/useStudyLevels';
import { EnrolmentFormFields } from '../types';
// import { ROUTES } from '../../app/routes/constants';
import styles from './enrolmentForm.module.scss';
import getValidationSchema from './ValidationSchema';

export const defaultInitialValues: EnrolmentFormFields = {
  hasEmailNotification: false,
  hasSmsNotification: false,
  isSameResponsiblePerson: true,
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
    unitId: '',
    unitName: '',
    groupName: '',
    groupSize: '',
    amountOfAdult: '',
    studyLevels: [],
    extraNeeds: '',
  },
};

interface Props {
  initialValues?: EnrolmentFormFields;
  minGroupSize?: number;
  maxGroupSize?: number;
  onSubmit: (values: EnrolmentFormFields) => void;
}

const EnrolmentForm: React.FC<Props> = ({
  initialValues = defaultInitialValues,
  minGroupSize = 10,
  maxGroupSize = 20,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const validationSchema = React.useMemo(() => {
    return getValidationSchema({ minGroupSize, maxGroupSize });
  }, [minGroupSize, maxGroupSize]);

  const { options: studyLevelOptions } = useStudyLevels();

  const languageOptions = Object.values(Language).map((level) => ({
    label: translateValue('common.languages.', level, t),
    value: level,
  }));

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values: { isSameResponsiblePerson } }) => {
        return (
          <form className={styles.enrolmentForm} onSubmit={handleSubmit}>
            <FocusToFirstError />
            <Container size="small">
              <h2>{t('enrolmentForm.studyGroup.titleNotifier')}</h2>
              <FormGroup>
                <Field
                  label={t('enrolmentForm.studyGroup.person.labelName')}
                  component={TextInputField}
                  name="studyGroup.person.name"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  label={t('enrolmentForm.studyGroup.person.labelEmailAddress')}
                  component={TextInputField}
                  name="studyGroup.person.emailAddress"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  label={t('enrolmentForm.studyGroup.person.labelPhoneNumber')}
                  component={TextInputField}
                  name="studyGroup.person.phoneNumber"
                />
              </FormGroup>
              <FormGroup>
                <UnitField
                  label={t('enrolmentForm.studyGroup.labelName')}
                  unitId="studyGroup.unitId"
                  unitName="studyGroup.unitName"
                  unitIdHelperText={t('enrolmentForm.studyGroup.helperUnitId')}
                  unitIdPlaceholder={t(
                    'enrolmentForm.studyGroup.placeholderUnitId'
                  )}
                  unitNameHelperText={t(
                    'enrolmentForm.studyGroup.helperUnitName'
                  )}
                  unitNamePlaceholder={t(
                    'enrolmentForm.studyGroup.placeholderUnitName'
                  )}
                  showUnitNameLabel={t(
                    'enrolmentForm.studyGroup.showUnitNameLabel'
                  )}
                />
              </FormGroup>
              <div className={styles.rowWith2Columns}>
                <FormGroup>
                  <Field
                    helperText={t('enrolmentForm.studyGroup.helperGroupName')}
                    label={t('enrolmentForm.studyGroup.labelGroupName')}
                    component={TextInputField}
                    name="studyGroup.groupName"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    label={t('enrolmentForm.studyGroup.labelStudyLevel')}
                    component={MultiDropdownField}
                    name="studyGroup.studyLevels"
                    options={studyLevelOptions || []}
                  />
                </FormGroup>
              </div>
              <h2>{t('enrolmentForm.studyGroup.titleGroup')}</h2>
              <div className={styles.rowWith2Columns}>
                <FormGroup>
                  <Field
                    label={t('enrolmentForm.studyGroup.labelGroupSize')}
                    component={TextInputField}
                    min={0}
                    name="studyGroup.groupSize"
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    label={t('enrolmentForm.studyGroup.labelAmountOfAdult')}
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
                <div data-testid="person-info">
                  <FormGroup>
                    <Field
                      label={t('enrolmentForm.person.labelName')}
                      component={TextInputField}
                      name="person.name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label={t('enrolmentForm.person.labelEmailAddress')}
                      component={TextInputField}
                      name="person.emailAddress"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label={t('enrolmentForm.person.labelPhoneNumber')}
                      component={TextInputField}
                      name="person.phoneNumber"
                    />
                  </FormGroup>
                </div>
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
                  label={t('enrolmentForm.studyGroup.labelExtraNeeds')}
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

const UnitField: React.FC<{
  label: string;
  unitId: string;
  unitName: string;
  unitIdHelperText?: string;
  unitIdPlaceholder?: string;
  unitNameHelperText?: string;
  unitNamePlaceholder?: string;
  showUnitNameLabel: string;
}> = ({
  label,
  unitId,
  unitName,
  unitIdHelperText,
  unitIdPlaceholder,
  unitNameHelperText,
  unitNamePlaceholder,
  showUnitNameLabel,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const {
    studyGroup: { unitId: unitIdValue, unitName: unitNameValue },
  } = values as EnrolmentFormFields;

  const isUnitNameGiven = Boolean(!unitIdValue && unitNameValue);
  const [showUnitNameField, setShowUnitNameField] =
    React.useState(isUnitNameGiven);

  React.useEffect(() => {
    if (unitNameValue && !unitIdValue && !showUnitNameField) {
      setShowUnitNameField(true);
    }
  }, [unitNameValue, unitIdValue, showUnitNameField]);

  const handleShowUnitNameField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setShowUnitNameField(true);
      setFieldValue(unitId, null);
    } else {
      setShowUnitNameField(false);
      setFieldValue(unitName, '');
    }
  };

  return (
    <div className={styles.unitField}>
      {!showUnitNameField ? (
        <Field
          labelText={label}
          disabled={showUnitNameField}
          required={true}
          aria-required
          name={unitId}
          component={UnitPlaceSelectorField}
          helperText={unitIdHelperText}
          placeholder={unitIdPlaceholder}
        />
      ) : (
        <Field
          label={label}
          required
          aria-required
          name={unitName}
          component={TextInputField}
          helperText={unitNameHelperText}
          placeholder={unitNamePlaceholder}
        />
      )}
      <Checkbox
        id="show-studyGroup-unitName"
        label={showUnitNameLabel}
        checked={showUnitNameField}
        onChange={handleShowUnitNameField}
      />
    </div>
  );
};

export default EnrolmentForm;
