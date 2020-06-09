import { MyProfileFormFields } from './myProfileForm/MyProfileForm';

export const getMyProfilePayload = (values: MyProfileFormFields) => ({
  name: values.name,
  phoneNumber: values.phoneNumber,
  emailAddress: values.emailAddress,
  organisations: values.organisations,
});
