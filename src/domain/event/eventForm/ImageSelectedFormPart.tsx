import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DeleteButton from '../../../common/components/deleteButton/DeleteButton';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import styles from './eventForm.module.scss';
import ImagePreview from './ImagePreview';

const ImageSelectedFormPart: React.FC<{
  image: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
}> = ({ setFieldValue, image, setFieldTouched }) => {
  const { t } = useTranslation();

  // set fields fields untouched so that errors won't show right away when user deletes and add new image
  // there is a problem with validating fields that are unmounted from the dom
  // maybe it has something to do with this issue: https://github.com/jaredpalmer/formik/issues/683
  React.useEffect(() => {
    ['imageAltText', 'photographer'].forEach((field) => {
      setFieldTouched(field, false);
    });
  }, [setFieldTouched]);

  return (
    <>
      <ImagePreview image={image} />
      <div className={styles.imageSelectRow}>
        <div className={styles.imageSelect}>
          <DeleteButton
            onClick={() => {
              ['image', 'imageAltText', 'photographer'].forEach((field) => {
                setFieldValue(field, '');
              });
            }}
          >
            {t('eventForm.basicInfo.deleteImage')}
          </DeleteButton>
        </div>
        <div>
          <FormGroup>
            <Field
              labelText={t('eventForm.basicInfo.photographer')}
              name="photographer"
              component={TextInputField}
            />
          </FormGroup>
          <FormGroup>
            <Field
              labelText={t('eventForm.basicInfo.labelImageAltText')}
              name="imageAltText"
              helperText={t('eventForm.basicInfo.imageAltTextHelp')}
              component={TextInputField}
            />
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default ImageSelectedFormPart;
