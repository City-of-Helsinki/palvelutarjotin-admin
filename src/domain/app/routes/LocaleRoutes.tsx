import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { ROUTER_LANGUAGES } from '../../../constants';
import CmsPage from '../../../headless-cms/components/CmsPage';
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
import OccurrenceDetailsPage from '../../occurrence/OccurrenceDetailsPage';
import PageLayout from '../layout/PageLayout';
import { ROUTES } from './constants';

const LocaleRoutes: React.FC<
  RouteComponentProps<{
    locale: ROUTER_LANGUAGES;
  }>
> = ({
  match: {
    params: { locale },
  },
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  React.useEffect(() => {
    // Get new api token after new access token
    if (user?.access_token) {
      dispatch(getApiToken(user.access_token));
    } else {
      dispatch(resetApiTokenData());
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    <PageLayout>
      <Switch>
        <Route exact path={`/${locale}`} component={EventsPage} />
        <Route
          exact
          path={`/${locale}${ROUTES.MY_PROFILE}`}
          component={MyProfilePage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.CREATE_EVENT}`}
          component={CreateEventPage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.COPY_EVENT}`}
          component={CreateEventPage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.EVENT_DETAILS}`}
          component={EventDetailsPage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.EVENT_SUMMARY}`}
          component={EventSummaryPage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.EVENT_PREVIEW}`}
          component={EventPreviewPage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.EDIT_EVENT}`}
          component={EditEventPage}
        />
        <Route
          exact
          path={[`/${locale}${ROUTES.CREATE_OCCURRENCE}`]}
          component={CreateEventOccurrencePage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.EDIT_ENROLMENT}`}
          component={EditEnrolmentPage}
        />
        <Route
          exact
          path={[
            `/${locale}${ROUTES.OCCURRENCE_DETAILS}`,
            `/${locale}${ROUTES.ENROLMENT_DETAILS}`,
          ]}
          component={OccurrenceDetailsPage}
        />
        <Route
          exact
          path={`/${locale}${ROUTES.CMS_PAGE}+`}
          component={CmsPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </PageLayout>
  );
};

export default LocaleRoutes;
