import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DeleteButton from '../../../common/components/deleteButton/DeleteButton';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import ImagePreview from '../../image/imagePreview/ImagePreview';
import styles from './eventForm.module.scss';

interface Props {
  imageId: string;
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
}

const ImageSelectedFormPart: React.FC<Props> = ({
  setFieldValue,
  imageId,
  setFieldTouched,
}) => {
  const { t } = useTranslation();

  // set fields fields untouched so that errors won't show right away when user deletes and add new image
  // there is a problem with validating fields that are unmounted from the dom
  // maybe it has something to do with this issue: https://github.com/jaredpalmer/formik/issues/683
  React.useEffect(() => {
    ['imageAltText', 'imagePhotographerName'].forEach((field) => {
      setFieldTouched(field, false);
    });
  }, [setFieldTouched]);

  const clearImageFormFields = () => {
    ['image', 'imageAltText', 'imagePhotographerName'].forEach((field) => {
      setFieldValue(field, '');
    });
  };

  return (
    <>
      <ImagePreview id={imageId} />
      <div className={styles.imageSelectRow}>
        <div className={styles.imageSelect}>
          <DeleteButton onClick={clearImageFormFields}>
            {t('eventForm.basicInfo.deleteImage')}
          </DeleteButton>
        </div>
        <div>
          <FormGroup>
            {/* TODO: Implement saving image fields when API implemented */}
            <Field
              labelText={t('eventForm.basicInfo.labelImagePhotographer')}
              name="imagePhotographerName"
              required
              component={TextInputField}
            />
          </FormGroup>
          <FormGroup>
            {/* TODO: Implement saving image fields when API implemented */}
            <Field
              labelText={t('eventForm.basicInfo.labelImageAltText')}
              name="imageAltText"
              required
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
