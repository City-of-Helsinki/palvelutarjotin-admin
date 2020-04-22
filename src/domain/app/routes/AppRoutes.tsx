import React from "react";
import { Route, Switch } from "react-router";

import LandingPage from "../../landingPage/LandingPage";
import NotFoundPage from "../../notFound/NotFoundPage";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={`/`} component={LandingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoutes;
