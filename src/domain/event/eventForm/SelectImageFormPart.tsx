import { Field } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ImageInputField from '../../../common/components/form/fields/ImageInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import styles from './eventForm.module.scss';

const SelectImageFormPart: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.imageSelectRow}>
      <div className={styles.imageSelect}>
        <FormGroup>
          <Field
            labelText={t('eventForm.basicInfo.labelImage')}
            name="image"
            component={ImageInputField}
          />
        </FormGroup>
      </div>
      <div className={styles.imageInstructionsText}>
        {t('eventForm.basicInfo.descriptionAddImage')}
      </div>
    </div>
  );
};

export default SelectImageFormPart;
