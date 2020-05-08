import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ImageInputField from '../../../common/components/form/fields/ImageInputField';
import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import DeleteIcon from '../../../icons/DeleteIcon';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import styles from './eventForm.module.scss';
import ValidationSchema from './ValidationSchema';

const EventForm = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        description: '',
        duration: '',
        keywords: [],
        name: '',
        necessaryVisits: '',
        place: '',
        placeDescription: '',
        providerContactInfo: { email: '', phone: '' },
        shortDescription: '',
        // TODO: add image file somewhere to be uploaded (this is only object URL at the moment)
        image: '',
        photographer: '',
        imageAltText: '',
      }}
      validateOnChange
      onSubmit={(values) => {}}
      validationSchema={ValidationSchema}
    >
      {({ values: { place, image }, setFieldValue }) => {
        const imageSelected = Boolean(image);
        return (
          <div className={styles.eventForm}>
            <div className={styles.basicInfoWrapper}>
              <h2>{t('eventForm.basicInfo.title')}</h2>
              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelName')}
                  name="name"
                  component={TextInputField}
                />
              </FormGroup>

              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelShortDescription')}
                  name="shortDescription"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelDescription')}
                  name="description"
                  component={TextAreaInputField}
                  rows={20}
                />
              </FormGroup>

              {imageSelected ? (
                <ImageSelectedForm
                  image={image}
                  setFieldValue={setFieldValue}
                />
              ) : (
                <SelectImageForm />
              )}

              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelInfoUrl')}
                  name="infoUrl"
                  component={TextInputField}
                />
              </FormGroup>

              <div className={styles.durationRow}>
                <div>
                  <FormGroup>
                    <Field
                      labelText={t('eventForm.basicInfo.labelDuration')}
                      name="duration"
                      component={NumberInputField}
                      min={0}
                    />
                  </FormGroup>
                </div>

                {/* TODO: Language selector will come here when multi-select dropdown component is implemented */}
                <div></div>
                {/* TODO: Target group selector will come here when multi-select dropdown component is implemented */}
                <div></div>
              </div>

              <div className={styles.necessaryVisitsRow}>
                <div>
                  <FormGroup>
                    <Field
                      labelText={t('eventForm.basicInfo.labelNecessaryVisits')}
                      name="necessaryVisits"
                      component={NumberInputField}
                      min={1}
                    />
                  </FormGroup>
                </div>
                <div className={styles.instructionText}>
                  {t('eventForm.basicInfo.textNecessaryVisits')}
                </div>
              </div>
              <FormGroup>
                <Field
                  helperText={t('eventForm.basicInfo.helperTextKeywords')}
                  labelText={t('eventForm.basicInfo.labelKeywords')}
                  name="keywords"
                  placeholder={t('eventForm.basicInfo.placeholderKeywords')}
                  component={KeywordSelectorField}
                />
              </FormGroup>

              <h2>{t('eventForm.location.title')}</h2>

              <FormGroup>
                <Field
                  helperText={t('eventForm.location.helperTextPlace')}
                  labelText={t('eventForm.location.labelPlace')}
                  name="place"
                  placeholder={t('eventForm.location.placeholderPlace')}
                  component={PlaceSelectorField}
                />
              </FormGroup>
              {!!place && (
                <FormGroup>
                  <PlaceInfo id={place} />
                </FormGroup>
              )}
              <FormGroup>
                <Field
                  helperText={t(
                    'eventForm.location.helperTextPlaceDescription'
                  )}
                  labelText={t('eventForm.location.labelPlaceDescription')}
                  name="placeDescription"
                  placeholder={t(
                    'eventForm.location.placeholderPlaceDescription'
                  )}
                  component={TextAreaInputField}
                  rows={5}
                />
              </FormGroup>
            </div>
            <div className={styles.contactInfoWrapper}>
              <h2>{t('eventForm.contactPerson.title')}</h2>
              {/* TODO: Add contact person selector here when dopdown component is implemented */}

              <FormGroup>
                <Field
                  labelText={t('eventForm.contactPerson.labelEmail')}
                  name="providerContactInfo.email"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('eventForm.contactPerson.labelPhone')}
                  name="providerContactInfo.phone"
                  component={TextInputField}
                />
              </FormGroup>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const ImageSelectedForm: React.FC<{
  image: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}> = ({ setFieldValue, image }) => {
  const { t } = useTranslation();
  return (
    <>
      <ImagePreview image={image} />
      <div className={styles.imageSelectRow}>
        <div className={styles.imageSelect}>
          <DeleteImageButton
            onClick={() => {
              ['image', 'photographer', 'imageAltText'].forEach((field) => {
                setFieldValue(field, '');
              });
            }}
          />
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

const SelectImageForm: React.FC = () => {
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

const ImagePreview: React.FC<{ image: string }> = ({ image }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.imagePreview}>
      <p>{t('eventForm.basicInfo.labelImage')}</p>
      <img
        className={styles.eventImage}
        src={image}
        alt={t('eventForm.basicInfo.eventImageAltText')}
      />
    </div>
  );
};

const DeleteImageButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <button className={styles.deleteImageButton} onClick={onClick}>
      <div className={styles.deleteIconWrapper}>
        <DeleteIcon />
      </div>
      <span>{t('eventForm.basicInfo.deleteImage')}</span>
    </button>
  );
};

export default EventForm;
