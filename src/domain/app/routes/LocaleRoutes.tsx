import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import CmsPage from '../../../headless-cms/components/CmsPage';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Language } from '../../../types';
import { resetApiTokenData } from '../../auth/actions';
import { getApiToken } from '../../auth/authenticate';
import { userSelector } from '../../auth/selectors';
import EditEnrolmentPage from '../../enrolment/EditEnrolmentPage';
import CreateEventPage from '../../event/CreateEventPage';
import EditEventPage from '../../event/EditEventPage';
import EventDetailsPage from '../../event/EventDetailsPage';
import EventPreviewPage from '../../event/EventPreviewPage';
import EventSummaryPage from '../../event/EventSummaryPage';
import EventsPage from '../../events/EventsPage';
import MyProfilePage from '../../myProfile/MyProfilePage';
import NotFoundPage from '../../notFound/NotFoundPage';
import CreateEventOccurrencePage from '../../occurrence/CreateOccurrencePage';
import EditOccurrencesPage from '../../occurrence/EditOccurrencesPage';
import OccurrenceDetailsPage from '../../occurrence/OccurrenceDetailsPage';
import PageLayout from '../layout/PageLayout';
import { AppDispatch } from '../store';
import { ROUTES } from './constants';

const LocaleRoutes: React.FC<{ locale: Language }> = ({ locale }) => {
  const { i18n } = useTranslation();
  const dispatch: AppDispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  React.useEffect(() => {
    // Get new api token after new access token
    if (user?.access_token) {
      dispatch(getApiToken(user.access_token) as any);
    } else {
      dispatch(resetApiTokenData());
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    <PageLayout>
      <Routes>
        <Route index element={<EventsPage />} />
        <Route path={ROUTES.MY_PROFILE} element={<MyProfilePage />} />
        <Route path={ROUTES.CREATE_EVENT} element={<CreateEventPage />} />
        <Route path={ROUTES.COPY_EVENT} element={<CreateEventPage />} />
        <Route path={ROUTES.EVENT_DETAILS} element={<EventDetailsPage />} />
        <Route path={ROUTES.EVENT_SUMMARY} element={<EventSummaryPage />} />
        <Route path={ROUTES.EVENT_PREVIEW} element={<EventPreviewPage />} />
        <Route path={ROUTES.EDIT_EVENT} element={<EditEventPage />} />
        <Route
          path={ROUTES.EDIT_OCCURRENCES}
          element={<EditOccurrencesPage />}
        />
        <Route
          path={ROUTES.CREATE_OCCURRENCE}
          element={<CreateEventOccurrencePage />}
        />
        <Route path={ROUTES.EDIT_ENROLMENT} element={<EditEnrolmentPage />} />
        <Route
          path={ROUTES.OCCURRENCE_DETAILS}
          element={<OccurrenceDetailsPage />}
        />
        <Route
          path={ROUTES.ENROLMENT_DETAILS}
          element={<OccurrenceDetailsPage />}
        />
        <Route path={ROUTES.CMS_PAGE} element={<CmsPage />}>
          <Route path={`${ROUTES.CMS_PAGE}/:subslug`} element={<CmsPage />}>
            <Route
              path={`${ROUTES.CMS_PAGE}/:subslug/:subsubslug`}
              element={<CmsPage />}
            >
              <Route
                path={`${ROUTES.CMS_PAGE}/:subslug/:subsubslug/:subsubsubslug`}
                element={<CmsPage />}
              />
            </Route>
          </Route>
        </Route>
        <Route element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  );
};

export default LocaleRoutes;
