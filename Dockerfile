# ===============================================
FROM helsinkitest/node:12-slim as appbase
# ===============================================
# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin

# Yarn
ENV YARN_VERSION 1.19.1
RUN yarn policies set-version $YARN_VERSION

# set sass path to support scss import
ARG SASS_PATH=./src/styles
ENV SASS_PATH $SASS_PATH

# Oidc authority
ARG REACT_APP_OIDC_AUTHORITY
ARG REACT_APP_OIDC_CLIENT_ID
ARG REACT_APP_OIDC_SCOPE

# Sentry variables
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_ENVIRONMENT

# Api url
ARG REACT_APP_API_URI
ARG REACT_APP_CMS_URI
ARG REACT_APP_API_REPORT_URI

# Linkedevents api url
ARG REACT_APP_LINKEDEVENTS_API_URI

# CIMODE Language button visibility
ARG REACT_APP_LANGUAGE_CIMODE_VISIBLE

USER root
RUN apt-install.sh build-essential

# Use non-root user
USER appuser

# Install dependencies
COPY --chown=appuser:appuser package*.json *yarn* /app/
RUN yarn && yarn cache clean --force

# Copy all files
COPY --chown=appuser:appuser . .

# Build
RUN yarn build

USER root
RUN apt-cleanup.sh build-essential

# =============================
FROM nginx:1.17 as production
# =============================

# Nginx runs with user "nginx" by default
COPY --from=appbase --chown=nginx:nginx /app/build /usr/share/nginx/html


COPY .prod/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
